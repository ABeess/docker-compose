import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFromLocation, reAuthenticate, refreshToken } from 'src/fetching/auth.api';
import decode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  const setAuthState = useSetRecoilState(authAtom);
  useEffect(() => {
    (async () => {
      if (typeof window !== undefined && window.location.hash.includes('access_token')) {
        const token = await getFromLocation(window.location);
        if (token) {
          localStorage.setItem('recoil-persist', JSON.stringify({ authentication: { accessToken: token } }));
          const { role, sub } = decode(token);
          const [userData] = await Promise.all([
            reAuthenticate(),
            refreshToken({ payload: { role, _id: sub }, login: true }),
          ]);
          setAuthState((prev) => ({ ...prev, user: userData?.user, isAuthenticated: true }));
        }
      }
      if (router.pathname == '/') {
        router.push('/dashboard/courses/list');
      }
    })();
  }, []);

  return null;
}
