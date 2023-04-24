import { persistor } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (usertoken, refreshToken) => {
    AsyncStorage.setItem('usertoken', JSON.stringify(usertoken));
    AsyncStorage.setItem('refreshToken', JSON.stringify(refreshToken));
};

export const logout = () => {
    AsyncStorage.clear();
    persistor.purge();
};
