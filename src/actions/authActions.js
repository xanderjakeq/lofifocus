import  { User } from '../models';

export const SIGNIN= "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const STOREUSERSESSION = "STOREUSERSESSION";

export const GETTING_CUSTOM_USER = "GETTING_CUSTOM_USER";
export const CUSTOM_USER_FOUND = "CUSTOM_USER_FOUND";

export const GETTING_USER_DATA = "GETTING_USER_DATA";
export const USER_DATA_RECEIVED = "USER_DATA_RECEIVED";

export const UPDATING_USER = "UPDATING_USER";
export const USER_UPDATED = "USER_UPDATED";

export const SET_ACTIVE_PROFILE = "SET_ACTIVE_PROFILE";

export const UPLOADING_AVATAR = "UPLOADING_AVATAR";

//export auth methods below
export function handleSignIn(e, userSession) {
    e.preventDefault();
    userSession.redirectToSignIn();
    return {
        type: SIGNIN
    }
}

export function handleSignOut(e, userSession) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    userSession.signUserOut(window.location.origin);
    return {
        type: SIGNOUT
    }
}

export function storeUserSession(userSession) {
    return {
        type: STOREUSERSESSION,
        payload: userSession
    }
}

export const getCustomUser = ({profile, username}) => async (dispatch) => {
    dispatch({
        type: GETTING_CUSTOM_USER
    });

    const exists = await User.fetchList({
        username,
        sort: 'createdAt'
    });

    let user;


    if (exists.length > 0) {
        user = exists[0];
    } else {
        const newuser = new User({
            name: profile.name,
            username,
            description: profile.description,
            other : {
                avatarUrl: profile.image ? profile.image[0].contentUrl : null,
                lastSeenNotif: Date.now()
            }
        });

        const res = await newuser.save();
        user = res;
    }

    dispatch({
        type: CUSTOM_USER_FOUND,
        payload: user
    });
}

export const getUserData = (username) => async (dispatch) => {
    dispatch({
        type: GETTING_USER_DATA
    });

    const user = await User.fetchList({
        username,
        sort: 'createdAt'
    });

    dispatch({
        type: USER_DATA_RECEIVED,
        payload: user[0]
    });
}


export const updateUser = (user, updates) => async (dispatch) => {
    dispatch({
        type: UPDATING_USER
    });

    user.update(updates);

    await user.save();

    const updatedUser = new User(user.attrs);

    dispatch({
        type: USER_UPDATED,
        payload: updatedUser
    })
}