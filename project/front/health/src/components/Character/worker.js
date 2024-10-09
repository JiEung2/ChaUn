// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/jsm/loaders/DRACOLoader.js';

self.onmessage = async (event) => {
  const { glbUrl, gender } = event.data;

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  // DRACO 디코더 경로 설정
  dracoLoader.setDecoderPath('/Darco');
  loader.setDRACOLoader(dracoLoader);

  try {
    const gltf = await loader.loadAsync(glbUrl);
    const model = gltf.scene;

    // 모델의 크기와 위치 설정
    if (gender === 'MAN') {
      model.scale.set(10, 10, 10);
      model.position.set(0, -7, 0);
    } else {
      model.scale.set(10, 10, 10);
      model.position.set(0, -8.5, 0);
    }

    // 모델 직렬화 (텍스처 없이)
    const serializedModel = model.toJSON();
    self.postMessage({ type: 'success', model: serializedModel });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
