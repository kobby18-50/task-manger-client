import { create } from "zustand"

interface AuthStore {
    token : string | null,
    setToken : (token : string) => void,
    clearToken : () => void
}

const useTokenStore = create<AuthStore>((set) => ({
    token : null,
    setToken : (newToken : string) => set({token : newToken}),
    clearToken : () => set({token : null})
}))

export default useTokenStore