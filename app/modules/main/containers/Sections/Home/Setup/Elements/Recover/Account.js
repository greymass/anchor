// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Header, Segment, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../../../../../../../shared/containers/Global/Button/Elevate';

class AccountSetupRecoverAccount extends Component<Props> {
  render() {
    const { accountcreate } = this.props;
    const { decrypted } = accountcreate;
    return (
      <React.Fragment>
        <Header>
          Recover Account
          <Header.Subheader>
            The following account has been found and is available to recover.
          </Header.Subheader>
        </Header>
        <Table collapsing definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Network</Table.Cell>
              <Table.Cell>{decrypted.blockchain.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Account Name</Table.Cell>
              <Table.Cell>{decrypted.account.actor}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <p>Select an option below on how you would like to proceed.</p>
        <Segment attached="top">
          <p>Option #1: Allows you to sign for the account with this device in addition to any existing devices already linked.</p>
          <GlobalButtonElevate
            onSuccess={(p) => this.props.addDevice(p)}
            trigger={(
              <Button
                content="Add key for this device"
                icon="plus circle"
                primary
              />
            )}
          />
        </Segment>
        <Segment attached="bottom">
          <p>Option #2: Replace all existing devices that can sign for this account with just this one.</p>
          <GlobalButtonElevate
            onSuccess={(p) => this.props.resetKeys(p)}
            trigger={(
              <Button
                content="Reset account"
                icon="repeat"
              />
            )}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecoverAccount);
