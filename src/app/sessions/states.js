import deepFreeze from 'deep-freeze';

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


// STATE SHAPE
// {
//   sessions: [
//     {key: sessionKey1, value: sessionValue1},
//     {key: sessionKey2, value: sessionValue2},
//     ...
//   ],
//   editing: {
//     sessionKey1: true,
//     sessionKey2: false,
//     ...
//   }
// }


// REDUCERS
export function reducer(state = {}, action) {
  return deepFreeze({
    sessions: sessionsReducer(state.sessions, action),
    editing: editingReducer(state.editing, action)
  });
}

function sessionsReducer(state, action) {
  switch(action.type) {
    case sessionsActionTypes.SUBSCRIBE:
      state = [];
      break;
    case sessionsActionTypes.UNSUBSCRIBE:
      state = undefined;
      break;
    case sessionsActionTypes.UPDATE_FROM_SERVER:
      state = [];
      action.snapshot.forEach((session) => { state.push({ key: session.key(), value: session.val()}); });
      break;
  }
  return state;
}

function editingReducer(state = {}, action) {
  switch(action.type) {
    case sessionsActionTypes.EDIT:
      state = Object.assign({}, state, {[action.session.key]: true});
      break;
    case sessionsActionTypes.SAVE:
      state = Object.assign({}, state, {[action.session.key]: false});
      break;
  }
  return state;
}

// ACTION CREATORS
export const subscribeAction = () => ({type: sessionsActionTypes.SUBSCRIBE});
export const unsubscribeAction = () => ({type: sessionsActionTypes.UNSUBSCRIBE});
export const updateFromServerAction = (snapshot) => ({type: sessionsActionTypes.UPDATE_FROM_SERVER, snapshot});
export const addAction = createSessionAction(sessionsActionTypes.ADD);
export const editAction = createSessionAction(sessionsActionTypes.EDIT);
export const saveAction = createSessionAction(sessionsActionTypes.SAVE);
export const removeAction = createSessionAction(sessionsActionTypes.REMOVE);

function createSessionAction(type) { return (session) => ({type, session}); }


// SELECTORS FACTORY
export function sessionSelectors(getState) {
  const getSessions = () => getState().sessions;
  const isEditing = (session) => getState().editing[session.key];

  return {
    getSessions,
    isEditing
  };
}