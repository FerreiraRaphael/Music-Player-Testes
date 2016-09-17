import React from 'react'
import classes from '../TabPanel/style.scss'
import classnames from 'classnames'
"use strict"

class Tab extends React.Component {
  constructor(props){
    super(props)
  }

  onClick(){
    this.props.setActiveTab(this.props.id, this._span.offsetLeft) }

  render() {

    return (
      <span ref={ span => this._span = span }
        className={classnames({[classes.tab]: true, [classes.active]: this.props.active})}
        onClick={ () => this.onClick() }>
        <span className={classes.text}>{this.props.title}</span>
      </span>
    )
  }
}

Tab.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Tab
