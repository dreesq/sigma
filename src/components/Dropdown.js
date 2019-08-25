import React, {Component, Fragment} from 'react'
import Sigma from './Sigma'
import OutsideClick from './OutsideClick'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  onOutsideClick = e => {
    if (this.trigger && this.trigger.contains(e.target)) {
      return
    }

    this.toggle(false)
  }

  toggle = open => {
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

    return (
      <Sigma
        position={'relative'}
        {...others}
      >
        <Sigma
          d={'inline-block'}
          ref={ref => this.trigger = ref}
          onClick={e => this.toggle()}
        >
          {children[0]}
        </Sigma>
        {
          open && (
            <OutsideClick
              position={'absolute'}
              width={'100%'}
              mt={4}
              left={0}
              zIndex={'2'}
              onOutsideClick={this.onOutsideClick}
            >
              {children[1]}
            </OutsideClick>
          )
        }
      </Sigma>
    )
  }
}
