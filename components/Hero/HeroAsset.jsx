import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styles from "./HeroAsset.module.css";

export function Model(props) {
  const { nodes, materials} = useGLTF("/boredApe.glb");
  // const baseColorTexture = new THREE.TextureLoader().load(
  //   "/textures/baseColor_1.jpg"
  // );
  // const normalTexture = new THREE.TextureLoader().load(
  //   "/textures/normal_1.jpg"
  // );
  // const specularTexture = new THREE.TextureLoader().load(
  //   "/textures/specular_1.png"
  // );
  // const metallicRoughnessTexture = new THREE.TextureLoader().load(
  //   "/textures/metallicRoughness_1.png"
  // );

  // const phongMaterial = new THREE.MeshPhongMaterial({
  //   map: null,
  //   normalMap: normalTexture,
  //   specularMap: specularTexture,
  //   shininess: 0.5,
  //   metalness:0.5,
  //   roughness:0.5,
  //   transparent: true, // Enable transparency
  // });

  // const standardMaterial = new THREE.MeshStandardMaterial({
  //   map: null,
  //   normalMap: normalTexture,
  //   baseColorMap: baseColorTexture,
  //   metalnessMap: metallicRoughnessTexture,
  //   roughnessMap: metallicRoughnessTexture,
  //   metalness: 0.5,
  //   transparent: true, // Enable transparency
  // });

  // phongMaterial.side = THREE.DoubleSide;
  // phongMaterial.needsUpdate = true;

  // standardMaterial.side = THREE.DoubleSide;
  // standardMaterial.needsUpdate = true;

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
      <Canvas camera={{ fov: 50, position: [-7, 0, 0] }}>
        <Suspense fallback={null}>
          <ambientLight
            intensity={2}
            position={[0.96, -0.33, 0.112]}
            scale={[1.706, 7.98, 12.821]}
          />
          <directionalLight castShadow={true} intensity={10} position={[2.095, 1.039, -1.031]} />
          <pointLight intensity={5} position={[-1.57, -0.358, 0.064]} />
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
