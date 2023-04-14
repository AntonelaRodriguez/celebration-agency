const initialState = {
    allEvents: [],
    eventDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ALL_EVENTS':
          return {
            ...state,
            allEvents: action.payload,
          };
        case 'GET_EVENT_DETAIL':
          return {
            ...state,
            eventDetail: action.payload
          };
        case 'POST_EVENT':
            return {
              ...state
            };
        case 'UPDATE_EVENT':
            return{
              ...state
            }
        case 'DELETE_EVENT':
            return{
              ...state
            }
        default:
            return state;
    };
};

export default rootReducer;