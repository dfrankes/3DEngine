import UI from 'Engine/Managers/UIManager';
import {Scene as TreeScene} from 'three';
export default class Scene extends TreeScene {
    UIElements = [];

    constructor() {
        super();
        this.uiManager = new UI(this);
    }

    /**
     * 
     */
    _onVisibilityChange = () => {
        // Hide any UIManger that is attached to this scene
        const elements = document.querySelectorAll(`[scene="${this.uuid}"]`);
    }
}