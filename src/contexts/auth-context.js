import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { authFirebase } from '../firebase/firebase';
import axios from 'axios';
import { setCookie, deleteCookie } from 'cookies-next';
import axiosWrapper from '../utils/axiosWrapper';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  
 
  const [user, setUser] = useState()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (currentUser) => {
      if (currentUser) {
        checkUserLogin();
      }
    })
    return () => unsubscribe()
  }, [])


  const  checkUserLogin = async () => {
    try {
      const token = authFirebase.currentUser.accessToken;
      console.log('toekn',token);
      const condition = {
        token: token,
        role: 'members'
      }
    
      const response = await axios.post(
        'https://event-project.herokuapp.com/api/login', condition
      )

      setCookie('accessToken', response?.data?.access_token)
      setUser(response?.data?.data)
     
    } catch (error) {
      deleteCookie('accessToken')
      console.log(error);
      // if(error.code == "ERR_BAD_REQUEST"){
      //   alert("Lỗi Đăng Nhập")
      // }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authFirebase, provider);
      checkUserLogin()
    } catch (error) {
      console.log(error);
    }
  };

  const signOutProject = () => {
    signOut(authFirebase)
    setUser(null)
  };

  return (
    <AuthContext.Provider
      value={{
        // ...state,
        user,
        signInWithGoogle,
        signOutProject
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
