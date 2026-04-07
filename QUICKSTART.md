# 🚀 Quick Start Guide - ExpenseTracker Frontend

Get the ExpenseTracker React frontend up and running in minutes!

## Prerequisites

Before you begin, ensure you have:
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** for cloning the repository
- **Spring Boot Backend** running on `http://localhost:8080` ([See Backend Setup](../expensetracker-backend))

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expensetracker-ui
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 19.2.4
- TypeScript 6.0
- TailwindCSS 4.0
- React Router v6
- Axios
- And many more...

**Installation time:** ~2-3 minutes (depends on internet speed)

### 3. Configure Environment Variables (Optional)

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Default configuration:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

If your backend is running on a different port or URL, update this accordingly.

### 4. Start Development Server

```bash
npm run dev
```

This will:
- Start the Vite dev server
- Enable Hot Module Replacement (HMR)
- Open automatically at `http://localhost:5173`

**Expected output:**
```
  VITE v8.0.5  building client environment for production...

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### 5. Open in Browser

Navigate to `http://localhost:5173` in your web browser.

## First Use

1. **Register a new account**
   - Click "Create Account" or go to `/register`
   - Fill in name, email, password
   - Passwords must be at least 8 characters with uppercase, lowercase, and numbers
   - Accept terms and click "Create Account"

2. **Login**
   - Use your credentials to log in
   - Check "Remember Me" to stay logged in

3. **Start tracking expenses**
   - Go to Dashboard to see overview
   - Click "Add Expense" to create your first expense
   - Set up categories in the Categories page
   - Create budgets in the Budgets page

## Common Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Management
```bash
# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## Troubleshooting

### Issue: "Port 5173 is already in use"

```bash
# Find and kill the process
lsof -i :5173
kill -9 <PID>

# Or specify a different port
npm run dev -- --port 3000
```

### Issue: "Cannot find module" error

```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: "API is not responding"

**Checklist:**
- ✅ Backend is running on `http://localhost:8080`
- ✅ Check CORS settings on backend
- ✅ Verify `VITE_API_BASE_URL` in `.env.local`
- ✅ Check browser console for errors (F12)

### Issue: "Dark mode toggle not working"

```bash
# Clear browser localStorage
# Open DevTools (F12) → Console → Type:
localStorage.clear()

# Then refresh the page
```

## Folder Structure Quick Reference

```
src/
├── pages/              # Main page components (7 pages)
├── components/         # Reusable UI components
├── services/           # API integration layer
├── contexts/           # React Context (Auth)
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
├── styles.css          # Global TailwindCSS styles
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## Key Routes

- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Dashboard home (default)
- `/expenses` - Expense management
- `/categories` - Category management
- `/budgets` - Budget management
- `/analytics` - Analytics & reports
- `/settings` - User settings

## API Integration

The app automatically:
- ✅ Connects to backend at `http://localhost:8080/api`
- ✅ Stores JWT token in localStorage
- ✅ Adds token to all API requests
- ✅ Redirects to login on 401 errors
- ✅ Handles network errors gracefully

## Development Tips

### Hot Module Replacement (HMR)
- Changes to components are reflected instantly
- No page refresh needed
- State is preserved during updates

### TypeScript
- Full type safety throughout the app
- IntelliSense in your editor
- Compile-time error detection

### TailwindCSS
- Utility-first CSS classes
- No separate CSS files needed for most styles
- Dark mode support included

### Debugging
- Use React DevTools browser extension
- Check Console tab in DevTools for errors
- Use network tab to inspect API calls

## Building for Production

```bash
npm run build
```

This creates a production-ready build in the `dist/` folder:
- All TypeScript compiled to JavaScript
- CSS minified
- JavaScript bundled and minified
- Ready for deployment

**Build size:** ~830KB (before gzip)

## Next Steps

1. **Read the main README**: See [FRONTEND_README.md](./FRONTEND_README.md) for detailed documentation
2. **Explore the code**: Start with `src/App.tsx` and work your way through components
3. **Set up backend**: Ensure Spring Boot backend is running
4. **Customize**: Modify colors, add features, adjust layouts

## Getting Help

- 📖 Check [FRONTEND_README.md](./FRONTEND_README.md) for detailed docs
- 🔗 See API integration details in services/
- 💬 Review component props and types in src/types/
- 🐛 Check browser console (F12) for errors

## Performance Tips

- Close unused browser tabs
- Use Chrome DevTools for profiling
- Check Lighthouse scores (DevTools → Lighthouse)
- Monitor API calls (DevTools → Network tab)

## Available Scripts Summary

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

**Happy coding! 🎉**

For more detailed information, see [FRONTEND_README.md](./FRONTEND_README.md)

