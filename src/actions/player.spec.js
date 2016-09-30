import * as actions from './player'
import types from '../constants/actionsTypes'

describe('Player actions spec', () => {
  describe('Action creator (changeMusic)', () => {
    it('should return a action with type "CHANGE_MUSIC"',()=>{
      expect(actions.changeMusic()).to.have.property('type', types.CHANGE_MUSIC)
    })

    it('should return a action with property music', () => {
      expect(actions.changeMusic(types.PREV)).to.have.property('music', types.PREV)
    })

    it('should return the next as music by default',() => {
      expect(actions.changeMusic()).to.be.deep.equal({
        type: types.CHANGE_MUSIC,
        music: types.NEXT
      })
    })
  })

  describe('Action creator (toggleShuffle)', () => {
    it('should return a action with type "TOGGLE_SHUFFLE"', () => {
      expect(actions.toggleShuffle()).to.have.property('type', types.TOGGLE_SHUFFLE)
    })
    it('should return a action with property toggle', () => {
      expect(actions.toggleShuffle(false)).to.have.property('toggle', false)
    })
    it('should return true by default', () => {
      expect(actions.toggleShuffle()).to.be.deep.equal({
        type:types.TOGGLE_SHUFFLE,
        toggle: true
      })
    })
  })

  describe('Action creator (toggleRepeat)', () => {
    it('should return a action with type "TOGGLE_REPEAT"', () => {
      expect(actions.toggleRepeat()).to.have.property('type', types.TOGGLE_REPEAT)
    })
    it('should return a action with property toggle', () => {
      expect(actions.toggleRepeat(false)).to.have.property('toggle', false)
    })
    it('should return true by default', () => {
      expect(actions.toggleRepeat()).to.be.deep.equal({
        type:types.TOGGLE_REPEAT,
        toggle: true
      })
    })
  })
  describe('Action creator (addMusic)', () => {
    it('should return a action with type "ADD_MUSIC"', () => {
      expect(actions.addMusic()).to.have.property('type', types.ADD_MUSIC)
    })
    it('should return a action with property music', () => {
      expect(actions.addMusic(false)).to.have.property('music', false)
    })
    it('should return a empty object by default', () => {
      expect(actions.addMusic()).to.be.deep.equal({
        type:types.ADD_MUSIC,
        music: {}
      })
    })
  })
  describe('Action creator (removeMusic)', () => {
    it('should return a action with type "REMOVE_MUSIC"', () => {
      expect(actions.removeMusic()).to.have.property('type', types.REMOVE_MUSIC)
    })
    it('should return a action with property music', () => {
      expect(actions.removeMusic(false)).to.have.property('music', false)
    })
    it('should return a empty object by default', () => {
      expect(actions.removeMusic()).to.be.deep.equal({
        type:types.REMOVE_MUSIC,
        music: {}
      })
    })
  })
})
