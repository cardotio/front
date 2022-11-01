export type TypeLoginForm = {
  username: string;
  password: string;
};

export type TypeUserInfo = {
  username: string;
  displayname: string;
  email: string;
  role?: string;
  description?: string;
  invitations?: string[];
  teams?: TypeTeam[];
};

export type TypeSignupForm = {
  username: string;
  displayname: string;
  email: string;
  password: string;
  role: string;
};

export type TypeTeam = {
  teamId: number;
  teamname: string;
  teamCode: string;
  users: TypeMember[];
};

export type TypeMember = {
  displayname: string;
  description?: string;
  email: string;
  role: string;
  username: string;
};

export type TypeCard = {
  cardname: string;
  cardId: number;
  content: string;
  creator: TypeMember;
  deck: TypeDeck | null;
  team: {
    teamCode: string;
    teamId: string;
    teamname: string;
  };
  type: 'private' | 'public';
};

export type TypeDeck = {
  deckname: string;
  deckId: string;
};

export type TypeMessageInfo = {
  content: string;
  sender: string;
  senderDisplayname: string;
  receiver: string;
  createdDate: string;
  type: boolean;
};
