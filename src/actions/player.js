import types from '../constants/actionsTypes'

export function changeMusic(music = types.NEXT){
  return {
    type: types.CHANGE_MUSIC,
    music
  }
}
