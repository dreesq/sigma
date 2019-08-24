import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Sigma from './Sigma'
import Card from './Card'
import OutsideClick from './OutsideClick'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    this.toggle = this.toggle.bind(this)
    this.onOutsideClick = this.onOutsideClick.bind(this)
  }

  onOutsideClick(e) {
    const {onClose} = this.props

    if (onClose) {
      return onClose()
    }

    this.toggle(false)
  }

  toggle(open = true, extra = {}) {
    this.setState({
      open,
      ...extra
    })
  };

  render() {
    const {children, dimmerProps, ...others} = this.props
    const {open} = this.state

    if (!open) {
      return null
    }

    const card = React.createElement(Card, {
      width: 420,
      ...others
    }, children)

    const content = React.createElement(OutsideClick, {
      onOutsideClick: this.onOutsideClick
    }, card)

    const modal = React.createElement(Sigma, {
      position: 'fixed',
      d: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      zIndex: '3',
      width: '100%',
      height: '100%',
      bg: 'rgba(0, 0, 0, 0.3)',
      ...dimmerProps
    }, content)

    return ReactDOM.createPortal(modal, document.body)
  }
}

export default Modal
