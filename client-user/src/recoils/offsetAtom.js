const { atom } = require('recoil');

const offsetAtom = atom({
  key: 'offset',
  default: null,
});

export default offsetAtom;
