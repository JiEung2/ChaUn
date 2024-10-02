import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ErrorBoundary로 에러 핸들링
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 에러 발생 시 state를 업데이트하여 fallback UI를 보여줌
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 fallback UI를 렌더링
      return <h1>Something went wrong loading the model.</h1>;
    }
    return this.props.children;
  }
}

interface CharacterProps {
  glbUrl: string;
  gender: 'MAN' | 'FEMALE';
}

// Character 함수 선언식
function Character({ glbUrl, gender }: CharacterProps) {
  const model = useGLTF(glbUrl);
  const group = useRef<THREE.Group>(null);

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

// CharacterCanvas 함수 선언식
function CharacterCanvas({ glbUrl, gender }: CharacterProps) {
  return (
    <ErrorBoundary>
      <Canvas camera={{ position: [0, 10, 30], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Character glbUrl={glbUrl} gender={gender} />
        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
    </ErrorBoundary>
  );
}

export default CharacterCanvas;
