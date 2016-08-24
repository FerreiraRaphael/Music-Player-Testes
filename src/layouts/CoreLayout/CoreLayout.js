import React from 'react'
import Header from '../../components/Header'
import PlayerContainer from '../../routes/Player/containers/PlayerContainer'
import PlayerListContainer from '../../containers/Player/PlayerListContainer'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import 'materialize-css/sass/materialize.scss'
import 'materialize-css/dist/js/materialize.js'
import './materialize.js'


export const CoreLayout = ({ children }) => (
  <div>
    <div className='container text-center'>
      {/*<Header />*/}
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
    <PlayerContainer />
    <PlayerListContainer />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
