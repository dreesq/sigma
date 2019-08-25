import React, {Component} from 'react'
import Sigma from '../components/Sigma'
import Pagination from '../components/Pagination'
import Filters from '../components/Filters';
import {Input} from '../components/Form';
import {Container, Row, Col} from '../components/Grid';

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
    const {title = 'Title'} = this.props;

    return (
      <Container fluid>
        <Row>
          <Col>
            <Sigma position={'relative'} d={'flex'} alignItems={'center'}>
              <h3>{title}</h3>
              <Filters props={{
                dropdown: {
                  ml: 'auto'
                }
              }}/>
            </Sigma>
          </Col>
        </Row>
      </Container>
    );
  }
}

AutoFilter.propTypes = {
  client: () => null
}

export default AutoFilter
