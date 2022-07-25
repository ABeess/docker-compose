import { atom } from 'recoil';
import persistAtom from 'src/utils/recoilPersist';

export const authAtom = atom({
  key: 'authentication',
  default: {
    isAuthenticated: false,
    accessToken: '',
    user: {},
  },
  effects_UNSTABLE: [persistAtom],
});
