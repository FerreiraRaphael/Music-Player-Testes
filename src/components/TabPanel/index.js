import React from 'react';
import classes from './style.scss'
import Tab from '../Tab'
import TabSection from '../TabSection'
import { transform } from '../../utils/CssUtils'

"use strict"

//TODO: Need to make TabSection render others components,
//      looks like I need to do this in a diferent way,
//      look at: https://github.com/reactjs/react-tabs

class TabPanel extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tab : props.defaultTab,
      offSetLeft: 0
    }
  }

  setActiveTab(tab, offSetLeft){
    this.setState({tab,offSetLeft}) }

  render(){
    const indicator__styles = {
      width: `${100 / this.props.tabs.length}%`,
      ...transform(`translateX(${this.state.offSetLeft}px)`)
    }
    return (
      <div>
        <div className={classes.tabContainer}>
          <div className={classes.tabs} data-max-width={this.props.defaultMaxWidth}>
            {this.props.tabs.map( (tab, i) => {
              console.log(tab)
              tab.active = i === this.state.tab
              return (
                <Tab key={i}
                  id={i}
                  setActiveTab={::this.setActiveTab}
                  {...tab} />
              )
            })}
            <div style={indicator__styles} className={classes.indicator} ></div>
          </div>
        </div>

        <div className={classes.sectionsContainer}>
          <div className={classes.sections}>
            {this.props.tabs.map( (tab, i) => (
                <TabSection key={i}
                id={i}
                {...tab} >
                  {/* {React.cloneElement(tab.content)} */}
                </TabSection>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

TabPanel.defaultProps = {
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
