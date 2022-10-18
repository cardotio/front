export type TypeLoginForm = {
  username: string;
  password: string;
};

export type TypeUserInfo = {
  username: string;
  displayname: string;
  email: string;
  invitations: string[];
  teams: TypeTeam[]
};

export type TypeSignupForm = {
  username: string;
  displayname: string;
  email: string;
  password: string;
};

export type TypeTeam = {
  teamname: string;
  users: TypeMember[];
}

export type TypeMember = {
  displayname: string;
  email: string;
  role: string;
  username: string;
}

export type TypeCard = {
  cardname: string;
  content: string;
  type: 'private' | 'public';
  user: {
      username?: string;
      displayname?: string;
      email?: string;
  },
  team: {
      teamname: string;
  }
};
