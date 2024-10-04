// import { Suspense, useRef, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF, OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// interface CharacterProps {
//   glbUrl: string;
//   gender: 'MAN' | 'FEMALE';
//   onCapture: (snapshot: string) => void; // 캡처한 이미지를 부모로 전달하는 콜백
// }

// function Character({ glbUrl, gender, onCapture }: CharacterProps) {
//   const { scene, animations } = useGLTF(glbUrl); // GLB 모델 불러오기
//   const cachedModel = useRef<THREE.Group | null>(null); // 캐싱된 모델 저장
//   const mixerRef = useRef<THREE.AnimationMixer | null>(null); // 애니메이션 믹서 저장
//   const canvasRef = useRef<HTMLCanvasElement | null>(null); // 캔버스 참조를 위한 ref

//   // 모델을 캐싱하고 애니메이션 설정
//   useEffect(() => {
//     if (!cachedModel.current) {
//       console.log('모델 로드 중...', scene);
//       cachedModel.current = scene; // 처음 로드할 때만 캐싱
//     }

//     const model = cachedModel.current;

//     // 성별에 따라 scale 및 position 설정
//     if (gender === 'MAN') {
//       model.scale.set(1.1, 1.1, 1.1);
//       model.position.set(0, -9, 0);
//     } else if (gender === 'FEMALE') {
//       model.scale.set(8, 8, 8);
//       model.position.set(0, -7, 0);
//     }

//     // 애니메이션이 있을 경우에만 설정
//     if (animations && animations.length > 0) {
//       const mixer = new THREE.AnimationMixer(model);
//       mixerRef.current = mixer;
//       animations.forEach((clip) => {
//         const action = mixer.clipAction(clip);
//         action.play();
//       });
//     }
//   }, [gender, scene, animations]);

//   // 매 프레임마다 애니메이션 업데이트
//   useFrame((_, delta) => {
//     if (mixerRef.current) {
//       mixerRef.current.update(delta);
//     }
//   });

//   // 캔버스를 캡처하여 onCapture로 전달
//   const handleCapture = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const snapshot = canvas.toDataURL('image/png'); // 캔버스를 이미지로 캡처
//       onCapture(snapshot); // 캡처된 이미지를 부모 컴포넌트로 전달
//     }
//   };

//   return (
//     <Suspense fallback={null}>
//       {/* 캐싱된 모델을 사용하여 primitive 렌더링 */}
//       {cachedModel.current && <primitive object={cachedModel.current} />}

//       {/* 캡처 버튼 추가 */}
//       <button onClick={handleCapture}>Capture Canvas</button>
//     </Suspense>
//   );
// }

// export default function CharacterCanvas({ glbUrl, gender, onCapture }: CharacterProps) {
//   return (
//     <Canvas camera={{ position: [0, 10, 30], fov: 35 }}>
//       {/* 성별에 따라 ambientLight 설정 */}
//       {gender === 'MAN' ? <ambientLight intensity={4} /> : <ambientLight intensity={8} />}

//       {/* Directional Light 설정 */}
//       <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

//       {/* 캐릭터 컴포넌트 렌더링 */}
//       <Character glbUrl={glbUrl} gender={gender} onCapture={onCapture} />

//       {/* OrbitControls 설정 */}
//       <OrbitControls
//         minPolarAngle={Math.PI / 2.3}
//         maxPolarAngle={Math.PI / 2.3}
//         minAzimuthAngle={-Math.PI / 6}
//         maxAzimuthAngle={Math.PI / 6}
//         enableZoom={true}
//         minDistance={30}
//         maxDistance={40}
//       />
//     </Canvas>
//   );
// }
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
  onCapture: (snapshot: string) => void; // 캡처한 이미지를 부모로 전달하는 콜백
}

function Character({ glbUrl, gender, onCapture }: CharacterProps) {
  const { scene, animations } = useGLTF(glbUrl); // GLB 모델 불러오기
  const cachedModel = useRef<THREE.Group | null>(null); // 캐싱된 모델 저장
  const mixerRef = useRef<THREE.AnimationMixer | null>(null); // 애니메이션 믹서 저장
  // const canvasRef = useRef<HTMLCanvasElement | null>(null); // 캔버스 참조를 위한 ref
  console.log(onCapture);

  useEffect(() => {
    if (!cachedModel.current) {
      console.log('모델 로드 중...', scene);
      cachedModel.current = scene; // 처음 로드할 때만 캐싱
    }

    const model = cachedModel.current;

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
  }, [gender, scene, animations]);

  // 매 프레임마다 애니메이션 업데이트
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <Suspense fallback={null}>
      {/* 캐싱된 모델을 사용하여 primitive 렌더링 */}
      {cachedModel.current && <primitive object={cachedModel.current} />}
    </Suspense>
  );
}

export default function CharacterCanvas({ glbUrl, gender, onCapture }: CharacterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 캔버스를 캡처하여 onCapture로 전달
  const captureCanvas = () => {
    const canvas = document.querySelector('canvas'); // Three.js의 캔버스 참조
    if (canvas) {
      const snapshot = canvas.toDataURL('image/png'); // 캔버스를 이미지로 캡처
      onCapture(snapshot); // 부모 컴포넌트로 캡처된 이미지 전달
    }
  };

  return (
    <>
      {/* 캡처 버튼을 Canvas 외부에 배치 */}
      <button onClick={captureCanvas}>캡처</button>

      <Canvas ref={canvasRef} camera={{ position: [0, 10, 30], fov: 35 }}>
        {/* 성별에 따라 ambientLight 설정 */}
        {gender === 'MAN' ? <ambientLight intensity={4} /> : <ambientLight intensity={8} />}

        {/* Directional Light 설정 */}
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* 캐릭터 컴포넌트 렌더링 */}
        <Character glbUrl={glbUrl} gender={gender} onCapture={onCapture} />

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
    </>
  );
}
