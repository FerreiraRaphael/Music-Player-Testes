import React from 'react'
import { connect } from 'react-redux'
// import {actions, asyncActions} from './modules'
import SideBar from '../../components/SideBar'
import PlayerTabs from '../../components/PlayerTabs'
import MusicList from '../../components/MusicList'

//TODO: Need to be a component, not container

class PlayerSideBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0
    }
  }
  componentDidMount(){
  }
  render(){
    return (
      <div>
        <SideBar >
          <PlayerTabs/>
        </SideBar>
      </div>
    )
  }
}

// const mapActionCreators = {...actions, ...asyncActions}
// const mapStateToProps = (state) => (state.player)

export default PlayerSideBar

// export default connect(mapStateToProps, mapActionCreators)(PlayerSideBar)
