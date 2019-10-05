// Types
// import types here

// Initial state
const INITIAL_STATE = {
  fooExpenses: ['1', '2', '3'],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FOO':
      return state;
    default:
      return state;
  }
}
