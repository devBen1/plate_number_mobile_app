import { userInfoConstants } from './constants';


export const usersInfo = (info) => async (dispatch) => {

    dispatch({
        type: userInfoConstants.USERINFO_REQUEST,
        payload: {
            info,
        },
    });
};
