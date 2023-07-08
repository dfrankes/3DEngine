import uuid from 'uuid';

/**
 * The engine UI Manager
 * attaches to a scene
 */
export default class UI {
    uuid = uuid.v4();
    elements = [];
    attachedScene = null;

    constructor(){
        const container = document.getElementById('container');

        // Create UI Container
        this.uiContainer = document.createElement('div');
        this.uiContainer.setAttribute('id', this.uuid);
        this.uiContainer.setAttribute('class', 'ui-container');

        this.uiContainer.uiManager = this;
        container.prepend(this.uiContainer);

        // Get caller
        if(typeof arguments[0] === 'object' && arguments[0].uuid){
            this.uiContainer.setAttribute('scene', arguments[0].uuid);
        }
    }

    /**
     * toggleVisible
     * Hides / shows the uiContainer
     */
    toggleVisible = () => {
        if(this.uiContainer.classList.contains('d-none')){
            this.uiContainer.classList.remove('d-none');
        }else{
            this.uiContainer.classList.add('d-none');
        }
    }

    /**
     * addElement
     * adds a new UIElement to the uiContainer
     * @param {UIElement} UIElement 
     * @param {*} options 
     */
    addElement = (UIElement, data = {}) => {
        this.elements.push(UIElement);

        // Render blaze template
        Blaze.renderWithData(UIElement, data, this.uiContainer);
        // this.uiContainer.appendChild(UIElement.element);
    }

    /**
     * 
     * @param {UIElement} element container of the element
     * @returns Object with top and left displaying the center of the screen for the specific element
     */
    _getWindowCenter = (element) => Object({
        top: `${(window.innerHeight / 2) - element.clientHeight / 2}px`,
        left: `${(window.innerWidth / 2) - element.clientWidth / 2}px`
    });
}