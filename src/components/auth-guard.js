import PropTypes from 'prop-types';
import { useAuthContext } from '../contexts/auth-context';
import Login from '../pages/login';

export const AuthGuard = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuthContext();
  const {user} = useAuthContext();

  return user ? children : ( 
  <Login/>)
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
