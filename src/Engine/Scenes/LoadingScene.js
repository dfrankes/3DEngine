import Scene from '../Components/Scene';
import {BoxGeometry, MeshNormalMaterial, Mesh, PerspectiveCamera} from 'three';

export default class LoadingScene extends Scene {

    mainCamera = null;
    debugPanel = null;
    data = {};

    onStart = async() => {
    
        // Create debugPanel variables
        this.debugPanel = {
            sceneName: new ReactiveVar(this.constructor.name),
            sceneUUID: new ReactiveVar(this.uuid),
            children: new ReactiveVar(this.children.length),
            sceneCamera: this.mainCamera ? new ReactiveVar(this.mainCamera.constructor.name) : new ReactiveVar(null),
            currentTick: new ReactiveVar()
        }

        // Require blaze template and add to our uiManager
        require('./LoadingScene/UI/sceneDebugger');
        this.uiManager.addElement(Template.sceneDebugger, this.debugPanel);

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

    onUpdate = ({time}) => {
        
    }
    
    onFixedUpdate = ({time}) => {
        // this.debugPanel.currentTick.set(time);
    }
}