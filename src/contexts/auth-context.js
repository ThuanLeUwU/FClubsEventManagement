import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { authFirebase } from '../firebase/firebase';
import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import axiosWrapper from '../utils/axiosWrapper';
import { async } from '@firebase/util';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;

  const router = useRouter();

  const [user, setUser] = useState()
  const [campus, setCampus] = useState()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (currentUser) => {
      if (currentUser) {
        console.log('check');
        checkUserLogin();
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchCampus = async () => {
    const headers = {
      'Authorization': 'Bearer ' + getCookie('accessToken')
    }

    const responseAllCampus = await axios.get(`https://evenu.herokuapp.com/api/campus`, {
      headers
    })

    setCampus(responseAllCampus?.data)
  }



  const checkUserLogin = async () => {
    try {
      const token = authFirebase.currentUser.accessToken;

      const condition = {
        token: token,
        role: 'members',
        deviceToken: ''

      }

      const response = await axios.post(
        'https://evenu.herokuapp.com/api/login', condition
      )
      setCookie('accessToken', response?.data?.access_token)

      setUser(response?.data?.data)
      router.replace('/')
    } catch (error) {
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
        campus,
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
