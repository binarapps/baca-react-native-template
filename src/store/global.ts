import { atom } from 'jotai'

// atoms
export const isForceUpdateNeededAtom = atom<boolean>(false)
export const isRefreshingTokenAtom = atom<boolean>(false)
export const logoutMessageShownAtom = atom<boolean>(false)
