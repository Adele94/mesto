export default class UserInfo {
    constructor(user) {
      this._userName = user.name;
      this._description = user.description;
    }

    getUserInfo() {
        const  user = {
            name: this._userName,
            description: this._description 
        }
        return user; 
    }
    
    setUserInfo(name, decription) {
        const profile = document.querySelector(".profile");
        profile.querySelector(".profile__name").textContent = name;
        profile.querySelector(".profile__description").textContent = decription;
    }
}