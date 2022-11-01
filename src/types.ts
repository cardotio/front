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
  content: string;
  type: 'private' | 'public';
  user: {
    username?: string;
    displayname?: string;
    email?: string;
  };
  team: {
    teamname: string;
  };
};

export type TypeDeck = {
  deckname: string;
  deckid: string;
};

export type TypeMessageInfo = {
  teamId: number;
  messageId: number;
  content: string;
  sender: string;
  senderDisplayname: string;
  receiver: string;
  createdDate: string;
  type: boolean;
  unread: number;
  isTimestamp?: boolean;
};
