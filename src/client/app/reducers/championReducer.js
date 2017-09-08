export function championReducer (state = {champions: {0: null, 1: null, 2: null}}, action) {
  switch(action.type) {
    case "CHAMPION_DETAILS": {
      let oldState = state;
      let newState = Object.assign({}, oldState, {champions: action.payload});
      return newState;
      break;
    }
  }
  return state;
}