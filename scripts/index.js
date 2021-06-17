// Делаем выборку DOM элементов
const popupOpenButtonElement = document.querySelector('.profile__button_edit')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')

/**
 * Функция, которая «переключает» состояние всплывающего окошка
 */
  
  const openPopup = function() {
    popupElement.classList.add('popup_is-opened')
  }
  
  const closePopup = function() {
    popupElement.classList.remove('popup_is-opened')
  }

const closePopupByClickOnOverlay = function(event) {
    if (event.target !== event.currentTarget) {
      return
    }
  
    closePopup()
  }

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup)
popupCloseButtonElement.addEventListener('click', closePopup)
popupElement.addEventListener('click', closePopupByClickOnOverlay)

const formElement = document.querySelector('.popup__content')

let profileName = document.querySelector('.profile__name')  
let profileDescription = document.querySelector('.profile__description')

let nameInput = document.querySelector('.popup__input_name')
let descriptionInput = document.querySelector('.popup__input_description')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function popupSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.getAttribute('value')
    let descriptionValue = descriptionInput.getAttribute('value')
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue
    descriptionInput = descriptionValue
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', popupSubmitHandler); 