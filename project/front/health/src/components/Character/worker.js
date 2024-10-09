// worker.js
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

    // 모델을 직렬화하여 메인 스레드로 전송
    const serializedModel = model.toJSON();
    self.postMessage({ type: 'success', model: serializedModel });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
