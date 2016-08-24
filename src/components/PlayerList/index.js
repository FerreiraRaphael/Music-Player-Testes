import React from 'react'
import classes from './PlayerList.scss'

const PlayerList = props => {
  "use string"
  return (
    <div className={classes.pĺayer__list__container}>
    <ul className="tabs">
      <li className="tab col s3"><a>Test 1</a></li>
      <li className="tab col s3"><a>Test 2</a></li>
    </ul>
    </div>
  )
}

export default PlayerList
