import {
    BASE_URL_API,
    LOGIN,
    LOGOUT,
    SIGNUP,
    GETUSERDETAILS,
    FORGOTPASSWORD,
    CHANGEPASSWORD,
    ADDCHALLENGE,
    GETCHALLENGE,
    GETALLCHALLENGES,
    GETCHALLENGEENTRIES,
    UPDATERANK,
    GETLEADERBOARD,
    SUBMITTOLIVE,
    DELETECHALLENGE,
    UPDATECHALLENGE,
    GETCONFIGDATE,
    ADDCONFIGDATE,
    EXPORTUSER,
    UPDATELEADERBOARD,
    AUTORANK,
    EXPORTLEADERBOARD
} from './ApiConstants';
import {
    getSignUpParameterMap,
    getForgotPasswordParameterMap,
    getLoginParameterMap,
    getSocialLoginParameterMap,
    getChangePasswordParameterMap,
    getHeaders
} from './ApiParameter';

import axios from 'axios';
const FileDownload = require('js-file-download');

const API_TIMEOUT = 10000;
const TIMEOUT = 9000;

const instance = axios.create({
    baseURL: BASE_URL_API,
    timeout: API_TIMEOUT,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
});


const rawinstance = axios.create({
    baseURL: BASE_URL_API,
    timeout: API_TIMEOUT,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
        "Content-Type": "application/json",
    },
});

const getFormUrlEncodedBody = (body) => {
    var formBody = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
};

const parse = (res, resolve, reject) => {
    if (res && res.data) {
        const response = res.data;
        if (response.code === 200 || response.code === 202) {
            resolve(response);
        } else {
            if (response.msg_type && response.msg_type != '') {
                if (response.msg_type == 'LOCATION_NOT_ALLOWED')
                    reject('Due to licensing constraints, we are currently unable to allow streaming outside of the United States. We are working to remedy this and appreciate your patience!');
                else reject(response.msg_type);
            } else if (response.msg && response.msg != '') {
                reject(response.msg)
            } else {
                reject('Server Error')
            }
        }
    } else {
        reject("No response");
    }
};

const postCall = (url, body, config) => {



    return Promise.race([
        new Promise((resolve, reject) => {
            instance
                .post(url, body, config)
                .then((response) => {
                    parse(response, resolve, reject);
                })
                .catch((error) => {

                });
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject("Timeout exceeded"), TIMEOUT)
        ),
    ]);
};


const postRawCall = (url, body, config) => {
    return Promise.race([
        new Promise((resolve, reject) => {
            rawinstance
                .post(url, body, config)
                .then((response) => {
                    parse(response, resolve, reject);
                })
                .catch((error) => {

                });
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject("Timeout exceeded"), TIMEOUT)
        ),
    ]);
};

const postCallDownload = (url, body, config) => {
    return Promise.race([
        new Promise((resolve, reject) => {
            instance
                .post(url, body, config)
                .then((response) => {
                    // 
                    if (response.data.code) {
                        parse(response, resolve, reject);
                    } else {
                        FileDownload(response.data, 'report.csv');
                    }
                })
                .catch((error) => {

                });
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject("Timeout exceeded"), TIMEOUT)
        ),
    ]);
};

const putCall = (url, body, config) => {
    return Promise.race([
        new Promise((resolve, reject) => {
            instance
                .put(url, body, config)
                .then((response) => {
                    parse(response, resolve, reject);
                })
                .catch((error) => {

                });
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject("Timeout exceeded"), TIMEOUT)
        ),
    ]);
};

const deleteCall = (url, config) => {
    return Promise.race([
        new Promise((resolve, reject) => {
            instance
                .delete(url, config)
                .then((response) => {
                    parse(response, resolve, reject);
                })
                .catch((error) => {

                });
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject("Timeout exceeded"), TIMEOUT)
        ),
    ]);
};

const getCall = (url, body) => {
    return Promise.race([
        new Promise((resolve, reject) => {
            instance
                .get(url, body)
                .then((response) => {
                    parse(response, resolve, reject);
                })
                .catch((error) => {

                });
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject("Timeout exceeded"), TIMEOUT)
        ),
    ]);
};

export function signupRequest(email, password, name) {


    return postCall(
        SIGNUP,
        getFormUrlEncodedBody(getSignUpParameterMap(email, password, name))
    );
}

export function loginRequest(email, password, device_os, device_os_version, device_token, device_name) {

    return postCall(
        LOGIN,
        getFormUrlEncodedBody(getLoginParameterMap(email, password, device_os, device_os_version, device_token, device_name))
    );
}
export function logoutRequest(device_token) {

    return postCall(
        LOGOUT,
        getFormUrlEncodedBody({ device_token }),
        {
            ...getHeaders()
        }
    );
}

export function forgotPasswordRequest(email) {

    return postCall(
        FORGOTPASSWORD,
        getFormUrlEncodedBody(getForgotPasswordParameterMap(email))
    );
}

export function changePasswordRequest(email, oldpassword, newpassword) {

    return postCall(
        CHANGEPASSWORD,
        getFormUrlEncodedBody(getChangePasswordParameterMap(email, oldpassword, newpassword)),
        {
            ...getHeaders()
        }
    );
}


export function addChallengeRequest(data) {

    return postRawCall(
        ADDCHALLENGE,
        data,
        {
            ...getHeaders()
        }
    );
}

export function updateChallengeRequest(data) {
    return postRawCall(
        UPDATECHALLENGE,
        data,
        {
            ...getHeaders(),
        }
    );
}


export function getChallengeRequest(id) {

    return getCall(
        GETCHALLENGE,
        {
            ...getHeaders(),
            params: {
                challenge_id: id
            }
        }
    );
}

export function deleteChallengeRequest(id) {

    return deleteCall(
        DELETECHALLENGE,
        {
            ...getHeaders(),
            params: {
                challenge_id: id
            }
        }
    );
}



export function getAllChallengesRequest(data) {
    return getCall(
        GETALLCHALLENGES,
        {
            ...getHeaders(),
            params: data
        }
    );
}


export function getChallengeEntriesRequest(data) {
    return getCall(
        GETCHALLENGEENTRIES,
        {
            ...getHeaders(),
            params: data
        }
    );
}

export function getLeaderboardRequest(data) {
    return getCall(
        GETLEADERBOARD,
        {
            ...getHeaders(),
            params: data
        }
    );
}

export function updateRankRequest(data) {
    return postRawCall(
        UPDATERANK,
        data,
        {
            ...getHeaders(),
        }
    );
}

export function updateLeaderBoard(data) {
    return postRawCall(
        UPDATELEADERBOARD,
        data,
        {
            ...getHeaders(),
        }
    );
}


export function submitToLiveRequest(data) {

    return postRawCall(
        SUBMITTOLIVE,
        data,
        {
            ...getHeaders(),
        }
    );
}

export function addConfigDate(data) {

    return postRawCall(
        ADDCONFIGDATE,
        data,
        {
            ...getHeaders()
        }
    );
}

export function getConfigDate(id) {

    return getCall(
        GETCONFIGDATE,
        {
            ...getHeaders(),
        }
    );
}

export function exportUser(data) {

    return postRawCall(
        EXPORTUSER,
        data,
        {
            ...getHeaders()
        }
    );
}

export function autoRankRequest(data) {

    return postRawCall(
        AUTORANK,
        data,
        {
            ...getHeaders(),
        }
    );
}

export function exportLeaderboard(data) {
    return postRawCall(
        EXPORTLEADERBOARD,
        data,
        {
            ...getHeaders(),
        }
    );
}