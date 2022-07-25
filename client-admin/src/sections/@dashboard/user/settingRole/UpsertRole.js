import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useRecoilState } from 'recoil';
import Role from 'src/recoils/dashboard/role';
import { createRole, patchRole } from 'src/api/role.api';

// ----------------------------------------------------------------------

export default function UpsertUser() {
  const [roleState, setRoleState] = useRecoilState(Role);
  const { currentRole, isEdit } = roleState;
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Role is required'),
    priority: Yup.number()
      .typeError('Priority must be a number')
      .required('Priority is required')
      .min(0, 'Priority must be greater than 0')
  });

  const defaultValues = {
    name: currentRole?.name || '',
    priority: currentRole?.priority || 0
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  useEffect(() => {
    if (isEdit && currentRole) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRole]);

  const onSubmit = async (data) => {
    let roleList = roleState.roleList;
    try {
      if (isEdit) {
        const patchedRole = await patchRole({ id: currentRole._id, data });
        roleList = roleList.map((role) => (role._id === currentRole._id ? patchedRole : role));
      } else {
        const newRole = await createRole(data);
        roleList = [newRole, ...roleList];
      }
      setRoleState((prev) => ({ ...prev, roleList, isUpsertRoleOpen: false }));
      enqueueSnackbar(!isEdit ? 'Tạo mới role thành công!' : 'Cập nhật role thành công!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || 'Lỗi hệ thống', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ py: 3, px: 2 }}>
        <Stack sx={{ alignItems: 'center' }} spacing={2}>
          <RHFTextField name="name" label="Role" />
          <RHFTextField name="priority" label="Priority" />
          <LoadingButton type="submit" variant="contained" sx={{ maxWidth: '50%' }} loading={isSubmitting}>
            {!isEdit ? 'Tạo mới role' : 'Cập nhật role'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
