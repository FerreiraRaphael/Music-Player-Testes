import React from 'react'
import Tab from './Tab'
import Indicator from './Indicator'
import classes from './style.scss'
import binder from '../../utils/MethodsBinder'

class Tabs extends React.Component {
  constructor(props){
    super(props)
    binder(this,
      'handleClickTab', 'moveIndicator')
  }

  handleClickTab(activeTab){
    if(this.props.onChange)
      this.props.onChange(activeTab)
  }

  moveIndicator(offsetLeft){
      if(this._indicator)
        Object.assign(this._indicator.style, transform(`translateX(${offsetLeft}px)`)) }

  // renderIndicator(){
  //     let {children} = this.props
  //     return (
  //       )
  // }

  render(){
    let { children, activeTab } = this.props
    return (
      <div className={classes.tabContainer}>
        <div className={classes.tabs} >
          <Indicator width={`${100 / children.length}%`} activeTab={activeTab}/>
          {React.Children.map(children, (child, tabId) =>
                      React.cloneElement(child, {
                          tabId,
                          active: tabId === activeTab,
                          onClick: this.handleClickTab,
                          // moveIndicator: this.moveIndicator
                      })
                  )}
        </div>
      </div>
    )
  }
}

const TabPropType = (props, propName, componentName) => {
    const prop = props[propName];
    return prop.type !== Tab && new Error(`'${componentName}' only accepts 'Tab' as children.`);
};

Tabs.defaultProps = {
  activeTab: 0
}

Tabs.propTypes = {
  activeTab: React.PropTypes.number,
  children: React.PropTypes.oneOfType([
      TabPropType,
      React.PropTypes.arrayOf(TabPropType)
  ]),
  onChange: React.PropTypes.func
}

export default Tabs
