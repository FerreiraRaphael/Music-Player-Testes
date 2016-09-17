import React from 'react'
import classes from './style.scss'
import classnames from 'classnames'
import binder from '../../utils/MethodsBinder'
"use strict"

class Tab extends React.Component {
  constructor(props){
    super(props)
  }

  onClick(){
    if(this.props.active) return
      this.props.onClick(this.props.tabId) }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.active)
  //     // this.props.moveIndicator(this._span.offsetLeft)
  // }
  // componentDidMount(props){
  //   if(this.props.active){
  //     console.log(this._span.offsetLeft, this._span.offsetWidth)
  //     this.props.moveIndicator(this._span.offsetLeft)}
  // }
  // componentDidMount(){
  //   if(this.props.active)
  //     this.props.moveIndicator(this._span.offsetLeft) }

  render() {
    return (
      <span ref={ span => this._span = span }
        className={classnames({[classes.tab]: true, [classes.active]: this.props.active})}
        onClick={ () => this.onClick() }>
        <span className={classes.text}>{this.props.children}</span>
      </span>
    )
  }
}

Tab.propTypes = {
  tabId: React.PropTypes.number,
  active: React.PropTypes.bool,
  children: React.PropTypes.string,
  moveIndicator: React.PropTypes.func,
  onClick: React.PropTypes.func
}

export default Tab
