export default class UserInfo {
  constructor({ userNameSelector, userSublineSelector, UserAvatarSelector }) {
    this._userName = document.querySelector(`.${userNameSelector}`);
    this._userSubline = document.querySelector(`.${userSublineSelector}`);
    this._userAvatar = document.querySelector(`.${UserAvatarSelector}`);
  }

  getUserInfo() {
    this.userInfo = {};
    this.userInfo.name = this._userName.textContent;
    this.userInfo.about = this._userSubline.textContent;
    return this.userInfo;
  }

  setUserInfo(input) {
    this._userName.textContent = input.name;
    this._userSubline.textContent = input.about;
  }
  
  setUserAvatar(input) {
    this._userAvatar.src = input.avatar;
  }
}
