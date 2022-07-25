import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
// sections
import { ResetPasswordForm } from 'src/sections/auth/reset-password';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { back } = useRouter();

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h3" paragraph>
              Forgot your password?
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Please enter the email address associated with your account and We will email you a code to reset your
              password.
            </Typography>

            <ResetPasswordForm />

            <Button
              fullWidth
              onClick={() => {
                back();
              }}
              size="large"
              sx={{ mt: 1 }}
            >
              Back
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
