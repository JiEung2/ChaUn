import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
}

function Character({ glbUrl, gender }: CharacterProps) {
  const { scene, animations } = useGLTF(glbUrl);
  const group = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (group.current) {
      // 성별에 따라 scale 및 position 설정
      if (gender === 'MAN') {
        group.current.scale.set(1.1, 1.1, 1.1);
        group.current.position.set(0, -9, 0);
      } else if (gender === 'FEMALE') {
        group.current.scale.set(8, 8, 8);
        group.current.position.set(0, -7, 0);
      }

      // 애니메이션 설정
      if (animations && animations.length > 0) {
        const mixer = new THREE.AnimationMixer(scene);
        mixerRef.current = mixer;

        animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }
    }
  }, [gender, scene, animations]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive ref={group} object={scene} />
    </Suspense>
  );
}

export default function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 35 }}>
      {/* 성별에 따라 ambientLight 설정 */}
      {gender === 'MAN' ? <ambientLight intensity={4} /> : <ambientLight intensity={8} />}

      {/* Directional Light 설정 */}
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 캐릭터 컴포넌트 렌더링 */}
      <Character glbUrl={glbUrl} gender={gender} />

      <OrbitControls
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={-Math.PI / 6} // 좌우 제한
        maxAzimuthAngle={Math.PI / 6}
        enableZoom={true} // 줌 허용
        minDistance={30}
        maxDistance={40}
      />
    </Canvas>
  );
}
