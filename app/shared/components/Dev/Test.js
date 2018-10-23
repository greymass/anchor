// @flow
import React, { Component } from 'react';

import {
  Button,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import GlobalTransactionHandler from '../Global/Transaction/Handler';

class DevTest extends Component<Props> {
  state = {
    actionName: false
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
            <ReactJson
              collapsed={1}
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={this.props.app}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default DevTest;
