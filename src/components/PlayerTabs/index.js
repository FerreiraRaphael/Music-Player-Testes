import React from 'react'
import { Tabs, Tab } from '../Tabs'



class PlayerTabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 1
    }
  }

  render(){
    let {activeTab} = this.state
    return (
      <div>
        <Tabs activeTab={activeTab} onChange={(activeTab) => this.setState({activeTab})}>
          <Tab> PlayList </Tab>
          <Tab> Historico </Tab>
        </Tabs>
        <div>
          {activeTab === 0 ? 'É ZERO' : 'É NÃO =['}
        </div>
      </div>
    )
  }
}

export default PlayerTabs
