import React, {Component} from 'react'
import {Constants} from '@dreesq/serpent-client'
import {
  Input,
  Group,
  Button,
  Label,
  Form,
  Text,
  Row,
  Col,
  Container,
  Alert,
  Sigma
} from '../components'

let interval = false

class ActionLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      open: false
    }
  }

  async componentDidMount() {
    const {client} = this.context

    this.onLoadingEnd = this.onLoadingEnd.bind(this)
    this.onLoadingStart = this.onLoadingStart.bind(this)

    this.listeners = client.events.multi({
      [Constants.LOADING_START]: this.onLoadingStart,
      [Constants.LOADING_END]: this.onLoadingEnd
    })
  }

  componentWillUnmount() {
    this.listeners && this.listeners.unbind()
  }

  onLoadingStart() {
    this.setState({
      progress: 0,
      open: true
    })

    interval = setInterval(() => {
      const {progress} = this.state
      const newProgress = progress + (Math.floor(Math.random() * 10) + 20)

      if (newProgress >= 100) {
        return
      }

      this.setState({
        progress: newProgress
      })
    }, 400)
  }

  onLoadingEnd() {
    clearInterval(interval)

    this.setState({
      progress: 100
    })

    setTimeout(() => {
      this.setState({
        open: false,
        progress: 0
      })
    }, 500)
  }

  render() {
    const {color = 'success'} = this.props
    const {open, progress} = this.state

    return React.createElement(Sigma, {
      h: 3,
      bg: color,
      width: `${progress || 0}%`,
      position: 'fixed',
      zIndex: 6,
      top: 0,
      transition: '.4s ease-in',
      display: open ? 'block' : 'hidden'
    })
  }
}

ActionLoader.contextTypes = {
  client: () => null
}

export default ActionLoader
