export default class SceneManager {
    scenes = [];
    activeScene = null;

    /**
     * Loads a specific scene
     * @param {Scene} scene scene to be loaded
     */
    loadScene = (scene) => {
        this.activeScene = new scene();
        this.scenes.push(this.activeScene);
        this.activeScene.onStart();
    }

    /**
     * getActiveScene
     * Get the current active scene
     * @returns Scene
     */
    getActiveScene = () => {
        return this.activeScene;
    }
}