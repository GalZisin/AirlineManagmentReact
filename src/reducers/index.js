import { combineReducers } from 'redux'
import { getPosts } from './posts.reducer'
import { getPostId } from './postId.reducer'
import { authentication } from './authentication.reducer';

export const rootReducer = combineReducers({
    postsData: getPosts,
    postId: getPostId,
    auth: authentication
});
export default rootReducer