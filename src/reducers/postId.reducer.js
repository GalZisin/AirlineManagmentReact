import { ADD_POST_ID } from '../actions/posts.action'
const initState = {
    postId: 0
}

export function getPostId(state = initState, action) {

    switch (action.type) {
        case ADD_POST_ID:
            return {
                ...state,
                postId: action.postId
            }
        default:
            return state
    }
}