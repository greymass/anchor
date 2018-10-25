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
  toggleBroadcast = (e, { checked }) => {
    const { actions } = this.props;
    actions.setConnectionBroadcast(checked);
  }
  toggleSign = (e, { checked }) => {
    const { actions } = this.props;
    actions.setConnectionSign(checked);
  }
  testTransfer = () => {
    const { actions, wallet } = this.props;
    actions.transfer(wallet.account, 'solveforanyx', '0.0001 EOS', 'test w/ ledger!');
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
  testConstants = () => {
    const { actions } = this.props;
    actions.getConstants();
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
    return (
      <Segment basic>
        <Header>
          DevTest
        </Header>
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
                  label="Sign Transaction"
                  onChange={this.toggleSign}
                />
              </List.Item>
            </List>
            <Button.Group vertical>
              <Button
                content="get constants"
                onClick={this.testConstants}
                primary
              />
              <Button
                content="Transfer 0.0001 EOS"
                onClick={this.testTransfer}
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
            <Segment basic>
              <Header>
                Transaction Handler
              </Header>
              <GlobalTransactionHandler
                actionName={actionName}
                actions={actions}
                blockExplorers={blockExplorers}
                contract={transaction.contract}
                content={<span />}
                settings={settings}
                system={system}
                transaction={transaction}
              />
            </Segment>
            <Segment basic>
              <DevStateTabs {...this.props} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default DevTest;
