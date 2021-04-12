import {WebGLRenderer, Clock} from 'three';

export default class RenderManager {

    renderer    = null;

    /**
     * RenderManager renderClock internal class
     * This class is used for our animations and object movements or anything that does not require an update every tick (onFixedUpdate)
     */
    renderClock = new class {
        fpsLimit = 60;
        
        _now;
        _then = Date.now();  
        _interval = 1000 / this.fpsLimit
        _delta;

        currentTick = 0;

        isRenderFrame = () => {
            this._now = Date.now();
            this._delta = this._now - this._then;

            this.currentTick++;

            if(this._delta > this._interval) this._nextFrame()
            return this._delta > this._interval;
        }
    
        _nextFrame = () => {
            this._then = this._now - (this._delta % this._interval);
        }
    }

    /**
     * RenderManager constructor
     * @param {String} instanceUUID The engine instance UUID
     */
    constructor(instanceUUID){
        this.renderer = new WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setAnimationLoop( this.tick );

        let engineInstance = document.getElementById(instanceUUID);
        engineInstance.appendChild( this.renderer.domElement );

        this.engineInstance = document.getElementById(window.engineInstance).engine;
    }

    /**
     * Engine mainLoop
     */
    tick = (time) => {
        const engineInstance = this.engineInstance;
        if(engineInstance && engineInstance.sceneManager){
            // Create a tickData object to pass into onUpdate and onFixedUpdate
            let tickData = {clock: JSON.parse(JSON.stringify(this.renderClock)), time}

            // Get active scene and check if it has been created
            const scene = this.engineInstance.sceneManager.getActiveScene();
            if(!scene) return;


            // scene onUpdate (called every tick)
            scene.onUpdate(tickData);

            // Update all items in the scene
            const sceneChildren = scene.children;
            sceneChildren.forEach(child => {
                // Function called every tick
                if(child && typeof child.onUpdate === 'function') child.onUpdate(tickData);
            })

            // Function called on a fixed time (animations)
            if (this.renderClock.isRenderFrame()) {
                sceneChildren.forEach(child => {
                    if(child && typeof child.onFixedUpdate === 'function') child.onFixedUpdate(tickData);
                })

                // scene onFixedUpdate (called based on fps, default: 60fps)
                scene.onFixedUpdate(tickData);
            }

            // Render the scene if a camera exists
            const camera = scene.mainCamera;
            if(camera){
                this.renderer.render( scene, camera );
            }
        }
    }
}