export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    //принимает DOM-элемент и добавляет его в контейнер. (renderCard)
    addItem(cardElement) {
        this._container.prepend(cardElement);
    }

    //Отрисовка всех элементов, renderCards)
    renderItems(){
        this._container.innerHTML = '';
        this._items.forEach((item) => {
        this._renderer(item);
        });
      };


}
