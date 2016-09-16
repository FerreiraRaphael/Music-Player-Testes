import React from 'react'

const TabSection = (props) => {
  "use strict"

  return (
    <div className={classes.section} data-section={props.title}>
      {props.content}
    </div>
  )
}
TabSection.proptypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.element.isRequired
}

export default TabSection
