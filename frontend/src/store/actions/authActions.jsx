import Cookies from 'js-cookie';

export const setToken = (token) => {
    Cookies.set('token', token, { expires: 1 });
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
};

export const clearToken = () => {
    Cookies.remove('token');
    return {
        type: 'CLEAR_TOKEN',
    };
};