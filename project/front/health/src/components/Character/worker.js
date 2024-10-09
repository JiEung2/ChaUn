// Three.js 라이브러리 먼저 로드
importScripts('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
importScripts('/GLTFLoader.js');
importScripts('/DRACOLoader.js');

self.onmessage = async (event) => {
  const { glbUrl, gender } = event.data;

  const loader = new THREE.GLTFLoader();
  const dracoLoader = new THREE.DRACOLoader();

  // DRACO 디코더 경로 설정
  dracoLoader.setDecoderPath('/Darco');
  loader.setDRACOLoader(dracoLoader);

  try {
    // GLB 파일을 로드
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
