import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Reflector, useGLTF } from "@react-three/drei";
import styles from "./HeroAsset.module.css";
import * as THREE from "three";





export function Model(props) {
  const { nodes, materials } = useGLTF("/bored.glb");

 
  const textMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x29ffff,
    reflectivity: 0.8,
  });
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x29ffff,
    reflectivity: 0.5,
  });
  const customMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.5,
    sheenRoughness: 0.2,
    roughness: 0.1,
    color: 0xffffff,
    reflectivity: 0.2,
  });


  return (
    <group {...props} dispose={null}>
      <group scale={0.02}>
        <group
          position={[11.69, 0, 11.867]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube_Material_0.geometry}
            material={customMaterial}
          />
          <mesh
            geometry={nodes.Cube_Materiais001_0.geometry}
            material={materials["Materiais.001"]}
          />
          <mesh
            geometry={nodes.Cube_Materiais_0.geometry}
            material={cubeMaterial}
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
          material={textMaterial}
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
      <Canvas camera={{ fov: 60, position: [-7, 0, 0] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} position={[0.85, -0.035, -1.084]} />
          <directionalLight
            castShadow={true}
            intensity={2}
            position={[2.4, 0.29, -6.054]}
          />
          <pointLight intensity={5} position={[-0.75, 0.213, -0.039]} />

          <Model />
          <pointLight intensity={4} position={[-1.057, -0.664, 0]} />
          <spotLight intensity={5} position={[5, 10, 7.5]} angle={0.314} />
          <OrbitControls
            enablePan={true}
            enableRotate={true}
            enableZoom={true}
            autoRotate={true}
            autoRotateSpeed={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
