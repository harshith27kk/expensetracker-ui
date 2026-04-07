# 💰 ExpenseTracker - React Frontend

A modern, responsive React frontend application for managing personal finances, built with React, TypeScript, TailwindCSS, and integrated with a Spring Boot REST API backend.

## 🚀 Features

### Authentication
- ✅ User Registration with password strength indicator
- ✅ User Login with "Remember Me" option
- ✅ JWT token-based authentication
- ✅ Protected routes requiring authentication
- ✅ Automatic logout on session expiry

### Dashboard
- ✅ Summary cards showing total expenses, budget, and remaining amount
- ✅ Budget utilization progress bar
- ✅ Daily expense trend chart
- ✅ Quick statistics display
- ✅ Recent expenses table with edit/delete actions
- ✅ Quick add expense button

### Expense Management
- ✅ Create, read, update, and delete expenses
- ✅ Categorize expenses
- ✅ Date picker (prevents future dates)
- ✅ Advanced filtering (month, category, date range, amount range)
- ✅ Paginated expense list
- ✅ Sort by date, amount, or category
- ✅ Modal-based expense creation/editing

### Category Management
- ✅ View all categories in card grid layout
- ✅ Create new categories
- ✅ Edit existing categories
- ✅ Delete categories (with validation)
- ✅ Display expense count per category
- ✅ Prevent deletion of categories with associated expenses

### Budget Management
- ✅ Set monthly budgets per category
- ✅ Visual progress bars showing budget utilization
- ✅ Color-coded status (success/warning/error)
- ✅ Display remaining budget
- ✅ Edit and delete budgets
- ✅ Month-wise budget overview
- ✅ Overspending alerts

### Analytics & Reports
- ✅ Pie chart: Expense distribution by category
- ✅ Bar chart: Category-wise spending breakdown
- ✅ Month selector for historical data
- ✅ Statistics: Total spending, transaction count, average per transaction
- ✅ Top spending category display
- ✅ Interactive charts with recharts library

### Settings & Profile
- ✅ User profile display (read-only)
- ✅ Dark mode / Light mode toggle
- ✅ Currency selector
- ✅ Password change option
- ✅ Account deletion
- ✅ Logout functionality
- ✅ App version and information

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support with persistence
- ✅ Accessible forms with validation
- ✅ Loading states and spinners
- ✅ Error handling with user-friendly messages
- ✅ Toast notifications for success/error/info
- ✅ Collapsible sidebar navigation
- ✅ Mobile-friendly hamburger menu
- ✅ Smooth animations and transitions

## 🛠️ Tech Stack

### Core
- **React 19.2.4** - UI library
- **TypeScript 6.0** - Type safety
- **Vite 8.0** - Build tool and dev server
- **React Router v6** - Client-side routing

### UI & Styling
- **TailwindCSS 4.0** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** - Chart and graph library

### Form & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form resolver for Zod

### State & API
- **Axios** - HTTP client
- **Zustand** - State management (ready for integration)
- **next-themes** - Theme management

### Date & Time
- **date-fns** - Date formatting and manipulation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Spring Boot backend API running on `http://localhost:8080`

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expensetracker-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Base URL** (optional)
   - By default, API connects to `http://localhost:8080/api`
   - To change, set `VITE_API_BASE_URL` in `.env.local`:
     ```
     VITE_API_BASE_URL=http://your-api-url/api
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```
   - Output in `dist/` directory

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/                 # Login & Register forms
│   ├── Dashboard/            # Dashboard components (charts, cards)
│   ├── Expenses/             # Expense list and modal
│   ├── Categories/           # Category management
│   ├── Budgets/              # Budget management
│   ├── Analytics/            # Analytics and reports
│   ├── Settings/             # User settings
│   ├── Common/               # Shared components (Header, Sidebar, Toast, etc.)
│   └── Layout/               # Layout wrappers (MainLayout, AuthLayout)
├── pages/                    # Page components for each route
├── services/                 # API service layer
│   ├── api.ts               # Axios instance with interceptors
│   ├── authService.ts       # Authentication API calls
│   ├── expenseService.ts    # Expense API calls
│   ├── categoryService.ts   # Category API calls
│   └── budgetService.ts     # Budget API calls
├── contexts/                # React Context (AuthContext)
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript interfaces
├── utils/                   # Utility functions
│   ├── constants.ts         # App constants
│   ├── formatters.ts        # Formatting functions
│   ├── validators.ts        # Validation functions
│   └── schemas.ts           # Zod validation schemas
├── styles.css               # Global styles with TailwindCSS
├── App.tsx                  # Main app component with routing
├── main.tsx                 # Entry point
└── vite-env.d.ts           # Vite environment types
```

## 🔐 Authentication Flow

1. **Registration**: User creates account → JWT token issued → Auto-login
2. **Login**: User enters credentials → JWT token stored in localStorage
3. **Protected Routes**: Token checked before rendering → Redirect to login if invalid
4. **API Calls**: Token automatically added to all requests via interceptors
5. **Logout**: Token removed from localStorage → Redirect to login

## 🎨 Theming

### Dark Mode
- Toggle via header button or settings page
- Theme preference persists in localStorage
- System preference detection on first visit
- All components have dark mode variants

### Colors (Customizable in tailwind.config.js)
```javascript
colors: {
  primary: '#3B82F6',      // Blue
  secondary: '#8B5CF6',    // Purple
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (Full-width, hamburger menu)
- **Tablet**: 640px - 1024px (Flexible sidebar)
- **Desktop**: > 1024px (Sidebar always visible)

### Mobile Features
- Touch-friendly buttons and inputs
- Collapsible sidebar navigation
- Optimized form layouts
- Stacked charts on small screens

## 🔄 API Integration

### Base Configuration
- Base URL: `http://localhost:8080/api`
- Timeout: 30 seconds
- Content-Type: `application/json`

### Request Interceptor
- Automatically adds JWT token to Authorization header
- Format: `Authorization: Bearer {token}`

### Response Interceptor
- Handles 401 errors (redirects to login)
- Extracts data from response

### Error Handling
- User-friendly error messages in toasts
- Network error handling
- Form-level validation error display
- API error feedback

## 🚀 Running the Application

### Development
```bash
npm run dev
```
- Hot module replacement (HMR) enabled
- Development server on http://localhost:5173

### Build
```bash
npm run build
```
- TypeScript compilation
- Vite bundling
- Production optimization
- Output: `dist/` directory

### Preview
```bash
npm run preview
```
- Preview production build locally

### Linting
```bash
npm run lint
```
- Check code with ESLint

## 📝 Environment Variables

Create `.env.local` in the project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Optional: Other configurations
# VITE_APP_NAME=ExpenseTracker
```

## 🔗 API Endpoints Used

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Expenses
- `GET /expenses` - Fetch all expenses (with filters)
- `POST /expenses` - Create expense
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense

### Categories
- `GET /categories` - Fetch all categories
- `POST /categories` - Create category
- `PUT /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category

### Budgets
- `GET /budgets` - Fetch all budgets
- `POST /budgets` - Create budget
- `GET /budgets/month/{month}` - Fetch budgets by month
- `PUT /budgets/{id}` - Update budget
- `DELETE /budgets/{id}` - Delete budget

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on http://localhost:8080
- Check CORS settings on backend
- Verify `VITE_API_BASE_URL` environment variable

### Dark Mode Not Working
- Clear browser localStorage
- Rebuild the application
- Check if CSS is loading properly

### Forms Not Submitting
- Check browser console for validation errors
- Verify API endpoint is correct
- Ensure all required fields are filled

### Build Errors
- Delete `node_modules` and run `npm install`
- Clear `.eslintcache`
- Check TypeScript errors: `npm run build`

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)

### Libraries
- [Axios Documentation](https://axios-http.com)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [Recharts Documentation](https://recharts.org)
- [date-fns Documentation](https://date-fns.org)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Support

For issues and support, please create an issue in the repository.

---

**Made with ❤️ for efficient expense tracking**

