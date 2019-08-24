import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Sigma from './Sigma'
import Card from './Card'
import OutsideClick from './OutsideClick'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  onOutsideClick = e => {
    const {onClose} = this.props

    if (onClose) {
      return onClose()
    }

    this.toggle(false)
  }

  toggle = (open = true, extra = {}) => {
    this.setState({
      open,
      ...extra
    })
  };

  renderModal = () => {
    const {children, dimmerProps, ...others} = this.props

    return (
      <Sigma
        position={'fixed'}
        d={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        top={0}
        zIndex={'3'}
        width={'100%'}
        height={'100%'}
        bg={'rgba(0, 0, 0, 0.3)'}
        {...dimmerProps}
      >
        <OutsideClick onOutsideClick={this.onOutsideClick}>
          <Card width={420} {...others}>
            {children}
          </Card>
        </OutsideClick>
      </Sigma>
    )
  }

  render() {
    const {open} = this.state

    if (!open) {
      return null
    }

    return ReactDOM.createPortal(this.renderModal(), document.body)
  }
}
