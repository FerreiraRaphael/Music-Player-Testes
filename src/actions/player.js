import types from '../constants/actionsTypes'

export function changeMusic(music = types.NEXT){
  return {
    type: types.CHANGE_MUSIC,
    music
  }
}

export function toggleShuffle(toggle = true){
  return {
    type: types.TOGGLE_SHUFFLE,
    toggle
  }
}

export function toggleRepeat(toggle = true){
  return {
    type: types.TOGGLE_REPEAT,
    toggle
  }
}

export function addMusic( music = {} ){
  return {
    type: types.ADD_MUSIC,
    music
  }
}
