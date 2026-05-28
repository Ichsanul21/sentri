# Demo Accounts for Sentri Platform

## Available Test Accounts

### 1. Super Admin (Full Access)
- **Email:** admin@sentri.com
- **Password:** password
- **Role:** super_admin
- **Access:** All features including system administration, user management, billing, monitoring, agents

### 2. Manager (Brand Management)
- **Email:** manager@sentri.com
- **Password:** password
- **Role:** manager
- **Access:** Dashboard, brand management, sentiment analysis, crisis management, strategy tools, reports

### 3. Analyst (Limited Write Access)
- **Email:** analyst@sentri.com
- **Password:** password
- **Role:** analyst
- **Access:** View dashboard, analyze mentions, create reports (no admin access)

### 4. Viewer (Read-Only)
- **Email:** viewer@client.com
- **Password:** password
- **Role:** viewer
- **Access:** Read-only dashboard view, view reports only

---

## Quick Start Guide

1. **Navigate to:** http://localhost:3000
2. **Login with:** admin@sentri.com / password
3. **First-time setup:** Complete the Brand DNA Setup wizard if no brands exist
4. **Explore:** Navigate through Dashboard → Brands → Crisis → Strategy modules

---

## Testing Different Roles

To test role-based access:
1. Login with any account
2. Logout from profile menu
3. Login with a different role account
4. Notice how navigation and features change based on role

---

## Notes

- All passwords are set to "password" for easy testing
- Data is stored in localStorage (browser-based)
- Clear browser data to reset to default state
- Default brand "Sentri" comes pre-configured
