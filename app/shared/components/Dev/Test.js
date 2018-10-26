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
    actions.transfer(wallet.account, 'jestaaaaaaaa', '0.0001 EOS', '');
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
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      settings,
      system,
    } = this.props;
    const { actionName } = this.state;
    const transaction = system[`${actionName}_LAST_TRANSACTION`] || {};
    console.log(connection)
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
