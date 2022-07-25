const { atom } = require('recoil');

const Role = atom({
  key: 'role',
  default: {
    isEdit: false,
    currentRole: {},
    total: -1,
    roleList: [],
    isUpsertRoleOpen: false
  }
});

export default Role;
