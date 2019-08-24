import React, {Component} from 'react'
import Sigma from '../components/Sigma'
import Pagination from '../components/Pagination'

class AutoFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {},
      sorts: {},
      pagination: {},
      data: [],
      loading: true
    }
  }

  async load(page = 1, filters = {}, sorts = {}) {
    this.setState({
      loading: true
    })

    this.setState({
      filters,
      sorts,
      data: [],
      loading: false
    })
  }

  render() {
    return null
  }
}

AutoFilter.propTypes = {
  client: () => null
}

export default AutoFilter
