import React from 'react'
import Header from '../../components/Header'
import PlayerContainer from '../../containers/PlayerContainer'
import PlayerSideBar from '../../containers/PlayerSideBar'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <div className='container text-center'>
      {/*<Header />*/}
      <div className={classes.mainContainer}>
        {children}
        <PlayerSideBar />
      </div>
    </div>
    <PlayerContainer />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
