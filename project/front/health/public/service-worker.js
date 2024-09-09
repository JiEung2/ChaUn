self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // 네비게이션 프리로드 활성화 확인
    if (event.preloadResponse) {
      event.respondWith(
        (async () => {
          // preloadResponse가 완료될 때까지 기다림
          const preloadResponse = await event.preloadResponse;

          if (preloadResponse) {
            return preloadResponse; // 프리로드 응답을 반환
          }

          // preloadResponse가 없을 경우 네트워크 요청
          return fetch(event.request);
        })()
      );
    } else {
      // 프리로드가 없는 경우 기본 fetch 처리
      event.respondWith(fetch(event.request));
    }
  }
});
