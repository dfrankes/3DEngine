import uuid from "uuid";
const Handlebars = require("handlebars");

export default class UIElement {
    
    uiManager = null;
    uuid = uuid.v4();

    // Template vars
    helpers = {};
    events = {};
    element = null;

    // Template data
    _data = {};
    data = null;

    // cache
    elementCache = null;

    /**
     * UIElement constructor
     * @param {String} HTML source
     */
    constructor(source, data = {}){
        this.source = source;
        
        this.element = document.createElement('div');
        this.element.setAttribute('id', this.uuid)
        this.element.setAttribute('class', 'basic-panel');

        this.data = data;
        this._renderTemplate(source);
    }

    // /**
    //  * Updates the template with new data
    //  * @param {Object} data new data
    //  */
    update = (data = {}) => {
        const template = Handlebars.compile(this.source);
        const _htmlRender = template(data);
        this.element.innerHTML = _htmlRender;
    }

    /**
     * 
     * @param {String} source HTML source
     * @param {Object} data Template data
     */
    _renderTemplate = (source) => {
        const template = Handlebars.compile(source);
        const _htmlRender = template(this.data);

        // set cache
        const cache = btoa(_htmlRender);
        if(this.elementCache !== cache){
            this.elementCache = cache;
            this.element.innerHTML = _htmlRender;
        }
    }
}