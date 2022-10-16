import axios, { AxiosError, AxiosResponse } from 'axios';

export const API_URL = 'https://cardio-api.run.goorm.io';

export function getUserInfo(username: string) {
  console.log(`USERINFO: /users/${username}`);
  axios
    .get(API_URL + `/users/${username}`)
    .then((response: AxiosResponse) => {
      console.log(response);
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
}
