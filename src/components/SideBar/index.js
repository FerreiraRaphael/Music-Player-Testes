import React from 'react'
import classes from './style.scss'

const SideBar = props => {
  "use string"
  return (
    <div className={classes.side__bar__container}>
      {props.children}
    </div>
  )
}

export default SideBar
