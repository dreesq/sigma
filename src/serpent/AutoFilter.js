import React, {Component, Fragment} from 'react'
import Sigma from '../components/Sigma'
import Pagination from '../components/Pagination'
import Table from '../components/Table'
import Card from '../components/Card'
import Filters from '../components/Filters'
import Alert from '../components/Alert'
import Button from '../components/Button'
import {Input} from '../components/Form'
import {Container, Row, Col} from '../components/Grid'
import {get} from '../utils'

class AutoFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      search: '',
      filters: {},
      sorts: {},
      pagination: {},
      data: [],
      errors: false,
      loading: true
    }
  }

  onFilter = async (filters = {}, usePage = false) => {
    const {page, ...others} = filters
    await this.load(usePage ? (+page || 1) : 1, others, {}, usePage)
  };

  reload = async (page = false, filters = false, sorts = false) => {
    page = page || this.state.page;
    filters = filters || this.state.filters;
    sorts = sorts || this.state.sorts;

    this.filter.setFilters({
      page,
      ...filters
    });
  };

  async load(page = 1, filters = {}, sorts = {}, isMount) {
    const {client} = this.context
    const {action, withPagination = false} = this.props

    this.setState({
      loading: true
    })

    const {data, errors} = await client[action]({
      page,
      filters,
      sorts
    })

    if (errors) {
      return this.setState({
        loading: false,
        errors
      })
    }

    const state = {
      filters,
      sorts,
      page,
      data: [],
      loading: false,
      errors: false
    }

    if (isMount && filters.search) {
      state.search = filters.search
    }

    if (withPagination) {
      state.pagination = data.pagination
      state.data = data.data
    } else {
      state.data = data
    }

    this.setState(state)
  }

  onPageChange = async page => {
    this.filter.setFilter('page', page, true)
  };

  sort = async field => {
    const {sorts, filters} = this.state

    for (const key in sorts) {
      if (key === field[0]) {
        continue
      }

      sorts[key] = 1
    }

    await this.load(1, filters, {
      [field[0]]: sorts[field[0]] === -1 ? 1 : -1
    })
  };

  onSearch = e => {
    const {value} = e.target

    this.setState({
      search: value
    })

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.filter.setFilter('search', value)
    }, 1000)
  };

  onClear = () => {
    this.setState({
      search: ''
    });
  };

  render() {
    const {
      search,
      loading,
      errors,
      data,
      sorts,
      pagination,
      page
    } = this.state

    const {
      title = 'Title',
      withSearch,
      fields = [],
      filters = [],
      headerExtra,
      bodyExtra,
      footerExtra,
      withPagination
    } = this.props

    return (
      <Container fluid>
        <Row>
          <Col>
            <Sigma position={'relative'} d={'flex'} alignItems={'center'}>
              <h3>{title}</h3>
              <Sigma ml={'auto'} d={'flex'} alignItems={'center'}>
                {withSearch && <Input placeholder={'Search'} value={search} container={{mr: 13}} onChange={this.onSearch} />}
                {headerExtra && headerExtra}
                <Filters
                  ref={ref => this.filter = ref}
                  onClear={this.onClear}
                  extra={[
                    'page',
                    'search'
                  ]}
                  onFilter={this.onFilter}
                  fields={filters}
                />
              </Sigma>
            </Sigma>
          </Col>
          {
            errors && (
              <Col>
                <Alert color={'danger'}>
                  An error occurred while fetching the data
                </Alert>
              </Col>
            )
          }
          {bodyExtra}
          <Col>
            <Card className={loading ? 'loading' : ''}>
              {
                !loading && data.length === 0 && (
                  <Alert color={'secondary'}>
                    There are no entries to display
                  </Alert>
                )
              }
              {
                data.length > 0 && (
                  <Fragment>
                    <Table>
                      <thead>
                        <tr>
                          {
                            fields.map((field, key) => {
                              return (
                                <Sigma as={'th'} key={key} {...(field[3] ? {cursor: 'pointer', onClick: e => this.sort(field)} : {})}>
                                  {field[1]}
                                  {field[3] && <Sigma d={'inline'} ml={5} dangerouslySetInnerHTML={{__html: sorts[field[0]] === -1 ? '&#9652;' : '&#9662;'}} />}
                                </Sigma>
                              )
                            })
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map((row, key) => {
                            return (
                              <tr key={key}>
                                {
                                  fields.map((field, subKey) => {
                                    return (
                                      <td key={`${key}-${subKey}`}>
                                        {
                                          (() => {
                                            let value = field[0] ? get(field[0], row) : row;

                                            if (typeof field[2] === 'function') {
                                              return field[2](value, row);
                                            }

                                            return value;
                                          })()
                                        }
                                      </td>
                                    )
                                  })
                                }
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                    {withPagination && pagination.pages > 1 && <Pagination currentPage={page} totalPages={pagination.pages} onChange={this.onPageChange} mt={11} />}
                  </Fragment>
                )
              }
              {footerExtra}
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

AutoFilter.contextTypes = {
  client: () => null
}

export default AutoFilter
