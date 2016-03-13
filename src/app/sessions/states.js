export const sessionsActionTypes = {
  SUBSCRIBE: 'sessions/SUBSCRIBE',
  UNSUBSCRIBE: 'sessions/UNSUBSCRIBE',
  UPDATE: 'sessions/UPDATE'
};

export const sessionsStatusTypes = {
  SUBSCRIBED: 'sessions/SUBSCRIBED',
  UNSUBSCRIBED: 'sessions/UNSUBSCRIBED'
};

const UNSUBSCRIBED_STATE = {
  status: sessionsStatusTypes.UNSUBSCRIBED,
  items: []
};

const SUBSCRIBED_STATE = {
  status: sessionsStatusTypes.SUBSCRIBED,
  items: []
};

export function reducer(state = UNSUBSCRIBED_STATE, action) {
  switch(action.type) {
    case sessionsActionTypes.SUBSCRIBE:
      return SUBSCRIBED_STATE;
    case sessionsActionTypes.UNSUBSCRIBE:
      return UNSUBSCRIBED_STATE;
    case sessionsActionTypes.UPDATE:
      return {
        status: sessionsStatusTypes.SUBSCRIBED,
        items: action.sessions,
        subscription: action.subscription
      };
    default:
      return state;
  }
}