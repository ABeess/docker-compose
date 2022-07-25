import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { patchUser } from 'src/fetching/user.api';
import { sendVerifyCode } from 'src/fetching/mailer.api';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: 'quang.nv212@gmail.com' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await patchUser({ data, checking: true });
      if (res?.code) {
        return enqueueSnackbar(res?.message, { variant: 'warning' });
      }
      await sendVerifyCode({ email: data.email });
      sessionStorage.setItem('user', JSON.stringify(data));
      push(`${PATH_AUTH.verify}?type=forgot-password`);
      enqueueSnackbar('Vui lòng kiểm tra email của bạn!', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar(error?.message || 'Lỗi hệ thống', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
