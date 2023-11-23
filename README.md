# Notion Clone - Fullstack Note Taking App

Take notes just like in Notion with block editors.

[![Notion clone landing page](https://github.com/kreylanc/notion-clone/assets/50169945/e3753ff0-35b3-4c89-a3e5-9cbe626d3829)](https://note-app-two-azure.vercel.app)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Authentication and User Management:** [Clerk](https://clerk.com/)
- **UI Component:** [shadcn/ui](https://ui.shadcn.com)
- **Realtime Database:** [Convex](https://www.convex.dev/)
- **Validation:** [zod](https://zod.dev/)
- **File Uploads:** [Edgestore](https://edgestore.dev/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Rich Text Editor:** [Blocknote](https://www.blocknotejs.org/)

## Features

- 💻 Beautiful Landing Page with User Login/Signup
- 📄 Block Note Editor like Notion Using Blocknote
- 🔄 Real-time Response Using Convex Database
- 🔒 Authentication Using Clerk
- 🎨 Clean, Modern UI Using 'shadcn-ui'
- 📍 Emoji Picker
- 🌓 Light and Dark Mode
- 🔤 100% Written in TypeScript
- 🌐 Publish Notes for Public Access
- 🎁 ...much more

## Screenshots

**Note Dashboard Page**

![note](https://github.com/kreylanc/notion-clone/assets/50169945/6273324a-ccef-436c-9c86-e17d8491c0c0)

**Note Page**

- Desktop view

![desktop note view](https://github.com/kreylanc/notion-clone/assets/50169945/1588014c-0750-46c2-b924-7a17c7aaed57)

- Mobile View

![mobile note view](https://github.com/kreylanc/notion-clone/assets/50169945/12cc897d-7f1e-4bbb-a7df-5b4780120f68)

**Emoji Picker**

![screenshot of emoji picker being used](https://github.com/kreylanc/notion-clone/assets/50169945/74a9cb54-1dfc-49ec-b556-9643affe3717)

**Cover Image**

![screenshot of adding cover image](https://github.com/kreylanc/notion-clone/assets/50169945/5294c46b-1a49-4f65-b397-d5d7d611f40a)

**Block Note Editor**

![screenshot of block note editor](https://github.com/kreylanc/notion-clone/assets/50169945/539cd0c3-e0e4-4090-ac6e-7e259b29202d)

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/kreylanc/notion-clone.git
```

2. Install dependencies using pnpm (or delete the pnpm-lock file and use any other package manager)

```bash
pnpm install
```

3. Add the following variables to your .env file

```bash
# The convex variables are automatically added when installing Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk Auth keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

# Edgestore keys for uploading images
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=

```

4. Run the convex database in another terminal

```bash
npx convex dev
```

5. Start the development server

```bash
pnpm dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Few extra steps are required to deploy the app using Convex. Check their [documentation for more information](https://docs.convex.dev/production/hosting/netlify).
