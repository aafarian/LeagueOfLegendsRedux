const commentReducer = (state = {}, action) => {
  switch(action.type) {
    case "CHAMPION_DETAILS": {
      state.championImage = action.championImage;
      state.championName = action.championName;
      break;
    }
    default: return state;
  }
  return state;
}


export default commentReducer;