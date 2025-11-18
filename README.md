# 🎫 Helpdesk System - Frontend

Modern React application for internal IT/HR ticket management with dark mode support.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Components](#components)
- [Features Guide](#features-guide)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- ✅ **User Authentication** - Login/Register with JWT
- ✅ **Role-Based UI** - Different views for User, Agent, Admin
- ✅ **Ticket Management** - Create, view, update, comment on tickets
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Active Navigation** - Highlight current page
- ✅ **Real-time Updates** - Ticket status tracking
- ✅ **Admin Dashboard** - Analytics and KPI visualization
- ✅ **Responsive Design** - Works on all devices
- ✅ **Filter & Search** - Filter tickets by status, priority, category
- ✅ **Email Integration** - Receive ticket notifications

---

## 🛠️ Tech Stack

- **Framework:** React.js (v18.2.0)
- **Routing:** React Router DOM (v6.15.0)
- **HTTP Client:** Axios (v1.5.0)
- **Styling:** CSS3 (with CSS Variables)
- **State Management:** React Context API
- **Build Tool:** Create React App (v5.0.1)

---

## 📦 Prerequisites

Before running the frontend, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:5000`

---

## 🚀 Installation

### Step 1: Navigate to Frontend Directory
```bash
cd helpdesk-system/frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

---

## ⚙️ Configuration

### Update API URL (Optional)

If your backend is on a different URL, update the API URL in components:

**Option 1: Using Environment Variables**

Create `.env` file in frontend root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Update components to use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

**Option 2: Using Proxy (Current Setup)**

In `package.json`:
```json
{
  "proxy": "http://localhost:5000"
}
```

---

## ▶️ Running the App

### Development Mode
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Builds the app for production to the `build` folder.

### Run Tests
```bash
npm test
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html           # HTML template
│   └── favicon.ico
├── src/
│   ├── components/          # React components
│   │   ├── Login.js         # Login page
│   │   ├── Register.js      # Registration page
│   │   ├── Navbar.js        # Navigation bar
│   │   ├── Dashboard.js     # User dashboard
│   │   ├── TicketList.js    # List all tickets
│   │   ├── CreateTicket.js  # Create ticket form
│   │   ├── TicketDetails.js # View/update ticket
│   │   ├── AdminDashboard.js # Admin analytics
│   │   ├── Auth.css         # Auth pages styling
│   │   ├── Navbar.css       # Navbar styling
│   │   ├── Dashboard.css    # Dashboard styling
│   │   ├── CreateTicket.css # Create form styling
│   │   ├── TicketList.css   # Ticket list styling
│   │   ├── TicketDetails.css # Ticket details styling
│   │   └── AdminDashboard.css # Admin styling
│   ├── contexts/
│   │   └── DarkModeContext.js # Dark mode state
│   ├── App.js               # Main component
│   ├── App.css              # Global styles
│   ├── DarkMode.css         # Dark mode theme
│   ├── index.js             # Entry point
│   └── index.css            # Base styles
├── package.json
└── README.md
```

---

## 🧩 Components

### Authentication Components

#### **Login.js**
- User login with email and password
- Auto-save token to localStorage
- Demo credentials display
- Redirect to dashboard on success

#### **Register.js**
- New user registration
- Role and department selection
- Input validation
- Auto-login after registration

---

### Main Components

#### **Navbar.js**
- Navigation menu with active states
- Dark mode toggle (🌙/☀️)
- User info display with role badge
- Logout functionality
- Responsive design

#### **Dashboard.js**
- Statistics cards (Total, Open, In Progress, Resolved)
- Recent tickets table
- Quick action buttons
- Role-based content

#### **TicketList.js**
- Grid view of all tickets
- Filter by status, priority, category
- Card-based layout with hover effects
- Empty state handling
- Pagination-ready design

#### **CreateTicket.js**
- Ticket creation form
- Priority and category selection
- SLA information display
- Form validation
- Success/error messages

#### **TicketDetails.js**
- Complete ticket information
- Status update buttons (for agents)
- Comment system
- Timeline view
- Related actions

#### **AdminDashboard.js**
- KPI cards (6 metrics)
- Visual charts (status, priority, category)
- Agent performance table
- Recent tickets overview
- Trend analysis

---

### Context Providers

#### **DarkModeContext.js**
- Dark mode state management
- Toggle functionality
- localStorage persistence
- Global theme provider

---

## 🎨 Features Guide

### 1. Dark Mode

**Toggle Dark Mode:**
- Click the 🌙 moon icon (light mode)
- Click the ☀️ sun icon (dark mode)
- Theme persists across sessions

**Features:**
- Fully dark interface (no white backgrounds)
- Smooth transitions (0.3s)
- Optimized colors for readability
- Automatic localStorage save

---

### 2. Active Navigation

**Current Page Highlighting:**
- Active link has purple background
- Bottom gradient line indicator
- Bold font weight
- Works on all pages
- Adapts to dark mode

---

### 3. Ticket Management

**User Flow:**
1. Login → Dashboard
2. Click "Create New Ticket"
3. Fill form (title, description, priority, category)
4. Submit → Auto-assigned to agent
5. Receive email confirmation
6. Track status in "My Tickets"

**Agent Flow:**
1. Login → View assigned tickets
2. Click ticket to view details
3. Update status (Open → In Progress → Resolved)
4. Add comments
5. User receives email updates

---

### 4. Filtering

**Available Filters:**
- **Status:** All, Open, In Progress, Resolved, Closed
- **Priority:** All, Low, Medium, High, Critical
- **Category:** All, IT, HR, General

**Usage:**
1. Go to "My Tickets"
2. Select filters from dropdowns
3. Click "Clear Filters" to reset

---

### 5. Analytics (Admin Only)

**Available Metrics:**
- Total tickets
- Resolved tickets
- Resolution rate (%)
- Average resolution time (hours)
- SLA compliance rate (%)
- Overdue tickets count

**Visual Charts:**
- Tickets by status (horizontal bars)
- Tickets by priority (horizontal bars)
- Tickets by category (horizontal bars)

**Agent Performance:**
- Tickets resolved per agent
- Average resolution time
- Current workload

---

## 🎨 Styling System

### CSS Variables (Light Mode)
```css
--bg-primary: #ffffff
--text-primary: #333333
--border-color: #e0e0e0
```

### CSS Variables (Dark Mode)
```css
--bg-primary: #1a1d2e
--text-primary: #e4e4e7
--border-color: #2d3144
```

### Spacing System
```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px
```

### Border Radius
```
Small: 8px
Medium: 10-12px
Large: 16px
Pills: 20px
```

---

## 🔐 Authentication Flow

### Login Process
```
1. User enters email/password
2. POST to /api/auth/login
3. Receive token + user data
4. Save to localStorage
5. Redirect to /dashboard
```

### Protected Routes
```
All routes except /login and /register require:
- Valid token in localStorage
- User data in localStorage
- Redirect to /login if missing
```

### Token Management
```javascript
// Store token
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(userData));

// Use in requests
headers: {
  Authorization: `Bearer ${token}`
}

// Logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 🐛 Troubleshooting

### Issue: Cannot Connect to Backend

**Error in Console:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solutions:**
1. Check backend is running: `npm run dev` in backend folder
2. Verify backend URL: `http://localhost:5000`
3. Check CORS configuration in backend
4. Clear browser cache and restart

---

### Issue: White Screen on Load

**Possible Causes:**
1. JavaScript error in console
2. Missing dependencies
3. Build issue

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force

# Restart
npm start
```

---

### Issue: Dark Mode Not Working

**Solutions:**
1. Check DarkModeContext.js exists
2. Verify App.js wraps with DarkModeProvider
3. Check DarkMode.css is imported
4. Clear localStorage: `localStorage.clear()`
5. Hard refresh: Ctrl + Shift + R

---

### Issue: Token Expired

**Error:**
```
401 Unauthorized: Not authorized, token failed
```

**Solutions:**
1. Login again (tokens expire after 30 days)
2. Check backend JWT_SECRET matches
3. Clear localStorage and re-login

---

### Issue: Navbar Links Not Active

**Solutions:**
1. Check Navbar.js has useLocation import
2. Verify active class is applied
3. Check Navbar.css has .active styles
4. Clear browser cache

---

### Issue: Images/Icons Not Showing

**Solutions:**
1. Check public folder has assets
2. Use emojis instead of image files
3. Verify correct path: `/images/icon.png`

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
min-width: 1024px  → Full layout

/* Tablet */
768px - 1024px     → Reduced spacing, hidden elements

/* Mobile */
max-width: 768px   → Single column, stacked layout
```

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Logout and redirect to login
- [ ] Protected routes require login

**Ticket Management:**
- [ ] Create new ticket
- [ ] View ticket list
- [ ] Filter tickets
- [ ] View ticket details
- [ ] Add comment
- [ ] Update status (as agent)

**Dark Mode:**
- [ ] Toggle dark mode
- [ ] Refresh page (should persist)
- [ ] All pages work in dark mode
- [ ] No white backgrounds in dark mode

**Navigation:**
- [ ] Active state shows on current page
- [ ] Click between pages
- [ ] Responsive menu works
- [ ] Logo links to dashboard

**Admin Dashboard:**
- [ ] View KPIs (admin only)
- [ ] Charts display correctly
- [ ] Agent performance shows
- [ ] Recent tickets visible

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel

# Set environment variables in Vercel dashboard
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

### Deploy to Netlify
```bash
# Build project
npm run build

# Drag and drop build folder to Netlify
# Or connect GitHub repository

# Configure environment variables
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/helpdesk-system",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

---

## 🎨 Customization

### Change Theme Colors

Edit `DarkMode.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}

body.dark-mode {
  --primary-color: #your-dark-color;
}
```

### Change Logo

Edit `Navbar.js`:
```javascript
<Link to="/dashboard" className="navbar-logo">
  <img src="/logo.png" alt="Logo" />
  Your Company
</Link>
```

### Add New Page

1. Create component: `src/components/NewPage.js`
2. Create CSS: `src/components/NewPage.css`
3. Add route in `App.js`:
```javascript
<Route path="/newpage" element={<NewPage />} />
```
4. Add link in `Navbar.js`

---

## 📊 Performance Tips

1. **Lazy Loading:**
```javascript
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
```

2. **Memoization:**
```javascript
const MemoizedTicketCard = React.memo(TicketCard);
```

3. **Code Splitting:**
Already configured with Create React App

4. **Image Optimization:**
- Use WebP format
- Lazy load images
- Use emojis instead of icons

---

## 📝 Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| Start | `npm start` | Run development server |
| Build | `npm run build` | Build for production |
| Test | `npm test` | Run tests |
| Eject | `npm run eject` | Eject from CRA (irreversible) |

---

## 🎓 Best Practices

### Component Organization
- One component per file
- Separate CSS for each component
- Use functional components with hooks
- Keep components small and focused

### State Management
- Use Context for global state (dark mode, auth)
- Use useState for local state
- Lift state up when needed
- Avoid prop drilling

### Styling
- Use CSS variables for theming
- Follow spacing system (4px grid)
- Mobile-first responsive design
- Consistent border radius

### API Calls
- Use axios for all requests
- Handle loading states
- Handle error states
- Show success messages

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## 📄 License

MIT License

---

## 👨‍💻 Developer

Created as a technical assessment showcasing:
- Modern React patterns
- Responsive design
- Dark mode implementation
- Role-based UI
- Real-time updates
- Professional UX

---

## 📞 Support

For issues or questions:
- Email: thasleemkhan761@gmail.com
- GitHub: [repository-url]

---

## 🙏 Acknowledgments

- React documentation
- React Router documentation
- Create React App
- CSS Variables guide
- Dark mode design patterns

---

**Happy Coding! 🚀**
