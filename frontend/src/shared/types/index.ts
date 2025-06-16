// Define the type for the user
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define the state type
export interface UserState {
  currentUser: User | null;
  getCurrentUser: () => User | null;
  updateCurrentUser: (user: User) => void;
}