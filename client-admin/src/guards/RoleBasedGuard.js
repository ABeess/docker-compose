import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import Authentication from 'src/recoils/user/auth';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  children: PropTypes.node,
  content: PropTypes.string
};

export default function RoleBasedGuard({ accessibleRoles, children, content }) {
  const { user } = useRecoilValue(Authentication);
  const currentRole = user?.role;
  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Stack sx={{ width: '50vw', mx: 'auto', mt: 2 }}>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          {content || 'You do not have permission to access this page'}
        </Alert>
      </Stack>
    );
  }

  return <>{children}</>;
}
