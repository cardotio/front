import { atom } from 'recoil';
import { TypeCards, TypeUserInfo } from 'types';

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

export const myTeamsAtom = atom<string[]>({ key: "myTeams", default: [] });

export const currentCardsAtom = atom<TypeCards[] | null>({key: 'currentCards', default: []});
export const currentUsersAtom = atom<TypeUserInfo[] | null>({key: 'currentUsers', default: []});