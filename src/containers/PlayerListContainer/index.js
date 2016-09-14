import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'
import PlayerList from '../../components/PlayerList'

export class PlayerListContainer extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.fetchTrack('https://soundcloud.com/livealok/sets/alok-live-burning-man-free-1')
    this.props.fetchTrack('https://soundcloud.com/robo5official/boasorte1')
  }
  render(){
    return <PlayerList />
  }
}

const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => (state.player)


export default connect(mapStateToProps, mapActionCreators)(PlayerListContainer)
