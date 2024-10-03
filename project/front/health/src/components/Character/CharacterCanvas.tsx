import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
}

function Character({ glbUrl, gender }: CharacterProps) {
  const model = useGLTF(glbUrl);
  const group = useRef<THREE.Group>(null);
  // const [ambientLight, setAmbientLight] =
  useEffect(() => {
    if (group.current) {
      if (gender === 'MAN') {
        group.current.scale.set(10, 10, 10);
        group.current.position.set(0, -5, 0);
      } else if (gender === 'FEMALE') {
        group.current.scale.set(8, 8, 8);
        group.current.position.set(0, -7, 0);
      }
    }
  }, [gender]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive ref={group} object={model.scene} />
    </Suspense>
  );
}

export default function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 35 }}>
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Character glbUrl={glbUrl} gender={gender} />
      <OrbitControls enablePan={false} enableZoom={true} />
    </Canvas>
  );
}
