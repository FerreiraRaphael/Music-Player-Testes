import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'
import SideBar from '../../components/SideBar'
import TabPanel from '../../components/TabPanel'
import MusicList from '../../components/MusicList'

class PlayerSideBar extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    // this.props.fetchTrack('https://soundcloud.com/sofitukker/drinkee-vintage-culture-slow-motion-remix')
    // this.props.fetchTrack('https://soundcloud.com/robo5official/boasorte1')
  }
  render(){
    let tabs = [
      {
        id:1,
        title: 'teste',
        content: () => <MusicList/>,
        disable: false,
        active: true
      },
      {
        id:2,
        title: 'teste2',
        content: () => <MusicList/>,
        disable: false,
        active: false
      }
    ]
    tabs = { tabs }
    return (
      <SideBar>
        <TabPanel
        defaultTab={1}
        { ...tabs } />
      </SideBar>
    )
  }
}

// const mapActionCreators = {...actions, ...asyncActions}
// const mapStateToProps = (state) => (state.player)

export default PlayerSideBar

// export default connect(mapStateToProps, mapActionCreators)(PlayerListContainer)
