import React, {Component} from 'react'
import Serpent from '@dreesq/serpent-client'
import axios from 'axios'
import {ThemeProvider} from 'styled-components'
import {
  Context,
  Card,
  Base,
  ActionForm,
  ActionLoader,
  Container,
  Row,
  Col,
  AutoCrud,
  Text,
  S
} from '@dreesq/sigma'

export default class extends Component {
  constructor(props) {
    super(props)
    this.client = new Serpent({
      dev: true,
      handler: 'http://localhost:3001/o',
      actions: 'http://localhost:3001/o',
      devGateway: 'http://localhost:3001/_dev_gateway',
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
        <Context client={this.client}>
          <Base />
          <ActionLoader />
          <Container>
            <Row mt={32}>
              <Col mdUp={'width: 40%'}>
                <Text as={'h1'}>Page Title</Text>
                <Card>
                  <ActionForm
                    debug
                    action={'testAction'}
                    withLoading
                    withAlert
                    withValidation={false}
                    render={{
                      name({key}) {
                        return (
                          <h1 key={key}>Name field</h1>
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
              <Col mdUp={'width: 60%;'} p={0}>
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
