// ACTION TYPES
export const sessionsActionTypes = {
  SUBSCRIBE: 'sessions/SUBSCRIBE',
  UNSUBSCRIBE: 'sessions/UNSUBSCRIBE',
  UPDATE_FROM_SERVER: 'sessions/UPDATE',
  EDIT: 'session/EDIT',
  ADD: 'sessions/ADD',
  SAVE: 'sessions/SAVE',
  REMOVE: 'sessions/REMOVE'
};


// REDUCERS
export function reducer(state = {}, action) {
  return {
    sessions: subscriptionReducer(state.sessions, action),
    editing: editingReducer(state.editing, action)
  };
}

function subscriptionReducer(state, action) {
  switch(action.type) {
    case sessionsActionTypes.SUBSCRIBE:
      state = [];
      break;
    case sessionsActionTypes.UNSUBSCRIBE:
      state = undefined;
      break;
    case sessionsActionTypes.UPDATE_FROM_SERVER:
      state = action.sessions;
      break;
  }
  return state;
}

function editingReducer(state = {}, action) {
  switch(action.type) {
    case sessionsActionTypes.EDIT:
    case sessionsActionTypes.ADD:
      state = Object.assign({}, state, { [action.session.id]: action.session });
      break;
    case sessionsActionTypes.SAVE:
      state = Object.assign({}, state);
      delete state[action.session.id];
      break;
  }
  return state;
}

// ACTION CREATORS
export function subscribeAction() {
  return { type: sessionsActionTypes.SUBSCRIBE };
}

export function unsubscribeAction() {
  return { type: sessionsActionTypes.UNSUBSCRIBE };
}

export function updateFromServerAction(sessions) {
  return {
    type: sessionsActionTypes.UPDATE_FROM_SERVER,
    sessions
  };
}

export function editAction(session) {
  return {
    type: sessionsActionTypes.EDIT,
    session: session
  };
}

export function saveAction(session) {
  return {
    type: sessionsActionTypes.SAVE,
    session: session
  };
}

export function deleteAction(session) {
  return {
    type: sessionsActionTypes.REMOVE,
    session: session
  };
}


// SELECTORS FACTORY
export function sessionSelectors(getState) {
  return {
    getSessionItems() {
      return getState().sessions;
    },
    isEditing(session) {
      return !!getState().editing[session.id];
    }
  };
}