import { setupWorker } from 'msw/browser';
import { surveyHandlers } from './surveyHandlers';
import { recordHandlers } from './recordHandlers';
import { crewHandlers } from './crewHandlers';
export const worker = setupWorker(...recordHandlers, ...surveyHandlers, ...crewHandlers);
