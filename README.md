# Role Reactor Website

A modern documentation website for the Role Reactor Discord bot, built with Next.js 15 and Fumadocs.

## 🚀 Features

- **Modern Documentation**: Comprehensive guides for Role Reactor bot setup and usage
- **Command Reference**: Complete documentation for all bot commands
- **Interactive Examples**: Real-world use cases for different server types
- **Troubleshooting**: Common issues and solutions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Search Functionality**: Fast content search across all documentation
- **SEO Optimized**: OpenGraph images and proper meta tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Documentation**: Fumadocs with MDX support
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Linting**: ESLint with TypeScript
- **Git Hooks**: Husky with Commitlint

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/role-reactor-website.git
cd role-reactor-website
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
role-reactor-website/
├── content/docs/           # Documentation content (MDX)
│   ├── commands/          # Bot command documentation
│   ├── examples/          # Use case examples
│   ├── getting-started/   # Setup and installation guides
│   ├── troubleshooting/   # FAQ and common issues
│   └── changelog/         # Version history
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── constants/        # Application constants
│   └── lib/             # Utility functions
└── public/              # Static assets
```

## 🚀 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking

# Documentation
pnpm docs:dev     # Start documentation development server
pnpm docs:build   # Build documentation
```

## 📚 Documentation Sections

### Getting Started

- **Introduction**: Overview of Role Reactor bot
- **Setup**: Step-by-step installation guide
- **Adding Bot**: How to add the bot to your server
- **First Steps**: Initial configuration and setup

### Commands

- **General Commands**: Help, invite, support
- **Role Management**: Setup, list, update, delete roles
- **Temporary Roles**: Assign and manage temporary roles

### Examples

- **Community Server**: Managing community roles
- **Educational Server**: Academic role management
- **Gaming Server**: Gaming community setup

### Troubleshooting

- **Common Issues**: Frequently encountered problems
- **FAQ**: Frequently asked questions
- **Support**: Getting help and support

## 🔧 Development Guidelines

### Commit Convention

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) using Husky and Commitlint. All commit messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Allowed Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

#### Examples:

```bash
feat: add privacy policy page
fix: resolve mobile navigation bug
docs: update installation instructions
style: improve button hover animations
refactor: extract common utility functions
```

#### Pre-commit Hooks:

- ESLint checks for code quality
- TypeScript type checking
- Commit message validation

If your commit fails, fix the issues and try again.

## 🌐 Deployment

The website is optimized for deployment on Vercel, Netlify, or any static hosting platform.

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and build the project
3. Deploy with zero configuration

### Environment Variables

- `NEXT_PUBLIC_SITE_URL`: Your site's URL (for sitemap generation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the commit convention
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs documentation framework
- [Role Reactor Bot](https://github.com/your-username/role-reactor-bot) - the Discord bot this website documents

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
