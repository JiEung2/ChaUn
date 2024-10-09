// Three.js 및 로더들을 CDN에서 가져옵니다.
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
self.onmessage = async (event) => {
  const { glbUrl, gender } = event.data;

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  // DRACO 디코더 경로를 설정합니다.
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  try {
    const gltf = await loader.loadAsync(glbUrl);
    const model = gltf.scene;

    // 모델 크기와 위치 설정
    if (gender === 'MAN') {
      model.scale.set(10, 10, 10);
      model.position.set(0, -7, 0);
    } else {
      model.scale.set(10, 10, 10);
      model.position.set(0, -8.5, 0);
    }

    // 직렬화된 모델을 전송합니다.
    const serializedModel = model.toJSON();
    self.postMessage({ type: 'success', model: serializedModel });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
