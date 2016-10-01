import playlist from './playlist'
import * as actions from '../actions/playlist'

describe('Playlist reducer spec', () => {
  it('should be a function', () => {
    expect(playlist).to.be.a('function')
  })
  it('should return the default state, if nothing is passed', () => {
    expect(playlist(undefined, {})).to.be.deep.equal({
      indexPlayingMusic: 0,
      ids: [],
      shuffledIds: [],
      musics: {},
      repeat: false,
      shuffle: false
    })
  })
  describe('addMusicHandler spec', ()=>{
    it('should add music to playlist', () => {
      let state = playlist(undefined,actions.addMusic({id:1}))
      expect(state)
        .to.be.deep.equal({
          indexPlayingMusic: 0,
          ids: [1],
          shuffledIds: [],
          musics: {1:{id:1}},
          repeat: false,
          shuffle: false
        })
      expect(playlist(state, actions.addMusic({id:2})))
        .to.be.deep.equal({
          indexPlayingMusic: 0,
          ids: [1,2],
          shuffledIds: [],
          musics: {
              1:{id:1},
              2:{id:2}
            },
          repeat: false,
          shuffle: false
        })
    })
    it('should not repeat musics', ()=>{
      let state = playlist(undefined,actions.addMusic({id:1}))
      expect(playlist(state,actions.addMusic({id:1})))
        .to.be.deep.equal({
          indexPlayingMusic: 0,
          ids: [1],
          shuffledIds: [],
          musics: {1:{id:1}},
          repeat: false,
          shuffle: false
        })
    })
    it('should add to shuffledList if shuffle is on', () => {
      let returnState = {
        indexPlayingMusic: 0,
        ids: [],
        shuffledIds: [],
        musics: {},
        repeat: false,
        shuffle: true
      }
      let expectState = {
        indexPlayingMusic: 0,
        ids: [1],
        shuffledIds: [1],
        musics: {1:{id:1}},
        repeat: false,
        shuffle: true
      }
      returnState = playlist(returnState,actions.addMusic({id:1}))
      expect(returnState).to.be.deep.equal(expectState)
    })
  })
  describe(`removeMusicHandler spec`, ()=>{
    it(`should return same state if music dosent exist`, () => {
      let returnState = {
        indexPlayingMusic: 0,
        ids: [1,2,3,4],
        shuffledIds: [],
        musics: {
          1:{id:1},
          2:{id:2},
          3:{id:3},
          4:{id:4}
        },
        repeat: false,
        shuffle: false
      }
      let expectState = {
        indexPlayingMusic: 0,
        ids: [1,2,3,4],
        shuffledIds: [],
        musics: {
          1:{id:1},
          2:{id:2},
          3:{id:3},
          4:{id:4}
        },
        repeat: false,
        shuffle: false
      }
      returnState = playlist(returnState, actions.removeMusic({id:5}))
      expect(returnState).to.be.deep.equal(expectState)
    })
    it(`should remove music from playlist`, () => {
      let returnState = {
        indexPlayingMusic: 0,
        ids: [1],
        shuffledIds: [],
        musics: {1:{id:1}},
        repeat: false,
        shuffle: false
      }
      let expectState = {
        indexPlayingMusic: 0,
        ids: [],
        shuffledIds: [],
        musics: {},
        repeat: false,
        shuffle: false
      }
      returnState = playlist(returnState, actions.removeMusic({id:1}))
      expect(returnState).to.be.deep.equal(expectState)
    })
    it(`should remove music from shuffled list if shuffle is on`, () => {
      let returnState = {
        indexPlayingMusic: 0,
        ids: [1],
        shuffledIds: [1],
        musics: {1:{id:1}},
        repeat: false,
        shuffle: true
      }
      let expectState = {
        indexPlayingMusic: 0,
        ids: [],
        shuffledIds: [],
        musics: {},
        repeat: false,
        shuffle: true
      }
      returnState = playlist(returnState, actions.removeMusic({id:1}))
      expect(returnState).to.be.deep.equal(expectState)
    })
  })
})
