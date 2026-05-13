# ADU Canteen - Authentication & Authorization Guide

## Overview
This canteen application now includes a complete authentication and authorization system with role-based access control (RBAC) for admin and user roles.

---

## Key Features Implemented

### ✅ Authentication
- **Login Page** - Beautiful sign-in form with email/password authentication
- **Sign-Up Page** - Create new user accounts with validation
- **Session Persistence** - User data persists using localStorage
- **Auto-redirect** - Unauthenticated users are redirected to login

### ✅ Authorization
- **Role-Based Access** - Separate permissions for Admin and User roles
- **Dynamic Admin Panel** - Admin panel is only accessible to admin users
- **Protected Routes** - All routes except login require authentication
- **Automatic Role Detection** - Email containing "admin" creates admin account

### ✅ Profile Page
- **User Information** - Displays name, email, student ID, role
- **Statistics** - Shows total orders, completed orders, and amount spent
- **Order History** - Quick access to view all orders
- **Dynamic Navigation** - Admin Dashboard link only shows for admins
- **Logout Button** - Safely logout and return to login page

---

## How to Use

### For Users:
1. **Sign Up**: Click "Sign Up" on the login page
2. **Enter Details**: Provide email, name, and password
3. **Login**: Use your credentials to sign in
4. **Browse Menu**: Explore food items and place orders
5. **View Profile**: Check your order history and statistics
6. **Logout**: Click logout in profile or header to exit

### For Admins:
1. **Create Account**: Use email containing "admin" (e.g., `admin@adu.edu`)
2. **Login**: Sign in with admin credentials
3. **Access Admin Panel**: Navigate to Admin Dashboard from:
   - Profile page (Admin Dashboard link)
   - Sidebar (Admin Panel option)
   - Header dropdown menu
4. **Manage Operations**: 
   - View all orders
   - Manage menu items
   - Configure time slots
5. **Logout**: Safely logout from any page

---

## File Structure

```
src/
├── pages/
│   ├── Login.jsx (NEW)          - Authentication page
│   ├── Profile.jsx (UPDATED)    - User profile with stats
│   └── Home.jsx
├── components/
│   ├── ProtectedRoute.jsx (NEW) - Route protection wrapper
│   ├── Header.jsx (UPDATED)     - Dynamic user menu & logout
│   ├── Sidebar.jsx (UPDATED)    - Dynamic admin menu
│   └── ...
├── context/
│   └── CanteenContext.jsx (UPDATED) - Auth state management
└── App.jsx (UPDATED)            - Protected routes setup
```

---

## Technical Details

### Context API - Authentication State
The `CanteenContext` now manages:
- `user` - Current logged-in user object
- `isAuthenticated` - Boolean authentication status
- `login(email, password)` - Login function
- `signup(email, password, name)` - Registration function
- `logout()` - Logout function

### Protected Route Component
The `ProtectedRoute` component:
- Checks if user is authenticated
- Validates user role for admin routes
- Redirects unauthenticated users to login
- Redirects unauthorized users to home page

### User Object Structure
```javascript
{
  id: 'user_123456',
  email: 'user@adu.edu',
  name: 'User Name',
  role: 'user', // or 'admin'
  joinDate: '5/13/2026',
  studentId: 'ADU123456',
  ordersCount: 0,
  completedCount: 0,
  totalSpent: 0
}
```

---

## Testing Credentials

### User Account
- Email: `user@example.com`
- Password: `password123`

### Admin Account
- Email: `admin@adu.edu`
- Password: `admin123`

*Note: Any email with "admin" will create an admin account*

---

## Features by Role

### Regular Users Can:
- ✅ Browse menu items
- ✅ Add items to cart
- ✅ Place orders
- ✅ View order history
- ✅ Check profile & statistics
- ✅ View selected time slots

### Admin Users Can:
- ✅ All user features
- ✅ Access Admin Dashboard
- ✅ Manage menu items (add, edit, delete)
- ✅ Manage time slots
- ✅ View all orders
- ✅ Update order status

---

## Security Notes

⚠️ **Current Implementation (Demo)**:
- Uses localStorage for session persistence
- Simple client-side authentication
- No backend API integration yet

✅ **For Production**:
- Integrate with backend authentication
- Use JWT tokens for session management
- Implement password hashing
- Add HTTPS encryption
- Validate all requests server-side
- Implement refresh tokens
- Add rate limiting on login attempts

---

## Customization

### Change Login Redirect
In `App.jsx`, modify the catch-all route:
```jsx
<Route path="*" element={<Navigate to="/login" replace />} />
```

### Add New Roles
In `CanteenContext.jsx`, update the `signup` function:
```jsx
role: email.includes('admin') ? 'admin' : 'user'
```

### Modify Protected Routes
Update `ProtectedRoute.jsx` to add additional permission checks

---

## Troubleshooting

**Q: User is redirected to login after page refresh**
- A: Check if localStorage is enabled in your browser
- Clear browser cache and try again

**Q: Admin Dashboard not showing for admin user**
- A: Ensure email contains "admin" when creating account
- Verify user role in browser DevTools > Application > LocalStorage

**Q: Logout doesn't work**
- A: Ensure `logout()` function is being called correctly
- Check browser console for errors

---

## Next Steps

1. **Backend Integration**: Connect to real API for authentication
2. **Email Verification**: Add email verification on signup
3. **Password Reset**: Implement forgot password functionality
4. **Two-Factor Authentication**: Add 2FA for security
5. **User Management**: Create admin interface to manage users
6. **Audit Logs**: Track user activities and changes

---

Generated: May 2026
Last Updated: Implementation Complete ✅
