import { atom } from 'recoil';
import { TypeUserInfo } from 'types';

export const isDarkAtom = atom({ key: 'isDark', default: false });

export const userTokenAtom = atom({
  key: 'userToken',
  default: localStorage.getItem('token'),
});

export const userInfoAtom = atom<TypeUserInfo>({
  key: 'userInfo',
  default: {
    username: '',
    displayname: '',
    email: '',
  },
});

export const addTeamModalOpenAtom = atom({
  key: 'addTeamModalOpen',
  default: false,
});
