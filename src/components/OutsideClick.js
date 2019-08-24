import React, {Component} from 'react'
import Sigma from './Sigma'

export default class OutsideClick extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.onClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClick)
  }

  onClick = e => {
    const {onOutsideClick} = this.props

    if (this.wrapper && !this.wrapper.contains(e.target)) {
      typeof onOutsideClick === 'function' && onOutsideClick(e)
    }
  }

  render() {
    const {children, ...others} = this.props

    return (
      <Sigma
        ref={ref => this.wrapper = ref}
        {...others}
      >
        {children}
      </Sigma>
    );
  }
}
