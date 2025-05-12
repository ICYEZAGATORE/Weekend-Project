import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

// State interface
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Define action types
enum ActionType {
  FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE',
  ADD_USER = 'ADD_USER'
}

// Action interfaces
type UserAction =
  | { type: ActionType.FETCH_USERS_REQUEST }
  | { type: ActionType.FETCH_USERS_SUCCESS; payload: User[] }
  | { type: ActionType.FETCH_USERS_FAILURE; payload: string }
  | { type: ActionType.ADD_USER; payload: User };

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

// Reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case ActionType.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case ActionType.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionType.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

// Create context
interface UserContextType {
  state: UserState;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: ActionType.FETCH_USERS_REQUEST });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      dispatch({ type: ActionType.FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ 
        type: ActionType.FETCH_USERS_FAILURE, 
        payload: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    // Generate a new unique ID (in a real app this would be handled by the backend)
    const newId = state.users.length > 0 
      ? Math.max(...state.users.map(user => user.id)) + 1 
      : 1;
    
    const newUser: User = {
      ...userData,
      id: newId
    };
    
    dispatch({ type: ActionType.ADD_USER, payload: newUser });
  };

  const value = {
    state,
    fetchUsers,
    addUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};