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
    let tags = [
      {
        title: 'teste',
        content: MusicList,
        disable: false
      },
      {
        title: 'teste2',
        content: MusicList,
        disable: false
      }
    ]
    let content = MusicList
    return (
      <SideBar>
        <TabPanel tags={tags}/>
      </SideBar>
    )
  }
}

// const mapActionCreators = {...actions, ...asyncActions}
// const mapStateToProps = (state) => (state.player)

export default PlayerSideBar

// export default connect(mapStateToProps, mapActionCreators)(PlayerListContainer)
