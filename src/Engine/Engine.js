import uuid from 'uuid';
import RenderManager from './Managers/RenderManager';
import SceneManager from './Managers/SceneManager';

import LoadingScene from './Scenes/LoadingScene';

export default class Engine {

    // Engine internals
    uuid                = null;
    appName             = null;

    // Engine DOM elements
    engineContainer     = null;

    // Engine Managers
    sceneManager        = null;
    renderManager       = null;


    constructor(appName = '3DEngine'){
        this.appName = appName;
        this.uuid = uuid.v4();

        window.addEventListener('load', async() => {

            // Setup Engine container
            this.engineContainer = document.createElement('div');
            this.engineContainer.setAttribute('id', this.uuid)
            this.engineContainer.setAttribute('name', 'engineContainer');
            this.engineContainer.setAttribute('appName', appName);
            window.engineInstance = this.uuid;
            
            document.body.appendChild(this.engineContainer);

            // Bind instance of class to the dom element
            this.engineContainer.engine = this;


            // Create our renderManager
            this.renderManager = new RenderManager(this.uuid);
            this.sceneManager = new SceneManager(this.uuid);


            await this.sceneManager.loadScene(LoadingScene);
            console.log(this._paramters());
        });
    }


    _paramters = (findObj = false) => {
        const searchQuery = window.location.search.substr(1);
        if(!searchQuery.length) return {};

        const _params = searchQuery.split('&');
        let params = {};
        
        for (let index = 0; index < _params.length; index++) {
            const param = _params[index];
            
            let paramsArray = param.split('=');
            params[paramsArray[0]] = paramsArray[1] ?? null;
        }
    
        return findObj ? params[findObj] : params;
    }
}