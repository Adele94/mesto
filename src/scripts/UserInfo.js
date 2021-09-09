export default class UserInfo {
    constructor(user) {
      this._userName = user.name;
      this._description = user.description;
      this._profileUserID = user.id;
    }

    getUserInfo() {
        const  user = {
            name: this._userName,
            description: this._description,
            id: this._profileUserID
        }
        return user; 
    }
    
    setUserInfo(name, decription, avatarSrc) {
        const profile = document.querySelector(".profile");
        profile.querySelector(".profile__name").textContent = name;
        profile.querySelector(".profile__description").textContent = decription;
        profile.querySelector(".profile__avatar").src = avatarSrc;
    }
}