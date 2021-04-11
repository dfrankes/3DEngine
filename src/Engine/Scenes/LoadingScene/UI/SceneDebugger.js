import UIElement from "Engine/Components/UIElement";
const source = require('./SceneDebugger.html');

export default class SceneDebugger extends UIElement {
    constructor() {
        super(source);
    }

    helpers = {
        MyHelper: () => {
            return "Hello World";
        }
    }

    events = {
        'click .test': (event) => {
            
        }
    }
}