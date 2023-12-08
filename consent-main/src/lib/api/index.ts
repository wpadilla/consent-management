
import { setupWorker } from 'msw/browser';
import {userHandlers} from "./users";
import {consentsHandlers} from "./consents";

export const mockApi = setupWorker(...[...userHandlers, ...consentsHandlers]);