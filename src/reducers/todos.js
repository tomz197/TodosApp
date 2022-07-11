const todosReducer = (state = [], action) => {
  switch(action.type){

    case 'ADDTODO':
      return [...state, action.payload];

    case 'DELETETODO':
      return state.filter(item => item.id !== (action.payload.id));

    case 'UPDATETODOSTATE':
      return state.map(item => 
        item.id === action.itemId
        ? {...item, state: action.newState}
        : item
      );
      
    default:
      return state;
  };
};
export default todosReducer;