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
  AutoFilter,
  Container,
  Row,
  Col
} from '@dreesq/sigma'

export default class extends Component {
  constructor(props) {
    super(props)
    this.client = new Serpent('http://localhost:3000/o', {
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
                <AutoFilter />
              </Col>
            </Row>
          </Container>
        </Context>
      </ThemeProvider>
    )
  }
}
