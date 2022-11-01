import { atom } from 'recoil';
import {
  TypeCard,
  TypeDeck,
  TypeMember,
  TypeMessageInfo,
  TypeTeam,
  TypeUserInfo,
} from 'types';

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
export const addMemberModalOpenAtom = atom({
  key: 'addMemberModalOpen',
  default: false,
});
export const addDeckModalOpenAtom = atom({
  key: 'addDeckModalOpen',
  default: false,
});
export const addCardDeckAtom = atom<TypeDeck | null>({
  key: 'addCardDeck',
  default: null,
});
export const addCardModalOpenAtom = atom({
  key: 'addCardModalOpen',
  default: false,
});
export const settingModalOpenAtom = atom({
  key: 'settingModalOpen',
  default: false,
});
export const showDropDownAtom = atom({
  key: 'showDropDown',
  default: false,
});

export const myTeamsAtom = atom<TypeTeam[]>({ key: 'myTeams', default: [] });

export const deckListAtom = atom<TypeDeck[] | null>({
  key: 'deckList',
  default: null,
});
export const currentCardsAtom = atom<TypeCard[]>({
  key: 'currentCards',
  default: [],
});
export const currentUsersAtom = atom<TypeMember[]>({
  key: 'currentUsers',
  default: [],
});
export const teamInfoFetchingAtom = atom({
  key: 'teamInfoFetching',
  default: true,
});

export const messagesAtom = atom<TypeMessageInfo[]>({
  key: 'messages',
  default: [],
});

export const selectedTeamAtom = atom<TypeTeam | null>({
  key: 'selectedTeam',
  default: null,
});

export const selectedUserAtom = atom<TypeUserInfo | null>({
  key: 'selectedUser',
  default: null,
});
