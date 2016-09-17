import React from 'react'
import classes from '../TabPanel/style.scss'

const onClick = event => { console.log(event.nativeEvent) }

const Tab = (props) => {
  "use strict"
  return (
    <span className={classes.tab} data-tab={props.title}
      onClick={onClick}>
      <span className={classes.text}>{props.title}</span>
    </span>
  )
}

Tab.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Tab
