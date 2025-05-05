
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { DronePosition } from '@/types/drone';
import * as THREE from 'three';

interface Drone3DModelProps {
  dronePosition: DronePosition;
  isDroneOn: boolean;
  isCharging: boolean;
}

export function Drone3DModel({ dronePosition, isDroneOn, isCharging }: Drone3DModelProps) {
  const droneRef = useRef<THREE.Group>(null);
  
  // Simple drone model made with primitives since we don't have a GLTF file
  useFrame((state, delta) => {
    if (!droneRef.current) return;
    
    // Subtle hovering animation
    if (isDroneOn && !isCharging) {
      droneRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.002;
    }
    
    // Propeller rotation animation
    if (isDroneOn) {
      const propellers = droneRef.current.children.filter(child => 
        child.name.includes('propeller')
      );
      propellers.forEach(propeller => {
        (propeller as THREE.Mesh).rotation.y += delta * 15;
      });
    }
  });

  // Charging effect
  const chargingIntensity = isCharging 
    ? (0.5 + Math.sin(Date.now() * 0.005) * 0.3) 
    : 0;

  // Color based on drone state
  const bodyColor = isDroneOn 
    ? (isCharging ? '#FFD700' : '#33C3F0')
    : '#555555';
  
  return (
    <group
      ref={droneRef}
      rotation={[0, (dronePosition.rotation) * Math.PI / 180, 0]}
      scale={0.5}
    >
      {/* Drone body */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      
      {/* Camera front */}
      <mesh castShadow position={[0, 0, -0.6]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* Arms */}
      <mesh castShadow position={[0.7, 0, 0.7]}>
        <boxGeometry args={[0.1, 0.1, 0.7]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh castShadow position={[-0.7, 0, 0.7]}>
        <boxGeometry args={[0.1, 0.1, 0.7]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh castShadow position={[0.7, 0, -0.7]}>
        <boxGeometry args={[0.1, 0.1, 0.7]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh castShadow position={[-0.7, 0, -0.7]}>
        <boxGeometry args={[0.1, 0.1, 0.7]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      {/* Propellers */}
      <mesh name="propeller1" castShadow position={[0.7, 0.1, 0.7]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#333333" opacity={0.7} transparent={true} />
      </mesh>
      <mesh name="propeller2" castShadow position={[-0.7, 0.1, 0.7]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#333333" opacity={0.7} transparent={true} />
      </mesh>
      <mesh name="propeller3" castShadow position={[0.7, 0.1, -0.7]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#333333" opacity={0.7} transparent={true} />
      </mesh>
      <mesh name="propeller4" castShadow position={[-0.7, 0.1, -0.7]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#333333" opacity={0.7} transparent={true} />
      </mesh>
      
      {/* Charging glow */}
      {isCharging && (
        <pointLight
          position={[0, 0, 0]}
          color="#FFD700"
          intensity={chargingIntensity * 5}
          distance={5}
        />
      )}
      
      {/* Status light */}
      <pointLight 
        position={[0, 0.3, 0]} 
        color={bodyColor} 
        intensity={isDroneOn ? 2 : 0} 
        distance={3}
      />
    </group>
  );
}
