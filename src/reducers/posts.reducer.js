import { ADD_POST } from '../actions/posts.action'
const initState = {
  posts: []

}

export function getPosts(state = initState, action) {

  console.log("state:" + JSON.stringify(state));
  console.log("payload:" + JSON.stringify(action.payload));

  switch (action.type) {
    case ADD_POST:
      // return [ ...state, action.payload ]
      return {
        ...state,
        posts: action.payload
      }
    default:
      return state
  }
}


