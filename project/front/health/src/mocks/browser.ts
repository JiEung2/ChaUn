// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { surveyHandlers } from './surveyHandlers';
import { recordHandlers } from './recordHandlers';
// import { crewHandlers } from './crewHandlers';
export const recordWorker = setupWorker(...recordHandlers);
// 서비스 워커 설정
export const surveyWorker = setupWorker(...surveyHandlers);
// export const crewWorker = setupWorker(...crewHandlers);
