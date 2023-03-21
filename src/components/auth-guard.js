import PropTypes from 'prop-types';
import { useAuthContext } from '../contexts/auth-context';
import Home from '../pages/home';

export const AuthGuard = (props) => {
  const { children } = props;
  // const { isAuthenticated } = useAuthContext();
  const {user} = useAuthContext() || {};

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div>
  //     <p>User name: {user.name}</p>
  //     <p>User email: {user.email}</p>
  //   </div>
  // );
  return user ? children : ( 
  <Home/>)
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
