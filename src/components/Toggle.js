import React, {Component} from 'react'
import Sigma from './Sigma'
import {getValue} from '../utils'

export default class Toggle extends Component {
  css = props => {
    const color = props.color || 'primary'

    return `
        .switch {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 30px;
        }
  
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
  
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
        }
  
        .slider:before {
          position: absolute;
          content: "";
          height: 24px;
          width: 24px;
          left: 4px;
          bottom: 3px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }
  
        input:checked + .slider {
          background-color: ${getValue(`colors.${color}`, props)};
        }
  
        input:focus + .slider {
          box-shadow: 0 0 1px ${getValue(`colors.${color}`, props)};
        }
  
        input:checked + .slider:before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
        
        .slider.round {
          border-radius: 29px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
    `
  };

  render() {
    const {onChange, checked, label, ...others} = this.props

    return (
      <Sigma css={this.css} {...others} d={'flex'} alignItems={'center'}>
        <label className='switch' ref={ref => this.el = ref}>
          <input type='checkbox' onChange={onChange} checked={checked} />
          <span className='slider round' />
        </label>
        {label && <Sigma ml={9} cursor={'pointer'} onClick={e => this.el.click()}>{label}</Sigma>}
      </Sigma>
    )
  }
}
