import { userInfoConstants } from '../actions/constants';

const initState = {
    info: {},
};

export default (state = initState, action) => {
    switch (action.type) {
        case userInfoConstants.USERINFO_REQUEST:
            state = {
                info: action.payload.info,


            };
            break;
    }

    return state;
};
