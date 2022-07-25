import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
// sections
import { NewPasswordForm } from 'src/sections/auth/new-password';
import { useRouter } from 'next/router';
import { checkCode } from 'src/fetching/mailer.api';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

NewPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function NewPassword() {
  const [valid, setValid] = useState(true);
  const { query } = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      setUser(JSON.parse(sessionStorage.getItem('user')) || {});
      if (!query?.email || !query?.code) {
        setValid(false);
      } else {
        const res = await checkCode({
          where: {
            email: query?.email,
            verifyCode: query?.code,
            $limit: 1,
          },
        });
        if (res.data?.[0] === undefined) {
          setValid(false);
        }
      }
    })();
  }, []);

  return (
    <Page title="New Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {valid ? (
              <>
                <Typography variant="h3" paragraph>
                  Create your new password
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>Please enter your new password</Typography>

                <NewPasswordForm verifyCode={query?.code} user={user} />

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Back
                  </Button>
                </NextLink>
              </>
            ) : (
              <Box>
                <Card sx={{ py: 2, borderRadius: 1 }}>
                  <Typography variant="h4" paragraph sx={{ ml: 2 }}>
                    Liên kết không hợp lệ
                  </Typography>
                  <Divider />
                  <Typography variant="body1" paragraph sx={{ mt: 2, ml: 2 }}>
                    Liên kết mà bạn sử dụng không hợp lệ. Vui lòng thử lại.
                  </Typography>
                  <Divider />
                  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2, mr: 4 }}>
                    <NextLink href={PATH_AUTH.login} passHref>
                      <Button variant="contained" color="inherit">
                        Quay lại
                      </Button>
                    </NextLink>
                  </Stack>
                </Card>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
