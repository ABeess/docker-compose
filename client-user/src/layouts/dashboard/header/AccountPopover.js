import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// components
import MenuPopover from 'src/components/MenuPopover';
import { IconButtonAnimate } from 'src/components/animate';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
import MyAvatar from 'src/components/MyAvatar';
import { logout, removeRefreshToken } from 'src/fetching/auth.api';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const authState = useRecoilValue(authAtom);
  const resetAuthState = useResetRecoilState(authAtom);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(authState.user);
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = async () => {
    try {
      await logout();
      await removeRefreshToken(user?._id);
      resetAuthState();
      router.replace(PATH_AUTH.login);
      enqueueSnackbar(`Hẹn gặp lại ${user?.firstName} ${user?.lastName}`, { variant: 'info' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Lỗi hệ thống khi đăng xuất', { variant: 'error' });
    }
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      linkTo: '/',
    },
    {
      label: 'Profile',
      linkTo: `${PATH_DASHBOARD.user.root}/profile/${user?._id}`,
    },
    {
      label: 'Settings',
      linkTo: '/',
    },
  ];
  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
