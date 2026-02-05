import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        // Use Discord ID (stored in token.id), not NextAuth's internal UUID (token.sub)
        session.user.id = (token.id as string) || (token.sub as string);
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
