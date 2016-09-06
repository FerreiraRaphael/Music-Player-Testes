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
export const ADD_MUSIC = 'ADD_MUSIC'
export const ADD_STREAM = 'ADD_STREAM'
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
    newState[prop] = Object.assign({},newState[prop], payload):
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

export function mouseOverProgressBar (value = { width__mouse: '0px', mouseOver: true}) {return actionObject(MOUSE_OVER_PROGRESS_BAR, value)}

export function mouseOutProgressBar ( value = { mouseOver: false, width__mouse: '0px' }) {return actionObject(MOUSE_OUT_PROGRESS_BAR, value)}

export function addMusic ( music = new Music() ) { return actionObject(ADD_MUSIC, { music })}

export function addStream ( player ) { return actionObject(ADD_STREAM, { player }) }

export const actions = {
    play,
    pause,
    stop,
    toggleMenu,
    mouseDownProgressBar,
    mouseUpProgressBar,
    mouseMoveProgressBar,
    mouseOverProgressBar,
    mouseOutProgressBar,
    addMusic,
    addStream
}

// ------------------------------------
// Async Actions
// ------------------------------------
//
export const streamTrack =  music  => {
  return dispatch => {
    SC.stream(`/tracks/${music.id}`)
      .then(player => { dispatch( addStream(player) ) })
      .catch( e => { alert(e)})
  }
}

export const fetchTrack = url => {
  return (dispatch) => {
    SC.resolve(url)
      .then(track => {
        let music = new Music(track)
        dispatch(addMusic(new Music(track)))
        return music
      })
      .catch(e => { alert(e) })
  }
}

export const togglePlayer = toggle => {
  return (dispatch, getState) => {
    let id = getState().player.music.id
    console.log(id)
    SC.stream(`/tracks/${id}`)
      .then(player => {
        dispatch(addStream(player))
        window.player = player
        if(toggle){
          player.pause()
          dispatch(pause())
        }
        else{
          player.play()
          dispatch(play())
        }

        // dispatch( addStream(player) )
        // function play() {
        //   debugger
        //   player.play()
        //   dispatch(play)
        // }
        // function pause(){
        //   player.pause()
        //   dispatch(pause)
        // }
        // toggle ? pause() : play()
      })
      .catch( e => { alert(e)})
  }
}

export const asyncActions = {
  fetchTrack,
  streamTrack,
  togglePlayer
}

// ------------------------------------
// Handlers
// ------------------------------------
//

const musicHandler = (state, action) => (newState(state,'music',{status: action.payload}))
const progressBarHandler = (state, action) => (newState(state, 'progressBar', action.payload))
const toggleMenuHandler = (state, action) => (newState(state ,'menu' ,action.payload))
const normalHandler = (state, action) => (Object.assign({}, state, action.payload))
const ACTION_HANDLERS = {
    [PLAY]: musicHandler,
    [PAUSE]: musicHandler,
    [STOP]: musicHandler,
    [TOGGLE_MENU]: toggleMenuHandler,
    [MOUSE_DOWN_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_UP_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_MOVE_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_OVER_PROGRESS_BAR]: progressBarHandler,
    [MOUSE_OUT_PROGRESS_BAR]: progressBarHandler,
    [ADD_MUSIC]: normalHandler,
    [ADD_STREAM]: normalHandler
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
