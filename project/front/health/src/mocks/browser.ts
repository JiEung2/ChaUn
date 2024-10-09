import { setupWorker } from 'msw/browser';
import { surveyHandlers } from './surveyHandlers';
import { recordHandlers } from './recordHandlers';
import { crewHandlers } from './crewHandlers';
import { exerciseHandlers } from './exerciseHandlers';
import { userHandlers } from './userHandlers';
import { alarmHandlers } from './alarmHandlers';
import { characterHandlers } from './characterHandlers';
import { homeHandlers } from './homeHandlers';

export const worker = setupWorker(
  ...recordHandlers,
  ...surveyHandlers,
  ...exerciseHandlers,
  ...userHandlers,
  ...crewHandlers,
  ...alarmHandlers,
  ...characterHandlers,
  ...homeHandlers
);
