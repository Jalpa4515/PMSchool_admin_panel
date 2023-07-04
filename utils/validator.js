let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const isEmptyField = (value) => !value || value.trim().length < 1;

export const validateEmail = (email) => {
    if (isEmptyField(email)) return false;
    return reg.test(email.trim());
};

export const validatePassword = (password) => {
    if (password.length < 8) return false;
    return passwordReg.test(password.trim());
};