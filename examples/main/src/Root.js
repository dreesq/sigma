import React, {Component} from 'react';

import {Base, Sigma as S, Grid} from './sigma';

export default class Root extends Component {
    render() {
        return (
            <>
                <Base />
                <Grid.Container>
                    <Grid.Row>
                        <Grid.Col m={'0 auto'}>
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
                                    <S as={'p'} m={0}>Thanks for checking Sigma out</S>
                                </S>
                            </S>
                        </Grid.Col>
                    </Grid.Row>
                </Grid.Container>
            </>
        )
    }
}