importScripts('https://threejs.org/examples/js/loaders/GLTFLoader.js');
importScripts('https://threejs.org/examples/js/libs/draco/draco_decoder.js');

self.onmessage = async (event) => {
  const { glbUrl, gender } = event.data;

  const loader = new THREE.GLTFLoader();
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  try {
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

    const serializedModel = model.toJSON();
    self.postMessage({ type: 'success', model: serializedModel });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
