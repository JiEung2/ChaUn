import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
}

function Character({ glbUrl, gender }: CharacterProps) {
  const { scene, animations } = useGLTF(glbUrl); // GLB 모델 불러오기
  const mixerRef = useRef<THREE.AnimationMixer | null>(null); // 애니메이션 믹서 저장

  useEffect(() => {
    if (!scene) return; // scene이 없는 경우 바로 반환

    const model = scene;

    // 성별에 따라 scale 및 position 설정
    if (gender === 'MAN') {
      model.scale.set(1.1, 1.1, 1.1);
      model.position.set(0, -9, 0);
    } else if (gender === 'FEMALE') {
      model.scale.set(8, 8, 8);
      model.position.set(0, -7, 0);
    }

    // 애니메이션이 있을 경우에만 설정
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }

    return () => {
      // 컴포넌트 언마운트 시 애니메이션 정리
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [gender, scene, animations]);

  // 매 프레임마다 애니메이션 업데이트
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return <primitive object={scene} />;
}

export default function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 35 }}>
      {/* 성별에 따라 ambientLight 설정 */}
      {gender === 'MAN' ? <ambientLight intensity={4} /> : <ambientLight intensity={8} />}

      {/* Directional Light 설정 */}
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

      {/* 캐릭터 컴포넌트 렌더링 */}
      <Suspense fallback={null}>
        <Character glbUrl={glbUrl} gender={gender} />
      </Suspense>

      {/* OrbitControls 설정 */}
      <OrbitControls
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        enableZoom={true}
        minDistance={30}
        maxDistance={40}
      />
    </Canvas>
  );
}
