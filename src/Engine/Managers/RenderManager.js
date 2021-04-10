import {WebGLRenderer} from 'three';

import Scene from '../Components/Scene';

import * as THREE from 'three';
export default class RenderManager {
    renderer = null;

    constructor(instanceUUID){
        this.renderer = new WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setAnimationLoop( this.renderLoop );

        let engineInstance = document.getElementById(instanceUUID);
        engineInstance.appendChild( this.renderer.domElement );
    }


    renderLoop = (time) => {
        // Get active engine instance
        const engineInstance = document.getElementById(window.engineInstance).engine;
        if(engineInstance){
            const scene = engineInstance.sceneManager.getActiveScene();
            const camera = scene.mainCamera;

            if(!scene || !camera) throw new Error('[renderLoop] ERROR: Unable to find scene or camera!');

            // basic onUpdate function
            const children = scene.children;
            children.forEach(child => {
                if(child && typeof child.onUpdate === 'function') child.onUpdate(time);
            })

            this.renderer.render( scene, camera );
        }
    }
}