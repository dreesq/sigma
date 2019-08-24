import React, {Component} from 'react'
import Sigma from './Sigma'
import OutsideClick from './OutsideClick'

const e = React.createElement

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    this.toggle = this.toggle.bind(this)
    this.onOutsideClick = this.onOutsideClick.bind(this)
  }

  onOutsideClick(e) {
    if (this.trigger && this.trigger.contains(e.target)) {
      return
    }

    this.toggle(false)
  }

  toggle(open) {
    let {open: opened} = this.state
    let value = typeof open === 'undefined' ? !opened : open

    const {onToggle} = this.props
    onToggle && onToggle(value)

    this.setState({
      open: value
    })
  };

  render() {
    let {children, ...others} = this.props
    const {open} = this.state

    children = children(open).props.children

    return e(Sigma, {
      position: 'relative',
      ...others
    }, [
      e(Sigma, {
        ref: ref => this.trigger = ref,
        onClick: e => this.toggle()
      }, children[0]),
      open && e(OutsideClick, {
        position: 'absolute',
        mt: 4,
        onOutsideClick: e => this.onOutsideClick(e)
      }, children[1])
    ])
  }
}

export default Dropdown
