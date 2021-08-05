    const openPopup = function(modal) {
        modal.classList.add('popup_is-opened');
        modal.addEventListener('click', closePopupByClickOnOverlay);
        document.addEventListener('keydown', closePopupByClickOnEsc);    
    }

    const closePopup = function(modal) {
        modal.classList.remove('popup_is-opened');
        modal.removeEventListener('click', closePopupByClickOnOverlay);
        document.removeEventListener('keydown',closePopupByClickOnEsc);
      }
      
    const closePopupByClickOnOverlay = function(event) {
        if (event.target !== event.currentTarget) {
          return
        }
        const popupActive = document.querySelector('.popup_is-opened');
        closePopup(popupActive);
      }
      
     const closePopupByClickOnEsc = function(event) {
        if (event.code === 'Escape') {
          const popupActive = document.querySelector('.popup_is-opened');
          closePopup(popupActive);
        }
      }