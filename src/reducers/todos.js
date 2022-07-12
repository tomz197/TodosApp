const todosReducer = (state = [], action) => {
  switch(action.type){

    case 'ADDTODO':
      return [...state, action.payload];

    case 'LOADTODOS':
      return action.payload;

    case 'DELETETODO':
      let newList = [...state]
      return newList.filter(item => item.id !== action.payload)

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