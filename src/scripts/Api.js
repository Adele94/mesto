export default class Api {

    constructor(options) 
    {
      this.url = options.baseUrl;
      this.headers = options.headers;
    }

//получение массива карточек 
    getInitialCards() {
      return fetch(this.url + '/cards', { 
          headers: this.headers
        })
         .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      }

    //получаем данные пользователя
    getUserProfile() {
      return fetch(this.url + '/users/me', {
        headers: this.headers,
        method: 'GET'
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }


//добавить карточку
    addNewCard(data) {
      return fetch(this.url + '/cards', { 
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    //удаляем карточку
    deleteCard(cardID) {
      return fetch(this.url + '/cards/' + cardID, {
        headers: this.headers,
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

      //обновляем данные пользователя
      updateUserProfile(userName, userAbout) {
        return fetch(this.url + '/users/me', {     
          headers: this.headers,
          method: 'PATCH',
          body: JSON.stringify({
            name: userName,
            about: userAbout
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        }

      //обновляем аватар пользователя
      updateAvatarProfile(avatarUrl) {
        return fetch(this.url + '/users/me/avatar', {     
          headers: this.headers,
          method: 'PATCH',
          body: JSON.stringify({
            avatar: avatarUrl
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json()
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        }


      //добавление лайка на крточку
      addLikes(cardID) {
        return fetch(this.url + '/cards/likes/' + cardID, {
          headers: this.headers,
          method: 'PUT'
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        }

      //снятие лайка с карточки
      removeLikes(cardID) {
        return fetch(this.url + '/cards/likes/' + cardID, {
          headers: this.headers,
          method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        }
    // другие методы работы с API
  }
