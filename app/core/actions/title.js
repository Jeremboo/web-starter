import { makeActionCreator } from 'core/utils';

// ACTIONS NAME
export const REQUEST_TITLE = 'REQUEST_TITLE';
export const SUCCESS_TITLE = 'SUCCESS_TITLE';
export const FAILURE_TITLE = 'FAILURE_TITLE';

// ACTIONS
export const requestTitle = makeActionCreator(REQUEST_TITLE);
export const successTitle = makeActionCreator(SUCCESS_TITLE, 'title');
export const failureTitle = makeActionCreator(FAILURE_TITLE, 'error');
