import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null, // 로그인 전엔 null
});
