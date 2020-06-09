
export const ADD_POST = 'ADD_POST'
export const ADD_POST_ID = 'ADD_POST_ID'

export const addPostAction = (new_posts) => {
    console.log("NEW POST: "+ JSON.stringify(new_posts))
    return (dispatch) => {
        dispatch({
            type: ADD_POST,
            payload: new_posts
        })
    }
}

export const addPostIdAction = (newPostId) => {
    console.log("NEW POST ID: "+ JSON.stringify(newPostId))
    return (dispatch) => {
        dispatch({
            type: ADD_POST_ID,
            postId: newPostId
        })
    }
}










