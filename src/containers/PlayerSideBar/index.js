// import React from 'react'
// import { connect } from 'react-redux'
// import {actions, asyncActions} from './modules'
// import PlayerList from '../../components/SideBar'
// import TabPanel from '../../components/TabPanel'
//
// export class PlayerListContainer extends React.Component{
//   constructor(props){
//     super(props)
//   }
//   componentDidMount(){
//     // this.props.fetchTrack('https://soundcloud.com/sofitukker/drinkee-vintage-culture-slow-motion-remix')
//     // this.props.fetchTrack('https://soundcloud.com/robo5official/boasorte1')
//   }
//   render(){
//     return <PlayerList />
//   }
// }

// const mapActionCreators = {...actions, ...asyncActions}
// const mapStateToProps = (state) => (state.player)
import PlayerSideBar from './component'

export default PlayerSideBar

// export default connect(mapStateToProps, mapActionCreators)(PlayerListContainer)
