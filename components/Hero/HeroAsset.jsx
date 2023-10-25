import React, { useRef} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styles from "./HeroAsset.module.css";


export function Model(props) {
  const gltf = useGLTF("/boredApe.glb");

  return <primitive object={gltf.scene} dispose={null} />;

}

export function HeroAsset() {
  const cameraPosition = [0.7, 0, 0];
  const controlsRef = useRef();

  const handleCameraZoomIn = () => {
    cameraRef.current.position.z -= 1;
  };

  const handleCameraZoomOut = () => {
    cameraRef.current.position.z += 1;
  };
 

  return (
    <div className={styles.wrapper}>
      <Canvas>
        <ambientLight 
        intensity={1} 
        position={[0.033,1.448,-0.070]}
        scale={[1.706,7.980,12.821]}
        />
        <directionalLight 
        intensity={1} 
        position={[-10, 4.321, -0.827]} />
        <Model />
        <pointLight
        intensity={3}
        decay={2}
        position={[1.441,0.224,0.043]}
        />
        <spotLight
        intensity={5}
        position={[-0.257,4.871,-0.282]}
        angle={0.324}
        decay={2}
        distance={5}
        />
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableRotate={true}
          enableZoom={true}
        />
      </Canvas>
    </div>
  );
}

// import { Canvas, } from "@react-three/fiber";
// import * as THREE from "three";
// import React, { Suspense } from "react";
// import styles from "./HeroAsset.module.css";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export function Model(props) {

// const scene = new THREE.Scene();
//     const loader = new GLTFLoader();
//     loader.load('/boredApe.glb', function(glb){
//       console.log(glb)
//       const root = glb.scene;
//       root.scale.set(0.001,0.001,0.001)
//       scene.add(root);
//     }, function(xhr){
//       console.log((xhr.loaded/xhr.total * 100) + "% loaded");

//     }, function(error){
//       console.log('an error occured')
//     } );

//       const light = new THREE.DirectionalLight(0xffffff,1)
//       light.position.set(2,2,5)
//       scene.add(light)
//     // const geometry = new THREE.BoxGeometry(1,1,1)
//     // const material = new THREE.MeshBasicMaterial({
//     //   color: 0x00ff00
//     // })
//     // const boxMesh = new THREE.Mesh(geometry,material)
//     // scene.add(boxMesh)

//     // const sizes = {
//     //   width:window.innerWidth,
//     //   height:window.innerHeight

//     // }
//     const camera = new THREE.PerspectiveCamera(75, 0.1, 100)
//     camera.position.set(0,1,2)
//     scene.add(camera)

//     const renderer = new THREE.WebGL1Renderer({
//       canvas: Canvas
//     });
//     renderer.setSize(sizes.width,sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
//     renderer.shadowMap.enabled = true
//     renderer.gammaOutput = true

//     function animate(){
//       requestAnimationFrame(animate)
//       renderer.render(scene, camera);
//     }
//     animate()
// }
// export function HeroAsset() {
//   return (
//     <div className={styles.wrapper}>
//       <Canvas camera={{ fov: 70, position: [5, 0, 0] }}>
//         <Model />
//         {/* <Suspense fallback={null}>
//           <ambientLight intensity={1} position={[-7, 0,0]} />
//           <Model />
//           <pointLight
//             intensity={2}
//             position={[0, 0.067, 19]}
//           />
//           <directionalLight
//             intensity={2}
//             position={[-9, 4.321, -0.827]}
//           />
//           <OrbitControls
//             enablePan={true}
//             enableRotate={true}
//             enableZoom={true}
//           />
//         </Suspense> */}
//       </Canvas>
//     </div>
//   );
// }
