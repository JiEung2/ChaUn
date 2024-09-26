import { setupWorker } from 'msw/browser';
import { surveyHandlers } from './surveyHandlers';
import { recordHandlers } from './recordHandlers';
import { exerciseHandlers } from './exerciseHandlers';
import { userHandlers } from './userHandlers';
// import { crewHandlers } from './crewHandlers';
export const worker = setupWorker(...recordHandlers, ...surveyHandlers, ...exerciseHandlers, ...userHandlers);
// 서비스 워커 설정
// export const surveyWorker = setupWorker(...surveyHandlers);s
// export const crewWorker = setupWorker(...crewHandlers);
