import React, {Component, Fragment} from 'react'
import {ThemeProvider} from 'styled-components'
import {
  Base,
  Sigma as S,
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Text,
  Nav,
  Form,
  Input,
  Group,
  Label,
  Modal,
  Tag,
  Table,
  Tooltip,
  Pagination,
  Dropdown
} from 'sigma'

export default class Root extends Component {
  render() {
    return (
      <ThemeProvider theme={{
        colors: {
          success: '#000',
          primary: '#7a42ce'
        },
        breakpoints: {

        }
      }}>
        <Fragment>
          <Base />
          <Modal ref={ref => this.modal = ref} onClose={e => this.modal.toggle(false)}>
            <h2>Modal Content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate dolorem explicabo
                            impedit nulla! A atque fuga minus nesciunt numquam omnis quibusdam repellendus! Consectetur
                            delectus deleniti doloremque esse expedita facilis fugit labore magnam maxime, minus nam
                            nesciunt officia optio quam quis quo rem reprehenderit repudiandae sapiente sit tenetur vel
                            veniam.</p>
            <Button inverted onClick={e => this.modal.toggle(false)}>Close</Button>
          </Modal>
          <Base />
          <Nav>
            <Container>
              <Row>
                <Col>
                  <S as={'ul'} d={'flex'} alignItems={'center'}>
                    <li><a href={'#'}>Home</a></li>
                    <S as={'li'} ml={'auto'} d={'flex'} alignItems={'center'}>
                      <Dropdown>
                        {
                          open => (
                            <Fragment>
                              <Button size={'small'} inverted mr={11}>Dropdown <span dangerouslySetInnerHTML={{__html: open ? '&#9652;' : '&#9662;'}} /></Button>
                              <Card p={[10, 8]}>
                                  Dropdown content
                              </Card>
                            </Fragment>
                          )
                        }
                      </Dropdown>
                      <Button size={'small'} color={'success'} onClick={e => this.modal.toggle()}>Open Modal</Button>
                    </S>
                  </S>
                </Col>
              </Row>
            </Container>
          </Nav>
          <Container>
            <Row>
              <Col md={'width: 40%'}>
                <S
                  p={120}
                  m={'20px auto'}
                  background={'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);'}
                  borderRadius={12}
                  transition={'.4s'}
                  display={'flex'}
                  alignItems={'center'}
                  color={'#fff'}
                  userSelect={'none'}
                  justifyContent={'center'}>
                  <S textAlign={'center'}>
                    <S as={'h1'} mb={10} mt={0}>Sigma</S>
                    <S as={'p'} m={0}>Welcome to Sigma UI library</S>
                  </S>
                </S>

                <Card>
                  <h4>Table</h4>
                  <S mb={16}>
                    <Text d={'inline'} mr={4}>Here's a</Text>
                    <Tooltip>
                      <a href={'#'}>Tooltip</a>
                      <S width={190}>
                        <Card ml={5} p={[10, 8]}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facere fuga impedit ipsa pariatur.
                          <Button mt={11} block size={'small'} inverted onClick={e => this.modal.toggle()}>Open modal</Button>
                        </Card>
                      </S>
                    </Tooltip>
                  </S>
                  <Table mb={16}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <S maxWidth={190}>
                            <Text as={'div'} ellipsis color={'primary'} m={0}>
                              <Tag color={'success'} mr={11}>OK</Tag>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae perspiciatis temporibus.
                            </Text>
                          </S>
                        </td>
                        <td>
                          <Button float={'right'} color={'primary'} size={'small'}>View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <S maxWidth={190}>
                            <Text as={'div'} ellipsis color={'danger'} m={0}>
                              <Tag color={'warning'} mr={11}>Failed</Tag>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae perspiciatis temporibus.
                            </Text>
                          </S>
                        </td>
                        <td>
                          <Button float={'right'} color={'primary'} size={'small'} inverted>View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Pagination totalPages={23} onChange={this.onChange} textAlign={'right'} mt={11} />
                </Card>
              </Col>
              <Col md={'width: 60%'}>
                <Card mt={20}>
                  <Alert>
                                        Primary alert
                  </Alert>
                  <h3>Card</h3>
                  <Text as={'p'}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, ut.
                    {' '}<a href={'#'}>A link</a>
                  </Text>
                  <Button mr={4} inverted>Button</Button>
                  <Button color={'success'} loading>Success</Button>
                </Card>

                <Card mt={20}>
                  <h4>Test form</h4>
                  <S mb={11}>
                    <Tag mr={6}>Tag 1</Tag>
                    <Tag mr={6} color={'warning'}>Tag 2</Tag>
                    <Tag color={'success'}>Tag 3</Tag>
                  </S>
                  <Alert color={'danger'}>
                                        An error occurred
                  </Alert>
                  <Form mt={20}>
                    <Group>
                      <Label>Label</Label>
                      <Input type={'text'} placeholder={'Placeholder'} />
                    </Group>
                    <Group>
                      <Label error>Label</Label>
                      <Input as={'textarea'} error placeholder={'Placeholder'} />
                      <Text color={'danger'}>Input has an error</Text>
                    </Group>
                    <Group>
                      <Label>Label</Label>
                      <Input as={'select'}>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </Input>
                      <Text>Input info</Text>
                    </Group>
                  </Form>
                  <Button mt={12} loading block>Submit</Button>
                </Card>
              </Col>
            </Row>
          </Container>
        </Fragment>
      </ThemeProvider>
    )
  }
}
