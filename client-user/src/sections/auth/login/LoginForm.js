import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import AuthSocial from '../AuthSocial';
import { login, refreshToken } from 'src/fetching/auth.api';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const setAuthState = useSetRecoilState(authAtom);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string(),
  });

  const defaultValues = {
    email: 'quang.nv28q12@gmail.com',
    password: '12345678_@',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const loginRes = await login(data);
      if (loginRes?.code === 409) {
        return enqueueSnackbar('Bạn đã đăng nhập bằng GG hoặc FB trước đó!', {
          variant: 'info',
        });
      }
      await refreshToken({ payload: { _id: loginRes?.user._id, role: loginRes?.user.role }, login: true });
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: loginRes?.user,
        accessToken: loginRes?.accessToken,
      }));
      enqueueSnackbar('Chào mừng bạn đến với Education');
    } catch (error) {
      if (error?.code === 401) {
        enqueueSnackbar('Tài khoản hoặc mật khẩu không đúng!', { variant: 'error' });
      } else {
        enqueueSnackbar(error?.message || 'Lỗi hệ thống', { variant: 'error' });
      }
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="email" label="Email address" />
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RHFCheckbox name="remember" label="Remember me" />
          <NextLink href={PATH_AUTH.resetPassword} passHref>
            <Link variant="subtitle2">Forgot password?</Link>
          </NextLink>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </FormProvider>
      <AuthSocial divider />
    </>
  );
}
