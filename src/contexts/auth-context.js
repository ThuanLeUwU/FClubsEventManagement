import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { authFirebase } from '../firebase/firebase';
import axios from 'axios';

// const HANDLERS = {
//   INITIALIZE: 'INITIALIZE',
//   SIGN_IN: 'SIGN_IN',
//   SIGN_OUT: 'SIGN_OUT'
// };

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

// const handlers = {
//   [HANDLERS.INITIALIZE]: (state, action) => {
//     const user = action.payload;

//     return {
//       ...state,
//       ...(
//         // if payload (user) is provided, then is authenticated
//         user
//           ? ({
//             isAuthenticated: true,
//             isLoading: false,
//             user
//           })
//           : ({
//             isLoading: false
//           })
//       )
//     };
//   },
//   [HANDLERS.SIGN_IN]: (state, action) => {
//     const user = action.payload;

//     return {
//       ...state,
//       isAuthenticated: true,
//       user
//     };
//   },
//   [HANDLERS.SIGN_OUT]: (state) => {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null
//     };
//   }
// };

// const reducer = (state, action) => (
//   handlers[action.type] ? handlers[action.type](state, action) : state
// );

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const initialized = useRef(false);

  // const initialize = async () => {
  //   // Prevent from calling twice in development mode with React.StrictMode enabled
  //   if (initialized.current) {
  //     return;
  //   }

  //   initialized.current = true;

  //   // Check if auth has been skipped
  //   // From sign-in page we may have set "skip-auth" to "true"
  //   const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';

  //   if (authSkipped) {
  //     const user = {};

  //     dispatch({
  //       type: HANDLERS.INITIALIZE,
  //       payload: user
  //     });
  //     return;
  //   }

  //   // Check if authentication with Zalter is enabled
  //   // If not, then set user as authenticated
  //   if (!ENABLE_AUTH) {
  //     const user = {};

  //     dispatch({
  //       type: HANDLERS.INITIALIZE,
  //       payload: user
  //     });
  //     return;
  //   }

  //   try {
  //     // Check if user is authenticated
  //     const isAuthenticated = await auth.isAuthenticated();

  //     if (isAuthenticated) {
  //       // Get user from your database
  //       const user = {};

  //       dispatch({
  //         type: HANDLERS.INITIALIZE,
  //         payload: user
  //       });
  //     } else {
  //       dispatch({
  //         type: HANDLERS.INITIALIZE
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     dispatch({
  //       type: HANDLERS.INITIALIZE
  //     });
  //   }
  // };

  // useEffect(() => {
  //   initialize().catch(console.error);
  // }, []);
  // const [user, setUser] = useState();
  const [user, setUser] = useState()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        setUser(currentUser);
      }
    })
    return () => unsubscribe()
  }, [])


  // const   checkUserLogin = async (currentUser) => {
  //   setLoading(true)
  //   try {
  //     const token = get(auth, 'currentUser.accessToken')
  //     const response = await axios.post(
  //       "URL",
  //       {
  //         token,
  //       }
  //     )
  //     setCookie('accessToken', response?.data?.access_token)
  //     const data = getResponseData(response)

  //     setUser()
  //     setLoading(false)
  //   } catch (error) {
  //     deleteCookie('accessToken')
  //     setLoading(false)
  //     const err = error.toString()
  //     message.error(err)
  //   }
  // }
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authFirebase, provider);

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
