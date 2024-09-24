// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { surveyHandlers } from './surveyHandlers';
// import { crewHandlers } from './crewHandlers';
// 서비스 워커 설정
export const surveyWorker = setupWorker(...surveyHandlers);
// export const crewWorker = setupWorker(...crewHandlers);
