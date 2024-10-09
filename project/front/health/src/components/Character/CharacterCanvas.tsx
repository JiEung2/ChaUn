import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Lottie from 'lottie-react';
import LoadingLottie from '@/assets/Lottie/loading.json'; // 오타 수정: LoadingLottile -> LoadingLottie

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
  preserveDrawingBuffer?: boolean;
}

function Character({ glbUrl, gender, setLoading }: CharacterProps & { setLoading: (loading: boolean) => void }) {
  const sceneRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    const loadModel = async () => {
      try {
        const gltf = await loader.loadAsync(glbUrl);
        const model = gltf.scene;
        sceneRef.current = model;

        // 캐릭터의 스케일과 위치 설정
        if (gender === 'MAN') {
          model.scale.set(0.8, 0.8, 0.8);
          model.position.set(0, -7, 0);
        } else if (gender === 'FEMALE') {
          model.scale.set(10, 10, 10);
          model.position.set(0, -8.5, 0);
        }

        // 애니메이션 처리
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
        }

        setLoading(false); // 모델이 로드되면 로딩 상태를 false로 설정
      } catch (error) {
        console.error('Failed to load GLTF model', error);
        setLoading(false); // 에러가 발생해도 로딩 상태를 해제
      }
    };

    loadModel();

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [glbUrl, gender, setLoading]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta * 0.5);
    }
  });

  return sceneRef.current ? <primitive object={sceneRef.current} /> : null;
}

export default function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [preserveDrawingBuffer, setPreserveDrawingBuffer] = useState(true);

  useEffect(() => {
    // 2분 후에 preserveDrawingBuffer 값을 false로 변경
    const timer = setTimeout(
      () => {
        setPreserveDrawingBuffer(false);
      },
      2 * 60 * 1000
    ); // 2분 = 120,000 milliseconds

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 해제
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {loading && ( // 로딩 중일 때 Lottie 애니메이션 표시
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10, // 캔버스보다 위에 표시되도록 설정
          }}>
          <Lottie animationData={LoadingLottie} style={{ width: '200px', height: '200px' }} />
        </div>
      )}
      <Canvas
        camera={{ position: [0, 10, 30], fov: 35 }}
        gl={{ preserveDrawingBuffer }} // 상태에 따라 preserveDrawingBuffer 값이 동적으로 변함
        dpr={Math.min(window.devicePixelRatio, 2)}>
        {gender === 'MAN' ? <ambientLight intensity={6} /> : <ambientLight intensity={8} />}
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow={false} />
        <Suspense fallback={null}>
          <Character glbUrl={glbUrl} gender={gender} setLoading={setLoading} />
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 2.3}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          enableZoom={false}
          enableDamping={false}
        />
      </Canvas>
    </div>
  );
}
