// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { intersection, isEqual } from 'lodash';
import { Button, Checkbox, Divider, Form, Header, Icon, List, Message, Segment, Tab, Table, TextArea } from 'semantic-ui-react';

import GlobalFragmentAuthorizationComponent from '../../../../../components/Global/Fragment/Authorization';

import EOSAccount from '../../../../../utils/EOS/Account';
import * as AccountsActions from '../../../../../actions/accounts';
import * as HardwareLedgerActions from '../../../../../actions/hardware/ledger';
import * as SettingsActions from '../../../../../actions/settings';
import * as WalletsActions from '../../../../../actions/wallets';

class GlobalModalAccountImportLedgerAccounts extends Component<Props> {
  state = {
    allValid: false,
    index: 0,
    ledgerKey: {
      publicKey: undefined,
      wif: undefined
    },
    loaded: [],
    selected: [],
    validated: [],
    value: ''
  }
  componentWillMount() {
    const { actions, status } = this.props;
    if (status === 'connected') {
      actions.ledgerGetPublicKey(this.state.index);
    }
  }
  componentWillReceiveProps(nextProps) {
    const accounts = Object.keys(nextProps.accounts);
    this.isValid(accounts);
    if (nextProps.ledger.publicKey && nextProps.ledger.publicKey !== this.state.ledgerKey) {
      const { actions } = this.props;
      const { publicKey } = nextProps.ledger;
      this.setState({ ledgerKey: publicKey });
      actions.getAccountByKey(publicKey.wif);
    }
  }
  importAccounts = () => {
    const {
      selected
    } = this.state;
    const {
      actions,
      connection,
    } = this.props;
    const {
      chainId
    } = connection;
    selected.forEach((auth) => {
      const [account, authorization, pubkey, path] = auth.split('@');
      actions.importWallet(chainId, account, authorization, false, false, 'ledger', pubkey, path);
    });
    if (this.props.onComplete) {
      // Callback with the first account
      const [account, authorization] = selected[0].split('@');
      this.props.onComplete(account, authorization);
    }
    this.props.onClose();
  }
  isValid = (accounts) => {
    const { loaded } = this.state;
    const matches = intersection(accounts, loaded);
    this.setState({
      allValid: (matches.length > 0 && isEqual(matches.sort(), loaded.sort())),
      validated: matches
    });
  }
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSelect = () => {
    const { value } = this.state;
    const loaded = [...this.state.loaded];
    const existing = loaded.indexOf(value);
    const input = this.input.getWrappedInstance();
    if (existing < 0) {
      loaded.push(value);
    }
    if (input) {
      input.reset();
    }
    this.props.actions.getAccounts(loaded);
    this.setState({
      loaded,
      valid: false,
      value: ''
    });
  }
  onToggleSelected = (e, { checked, name }) => {
    const selected = [...this.state.selected];
    const existing = selected.indexOf(name);
    if (checked) {
      if (existing === -1) {
        selected.push(name);
      }
    } else if (existing >= 0) {
      selected.splice(existing, 1);
    }
    this.setState({ selected });
  }
  onRemoveSelected = (e, { name }) => {
    const loaded = [...this.state.loaded];
    const existing = loaded.indexOf(name);
    if (existing >= 0) {
      loaded.splice(existing, 1);
    }
    this.setState({ loaded }, () => {
      const accounts = Object.keys(this.props.accounts);
      this.isValid(accounts);
    });
  }
  loadKey = () => {
    const { actions } = this.props;
    const { index } = this.state;
    actions.ledgerGetPublicKey(parseInt(index, 10) || 0);
    this.setState({ index });
  }
  render() {
    const {
      accounts,
      ledger,
      onClose,
      status,
      system,
      t,
    } = this.props;
    const {
      ledgerKey,
      selected,
    } = this.state;
    const matches = accounts.__lookups;
    const panes = [
      {
        menuItem: 'Ledger Settings',
        render: () => (
          <React.Fragment>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Public Key
                  </Table.Cell>
                  <Table.Cell>
                    {ledgerKey.wif}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Path
                  </Table.Cell>
                  <Table.Cell>
                    {ledger.path}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Form>
              <Form.Group>
                <Form.Input
                  autoFocus
                  placeholder="0"
                  label={t('global_account_import_ledger_key_index_label')}
                  name="index"
                  onChange={this.onChange}
                  value={this.state.index}
                  width={8}
                />
                <Form.Button
                  content={t('global_account_import_ledger_load_key_button')}
                  icon="usb"
                  onClick={() => this.loadKey(0)}
                  primary
                  style={{ marginTop: '1.25em' }}
                  width={8}
                />
              </Form.Group>
            </Form>
          </React.Fragment>
        )
      },
    ];
    panes.unshift({
      menuItem: 'Accounts',
      render: () => (
        <Segment attached stacked color="blue">
          {(matches.length > 0)
            ? (
              <List divided relaxed>
                {(matches.map((account) => {
                  const data = accounts[account];
                  if (data) {
                    const authorizations = new EOSAccount(data).getAuthorizations(ledgerKey.wif);
                    return authorizations.map((authorization) => {
                      const auth = `${account}@${authorization.perm_name}`;
                      const uid = `${account}@${authorization.perm_name}@${ledgerKey.wif}@${ledger.path}`;
                      const isSelected = (selected.indexOf(uid) >= 0);
                      return (
                        <List.Item key={`${account}-${auth}-${isSelected}`}>
                          <Checkbox
                            checked={isSelected}
                            label={(
                              <Header
                                style={{ cursor: 'pointer' }}
                              >
                                <Icon
                                  color={(isSelected) ? 'green' : 'grey'}
                                  name={(isSelected) ? 'check square outline' : 'square outline'}
                                />
                                <Header.Content>
                                  <GlobalFragmentAuthorizationComponent
                                    account={account}
                                    authorization={authorization.perm_name}
                                    pubkey={ledgerKey.wif}
                                  />
                                </Header.Content>
                              </Header>
                            )}
                            name={uid}
                            onClick={this.onToggleSelected}
                            value={ledgerKey.wif}
                          />
                        </List.Item>
                      );
                    });
                  }
                  return false;
                }))}
              </List>
            )
            : false
          }
          {(matches.length === 0)
            ? (
              <div>
                <p>No accounts found with the public key of {ledgerKey.wif}.</p>
                <p>Modify the Ledger Settings to use a different Key Index if you believe accounts already exist on this device.</p>
              </div>

            )
            : false
          }
        </Segment>
      )
    });
    return (
      <Segment basic>
        <Header
          content="Load from Ledger"
          subheader={t('global_account_import_ledger_select_description')}
        />
        {(status !== 'connected')
          ? (
            <Segment basic>
              <Message
                content={t('global_account_import_ledger_not_connected_content_r2')}
                icon="usb"
                header={t('global_account_import_ledger_not_connected_header_r2')}
                warning
              />
            </Segment>
          )
          : false
        }
        {(status === 'connected' && ledgerKey && ledgerKey.wif)
          ? (
            <React.Fragment>
              {(system.ACCOUNT_BY_KEY !== 'PENDING' && system.LEDGET_GET_PUBLIC_KEY !== 'PENDING')
                ? (
                  <Tab panes={panes} />
                )
                : false
              }
              {(system.LEDGET_GET_PUBLIC_KEY === 'PENDING')
                ? (
                  <Message
                    content={t('global_account_import_ledger_communicating_content')}
                    icon="loading circle notched"
                    header={t('global_account_import_ledger_communicating_header')}
                  />
                )
                : false
              }
              {(system.ACCOUNT_BY_KEY === 'PENDING')
                ? (
                  <Message
                    content={t('global_account_import_ledger_account_lookup_content')}
                    icon="loading circle notched"
                    header={t('global_account_import_ledger_account_lookup_header')}
                  />
                )
                : false
              }
            </React.Fragment>
          )
          : false
        }
        <Divider />
        <Segment basic clearing>
          <Button
            floated="left"
            onClick={onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
          <Button
            color="green"
            content={t('global_button_account_import_action')}
            disabled={selected.length === 0}
            floated="right"
            icon="circle plus"
            onClick={this.importAccounts}
          />
        </Segment>
      </Segment>
    );
  }
}


function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    connection: state.connection,
    ledger: state.ledger,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    system: state.system,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...HardwareLedgerActions,
      ...SettingsActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportLedgerAccounts);
