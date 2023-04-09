export interface AuthStore {
    token: string | null;
    setToken: (newToken: string) => void;
    resetToken: () => void;
    isAuthorization: () => boolean;
}
