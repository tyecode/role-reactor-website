export const links = {
  author: {
    name: "qodinger",
    url: "https://github.com/qodinger",
  },
  contact: {
    email: "rolereactor@gmail.com",
  },
  home: "https://rolereactor.app",
  support: "https://discord.gg/D8tYkU75Ry",
  github: "https://github.com/qodinger/role-reactor-bot",
  sponsor: "https://rolereactor.app/sponsor",
  buymeacoffee: "https://buymeacoffee.com/rolereactor",
  inviteBot: `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1392714201558159431"
  }&permissions=8&scope=bot%20applications.commands`,
};
