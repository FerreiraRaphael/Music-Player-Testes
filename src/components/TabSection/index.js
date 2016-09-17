import React from 'react'
import classes from './style.scss'


const TabSection = (props) => {
  "use strict"

  return (
    <div className={classes.section} data-section={props.title}>
      {props.children}
    </div>
  )
}
TabSection.proptypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.func.isRequired
}

export default TabSection
