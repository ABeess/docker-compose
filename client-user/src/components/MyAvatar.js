// hooks
// utils
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
import createAvatar from 'src/utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const [user, setUser] = useState({});

  const userState = useRecoilValue(authAtom);

  useEffect(() => {
    setUser(userState.user);
  }, [userState]);

  const displayName = `${user?.lastName} ${user?.firstName}`;

  return (
    <Avatar
      src={user?.profilePhoto?.url}
      alt={displayName}
      color={user?.profilePhoto?.url ? 'default' : createAvatar(displayName).color}
      {...other}
    >
      {createAvatar(displayName).name}
    </Avatar>
  );
}
