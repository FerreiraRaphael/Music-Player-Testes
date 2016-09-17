import React from 'react';
import classes from './style.scss'
import Tab from '../Tab'
import TabSection from '../TabSection'

"use strict"

class TabPanel extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tab : props.defaultTab
    }
  }

  setActiveTab(tab){ this.setState({tab}) }

  render(){
    return (
      <div>
        <div className={classes.tabContainer}>
          <div className={classes.tabs} data-max-width={this.props.defaultMaxWidth}>
            {this.props.tabs.map( tab => {
              tab.active = tab.id === this.state.tab
              return (
                <Tab key={tab.id}
                  setActiveTab={::this.setActiveTab}
                  {...tab} />
              )
            })}
          </div>
        </div>

        <div className={classes.sectionsContainer}>
          <div className={classes.sections}>
            {this.props.tabs.map( tab => (
                <TabSection key={tab.id}
                {...tab} />
              ))}
          </div>
        </div>
      </div>
    )
  }
}

TabPanel.defaultProps = {
  defaultMaxWidth: "1024",
  tabs: []
}
TabPanel.propTypes = {
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string,
      content: React.PropTypes.func,
      disable: React.PropTypes.bool
    })
  ).isRequired,
  defaultMaxWidth: React.PropTypes.string.isRequired
}

export default TabPanel
