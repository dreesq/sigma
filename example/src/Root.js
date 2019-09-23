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
  Dropdown,
  Footer,
  Filters,
  Toggle,
  Radio,
  Autocomplete
} from '@dreesq/sigma'

export default class Root extends Component {
  onSearch = text => {
    let items = [
      {
        name: 'a',
        value: 1
      },
      {
        name: 'b',
        value: 2
      },
      {
        name: 'c',
        value: 3
      },
      {
        name: 'ab',
        value: 4
      },
      {
        name: 'abc',
        value: 5
      }
    ];

    return items.filter(item => item.name.indexOf(text) > -1);
  };

  render() {
    return (
      <ThemeProvider theme={{
        colors: {

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
                    <li><a href={'/'}>Home</a></li>
                    <S as={'li'} ml={'auto'} d={'flex'} alignItems={'center'}>
                      <Dropdown>
                        {
                          open => (
                            <Fragment>
                              <Text color={'primary'} mr={14} cursor={'pointer'}>Dropdown <span dangerouslySetInnerHTML={{__html: open ? '&#9652;' : '&#9662;'}} /></Text>
                              <Card p={[19, 14]} w={'220px !important'}>
                                <S as={'ul'}>
                                  <S as={'li'} mb={4}>Dropdown Content</S>
                                  <S as={'li'} mb={4}>Dropdown Content 2</S>
                                  <S as={'li'} mb={14}>Dropdown Content 3</S>
                                </S>
                                <Button block size={'small'}>Logout</Button>
                              </Card>
                            </Fragment>
                          )
                        }
                      </Dropdown>
                      <Button size={'small'} color={'success'} h={43} onClick={e => this.modal.toggle()}>Open Modal</Button>
                    </S>
                  </S>
                </Col>
              </Row>
            </Container>
          </Nav>
          <Container>
            <Row>
              <Col smUp={'width: 40%'}>
                <S
                  p={[50, 0]}
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
                  <S d={'flex'} alignItems={'center'}>
                    <h4>Table</h4>
                    <Toggle ml={'auto'} color={'success'} label={'Label'} />
                  </S>
                  <S mb={16}>
                    <Text d={'inline'} mr={4}>Here's a</Text>
                    <Tooltip>
                      <a href={'javascript:void(0)'}>Tooltip</a>
                      <S width={190}>
                        <Card ml={5} p={[10, 8]}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facere fuga impedit ipsa pariatur.
                          <Button mt={11} block size={'small'} inverted onClick={e => this.modal.toggle()}>Open modal</Button>
                        </Card>
                      </S>
                    </Tooltip>
                    <S m={[10, 0]}>
                      <Radio name={'radio-1'} label={'Radio Item'}/>
                    </S>
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
              <Col smUp={'width: 60%'}>
                <Card mt={20}>
                  <S position={'relative'}>
                    <Filters
                      fields={[
                        {
                          name: 'name',
                          type: 'text',
                          defaultValue: 'Default',
                          label: 'Value',
                          props: {
                            col: {
                              width: '50%',
                              pr: 10
                            },
                            input: {
                              pl: 45,
                              icon: (
                                <S
                                  width={30}
                                  height={30}
                                  bg={'#f7f7f7'}
                                  textAlign={'center'}
                                  d={'block'}
                                  borderRadius={30}
                                  lineHeight={30}
                                  position={'absolute'}
                                  left={8}
                                  bottom={10}
                                >
                                  A
                                </S>
                              )
                            }
                          }
                        },
                        {
                          name: 'second',
                          type: 'text',
                          defaultValue: '',
                          props: {
                            col: {
                              pr: 10,
                              width: '50%'
                            }
                          }
                        },
                        {
                          name: 'third',
                          type: 'text',
                          defaultValue: 'Second default',
                          label: 'Third',
                          props: {
                            col: {
                              width: '50%',
                              pr: 10
                            }
                          }
                        },
                        {
                          name: 'fifth',
                          type: 'toggle',
                          label: 'Toggle',
                          props: {
                            col: {
                              width: '50%'
                            }
                          }
                        },
                        {
                          name: 'sixthe',
                          type: 'radio',
                          placeholder: 'Radio',
                          value: 'yes',
                          props: {
                            col: {
                              width: '50%'
                            }
                          }
                        }
                      ]}
                    />
                  </S>

                </Card>
                <Card mt={20}>
                  <Alert>
                                        Primary alert
                  </Alert>
                  <h3>Card</h3>
                  <Text as={'p'}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, ut.
                    {' '}<a href={'/'}>A link</a>
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
                    <Group>
                      <Label>Multi Autocomplete</Label>
                      <Autocomplete m={[10, 0]} multi placeholder={'Autocomplete'} onChange={() => {}} name={'search'} onSearch={this.onSearch}/>
                    </Group>
                    <Group>
                      <Label>Autocomplete</Label>
                      <Autocomplete m={[10, 0]} placeholder={'Autocomplete'} onChange={() => {}} name={'search'} onSearch={this.onSearch}/>
                    </Group>
                  </Form>
                  <Button mt={12} loading block>Submit</Button>
                </Card>
              </Col>
            </Row>
          </Container>
          <Footer>
            <Container>
              <Text>Footer</Text>
            </Container>
          </Footer>
        </Fragment>
      </ThemeProvider>
    )
  }
}
