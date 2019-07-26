// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { intersection, isEqual } from 'lodash';
import { Button, Checkbox, Divider, Form, Header, Icon, Label, List, Modal, Segment, Tab } from 'semantic-ui-react';

import GlobalFormFieldAccount from '../../../../components/Global/Form/Field/Account';
import GlobalFragmentAuthorization from '../../../../components/Global/Fragment/Authorization';

import EOSAccount from '../../../../utils/EOS/Account';
import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportWatch extends Component<Props> {
  state = {
    allValid: false,
    loaded: [],
    selected: [],
    valid: false,
    validated: [],
    value: ''
  }
  componentWillReceiveProps(nextProps) {
    const accounts = Object.keys(nextProps.accounts);
    this.isValid(accounts);
  }
  importAccounts = () => {
    const {
      selected
    } = this.state;
    const {
      actions,
      settings,
    } = this.props;
    const {
      chainId
    } = settings;
    selected.forEach((auth) => {
      const [account, authorization, pubkey] = auth.split('@');
      actions.importWallet(chainId, account, authorization, false, false, 'watch', pubkey);
    });
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
  onChange = (e, data) => this.setState(data);
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
  render() {
    const {
      accounts,
      onClose,
      app,
      t,
    } = this.props;
    const {
      loaded,
      selected,
      valid,
      validated,
      value
    } = this.state;
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content="Watch an account"
            subheader={t('global_account_import_watch_description')}
          />
          <Form>
            <Form.Group>
              <GlobalFormFieldAccount
                app={app}
                autoFocus
                label={t('global_account_import_watch_account')}
                name="key"
                placeholder={t('welcome:welcome_account_compare_placeholder')}
                onChange={this.onChange}
                ref={(input) => { this.input = input; }}
                value={value}
                width={12}
              />
              <Form.Button
                color="blue"
                content={t('find')}
                disabled={!valid}
                fluid
                onClick={this.onSelect}
                placeholder='2 Wide'
                style={{ marginTop: '1.25em' }}
                width={4}
              />
            </Form.Group>
          </Form>
          {(loaded.length > 0)
            ? (
              <Segment stacked color="blue">
                <p>
                  Select which account and permission type to watch.
                </p>
                <List divided relaxed>
                  {(loaded.map((account) => {
                    const accountData = accounts[account];
                    if (accountData) {
                      const model = new EOSAccount(accountData);
                      const options = model.getAuthorizationOptions();
                      return options.map(({type, pubkey}) => {
                        const isSelected = (selected.indexOf(`${account}@${type}@${pubkey}`) >= 0);
                        return (
                          <List.Item key={`${account}-${type}-${pubkey}-${isSelected}`}>
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
                                    <GlobalFragmentAuthorization
                                      account={account}
                                      authorization={type}
                                      pubkey={pubkey}
                                    />
                                  </Header.Content>
                                </Header>
                              )}
                              name={`${account}@${type}@${pubkey}`}
                              onClick={this.onToggleSelected}
                              value={pubkey}
                            />
                            {(validated.indexOf(account) >= 0)
                              ? false
                              : (
                                <Label
                                  color="red"
                                  content={t('global_account_import_watch_account_not_found')}
                                  size="tiny"
                                  style={{ marginLeft: '1em' }}
                                />
                              )
                            }
                          </List.Item>
                        );
                      })
                    }
                    return false;
                  }))}
                </List>
              </Segment>
            )
            : false
          }
        </Segment>
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
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    app: state.app,
    settings: state.settings,
    system: state.system,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
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
)(GlobalModalAccountImportWatch);
