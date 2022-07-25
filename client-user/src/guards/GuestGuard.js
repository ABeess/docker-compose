import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { push } = useRouter();

  const { isAuthenticated } = useRecoilValue(authAtom);

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.courses.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
