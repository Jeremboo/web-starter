import { createActions } from 'redux-actions';

// ACTIONS NAME
export const REQUEST_TITLE = 'REQUEST_TITLE';
export const SUCCESS_TITLE = 'SUCCESS_TITLE';
export const FAILURE_TITLE = 'FAILURE_TITLE';

export const { successTitle, failureTitle, requestTitle } = createActions(
  { SUCCESS_TITLE: (title) => ({ title }) },
  REQUEST_TITLE,
  FAILURE_TITLE,
);
