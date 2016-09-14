/**
 * Created by raphael on 14/07/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'
import Player from 'components/Player'

export class PlayerContainer extends React.Component{

  // ------------------------------------
  // Life Circle Functions
  // ------------------------------------
  constructor(props,dispatch){
    super(props)
    this.state = { progressBar: {
      width: 0,
      mouseDown: false,
      mouseOver: false
    }} }

  componentDidMount(){
  }

  render(){
    return <Player {...this.props} /> }
}

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => (state.player)

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */
PlayerContainer.propTypes = {

}

export default connect(mapStateToProps, mapActionCreators)(PlayerContainer)
