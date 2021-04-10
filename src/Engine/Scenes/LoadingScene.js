import Scene from '../Components/Scene';
import {BoxGeometry, MeshNormalMaterial, Mesh, PerspectiveCamera} from 'three';

export default class LoadingScene extends Scene {

    mainCamera = null;

    onStart = async() => {
        
        // Create main camera
        this.mainCamera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.mainCamera.position.z = 1;


        // Create cube
        let geometry, material, mesh;

        geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
        material = new MeshNormalMaterial();
    
        mesh = new Mesh( geometry, material );
        mesh.onUpdate = (time) => {
            this.rotation.x = time / 2000;
            this.rotation.y = time / 1000;
        }
        
        this.add( mesh );
    }
}