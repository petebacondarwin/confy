import deepFreeze from 'deep-freeze';

// ACTION TYPES
export const notificationsActionTypes = {
  ERROR: 'notifications/ERROR',
  WARNING: 'notifications/WARNING',
  INFO: 'notifications/INFO',
  CLEAR: 'notifications/CLEAR'
};


// STATE SHAPE
// {
//   notifications: [
//     {type: ERROR, message: someError},
//     ...
//   ]
// }


// REDUCERS
export function reducer(state = {}, action) {
  switch(action.type) {
    case notificationsActionTypes.ERROR:
    case notificationsActionTypes.WARNING:
    case notificationsActionTypes.INFO:
      state = [...state, {type: action.type, message: action.message}];
      break;
    case notificationsActionTypes.CLEAR:
      state = state.filter((notification) => notification !== action.notification);
      break;
  }
  deepFreeze(state);
  return state;
}


// ACTION CREATORS
export const errorAction = createNotificationAction(notificationsActionTypes.ERROR);
export const warningAction = createNotificationAction(notificationsActionTypes.WARNING);
export const infoAction = createNotificationAction(notificationsActionTypes.INFO);
export const clearNotificationAction = (notification) => ({type: notificationsActionTypes.CLEAR, notification});

function createNotificationAction(type) { return (message) => ({type, message}); }
