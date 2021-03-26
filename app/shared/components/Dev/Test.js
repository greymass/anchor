// @flow
import React, { Component } from 'react';

import {
  Button,
  Checkbox,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import GlobalTransactionHandler from '../Global/Transaction/Handler';

import DevStateTabs from './State/Tabs';

import EOSWallet from '../../utils/Anchor/Wallet';

class DevTest extends Component<Props> {
  state = {
    actionName: false
  }
  onClose = () => this.setState({ actionName: false });
  toggleBroadcast = (e, { checked }) => {
    const { actions } = this.props;
    actions.setConnectionBroadcast(checked);
  }
  toggleSign = (e, { checked }) => {
    const { actions } = this.props;
    actions.setConnectionSign(checked);
  }
  testStake = () => {
    const { actions, wallet } = this.props;
    actions.delegatebw(wallet.account, 'jestaaaaaaaa', '0.0000 EOS', '0.0001 EOS');
    this.setState({ actionName: 'DELEGATEBW' });
  }
  testTransfer = () => {
    const { actions, wallet } = this.props;
    actions.transfer(wallet.account, 'teamgreymass', '0.0001 EOS', '');
    this.setState({ actionName: 'TRANSFER' });
  }
  testVote = () => {
    const { actions } = this.props;
    actions.voteproducers(['teamgreymass']);
    this.setState({ actionName: 'VOTEPRODUCER' });
  }
  testProxy = () => {
    const { actions } = this.props;
    actions.voteproducers([], 'jestaaaaaaaa');
    this.setState({ actionName: 'VOTEPRODUCER' });
  }
  testRexBuy = () => {
    const { actions } = this.props;
    actions.buyrex('1.0000 EOS');
    this.setState({ actionName: 'BUYREX' });
  }
  testRexDeposit = () => {
    const { actions } = this.props;
    actions.depositrex('1.0000 EOS');
    this.setState({ actionName: 'DEPOSITREX' });
  }
  testRexSell = () => {
    const { actions } = this.props;
    actions.sellrex('1.0000 REX');
    this.setState({ actionName: 'SELLREX' });
  }
  testRexWithdraw = () => {
    const { actions } = this.props;
    actions.withdrawrex('1.0000 EOS');
    this.setState({ actionName: 'WITHDRAWREX' });
  }
  testExport = () => {
    const { connection, wallet } = this.props;
    // Create an empty model
    const model1 = new EOSWallet();
    // Import the current wallet from props (which should always be the curren anchor version)
    model1.importProps(wallet, connection.chainId);
    // Export as a single wallet JSON format
    const json = JSON.parse(model1.json());
    // Create a new model loading the exported format
    const model2 = new EOSWallet(json);
    // Log the two models to compare
    console.log(model1.json());
    console.log(model2.json());
    // Log the props export format
    console.log(model2.exportProps());
  }
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      settings,
      system,
    } = this.props;
    // console.log(this.props);
    const { actionName } = this.state;
    const transaction = system[`${actionName}_LAST_TRANSACTION`] || {};
    // return (
    //   <Segment style={{ overflow: 'scroll', maxWidth: '90vw' }}>
    //     <ReactJson
    //       enableClipboard={false}
    //       displayDataTypes={false}
    //       displayObjectSize={false}
    //       iconStyle="square"
    //       name={null}
    //       src={this.props.sessions}
    //       style={{ padding: '1em' }}
    //     />
    //     <ReactJson
    //       enableClipboard={false}
    //       displayDataTypes={false}
    //       displayObjectSize={false}
    //       iconStyle="square"
    //       name={null}
    //       src={this.props.auths}
    //       style={{ padding: '1em' }}
    //     />
    //     <ReactJson
    //       enableClipboard={false}
    //       displayDataTypes={false}
    //       displayObjectSize={false}
    //       iconStyle="square"
    //       name={null}
    //       src={this.props.storage}
    //       style={{ padding: '1em' }}
    //     />
    //     <ReactJson
    //       collapsed={1}
    //       enableClipboard={false}
    //       displayDataTypes={false}
    //       displayObjectSize={false}
    //       iconStyle="square"
    //       name={null}
    //       src={this.props.wallet}
    //       style={{ padding: '1em' }}
    //     />
    //
    //   </Segment>
    // )
    return (
      <Grid>
        <Grid.Column width={4}>
          <List>
            <List.Item>
              <Checkbox
                checked={connection.broadcast}
                label="Broadcast Transaction"
                onChange={this.toggleBroadcast}
              />
            </List.Item>
            <List.Item>
              <Checkbox
                checked={connection.sign}
                disabled={!(connection.keyProviderObfuscated && connection.keyProviderObfuscated.hash)}
                label="Sign Transaction"
                onChange={this.toggleSign}
              />
            </List.Item>
          </List>
          <Button.Group
            basic
            vertical
          >
            <Button
              content="Deposit to REX 1.0000 EOS"
              onClick={this.testRexDeposit}
              primary
            />
            <Button
              content="Withdraw from REX 1.0000 EOS"
              onClick={this.testRexWithdraw}
              primary
            />
            <Button
              content="Buy REX Token with 1.0000 EOS"
              onClick={this.testRexBuy}
              primary
            />
            <Button
              content="Sell REX Token 1.0000 REX"
              onClick={this.testRexSell}
              primary
            />
            <Button
              content="Transfer 0.0001 EOS"
              onClick={this.testTransfer}
              primary
            />
            <Button
              content="Stake 0.0001 EOS"
              onClick={this.testStake}
              primary
            />
            <Button
              content="Vote TeamGreymass"
              onClick={this.testVote}
              primary
            />
            <Button
              content="Proxy jestaaaaaaaa"
              onClick={this.testProxy}
              primary
            />
            <Button
              content="Test Export"
              onClick={() => this.testExport()}
              primary
            />
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={12}>
          <Header
            attached="top"
            content="Transaction Handler"
            inverted
          />
          <Segment attached="bottom">
            <GlobalTransactionHandler
              actionName={actionName}
              actions={actions}
              blockExplorers={blockExplorers}
              contract={transaction.contract}
              content={<span>No transaction currently loaded.</span>}
              onClose={this.onClose}
              settings={settings}
              system={system}
              transaction={transaction}
            />
          </Segment>
          <DevStateTabs {...this.props} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default DevTest;
