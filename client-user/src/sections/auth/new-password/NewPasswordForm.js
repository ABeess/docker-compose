import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import { patchUser } from 'src/fetching/user.api';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function NewPasswordForm({ verifyCode, user }) {
  const [showPassword, setShowPassword] = useState(false);
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await patchUser({
        data: { password: data.password, email: user?.email, verifyCode },
        checking: false,
        verify: false,
      });
      if (res?.code) {
        return enqueueSnackbar(res?.message || 'Xảy ra lỗi hệ thống - New_Password!', { variant: 'warning' });
      }
      replace(PATH_AUTH.login);
    } catch (error) {
      enqueueSnackbar(error?.message || 'Xảy ra lỗi hệ thống -  New_Password!', { variant: 'error' });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="password"
          label="New Password"
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
        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
