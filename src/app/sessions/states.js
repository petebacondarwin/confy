// ACTION TYPES
export const sessionsActionTypes = {
  SUBSCRIBE: 'sessions/SUBSCRIBE',
  UNSUBSCRIBE: 'sessions/UNSUBSCRIBE',
  UPDATE: 'sessions/UPDATE',
  SAVE: 'sessions/SAVE'
};

// STATUS TYPES
export const sessionsStatusTypes = {
  SUBSCRIBED: 'sessions/SUBSCRIBED',
  UNSUBSCRIBED: 'sessions/UNSUBSCRIBED'
};


// COMMON STATES
const UNSUBSCRIBED_STATE = {
  status: sessionsStatusTypes.UNSUBSCRIBED,
  items: []
};

const SUBSCRIBED_STATE = {
  status: sessionsStatusTypes.SUBSCRIBED,
  items: []
};

// REDUCERS
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

// ACTION CREATORS
export function subscribeAction() {
  return { type: sessionsActionTypes.SUBSCRIBE };
}

export function unsubscribeAction() {
  return { type: sessionsActionTypes.UNSUBSCRIBE };
}

export function updateAction(snapshot) {
  return {
    type: sessionsActionTypes.UPDATE,
    sessions: snapshot.val()
  };
}

export function saveAction(session) {
  return {
    type: sessionsActionTypes.SAVE,
    session: session
  };
}