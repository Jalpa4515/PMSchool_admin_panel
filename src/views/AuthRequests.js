import {
    signupRequest,
    loginRequest,
    forgotPasswordRequest,
    changePasswordRequest
} from '../api/ApiRequest';
import {
    validateEmail,
    isEmptyField,
    validatePassword
} from '../utils/validator';
import { globalStrings } from '../utils/strings';

export function signup(email, password, name, confirmPassword) {
    return new Promise((resolve, reject) => {
        if (isEmptyField(name)) {
            reject(globalStrings.user_name_empty);
        } else if (!validateEmail(email)) {
            reject(globalStrings.invalid_email);
        } else if (password.length < 8) {
            reject(globalStrings.invalid_length_password);
        } else if (isEmptyField(password)) {
            reject(globalStrings.password_empty);
        } else if (!validatePassword(password)) {
            reject(globalStrings.invalid_password);
        } else if (isEmptyField(confirmPassword)) {
            reject(globalStrings.invalid_confirm_password);
        } else if (password.trim() !== confirmPassword.trim()) {
            reject(globalStrings.password_not_mached);
        } else {
            //call goes here
            signupRequest(email, password, name)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    reject(e);
                });
        }
    });
}

export function login(email, password, device_os, device_os_version, device_token, device_name) {
    return new Promise((resolve, reject) => {
        if (!validateEmail(email)) {
            reject(globalStrings.invalid_email);
        } else if (isEmptyField(password)) {
            reject(globalStrings.password_empty);
        } else {
            loginRequest(email, password, device_os, device_os_version, device_token, device_name)
                .then((response) => {
                    if (response.code == 200) {
                        resolve(response);
                    } else {
                        reject(response)
                    }
                })
                .catch((e) => {
                    reject(e);
                });
        }
    });
}

export function changePassword(email, oldpassword, newpassword ) {
    return new Promise((resolve, reject) => {
        if (!validateEmail(email)) {
            reject(globalStrings.invalid_email);
        } else if (isEmptyField(oldpassword)) {
            reject(globalStrings.password_empty);
        } else if (isEmptyField(newpassword)) {
            reject(globalStrings.password_empty);
        } else if (newpassword == oldpassword) {
            reject(globalStrings.password_cant_be_same);
        } else {
            changePasswordRequest(email, oldpassword, newpassword)
                .then((response) => {
                    if (response.code == 200) {
                        resolve(response);
                    } else {
                        reject(response)
                    }
                })
                .catch((e) => {
                    reject(e);
                });
        }
    });
}


export function forgotPassword(email) {
    return new Promise((resolve, reject) => {
        if (!validateEmail(email)) {
            reject(globalStrings.invalid_email);
        } else {
            forgotPasswordRequest(email)
                .then((response) => {
                    if (response.code == 200) {
                        resolve(response);
                    } else {
                        reject(response)
                    }
                })
                .catch((e) => {
                    reject(e);
                });
        }
    });
}

