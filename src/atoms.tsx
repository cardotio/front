import { atom, selector } from 'recoil';
import {
  TypeBlock,
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

export const deleteDeckModalOpenAtom = atom({
  key: 'deleteDeckModalOpen',
  default: false,
});

export const addCardDeckAtom = atom<TypeDeck | null>({
  key: 'addCardDeck',
  default: null,
});
export const detailCardModalOpenAtom = atom({
  key: 'detailCardModalOpen',
  default: false,
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

export const deckListAtom = atom<TypeDeck[]>({
  key: 'deckList',
  default: [],
});
export const currentUsersAtom = atom<TypeMember[]>({
  key: 'currentUsers',
  default: [],
});

export const teamMessagesAtom = atom<TypeMessageInfo[]>({
  key: 'messages',
  default: [],
});

export const selectedTeamAtom = atom<TypeTeam | null>({
  key: 'selectedTeam',
  default: null,
});

export const selectedUserAtom = atom<TypeMember | null>({
  key: 'selectedUser',
  default: null,
});

export const selectedCardAtom = atom<TypeCard | null>({
  key: 'maximazeCard',
  default: null,
});

// Maximized Card Detail
export const contentsAtom = atom<TypeBlock[]>({
  key: 'contents',
  default: [
    {
      type: 'none',
      color: '#000000',
      text: '',
    },
  ],
});
export const currentLineAtom = atom({
  key: 'currentLine',
  default: 0,
});

export const selectedDeckAtom = atom<TypeDeck | null>({
  key: 'selectedDeck',
  default: null,
});
