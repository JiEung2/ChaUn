import { setupWorker } from 'msw/browser';
import { recordHandlers } from './recordHandlers';
import { surveyHandlers } from './surveyHandlers';
// import { crewHandlers } from './crewHandlers';

export const recordWorker = setupWorker(...recordHandlers);
export const surveyWorker = setupWorker(...surveyHandlers);
// export const crewWorker = setupWorker(...crewHandlers);
