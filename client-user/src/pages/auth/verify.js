// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
// sections
import { VerifyCodeForm } from 'src/sections/auth/verify-code';
import { useRouter } from 'next/router';
import { sendVerifyCode } from 'src/fetching/mailer.api';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

VerifyCode.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const { back } = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')) || {});
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const handleResend = async () => {
    try {
      const res = await sendVerifyCode({ email: user?.email });
      if (res?.code) return enqueueSnackbar('Xảy ra lỗi hệ thống', { variant: 'error' });
      enqueueSnackbar('Mã xác nhận đã được gửi đến email của bạn!', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar(error?.message || 'Lỗi hệ thống', { variant: 'error' });
    }
  };
  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Button
              size="small"
              onClick={() => {
                back();
              }}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
              sx={{ mb: 3 }}
            >
              Back
            </Button>

            <Typography variant="h3" paragraph>
              Please check your email!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We have emailed a 6-digit confirmation code to
              <strong>{` ${user?.email} `}</strong>, please enter the code in below box to verify your email.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyCodeForm user={user} />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={handleResend}>
                Resend code
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
