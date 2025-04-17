import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist(); // 기본은 localStorage

export const editPostState = atom({
  key: 'editPostState',
  default: null,
  effects_UNSTABLE: [persistAtom], // 자동 저장
});
