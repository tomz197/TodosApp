const todosReducer = (state = [], action) => {
  switch(action.type){

    case 'ADDTODO':
      return [...state, {
        text: action.payload,
        state: "",
        deleted: false,
        id: Date.now()
      }];

    case 'DELETETODO':
      return state.map(item => 
        item.id === action.payload.id
        ? {...item, deleted: true}
        : item
      );

    case 'UPDATETODOSTATE':
      return state.map(item => 
        item.id === action.itemId
        ? {...item, state: action.newState}
        : item
      );
      
    default:
      return state;
  }
};
export default todosReducer;