import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
}

function Character({ glbUrl, gender }: CharacterProps) {
  const sceneRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    // DRACOLoader 경로 설정
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader); // GLTFLoader에 DRACOLoader 연결

    loader.load(glbUrl, (gltf: any) => {
      const model = gltf.scene;
      sceneRef.current = model;

      // 성별에 따른 캐릭터 스케일 및 위치 설정
      if (gender === 'MAN') {
        model.scale.set(1.1, 1.1, 1.1);
        model.position.set(0, -10, 0);
      } else if (gender === 'FEMALE') {
        model.scale.set(8, 8, 8);
        model.position.set(0, -7, 0);
      }

      // 애니메이션 설정
      if (gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;
        gltf.animations.forEach((clip: any) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }
    });

    return () => {
      // 컴포넌트 언마운트 시 애니메이션 정리
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [glbUrl, gender]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return sceneRef.current ? <primitive object={sceneRef.current} /> : null;
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
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        enableZoom={true}
        minDistance={30}
        maxDistance={20}
      />
    </Canvas>
  );
}
