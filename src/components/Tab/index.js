import React from 'react'
import classes from '../TabPanel/style.scss'


const Tab = (props) => {
  "use strict"
  return (
    <span className={classes.tab} data-tab={props.title}>
      <span className={classes.text}>{props.title}</span>
    </span>
  )
}

Tab.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Tab
