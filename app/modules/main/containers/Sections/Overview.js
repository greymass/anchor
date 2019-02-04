// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Placeholder, Segment, Table } from 'semantic-ui-react';
import { times } from 'lodash';
import OverviewBlockchainContainer from './Overview/Blockchain';

class OverviewContainer extends Component<Props> {
  render() {
    const {
      accounts,
      balances,
      app,
      wallets
    } = this.props;
    console.log(this.props)
    return (
      <Segment>
        overview
        <Segment vertical>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Total
                </Table.Cell>
                <Table.Cell>
                  Total
                </Table.Cell>
                <Table.Cell>
                  Total
                </Table.Cell>
                <Table.Cell>
                  Total
                </Table.Cell>
                <Table.Cell>
                  Total
                </Table.Cell>
              </Table.Row>
              {wallets.map((wallet) => {
                const isLoaded = !!(accounts[wallet.account]);
                const account = accounts[wallet.account];
                const balance = balances[wallet.account];
                console.log(account, balance)
                return (
                  <Table.Row>
                    <Table.Cell>
                      {wallet.account}
                      <br/>
                      { isLoaded ? 'loaded' : 'not loaded'}
                    </Table.Cell>
                    <Table.Cell>
                      { (isLoaded) ? account.head_block_time : ''}
                    </Table.Cell>
                    <Table.Cell>
                      { (isLoaded) ? `${balance.EOS} EOS` : ''}
                    </Table.Cell>
                  </Table.Row>
                );
              })}

            </Table.Body>
          </Table>
        </Segment>
      </Segment>
        <OverviewBlockchainContainer
          settings={settings}
        />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balances: state.balances,
    app: state.app,
    navigation: state.navigation,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewContainer));
