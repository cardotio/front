export type TypeLoginForm = {
  username: string;
  password: string;
};

export type TypeUserInfo = {
  username: string;
  displayname: string;
  email: string;
};

export type TypeSignupForm = {
  username: string;
  displayname: string;
  email: string;
  password: string;
};

export type TypeCards = {
  cardId: number;
  content: string;
  cardType: number;
};
