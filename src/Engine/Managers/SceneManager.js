export default class SceneManager {
    scenes = [];
    activeScene = null;


    constructor(EngineUUID){

    }
    
    loadScene = (scene) => {
        this.activeScene = new scene();
        this.scenes.push(this.activeScene);
        this.activeScene.onStart();
    }

    getActiveScene = () => {
        return this.activeScene;
    }
}