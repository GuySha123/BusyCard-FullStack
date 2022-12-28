import { useLocalStorage } from './useLocalStorage';
import { useSessionStorage } from './useSessionStorage';

export function useUserStorage() {
    const { storedValue: localStorageToken, setValue: setLocalStorageToken } =
        useLocalStorage('token', null);
    const {
        storedValue: sessionStorageToken,
        setValue: setSessionStorageToken,
    } = useSessionStorage('token', null);
    const token = localStorageToken || sessionStorageToken;
    const setToken = (value) => {
        setLocalStorageToken(value);
        setSessionStorageToken(value);
    };

    return { token, setToken, setLocalStorageToken, setSessionStorageToken };
}
