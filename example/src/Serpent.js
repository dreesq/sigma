import React, {Component} from 'react'
import Serpent from '@dreesq/serpent-client'
import axios from 'axios'
import {ThemeProvider} from 'styled-components'
import {
  Context,
  Card,
  Base,
  ActionForm,
  ActionLoader
} from 'sigma'

const client = new Serpent('http://localhost:3000/o', {
  debug: true,
  axios
})

export default class extends Component {
  render() {
    return (
      <ThemeProvider theme={{
        colors: {
          secondary: '#000'
        }
      }}>
        <Context client={client} debug>
          <Base />
          <ActionLoader />
          <Card width={400} m={'24px auto'}>
            <ActionForm
              action={'testAction'}
              withLoading
              withAlert
              render={{
                name() {
                  return (
                    <h1>Overwritten field</h1>
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
        </Context>
      </ThemeProvider>
    )
  }
}
