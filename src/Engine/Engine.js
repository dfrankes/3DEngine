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

            // Development only, should be accessed using document.getElementById('ENGINE_UUID').engine
            window.engineInstance = this.uuid;
            
            document.getElementById('container').appendChild(this.engineContainer);

            // Bind our engine instance to the domElement
            this.engineContainer.engine = this;

            // Create our renderManager and sceneManager
            this.renderManager = new RenderManager(this.uuid);
            this.sceneManager = new SceneManager(this.uuid);

            // Load our LoadingScene (this is the Developer Scene)
            await this.sceneManager.loadScene(LoadingScene);
        });
    }


    /**
     * 
     * @param {String} findObj 
     * @returns Array of browser paramters or value of a specific param
     */
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