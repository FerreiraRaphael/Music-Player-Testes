import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'
import MusicList from '../../components/MusicList'

class PlayList extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
  }
  render(){
    return (
      <MusicList />
    )
  }
}
const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => (state.player

export default connect(mapStateToProps, mapActionCreators)(PlayList)
