export const getMusic = (state, index) => {
  let id = state.playList.musics.ids[index]
  return id ? state.playList.musics.list[id] : {}
}
