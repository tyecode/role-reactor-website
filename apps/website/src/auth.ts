import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { botFetchJson } from "@/lib/bot-fetch";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email guilds",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        // Use Discord ID (stored in token.id), not NextAuth's internal UUID (token.sub)
        session.user.id = (token.id as string) || (token.sub as string);

        // Fetch role from bot database
        try {
          const userData = await botFetchJson<{ id: string; role: string }>(
            `/user/${session.user.id}`,
            { silent: true }
          );
          // @ts-expect-error - role is not in the default user type
          session.user.role = userData.role || "user";
        } catch {
          // It's fine if user info isn't found yet (e.g. first login)
          // The sync in the jwt callback will create them shortly
          // @ts-expect-error - role is not in the default user type
          session.user.role = "user"; // Fallback
        }

        // Pass the access token to the session for Discord API calls
        if (token.accessToken) {
          Object.assign(session, { accessToken: token.accessToken });
        }

        // Ensure image is set from token, or use default Discord avatar
        if (token.picture) {
          session.user.image = token.picture;
        } else if (token.id || token.sub) {
          // Fallback to default Discord avatar based on user ID
          const discordId = (token.id as string) || (token.sub as string);
          session.user.image = `https://cdn.discordapp.com/embed/avatars/${
            Number(discordId) % 5
          }.png`;
        }
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile && profile.id) {
        token.id = profile.id;

        // Sync user data with bot database on every login/refresh
        try {
          await botFetchJson("/user/sync", {
            method: "POST",
            userId: profile.id,
            body: JSON.stringify({
              id: profile.id,
              username: profile.username || profile.name,
              globalName: profile.global_name || profile.name,
              avatar: profile.avatar,
              email: profile.email,
              accessToken: account?.access_token,
              refreshToken: account?.refresh_token,
            }),
          });
        } catch (error) {
          console.error(
            `[Auth] Failed to sync user ${profile.id} with bot:`,
            error
          );
        }

        // Build Discord avatar URL with proper format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const avatar = (profile as any).avatar;
        if (avatar && typeof avatar === "string") {
          // Check if avatar has animated format (gif)
          const avatarFormat = avatar.startsWith("a_") ? "gif" : "png";
          token.picture = `https://cdn.discordapp.com/avatars/${profile.id}/${avatar}.${avatarFormat}`;
        } else {
          // Use default Discord avatar if no custom avatar
          token.picture = `https://cdn.discordapp.com/embed/avatars/${
            Number(profile.id) % 5
          }.png`;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
