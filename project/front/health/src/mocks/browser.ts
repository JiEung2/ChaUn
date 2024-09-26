import { setupWorker } from 'msw/browser';
import { surveyHandlers } from './surveyHandlers';
import { recordHandlers } from './recordHandlers';

export const worker = setupWorker(...recordHandlers, ...surveyHandlers);
// 서비스 워커 설정
// export const surveyWorker = setupWorker(...surveyHandlers);s
// export const crewWorker = setupWorker(...crewHandlers);
