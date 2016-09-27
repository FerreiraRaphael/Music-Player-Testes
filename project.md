#reducers
```javascript
playlist:{
  indexPlayingMusic: 0,
  list: [],
  shuffledList: [],
  repeat: false,
  shuffle: false
}
player:{
  isPlaying: bool
  playingMusic: {}
  currentTime: 0
}
historic:{
  list: []
}
```
#actions
**playlist:**
*changeMusicIndex(index)*

*toggleShuffle(toggle)*

*toggleRepeat(toggle)*

*foward()thunk*
```
{
  lista = if shuffle is on ? shuffledList : list
  addToHistoric(lista[index])
  index + 1
  if there's no more music and repeat is on,
      index = 0
  changeMusicIndex(index)
  selectMusic(lista[index]) // selectMusic() player action
}
```
*backward()thunk*
```
{
  if currentTime is less then 5 seconds
    setCurrentTime(0)
  else
    lista = if shuffle is on ? shuffledList : list
    addToHistoric(lista[index])
    index - 1
    if index is less than 0 and repeat is on,
        index = selectedList.length
    changeMusicIndex(index)
    selectMusic(lista[index]) // selectMusic() player action
}
```

*setShuffleList()*

*updateShuffleList()*
> shuffle list
```
{
  shuffledList = shuffleList(list.slice(indexPlayingMusic))
  setShuffleList(shuffleList)
}
```


*addMusic(music)*
> add music on playlist

*addToPlaylist(music)thunk*
```
{
  addMusic(music)
  updateShuffleList()
  if selectedList length is equal 1 then
    selectMusic(music)
}
```

*removeMusic(music)*
> remove music from playlist

*removeFromPlaylistAndSelect(music)thunk*
```
{
  removeMusic(music)
  updateShuffleList()
  if selectedList length is equal to 0
    selectMusic({})
}
```

**player:**
*togglePlay()*

*selectMusic()*

*setCurrentTime()*

**historic:**
*addToHistoric()*
