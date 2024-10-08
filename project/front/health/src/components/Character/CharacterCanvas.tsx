import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Lottie from 'lottie-react';
import LoadingLottile from '@/assets/Lottie/loading.json';
interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
  preserveDrawingBuffer?: boolean;
}

function Character({ glbUrl, gender }: CharacterProps) {
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

        if (gender === 'MAN') {
          model.scale.set(0.3, 0.3, 0.3);
          model.position.set(0, -9, 0);
        } else if (gender === 'FEMALE') {
          model.scale.set(10, 10, 10);
          model.position.set(0, -10, 0);
        }

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
        }
      } catch (error) {
        console.error('Failed to load GLTF model', error);
      }
    };

    loadModel();

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [glbUrl, gender]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta * 0.5);
    }
  });

  return sceneRef.current ? <primitive object={sceneRef.current} /> : null;
}

export default function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
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
    <Canvas
      camera={{ position: [0, 10, 30], fov: 35 }}
      gl={{ preserveDrawingBuffer }} // 상태에 따라 preserveDrawingBuffer 값이 동적으로 변함
      dpr={Math.min(window.devicePixelRatio, 2)}>
      {gender === 'MAN' ? <ambientLight intensity={4} /> : <ambientLight intensity={8} />}
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow={false} />
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              textAlign: 'center',
            }}>
            <Lottie animationData={LoadingLottile} style={{ width: '200px', height: '200px' }} />
            <p>
              기본, 춤추기, 손 흔들기 모션을 랜덤으로 보여줍니다. <br /> 잠시만 기다려주세요.
            </p>
          </div>
        }>
        <Character glbUrl={glbUrl} gender={gender} />
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
  );
}

// import { Suspense, useEffect, useRef, useState } from 'react';
// import { Canvas, useFrame, extend } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import Lottie from 'lottie-react';
// import LoadingLottie from '@/assets/Lottie/loading.json';

// extend(THREE);
// interface CharacterProps {
//   glbUrl: string;
//   gender: 'MAN' | 'FEMALE';
//   preserveDrawingBuffer?: boolean;
// }

// function Character({ glbUrl, gender }: CharacterProps) {
//   const sceneRef = useRef<THREE.Group | null>(null);
//   const mixerRef = useRef<THREE.AnimationMixer | null>(null);

//   useEffect(() => {
//     const loader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
//     loader.setDRACOLoader(dracoLoader);

//     const loadModel = async () => {
//       try {
//         const gltf = await loader.loadAsync(glbUrl);
//         const model = gltf.scene;
//         sceneRef.current = model;

//         if (gender === 'MAN') {
//           model.scale.set(0.8, 0.8, 0.8);
//           model.position.set(0, -9, 0);
//         } else if (gender === 'FEMALE') {
//           model.scale.set(11.1, 11.1, 11.1);
//           model.position.set(0, -10, 0);
//         }

//         if (gltf.animations && gltf.animations.length > 0) {
//           const mixer = new THREE.AnimationMixer(model);
//           mixerRef.current = mixer;

//           const clip = gltf.animations[0];
//           const action = mixer.clipAction(clip);
//           action.play();
//         }
//       } catch (error) {
//         console.error('Failed to load GLTF model', error);
//       }
//     };

//     loadModel();

//     return () => {
//       if (mixerRef.current) {
//         mixerRef.current.stopAllAction();
//         mixerRef.current = null;
//       }
//     };
//   }, [glbUrl, gender]);

//   useFrame((_, delta) => {
//     if (mixerRef.current) {
//       mixerRef.current.update(delta);
//     }
//   });

//   return sceneRef.current ? <primitive object={sceneRef.current} /> : null;
// }

// export default function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
//   const [preserveDrawingBuffer, setPreserveDrawingBuffer] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(
//       () => {
//         setPreserveDrawingBuffer(false);
//       },
//       2 * 60 * 1000
//     );

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Canvas camera={{ position: [0, 10, 30], fov: 35 }} gl={{ preserveDrawingBuffer }} dpr={[1, 2]}>
//       {gender === 'MAN' ? <ambientLight intensity={4} /> : <ambientLight intensity={8} />}
//       <directionalLight position={[5, 5, 5]} intensity={1} castShadow={false} />
//       <Suspense
//         fallback={
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100vh',
//               textAlign: 'center',
//             }}>
//             <Lottie animationData={LoadingLottie} style={{ width: '200px', height: '200px' }} />
//             <p>
//               기본, 춤추기, 손 흔들기 모션을 랜덤으로 보여줍니다. <br /> 잠시만 기다려주세요.
//             </p>
//           </div>
//         }>
//         <Character glbUrl={glbUrl} gender={gender} />
//       </Suspense>
//       <OrbitControls
//         minPolarAngle={Math.PI / 2.3}
//         maxPolarAngle={Math.PI / 2.3}
//         minAzimuthAngle={-Math.PI / 2}
//         maxAzimuthAngle={Math.PI / 2}
//         enableZoom={false}
//         enableDamping={false}
//       />
//     </Canvas>
//   );
// }
