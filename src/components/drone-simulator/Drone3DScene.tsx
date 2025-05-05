
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Drone3DModel } from './Drone3DModel';
import { DronePosition, DroneGameState } from '@/types/drone';

interface Drone3DSceneProps {
  dronePosition: DronePosition;
  gameState: DroneGameState;
  isDroneOn: boolean;
}

export const Drone3DScene: React.FC<Drone3DSceneProps> = ({
  dronePosition,
  gameState,
  isDroneOn
}) => {
  const controlsRef = useRef(null);

  // Calculate camera position based on altitude
  const cameraDistance = 5 + (dronePosition.altitude / 20);
  
  // Determine terrain color based on field type
  const getTerrainColor = () => {
    switch (gameState.fieldType) {
      case 'rice': return '#548c2f';
      case 'wheat': return '#d8c95d';
      case 'orchard': return '#2e5229';
      case 'greenhouse': return '#73e2a7';
      case 'reservoir': return '#5d99c6';
      default: return '#3c5c2b';
    }
  };

  return (
    <div className="w-full h-[400px] bg-black rounded-md overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[0, cameraDistance, -cameraDistance / 2]}
          fov={45}
        />
        
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 6}
        />
        
        {/* Ambient light */}
        <ambientLight intensity={0.6} />
        
        {/* Directional light with shadow */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Drone model */}
        <Drone3DModel 
          dronePosition={dronePosition}
          isDroneOn={isDroneOn}
          isCharging={gameState.isCharging}
        />
        
        {/* Ground plane */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1, 0]} 
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color={getTerrainColor()} 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Environment for reflections */}
        <Environment preset="sunset" />
        
        {/* Fog effect */}
        <fog attach="fog" color="#87ceeb" near={20} far={100} />
      </Canvas>
    </div>
  );
};
