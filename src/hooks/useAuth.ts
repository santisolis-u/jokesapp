import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return response.user;
  };

  const signUp = async (email: string, password: string) => {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return response.user;
  };

  const signOut = () => {
    auth().signOut();
  };

  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return suscriber; // end suscription on unmount
  }, []);
  return {initializing, user, signIn, signOut, signUp};
};

export default useAuth;
