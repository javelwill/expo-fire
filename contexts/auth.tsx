import {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {router} from 'expo-router';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  loading: boolean;
  error: null | string;
  signInAnonymously: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  loading: false,
  error: null,
  signInAnonymously: () => {},
  signOut: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInAnonymously = async () => {
    try {
      setError(null);
      setLoading(true);
      await auth().signInAnonymously();
      router.replace('/(app)/');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/operation-not-allowed':
          setError('Something went wrong, please try again later.');
          break;
        default:
          setError('Something went wrong, please try again later.');
          break;
      }
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      await auth().signOut();
    } catch (error: any) {
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        loading,
        error,
        signInAnonymously,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
