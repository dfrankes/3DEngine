import Scene from '../Components/Scene';
import {BoxGeometry, MeshNormalMaterial, Mesh, PerspectiveCamera} from 'three';
import SceneDebugger from './LoadingScene/UI/SceneDebugger';


export default class LoadingScene extends Scene {

    mainCamera = null;
    debugPanel = null;
    data = {};

    onStart = async() => {
    
        // Create debug panel
        this.debugPanel = new SceneDebugger({
            sceneName: this.constructor.name,
            sceneUUID: this.uuid,
            children: this.children.length,
            sceneCamera: this.mainCamera ? this.mainCamera.constructor.name : null
        });

        this.debugPanel.element.style.width = '450px';
        this.uiManager.addElement(this.debugPanel);

        // Create main camera
        this.mainCamera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.mainCamera.position.z = 1;

        // Create cube
        let geometry, material, mesh;

        geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
        material = new MeshNormalMaterial();
    
        mesh = new Mesh( geometry, material );
        mesh.onFixedUpdate = () => {
            this.rotation.x +=  0.01;
            this.rotation.y +=  0.01;
        }
        this.add( mesh );
    }

    onUpdate = () => {

    }
    
    onFixedUpdate = (time) => {

    }
}