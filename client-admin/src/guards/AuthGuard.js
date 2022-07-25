import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Authentication from 'src/recoils/user/auth';
import { PATH_AUTH } from 'src/routes/path';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useRecoilValue(Authentication);

  if (!isAuthenticated) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  return <>{children}</>;
}
