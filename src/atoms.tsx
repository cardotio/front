import { API_URL } from 'api';
import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { TypeCard, TypeLoginForm, TypeTeam, TypeUserInfo } from 'types';

export const isDarkAtom = atom({ key: 'isDark', default: false });

export const userTokenAtom = atom({
  key: 'userToken',
  default: localStorage.getItem('token'),
});

export const userInfoAtom = atom<TypeUserInfo | null>({
  key: 'userInfo',
  default: null,
});

export const addTeamModalOpenAtom = atom({
  key: 'addTeamModalOpen',
  default: false,
});
export const addCardModalOpenAtom = atom({
  key: 'addCardModalOpen',
  default: false,
});

export const myTeamsAtom = atom<TypeTeam[]>({ key: 'myTeams', default: [] });

export const currentCardsAtom = atom<TypeCard[]>({
  key: 'currentCards',
  default: [],
});
export const currentUsersAtom = atom<TypeUserInfo[] | null>({
  key: 'currentUsers',
  default: [],
});

export const teamInfoFetchingAtom = atom({
  key: 'teamInfoFetching',
  default: false,
});
