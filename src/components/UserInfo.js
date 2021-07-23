
export default class UserInfo {
    constructor( { userNameSelector, userSublineSelector } ) {
        this._userName = document.querySelector(`.${userNameSelector}`);
        this._userSubline = document.querySelector(`.${userSublineSelector}`);
    }

    getUserInfo() {
        this.userInfo = {};
        this.userInfo.name = this._userName.textContent;
        this.userInfo.subline = this._userSubline.textContent;
        return this.userInfo;
    }

    setUserInfo(input) {
        this._userName.textContent = input.name;
        this._userSubline.textContent  = input.subline;
    }
}