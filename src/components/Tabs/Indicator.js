import React from 'react'
import classes from './style.scss'
import { transform } from '../../utils/CssUtils'

const Indicator = (props) => {
  let { width, activeTab } = props
  let style = {
    width,
    ...transform(`translateX(${100 * activeTab}%)`)
  }
  return (
    <div
      style={style} className={classes.indicator} >
    </div>
  )
}

Indicator.propTypes = {
  width: React.PropTypes.string,
  activeTab: React.PropTypes.number
}

export default Indicator
