import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const authTokenState = atom({
  key: 'authToken',
  default: false,
  effects: [persistAtom],
})
