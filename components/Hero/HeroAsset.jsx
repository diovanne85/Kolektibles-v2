import * as THREE from 'three';
import React, { Suspense} from "react";
import { Canvas, render } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styles from "./HeroAsset.module.css";


export function Model(props) {

  const { nodes, materials } = useGLTF("/boredApe.glb");
   return (
     <group {...props} dispose={null}>
       <group scale={0.04}>
         <group
           position={[11.69, 0, 11.867]}
           rotation={[-Math.PI / 2, 0, -Math.PI]}
           scale={100}
         >
           <mesh
             geometry={nodes.Cube_Material_0.geometry}
             material={materials.Material}
           />
           <mesh
             geometry={nodes.Cube_Materiais001_0.geometry}
             material={materials["Materiais.001"]}
           />
           <mesh
             geometry={nodes.Cube_Materiais_0.geometry}
             material={materials.Materiais}
           />
           <mesh
             geometry={nodes.Cube_Materiais006_0.geometry}
             material={materials["Materiais.006"]}
           />
           <mesh
             geometry={nodes.Cube_Materiais005_0.geometry}
             material={materials["Materiais.005"]}
           />
         </group>
         <mesh
           geometry={nodes.Texto_Materiais_0.geometry}
           material={materials.Materiais}
           position={[-0.101, -102.613, 1.475]}
           rotation={[3.142, -1.57, 3.142]}
           scale={6.678}
         />
         <mesh
           geometry={nodes.Texto001_Material_0.geometry}
           material={materials.Material}
           position={[3.559, -116.758, 86.848]}
           rotation={[3.142, -1.57, 3.142]}
           scale={29.125}
         />
       </group>
     </group>
   );
}

export function HeroAsset() {
  return (
    <div className={styles.wrapper}>
      <Canvas camera={{ fov: 100, position: [-7, 0, 0] }}>
        <Suspense fallback={null}>
          <ambientLight
            intensity={1}
            position={[0.033, 1.448, -0.07]}
            scale={[1.706, 7.98, 12.821]}
          />
          <directionalLight
            intensity={1}
            position={[-10, 0, 0]}
            pointLight={[10, 0, 0]}
          />
          <spotLight
            intensity={5}
            position={[-0.957, 4.871, -0.282]}
            angle={0.324}
            decay={2}
            distance={5}
          />
          <pointLight position={[-0.993, 0.041, 0.145]} />
          <hemisphereLight position={[0, 10, 0]} />
          <Model />
          <OrbitControls
            enablePan={true}
            enableRotate={true}
            enableZoom={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}