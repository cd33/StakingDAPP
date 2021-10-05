import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import dai from '../dai.png'

const Content = ({ web3, daiBalance, bibscoinBalance, bibsStakingBalance, setDaiInput, stake, unstake, issueReward, allowance, allow, mintDai}) => (
    <Container style={{ backgroundColor: 'white', borderRadius: 20, width: "80vh", padding: 20 }}>
        Staking DAI
        <br /><br />
        {!allowance ?
            <Button onClick={allow} variant="primary" className="mb-2">Unlock</Button>
        : <> { daiBalance <= 0 && bibsStakingBalance <= 0 ?
                <Button onClick={mintDai} variant="primary" className="mb-2">Mint Dai</Button>
            : <>
                <Row className="justify-content-md-center">
                    <Form.Label column lg={1}>
                        <img src={dai} height='35' alt="" style={{ marginTop: -5 }} />
                    </Form.Label>
                    <Col md="auto">
                        <Form.Control placeholder="Amount of DAI" type="text" ref={input => setDaiInput(input)} />
                    </Col>
                    <Form.Label column lg={3}>Available: {web3 && web3.utils.fromWei(daiBalance, 'Ether')}</Form.Label>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <Col md="auto"><Button onClick={stake} variant="warning" className="mb-2">STAKE</Button></Col>
                    <Col md="auto"><Button onClick={unstake} variant="danger" className="mb-2">UNSTAKE</Button></Col>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <Col md="auto">Your Staking Balance: {web3 && web3.utils.fromWei(bibsStakingBalance, 'Ether')} DAI</Col>
                    <Col md="auto">Your Rewards Balance: {web3 && web3.utils.fromWei(bibscoinBalance, 'Ether')} BIBS</Col>
                </Row>
                <br />
                <Button onClick={issueReward} variant="success" className="mb-2">Claim Rewards</Button>
            </>}
        </>}
    </Container>
);

export default Content;