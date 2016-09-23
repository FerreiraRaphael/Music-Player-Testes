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
  index + 1
  if there's no more music and repeat is on,
      index = 0
  changeMusicIndex(index)
  lista = if shuffle is on ? shuffledList : list
  selectMusic(lista[index]) // selectMusic() player action
}
```
*backward()thunk*
```
{
  if currentTime is less then 5 segundos
    setCurrentTime(0)
  else
    index - 1
    if is less than 0 and repeat is on,
        index = selectedList.lastIndex
    changeMusicIndex(index)
    lista = if shuffle is on ? shuffledList : list
    selectMusic(lista[index]) // selectMusic() player action
}
```
*updateShuffleList()*
> shuffle shuffledList
```
{

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

*removeFromPlaylist(music)*{

}
*removeFromPlaylistAndSelect(music)thunk*{

}
