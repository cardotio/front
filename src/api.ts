import { TypeUserInfo, TypeDeck, TypeCard } from './types';
import axios from 'axios';

// export const API_URL = 'https://cardio-api.run.goorm.io';
export const API_URL = 'https://cardio-server.run.goorm.io';

export const EMAIL_SERVICE_ID = 'service_782ia3c';

export const EMAIL_TEMPLATE_ID = 'template_oj4qt7n';

export const EMAIL_PUBLIC_KEY = '5nOwP8fssM-zAktTu';

export const getUserInfo = async (token: string | null) => {
  if (!token) return;

  return axios.get<TypeUserInfo>(API_URL + '/users/me', {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const getDecks = async (token: string | null, teamId: string) => {
  if (!token || teamId === 'me') return;

  return axios.get<TypeDeck[]>(API_URL + `/teams/${teamId}/decks`, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const getCards = async (token: string | null, teamId: string) => {
  if (!token || teamId === 'me') return;

  return axios.get<TypeCard[]>(API_URL + `/teams/${teamId}/cards`, {
    headers: {
      Authorization: `${token}`,
    },
  });
};
