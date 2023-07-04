import {
    EMAIL,
    PASSWORD,
    NAME,
    DEVICEOSVERSION,
    DEVICEOS,
    DEVICETOKEN,
    DEVICENAME,
    PROVIDERID,
    PROVIDER,
    PROFILEPIC,
    PROVIDERTOKEN
} from './ApiConstants';

export function getSignUpParameterMap(email, password, name) {
    let signupMap = {};
    signupMap[EMAIL] = email;
    signupMap[PASSWORD] = password;
    signupMap[NAME] = name;
    return signupMap;
}

export function getLoginParameterMap(email, password, device_os, device_os_version, device_token, device_name) {
    let loginMap = {};
    loginMap[EMAIL] = email;
    loginMap[PASSWORD] = password;
    loginMap[DEVICEOSVERSION] = device_os_version;
    loginMap[DEVICEOS] = device_os;
    loginMap[DEVICETOKEN] = device_token;
    loginMap[DEVICENAME] = device_name;
    return loginMap;
}

export function getSocialLoginParameterMap(email, name, providerId, provider, profilePic, providerToken, device_os, device_os_version, device_token, device_name) {
    let loginMap = {};
    loginMap[EMAIL] = email;
    loginMap[NAME] = name;
    loginMap[PROVIDERID] = providerId;
    loginMap[PROVIDER] = provider;
    loginMap[PROFILEPIC] = profilePic;
    loginMap[PROVIDERTOKEN] = providerToken;
    loginMap[DEVICEOSVERSION] = device_os_version;
    loginMap[DEVICEOS] = device_os;
    loginMap[DEVICETOKEN] = device_token;
    loginMap[DEVICENAME] = device_name;
    return loginMap;
}

export function getForgotPasswordParameterMap(email) {
    let forgotPasswordMap = {};
    forgotPasswordMap[EMAIL] = email;
    return forgotPasswordMap;
}

export function getChangePasswordParameterMap(email,oldPassword , newPassword) {
    let forgotPasswordMap = {};
    forgotPasswordMap[EMAIL] = email;
    forgotPasswordMap['old_password'] = oldPassword;
    forgotPasswordMap['new_password'] = newPassword;
    return forgotPasswordMap;
}

export function getHeaders() {
    let userToken = localStorage.getItem("PMAtoken");
    let userId = localStorage.getItem("PMAuserId");
    if (userId != null && userToken != null) {
        return { headers: { user_id: userId, token: userToken } }
    }
    return null
}