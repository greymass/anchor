// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Checkbox, Form, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../../../../../../shared/containers/Global/Button/Elevate';
import { changeModule } from '../../../../../actions/navigation';
import AccountSetupElementsLedger from './Ledger';
import * as HardwareLedgerActions from '../../../../../../../shared/actions/hardware/ledger';

import AccountSetupElementsLedgerOptionsLedgerAll from './Ledger/Options/LedgerAll';
import AccountSetupElementsLedgerOptionsLedgerRecover from './Ledger/Options/LedgerRecover';
import AccountSetupElementsLedgerOptionsLedgerUse from './Ledger/Options/LedgerUse';

const { ipcRenderer } = require('electron');

class AccountSetupElementsConfirm extends Component<Props> {
  state = {
    ledgerMethod: false,
    ledgerSetup: false,
  }
  onLedgerSetup = (e, { name, checked }) => {
    const { actions, ledger } = this.props;
    this.setState({
      ledgerMethod: false,
      ledgerSetup: checked,
    });
    if (checked && !ledger.listening) {
      actions.ledgerStartListen();
    }
  }
  onLedgerCancel = () => {
    this.setState({
      ledgerMethod: false,
      ledgerSetup: false,
    });
  }
  onLedgerReset = () => {
    this.setState({
      ledgerMethod: false,
      ledgerSetup: true,
    })
  }
  onLedgerComplete = ({method}) => {
    this.setState({
      ledgerMethod: method,
      ledgerSetup: false,
    });
  }
  render() {
    const {
      accountName,
      blockchain,
      loader,
      onBack,
      onClick,
    } = this.props;
    const {
      ledgerSetup,
      ledgerMethod,
    } = this.state;
    const disable = (ledgerSetup && !ledgerMethod);
    return (
      <Segment clearing>
        <Header>
          Confirm account creation
          <Header.Subheader>
            Please confirm the details of your new account.
          </Header.Subheader>
        </Header>
        <AccountSetupElementsLedger
          onCancel={this.onLedgerCancel}
          onComplete={this.onLedgerComplete}
          open={ledgerSetup}
        />
        {loader}
        <Form>
          <Table
            attached={(!ledgerMethod) ? 'top' : undefined }
            definition
            size="large"
          >
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>Account Name</Table.Cell>
                <Table.Cell>{accountName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>Network</Table.Cell>
                <Table.Cell>{blockchain.name}</Table.Cell>
              </Table.Row>
              {(ledgerMethod)
                ? (
                  <Table.Row>
                    <Table.Cell>Device Setup</Table.Cell>
                    <Table.Cell>
                      <Segment>
                        {(ledgerMethod === 'all')
                          ? <AccountSetupElementsLedgerOptionsLedgerAll />
                          : false
                        }
                        {(ledgerMethod === 'recover')
                          ? <AccountSetupElementsLedgerOptionsLedgerRecover />
                          : false
                        }
                        {(ledgerMethod === 'use')
                          ? <AccountSetupElementsLedgerOptionsLedgerUse />
                          : false
                        }
                      </Segment>
                      <Button
                        content="Change Ledger Usage"
                        fluid
                        onClick={this.onLedgerReset}
                        size="small"
                      />
                    </Table.Cell>
                  </Table.Row>
                )
                : false
              }
            </Table.Body>
          </Table>
          {(!ledgerMethod)
            ? (
              <Message attached="bottom" icon>
                <Icon name="usb" />
                <Message.Content>
                  <Message.Header>Hardware Wallet Options</Message.Header>
                  <Form.Field style={{ marginTop: '0.5em' }}>
                    <Checkbox
                      checked={!!(ledgerMethod || ledgerSetup)}
                      label="Use a Ledger hardware wallet for this new account?"
                      key={`ledger-${ledgerSetup}-${ledgerMethod}`}
                      name="ledgerSetup"
                      onChange={this.onLedgerSetup}
                      value={!!(ledgerMethod || ledgerSetup)}
                    />
                  </Form.Field>
                </Message.Content>
              </Message>
            )
            : false
          }
          <Form.Field>
            <GlobalButtonElevate
              onSuccess={(password) => onClick(password, ledgerMethod)}
              trigger={(
                <Button
                  content="Create"
                  disabled={disable}
                  fluid
                  primary
                  size="large"
                />
              )}
            />
          </Form.Field>
          <Form.Field>
            <Button
              content="Change"
              fluid
              onClick={onBack}
            />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ledger: state.ledger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      ...HardwareLedgerActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsConfirm);
