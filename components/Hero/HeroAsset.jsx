import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styles from "./HeroAsset.module.css";

export function Model(props) {
  const { nodes, materials} = useGLTF("/boredApe.glb");
  

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
      <Canvas camera={{ fov: 60, position: [-7, 0, 0] }}>
        <Suspense fallback={null}>
          <ambientLight
            intensity={2.5}
            position={[0.96, -0.33, 0.112]}
            scale={[1.706, 7.98, 12.821]}
          />
          <directionalLight castShadow={true} intensity={10} position={[2.095, 1.039, -1.031]} />
          <pointLight intensity={15} position={[0.57, 1.058, -0.564]} />
          <Model />
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
