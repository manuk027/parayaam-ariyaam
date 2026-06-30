# Parayaam Ariyaam (പറയാം അറിയാം)

![Project Logo](/public/logo.png)

A modern, minimalist blog application designed for clutter-free reading and effortless writing. Built entirely with React, TypeScript, Vite, and powered by Firebase, the platform is designed precisely to let authors share their stories effectively without being sidetracked by complex user interfaces.

## 🚀 Features

- **Robust User Authentication**: Secure Login and Registration powered by Firebase Authentication. Protected routes ensure that only authenticated users can create, modify, or view their blogs.
- **Complete Blog Management**: Write engaging articles, edit existing drafts, and browse other writers' posts on a unified platform.
- **Personalized Dashboard**: The "My Blogs" section enables complete oversight of your own creations natively.
- **Real-time Database**: Lightning-fast data synchronization utilizing Google Firebase Firestore.
- **Interactive UI/UX**: Dynamic status notifications powered by `react-hot-toast` and scalable icon usage via `lucide-react`.

---

## 🛠 Tech Stack

### Framework & Language
- **[React 19](https://react.dev/)**: Frontend user interface framework.
- **[Typescript](https://www.typescriptlang.org/)**: Ensures robust application logic via strong static typing.
- **[Vite](https://vitejs.dev/)**: Ultra-fast next-generation frontend tooling.

### Styling & UI Libraries
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework injected directly for rapid UI creation.
- **[Lucide React](https://lucide.dev/)**: Elegant, beautifully crafted SVG icons.
- **[React Hot Toast](https://react-hot-toast.com/)**: For displaying seamless success/error popup notifications.

### Navigation & State
- **[React Router DOM v7](https://reactrouter.com/)**: Seamless navigation and history manipulation.
- **Context API & Custom Hooks**: For scalable and efficient global state management (`useAuth`, `AuthContext`).

### Backend (BaaS)
- **[Firebase](https://firebase.google.com/)**: Comprehensive backend infrastructure handling:
  - **Firebase Auth**: User identity management.
  - **Firestore Database**: NoSQL document storage handling "blogs and users" collections and fields.

---

## 📂 Application Structure

The codebase is organized modularly for scalability and code cleanliness:

```
src/
├── assets/          # Static assets like images and fonts
├── components/      # Resuable UI building blocks (Navbar, BlogCard, BlogEditor)
├── context/         # React Context files (AuthContext for user state)
├── firebase/        # BaaS backend configuration (config.ts)
├── hooks/           # Custom React hooks (useAuth)
├── pages/           # Core page views tied to routes
│   ├── Home         # Landing page and metrics display
│   ├── Login/Signup # Authentication forms
│   ├── Blogs        # Global blogs feed
│   ├── SingleBlog   # Distinct read view for a specific blog
│   ├── Create/Edit  # Dedicated writing interfaces
│   └── MyBlogs      # Current user's specific dashboard
├── routes/          # Navigation guards
│   ├── ProtectedRoute # Forces login re-directs
│   └── PublicRoute    # Forces dashboard re-directs if already logged in
├── App.tsx          # Main entry route definer
└── main.tsx         # React DOM renderer
```

---

## 🔌 API & External Libraries reference

Data orchestration within the app doesn't rely directly on traditional REST APIs but instead interfaces fluidly using **Google Firebase SDKs **:
- `firebase/app`: Used to initialize app contexts natively utilizing Environment Variables.
- `firebase/auth`: Handles token management, authentication state observation, and login status.
- `firebase/firestore`: Modifies data iteratively securely under the target collection `"blogs"`. Provides features like server-side timestamps and real-time listeners.

---

## ⚙️ Environment Variables Setup

Ensure you create a `.env` file in the root directory before running the project. It should look like this:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

## 🏃️ Development Scripts

Available script commands within `package.json`:
- `npm run dev` - Initialise the Vite development environment server locally.
- `npm run build` - Invoke the total TypeScript compilation strictly & bundle application build assets for dist.
- `npm run lint` - Trigger ESLint to enforce syntax consistency.
- `npm run preview` - Render a local preview of the production bundle.

## 🤝 Open For Contribution

**Contributions are absolutely welcome!** 
Whether you're fixing a bug, adding a new feature, writing fresh documentation, or refactoring the code structure, parayaam-ariyaam is **open-source** and completely open for contribution. 

To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request!
