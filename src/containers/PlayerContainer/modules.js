/**
 * Created by raphael on 14/07/16.
 */
// ------------------------------------
// Imports
// ------------------------------------
import Music from '../../models/Music'

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
// export const FORWARD = 'FORWARD'
// export const BACKWARD = 'BACKWARD'
// export const VOLUME_CHANGE = 'VOLUME_CHANGE'
// export const TOGGLE_RANDOM = 'TOGGLE_RANDOM'
// export const TOGGLE_REPEAT = 'TOGGLE_REPEAT'

// ------------------------------------
// Helpers
// ------------------------------------
const actionObject = (type,payload) => ({type,payload})

const newState = (state, prop, payload) => {
  let newState = Object.assign({},state)

  typeof newState[prop] === 'object' ?
    Object.assign(newState[prop], payload):
    newState[prop] = payload

  return newState
}

// ------------------------------------
// Actions
// ------------------------------------
//
export function play ( value = 'PLAYING'){ return actionObject(PLAY, value)}

export function pause ( value = 'PAUSED'){ return actionObject(PAUSE, value)}

export function stop (value = 'STOPPED') { return actionObject( STOP, value)  }

export function toggleMenu (value = false) { return actionObject( TOGGLE_MENU, value)  }

export function mouseDownProgressBar (value = { width: '0px'}){ return actionObject( MOUSE_DOWN_PROGRESS_BAR,
  Object.assign({}, value, {mouseOver:false,mouseDown:true})) }

export function mouseUpProgressBar (value = { mouseDown: false }){ return actionObject( MOUSE_UP_PROGRESS_BAR, value)  }

export function mouseMoveProgressBar (value = {width:'0px'}){ return actionObject(MOUSE_MOVE_PROGRESS_BAR, value )}

export const mouseOverProgressBar = (value = { width__mouse: '0px', mouseOver: true}) => actionObject(MOUSE_OVER_PROGRESS_BAR, value)

export const mouseOutProgressBar = ( value = { mouseOver: false, width__mouse: '0px' }) => actionObject(MOUSE_OUT_PROGRESS_BAR, value)

export const actions = {
    play,
    pause,
    stop,
    toggleMenu,
    mouseDownProgressBar,
    mouseUpProgressBar,
    mouseMoveProgressBar,
    mouseOverProgressBar,
    mouseOutProgressBar
}

// ------------------------------------
// Handlers
// ------------------------------------
//

const musicHandler = (state, action) => (newState(state,'music',{status: action.payload}))
const progressBarHandler = (state, action) => (newState(state, 'progressBar', action.payload))
const toggleMenuHandler = (state, action) => (newState(state ,'menu' ,action.payload))
const ACTION_HANDLERS = {
    [PLAY]: musicHandler,
    [PAUSE]: musicHandler,
    [STOP]: musicHandler,
    [TOGGLE_MENU]: toggleMenuHandler,
    [MOUSE_DOWN_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_UP_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_MOVE_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_OVER_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_OUT_PROGRESS_BAR]: progressBarHandler
}

// ------------------------------------
// Reducer
// ------------------------------------

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
    // if(handler)console.log(handler(state, action))
    return handler ? handler(state, action) : state
}
