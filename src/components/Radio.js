import React, {Component} from 'react';
import Sigma from './Sigma';
import {getValue} from '../utils'

export default class Radio extends Component {
  css = props => {
    let color = props.color || 'primary';

    return `
      margin-bottom: 5px;
    
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        
        + .radio-label {
          cursor: pointer;
          position: relative;
        
          &:before {
            content: '';
            border-radius: 100%;
            border: 1px solid ${getValue(`colors.${color}`, props)};
            display: inline-block;
            width: 21px;
            height: 21px;
            position: relative;
            margin-right: 7px;
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            top: -1px;
          }
         
        }
        
        &:checked {
          + .radio-label {            
            &:after {
              content: '';
              width: 13px;
              height: 13px;
              background: ${getValue(`colors.${color}`, props)};
              border-radius: 50%;
              display: inline-block;
              position: absolute;
              left: 4px;
              bottom: 2px;
            }
          }
        }
        
        &:disabled {
          + .radio-label {
          cursor: not-allowed;
            &:before {
              box-shadow: inset 0 0 0 4px #f7f7f7;
              border-color: #f7f7f7;
              background: #e8e6e6;
            }
          }
        }
        
        + .radio-label {
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }
      }
    `;
  };

  randomStr = () => Math.random().toString(36).substring(7);

  render() {
    const {name, disabled, onChange, value, checked, label = '', ...others} = this.props;
    const id = this.randomStr();

    return (
      <Sigma css={this.css} {...others}>
        <input type={'radio'} value={value} checked={checked} id={id} name={name} disabled={disabled} onChange={onChange}/>
        <label htmlFor={id} className="radio-label">{label}</label>
      </Sigma>
    )
  }
}
