
class Card {
    constructor(data, profileUserID, cardSelector, { handleCardClick, handleDeleteClick, handleLikeClick }) {
        this._cardSelector = cardSelector;
        this._title = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this._likesCount = this._likes.length;
        this._ownerID = data.owner._id;
        this._profileUserID = profileUserID;
        this._id = data._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector(".element__text").textContent = this._title;
        this._cardElement.querySelector(".element__image").src = this._link;
        this._cardElement.querySelector(".element__image").alt = this._title;

        if (this._ownerID === this._profileUserID) {
            this._cardElement.querySelector(".element__trash").setAttribute('style', 'visibility: visible');
        }

        this._likes.forEach(element => {
            if (element._id === this._profileUserID)
                this._cardElement.querySelector(".element__like").classList.add("element__like_active");
        });

        if (this._likesCount !== 0) this._cardElement.querySelector(".element__like-count").textContent = this._likesCount;

        this._setEventListeners();
        return this._cardElement;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    handleDelete(event) {
        const itemElement = event.target.closest(".element");
        itemElement.remove();
    }

_handleLike = (event) => {
    this._likeButton = event.target.closest(".element__like");
    this._isLiked = this._likeButton.classList.contains("element__like_active");
    this._handleLikeClick(this._isLiked)
    .then(() => {
        if (this._isLiked ) {
            this._likeButton.classList.remove("element__like_active");
            this._likesCount -= 1;
            this._cardElement.querySelector(".element__like-count").textContent = (this._likesCount !== 0) ? this._likesCount: "";
        }
        else {
            this._likeButton.classList.add("element__like_active");
            this._likesCount += 1;
            this._cardElement.querySelector(".element__like-count").textContent = this._likesCount;
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

    _setEventListeners() {
        this._cardElement.querySelector(".element__image").addEventListener("click", () => this._handleCardClick());
        this._cardElement.querySelector(".element__trash").addEventListener("click", (event) => this._handleDeleteClick(event));
        this._cardElement.querySelector(".element__like").addEventListener("click", this._handleLike);

    }
}

export { Card };