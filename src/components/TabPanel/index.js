import React from 'react';
import classes from './style.scss'
import Tab from '../Tab'
import TabSection from '../TabSection'
"use strict"
const TabPanel = (props) => (
    <div>
      <div className={classes.tabContainer}>
        <div className={classes.tabs} data-max-width={props.defaultMaxWidth}>
          {props.tabs.map( tab => (
              <Tab {...tab} />
            ))}
        </div>
      </div>

      <div className={classes.sectionsContainer}>
        <div className={classes.sections}>
          {props.tabs.map( tab => (
              <TabSection {...tab} />
            ))}
        </div>
      </div>
    </div>
  )

TabPanel.defaultProps = {
  defaultMaxWidth: "1024",
  tabs: []
}
TabPanel.propTypes = {
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string,
      content: React.PropTypes.element,
      disable: React.PropTypes.bool
    })
  ).isRequired,
  defaultMaxWidth: React.PropTypes.string.isRequired
}

export default TabPanel
