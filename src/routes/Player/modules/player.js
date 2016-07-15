/**
 * Created by raphael on 14/07/16.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const STOP = 'STOP'

// ------------------------------------
// Actions
// ------------------------------------
export function play (value = 'PLAYING') {
    return {
        type: PLAY,
        payload: value
    }
}
export function pause (value = 'PAUSED') {
    return {
        type: PAUSE,
        payload: value
    }
}

export function stop (value = 'STOPPED') {
    return {
        type: STOP,
        payload: value
    }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */

// export const doubleAsync = () => {
//     return (dispatch, getState) => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 dispatch(increment(getState().counter))
//                 resolve()
//             }, 200)
//         })
//     }
// }

export const actions = {
    play,
    pause,
    stop
}
const musicPlayStatusHandler = (state, action) => Object.assign({},{MUSIC_STATUS: action.payload})
const ACTION_HANDLERS = {
    [PLAY]: musicPlayStatusHandler,
    [PAUSE]: musicPlayStatusHandler,
    [STOP]: musicPlayStatusHandler
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {MUSIC_STATUS: 'STOPPED'}
export default function playerReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}