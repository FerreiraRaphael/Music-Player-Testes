// ------------------------------------
// Imports
// ------------------------------------
import { FormatUrl } from '../../utils/UrlFormaters'
import { normalize, arrayOf } from 'normalizr'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { musicsSchema, musicSchema } from '../../constants/Schemas'

// ------------------------------------
// Types
// ------------------------------------
export const ADD_MUSIC = 'ADD_MUSIC'
export const SELECT_MUSIC = 'SELECT_MUSIC'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SHOW_FETCHED_MUSIC = 'SHOW_FETCHED_MUSIC'
// ------------------------------------
// Helpers
// ------------------------------------
const actionObject = (type,payload) => ({type,payload})

// const newState = (state, prop, payload) => {
//   let newState = Object.assign({},state)
//
//   typeof newState[prop] === 'object' ?
//     newState[prop] = Object.assign({},newState[prop], payload):
//     newState[prop] = payload
//
//   return newState
// }

// ------------------------------------
// Actions
// ------------------------------------
//
export function addMusic ( musics = {} ) {
  return actionObject(ADD_MUSIC, musics) }

export function selectMusic( selectedMusicIndex = 0 ){
  return actionObject(SELECT_MUSIC,{
    selectedMusicIndex
  })
}

export function togglePlay( playing = true ){
  return actionObject(TOGGLE_PLAY, {playing})
}

export function showFetchedMusic( fetchedMusic = {} ){
  return actionObject(SHOW_FETCHED_MUSIC, {fetchedMusic})
}

// ------------------------------------
// Thunk
// ------------------------------------
export const selectMusicAndPlay = ( selectedMusicIndex ) => (dispatch, getState) => {
  dispatch(selectMusic(selectedMusicIndex))
  dispatch(togglePlay(true))
}


// export const changeMusic = (playingMusicIndex = 0) => {
//   return actionObject(CHANGE_MUSIC,{
//     playingMusicIndex
//   })
// }

// export const getMusicFromPlayList = index => (dispatch, getState) => {
//     let music = getMusic(getState(), index)
//     dispatch(changeMusic(index))
// }


export const actions = {
    addMusic,
    selectMusic,
    togglePlay,
    selectMusicAndPlay
}

// ------------------------------------
// Async Actions
// ------------------------------------
export const fetchTrackAndAddToPlaylist = url => {
  return (dispatch, getState) => {
    fetch(FormatUrl(url))
      .then(response => response.json())
      .then(track => {
        dispatch(addMusic(track))
      })
      .catch(e => { throw e } )
  }
}

export const fetchTrackAndShowInfo = url => {
  return (dispatch, getState) => {
    fetch(FormatUrl(url))
      .then(response => response.json())
      .then(track => {
        dispatch(showFetchedMusic(track))
      })
      .catch(e => { throw e } )
  }
}

export const asyncActions = {
  fetchTrackAndAddToPlaylist,
  fetchTrackAndShowInfo
}

// ------------------------------------
// Handlers
// ------------------------------------
//
const mergeState = (state,action) => merge({}, state, action.payload)

const addMusicHandler = (state, action) => {
  let {list, ids} = state.musics
  let music = action.payload
  let newState = {
    musics :{
      ids: list[music.id] ? [...ids] : [...ids, music.id],
      list: merge({}, list, { [music.id]: music })
      }
    }
  return merge({},state,newState)
}

const selectMusicHandler = (state, action) => {
  let { list, ids } = state.musics
  let {selectedMusicIndex} = action.payload
  let selectedMusicId = ids[selectedMusicIndex]
  let music = list[selectedMusicId]
  return music ? merge({}, state, {selectedMusicIndex,music}) : state
}

const ACTION_HANDLERS = {
    [ADD_MUSIC]: addMusicHandler,
    [SELECT_MUSIC]: selectMusicHandler,
    [TOGGLE_PLAY]: mergeState,
    [SHOW_FETCHED_MUSIC]: mergeState
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  musics: {
    ids: [],
    list:{}
  },
  music: {},
  fetchedMusic: {},
  selectedMusicIndex: 0,
  playing: false
}

export default function playlistReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // if(handler)console.log(handler(state, action))
    return handler ? handler(state, action) : state
}
