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
  AutoCrud,
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
              <Col width={{xs: '100%', md: '40%'}} xs={'width: 100%'}>
                <Card>
                  <ActionForm
                    debug
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
              <Col width={{xs: '100%', md: '60%'}} p={0}>
                <AutoCrud
                  collection={'Post'}
                  filters={[
                    {
                      name: 'title',
                      label: 'Title',
                      placeholder: 'Title'
                    }
                  ]}
                  fields={[
                    ['_id', 'Id', null, true],
                    ['title', 'Title', null, true]
                  ]}
                />
              </Col>
            </Row>
          </Container>
        </Context>
      </ThemeProvider>
    )
  }
}
