/**
 * Created by raphael on 14/07/16.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const STOP = 'STOP'
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const MOUSE_DOWN_PROGRESS_BAR = 'MOUSE_DOWN_PROGRESS_BAR'
export const MOUSE_UP_PROGRESS_BAR = 'MOUSE_UP_PROGRESS_BAR'
export const MOUSE_MOVE_PROGRESS_BAR = 'MOUSE_MOVE_PROGRESS_BAR'
export const MOUSE_OVER_PROGRESS_BAR = 'MOUSE_OVER_PROGRESS_BAR'
export const MOUSE_OUT_PROGRESS_BAR = 'MOUSE_OUT_PROGRESS_BAR'
export const FORWARD = 'FORWARD'
export const BACKWARD = 'BACKWARD'
export const VOLUME_CHANGE = 'VOLUME_CHANGE'
export const TOGGLE_RANDOM = 'TOGGLE_RANDOM'
export const TOGGLE_REPEAT = 'TOGGLE_REPEAT'

// ------------------------------------
// Helpers
// ------------------------------------
const actionObject = (type,payload) => ({type,payload})


// ------------------------------------
// Actions
// ------------------------------------
//
export function play ( value = 'PLAYING'){ return actionObject(PLAY, value)}

export function pause ( value = 'PAUSED'){ return actionObject(PAUSE, value)}

// export function play (value = 'PLAYING') {
//     return {
//         type: PLAY,
//         payload: value
//     }
// }
// export function pause (value = 'PAUSED') {
//     return {
//         type: PAUSE,
//         payload: value
//     }
// }

export function stop (value = 'STOPPED') {
    return {
        type: STOP,
        payload: value
    }
}

export function toggleMenu (value = false) {
  return {
    type: TOGGLE_MENU,
    payload: value
  }
}

export function mouseDownProgressBar (value = { width: '0px'}){
  return {
    type: MOUSE_DOWN_PROGRESS_BAR,
    payload: Object.assign({}, value, {mouseOver:false,mouseDown:true})
  }
}

export function mouseUpProgressBar (value = { mouseDown: false }){
  return {
    type: MOUSE_UP_PROGRESS_BAR,
    payload: value
  }
}

export function mouseMoveProgressBar (value = '0px'){
  return {
    type: MOUSE_MOVE_PROGRESS_BAR,
    payload: value
  }
}

export const mouseOverProgressBar = (value = { width__mouse: '0px', mouseOver: false}) => actionObject(MOUSE_OVER_PROGRESS_BAR,value)

export const mouseOutProgressBar = ( value = { mouseOver: false, width__mouse: '0px' }) => actionObject(MOUSE_OUT_PROGRESS_BAR, value)


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
    stop,
    mouseDownProgressBar
}
const musicPlayStatusHandler = (state, action) => {
  debugger
  let newState = state
  newState.music.status = action.payload
  return newState
}
const progressBarHandler = (state, action) => Object.assign({}, state.progress__bar, action.payload)
const ACTION_HANDLERS = {
    [PLAY]: musicPlayStatusHandler,
    [PAUSE]: musicPlayStatusHandler,
    [STOP]: musicPlayStatusHandler,
    [MOUSE_DOWN_PROGRESS_BAR]: progressBarHandler
}

// ------------------------------------
// Reducer
// ------------------------------------
import Music from '../../models/Music'
const music = new Music()
const initialState = {
  music,
  player: null,
  progressBar: {
    mouseOver: false,
    mouseDown: false,
    width: '0px',
    width__mouse: '0px'
  },
  menu: false
}
export default function playerReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    if(handler)console.log(handler(state,action))
    return handler ? handler(state, action) : state
}
