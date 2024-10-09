// worker.js

// Three.js 라이브러리 먼저 로드
importScripts('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'); // CDN에서 Three.js 비모듈 방식 로드
importScripts('/GLTFLoader.js');
importScripts('/DRACOLoader.js');

self.onmessage = async (event) => {
  const { glbUrl, gender } = event.data;

  const loader = new THREE.GLTFLoader();
  const dracoLoader = new THREE.DRACOLoader();

  // DRACO 디코더 경로를 로컬 경로로 설정
  dracoLoader.setDecoderPath('/src/components/Character/Darco/');
  loader.setDRACOLoader(dracoLoader);

  try {
    // GLB 파일을 비동기로 로드
    const gltf = await loader.loadAsync(glbUrl);
    const model = gltf.scene;

    // 모델 크기 및 위치 설정
    if (gender === 'MAN') {
      model.scale.set(10, 10, 10);
      model.position.set(0, -7, 0);
    } else {
      model.scale.set(10, 10, 10);
      model.position.set(0, -8.5, 0);
    }

    // 텍스처 제외한 직렬화 (이미지 데이터 제외)
    const serializedModel = model.toJSON();
    delete serializedModel.images; // 텍스처나 이미지 데이터를 제외
    self.postMessage({ type: 'success', model: serializedModel });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
