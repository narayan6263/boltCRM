# App Flow Guide

## New User Flow

When a new member installs the app, here's what happens:

### 1. First Launch
- App starts with `AuthLoadingScreen`
- Checks for existing authentication data
- Since no data exists, navigates to `WelcomeScreen`

### 2. Welcome Screen
- User sees the welcome screen with app introduction
- When user clicks "Get Started", app sets `hasSeenWelcome = 'true'`
- Navigates to `LoginScreen`

### 3. Login Screen
- User enters email and password
- On successful login, app sets `hasLoggedIn = 'true'`
- Navigates to `HomeScreen`

## Returning User Flow

### 1. App Launch
- App starts with `AuthLoadingScreen`
- Checks for existing authentication data
- Since `hasSeenWelcome = 'true'` exists, skips welcome screen
- Goes directly to `LoginScreen`

### 2. Login Screen
- User enters credentials
- On successful login, navigates to `HomeScreen`

## Authenticated User Flow

### 1. App Launch
- App starts with `AuthLoadingScreen`
- Checks for valid authentication token
- If token is valid and not expired, goes directly to `HomeScreen`

## Key Features

### Responsive Login Screen
- Automatically adjusts when keyboard appears
- Logo animates out of view when keyboard is active
- Form moves above keyboard for better UX
- Responsive design for both phone and tablet

### State Management
- `hasSeenWelcome`: Tracks if user has seen welcome screen
- `hasLoggedIn`: Tracks if user has logged in before
- `authToken`: Stores authentication token
- `tokenExpiresAt`: Stores token expiration time

## Testing Utilities

Use the helper functions in `src/utils/appStateHelper.js`:

```javascript
import { resetToNewUser, getAppState, markWelcomeSeen } from '../utils/appStateHelper';

// Reset to new user state
await resetToNewUser();

// Check current app state
await getAppState();

// Mark welcome as seen
await markWelcomeSeen();
```

## Navigation Flow Summary

```
App Launch
    ↓
AuthLoadingScreen
    ↓
┌─────────────────┬─────────────────┬─────────────────┐
│ Valid Token     │ No Token        │ No Token        │
│                 │ hasSeenWelcome  │ !hasSeenWelcome │
│                 │ = 'true'        │                 │
│                 │                 │                 │
│ HomeScreen      │ LoginScreen     │ WelcomeScreen   │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

This ensures that:
- New users see the welcome screen once
- Returning users go directly to login
- Authenticated users go directly to home
- The login screen is responsive and user-friendly 