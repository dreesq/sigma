import React, {Component, Fragment} from 'react'
import Serpent from '@dreesq/serpent-client'
import axios from 'axios'
import {ThemeProvider} from 'styled-components'
import {
  Context,
  Card,
  Base,
  ActionForm,
  ActionLoader,
  AutoFilter,
  Container,
  Row,
  Col,
  Sigma,
  ActionAlert
} from '@dreesq/sigma'

export default class extends Component {
  constructor(props) {
    super(props)
    this.client = new Serpent('http://localhost:3001/o', {
      debug: true,
      axios
    })
  }

  render() {
    return (
      <ThemeProvider theme={{
        colors: {
          secondary: '#000'
        }
      }}>
        <Context client={this.client} debug>
          <Base />
          <ActionLoader />
          <Container>
            <Row mt={32}>
              <Col width={'40%'}>
                <Card>
                  <ActionForm
                    action={'testAction'}
                    withLoading
                    withAlert
                    withValidation={false}
                    render={{
                      name() {
                        return (
                          <h1>Name field</h1>
                        )
                      }
                    }}
                    props={{
                      handle: {
                        block: true,
                        color: 'secondary'
                      },
                      input: {

                      }
                    }}
                    defaultValues={{
                      name: 'Name',
                      type: 'Default Value'
                    }} />
                </Card>
              </Col>
              <Col width={'60%'} p={0}>
                <Col>
                  <ActionAlert actions={['*']}/>
                </Col>

                <AutoFilter
                  action={'getPosts'}
                  withSearch
                  filters={[
                    {
                      type: 'text',
                      name: 'title',
                      placeholder: 'Title'
                    }
                  ]}
                  fields={[
                    ['_id', 'Id', (value, row) => (
                      <Fragment>
                        {row.title}
                        <br />
                        <Sigma fontStyle={'italic'} fontSize={11}>{value}</Sigma>
                      </Fragment>
                    ), true],
                    ['title', 'Title', null, true],
                    [null, '', value => 'XXXX']
                  ]}
                  withPagination
                />
              </Col>
            </Row>
          </Container>
        </Context>
      </ThemeProvider>
    )
  }
}
