import React from 'react'
import Header from '../../components/Header'
import Player from '../../components/Player'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <div className='container text-center'>
      <Header />
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
    <Player />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
