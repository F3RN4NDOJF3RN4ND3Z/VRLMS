// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"
import * as THREE from 'three';
import {ReactInstance,Surface,Location, Module,ReactExecutorIframe} from 'react-360-web';


export default class CubeModule extends Module{
  constructor(){
    super('CubeModule');
  }
  init(cube){
    this.cube=cube;
  }
  changeCubeColor(color){
    this.cube.material.color=new THREE.Color(color);
  }
}
function init(bundle, parent, options = {}) {
  const scene = new THREE.Scene();
  const cubeModule = new CubeModule();
  const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
     
  cubeModule.init(cube);
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    
    fullScreen: true,
    cursorVisibility: 'visible',
    nativeModules: [ cubeModule ],
    scene: scene,
    ...options,
  });
  const cube= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    material
  );
  r360.scene=scene;
  cube.position.z=0;
  scene.add(cube);
  
  console.log(scene);
  
  console.log(r360.scene);
  console.log(cube);
  const location = new Location([0, -20, -50]);
  const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.6, 0);
  const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.6, 0);
  r360.renderToSurface(
    r360.createRoot('SideMenu'),
    leftPanel,
  );
  r360.renderToSurface(
    r360.createRoot('DetailPanel'),
    rightPanel,
  );
 r360.renderToLocation(
    r360.createRoot('Scene',{ modelPath: 'Solar_system.gltf'}),
    location,
  );
  r360.renderToLocation(
    r360.createRoot('InteractiveObject',{ modelPath: 'Earth2.gltf',canRotate: true}),
    new Location([0, 0, -10]),
  );
  
  
  

  r360.render=function(){
    //animate the cube
    console.log("Entro");
    /*const seconds=timestamp/1000;
    cube.position.x=0 +(1* (Math.cos(seconds)));
    cube.position.y=0.2 + (1 * Math.abs(Math.sin(seconds)));*/
  }
  r360.compositor.setBackground('./static_assets/360_world.jpg');
  r360.start();
  return r360;
}

window.React360 = {init};
