import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
// utils
import { fData } from 'src/utils/formatNumber';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
import { useRecoilState } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
import { isString } from 'lodash';
import { patchUser } from 'src/fetching/user.api';
import { cloudinaryUpload } from 'src/fetching/upload.api';

// ----------------------------------------------------------------------

ProfileEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function ProfileEditForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [{ user }, setAuthState] = useRecoilState(authAtom);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    career: Yup.string().required('Career at is required'),
    company: Yup.string().required('Company is required'),
    password: Yup.string(),
    profilePhoto: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || -1,
      address: user?.address || '',
      profilePhoto: user?.profilePhoto?.url || '',
      career: user?.workAt?.career || '',
      company: user?.workAt?.company || '',
      password: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data) => {
    const { password, career, company, ...userData } = data;
    let patchedUser;
    try {
      if (isString(data?.profilePhoto)) {
        patchedUser = await patchUser({
          id: user?._id,
          data: {
            _id: user?._id,
            ...userData,
            workAt: {
              career,
              company,
            },
            ...(data?.profilePhoto && { profilePhoto: user?.profilePhoto }),
            ...(password && { password }),
          },
        });
      } else {
        const formData = new FormData();
        formData.append('file', data?.profilePhoto);
        const uploadData = await cloudinaryUpload(formData);
        patchedUser = await patchUser({
          id: user?._id,
          data: {
            _id: user?._id,
            ...userData,
            workAt: {
              career,
              company,
            },
            ...(password && { password }),
            profilePhoto: uploadData,
          },
        });
      }
      if (patchedUser?.code) return enqueueSnackbar(patchedUser?.message, { variant: 'warning' });
      setAuthState((prev) => ({ ...prev, user: patchedUser }));
      enqueueSnackbar('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'profilePhoto',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profilePhoto"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email Address" disabled />
              <RHFTextField name="phone" label="Phone Number" />

              <RHFTextField name="career" label="Career" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="company" label="Company" />
              <RHFTextField
                name="password"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
