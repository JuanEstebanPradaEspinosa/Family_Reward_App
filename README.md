# Family Rewards App

A React Native mobile application for managing children's chores and rewards.

## Features

- User authentication (login, register, anonymous login)
- Manage children's profiles
- Create and assign chores
- Track completion status
- Award points for completed tasks
- Real-time updates with Firebase

## Tech Stack

- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- Firebase (Authentication & Firestore)
- React Navigation
- Formik & Yup for form validation

## Installation

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Install dependencies

```bash
bun install
```

3. Start the development server

```bash
bun start
```

## Environment Setup

1. Create a Firebase project
2. Configure Firebase credentials in `src/services/firebase/index.ts`
3. Enable Authentication and Firestore in Firebase Console

## Project Structure

```
src/
├── context/         # Redux store, actions, reducers
├── hooks/           # Custom React hooks
├── router/          # Navigation configuration
├── screens/         # UI components and screens
├── services/        # Firebase and other services
├── styles/          # Global styles and theme
└── types/          # TypeScript interfaces and types
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
