import { useCallback, useRef } from 'react';
// @mui
import { Box, Card, Button, TextField, IconButton, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
// react-hook-form
import { FormProvider, RHFTextField, RHFUploadSingleFile } from 'src/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { LoadingButton } from '@mui/lab';
import { cloudinaryUpload } from 'src/fetching/upload.api';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const NewPostSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    image: Yup.mixed().test('required', 'Image is required', (value) => value !== ''),
  });

  const defaultValues = {
    content: '',
    image: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPostSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    // const formData = new FormData();
    // formData.append('file', data.image);
    const res = await cloudinaryUpload(data);
    console.log(res);
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <RHFTextField
            name="content"
            multiline
            fullWidth
            rows={6}
            placeholder="Share what you are thinking here..."
            InputProps={{ spellCheck: false }}
            sx={{
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <RHFUploadSingleFile name="image" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
        </Stack>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
              <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
            </IconButton>
            <IconButton size="small" onClick={handleAttach}>
              <Iconify icon={'eva:attach-2-fill'} width={24} height={24} />
            </IconButton>
          </Box>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
            Post
          </LoadingButton>
        </Box>

        {/* <input ref={fileInputRef} type="file" style={{ display: 'none' }} /> */}
      </Card>
    </FormProvider>
  );
}
