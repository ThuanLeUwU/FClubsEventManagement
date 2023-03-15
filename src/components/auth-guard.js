import PropTypes from 'prop-types';
import { useAuthContext } from '../contexts/auth-context';
import Login from '../pages/login';

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
  <Login/>)
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
