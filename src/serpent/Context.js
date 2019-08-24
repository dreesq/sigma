import React, {Component} from 'react'

class Context extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const {client, debug} = this.props
    await client.setup()
    this.setState({ loading: false })
  }

  getChildContext() {
    const {client} = this.props

    return {
      client
    }
  }

  render() {
    const {loading} = this.state
    const {children} = this.props

    if (loading) {
      return null
    }

    return children
  }
}

Context.childContextTypes = {
  client: () => null
}

export default Context
