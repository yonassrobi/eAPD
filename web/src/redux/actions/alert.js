import { APD_CREATE_SUCCESS_MSG } from './aria';

export const ALERT_SUCCESS = 'ALERT_SUCCESS';
export const ALERT_RESOLVE = 'ALERT_RESOLVE';

export const alertApdCreateSuccess = id => ({
  type: ALERT_SUCCESS,
  apdId: id,
  message: APD_CREATE_SUCCESS_MSG
});

export const resolveAlertMessage = i => dispatch => {
  dispatch({
    type: ALERT_RESOLVE,
    message_index: i
  });
};
