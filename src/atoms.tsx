import { atom } from 'recoil';

export const isDarkAtom = atom({ key: 'isDark', default: false });
export const userTokenAtom = atom({
  key: 'userToken',
  default: localStorage.getItem('token'),
});
