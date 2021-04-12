import UIElement from "Engine/Components/UIElement";
const source = require('./SceneDebugger.html');

export default class SceneDebugger extends UIElement {
    constructor(data) {
        super(source, data);
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