// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Message, Modal, Segment } from 'semantic-ui-react';

import GlobalModalSettingsCustomTokenConfirm from './CustomTokens/Confirm';
import GlobalModalSettingsCustomTokenForm from './CustomTokens/Form';

const initialState = {
  account: '',
  loading: false,
  symbol: '',
  token: {}
};

class GlobalModalSettingsCustomTokens extends Component<Props> {
  state = initialState;
  componentWillReceiveProps(nextProps) {
    const { globals } = nextProps;
    if (globals) {
      const { contract } = globals;
      const { account, loading, symbol } = this.state;
      const contractName = account.toLowerCase();
      const symbolName = symbol.toUpperCase();
      if (loading && contract[contractName] && contract[contractName][symbolName]) {
        const token = contract[contractName][symbolName];
        this.setState({
          loading: false,
          token
        });
      }
    }
  }
  checkToken = () => {
    const { actions, settings } = this.props;
    const { account, symbol } = this.state;
    const { getCurrencyStats } = actions;
    const contractName = account.toLowerCase();
    const symbolName = symbol.toUpperCase();
    getCurrencyStats(contractName, symbolName);
    this.setState({
      loading: true
    });
  }
  addToken = () => {
    const { actions, onClose, settings } = this.props;
    const { account, symbol } = this.state;
    const { customTokens } = settings;
    const name = [account, symbol].join(':');

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    if (name && name.length > 0) {
      const { refreshAccountBalances, setSetting } = actions;
      tokens.push(name);
      tokens = new Set(tokens.filter((e) => e));
      setSetting('customTokens', Array.from(tokens));
      this.setState({ name: '', token: {} }, () => {
        onClose();
      });
      refreshAccountBalances(settings.account);
    }
  }
  removeToken = (token) => {
    const { actions, settings } = this.props;
    const { customTokens } = settings;

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    const position = tokens.indexOf(token);
    if (position >= 0) {
      const { refreshAccountBalances, setSetting } = actions;
      tokens.splice(position, 1);
      tokens = new Set(tokens.filter((e) => e));
      setSetting('customTokens', Array.from(tokens));
      refreshAccountBalances(settings.account);
    }
  }
  onChange = (e, { name, value }) => this.setState({ [name]: value.trim() });
  onClose = () => {
    this.setState(initialState);
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    const {
      account,
      loading,
      symbol,
      token
    } = this.state;
    const {
      open,
      settings,
      t
    } = this.props;
    const {
      customTokens
    } = settings;
    return (
      <Modal
        onClose={this.onClose}
        open={open}
        size="small"
      >
        <Modal.Header>
          {t('global_modal_settings_customtoken_header')}
        </Modal.Header>
        <Modal.Content>
          <p>{t('global_modal_settings_customtoken_description')}</p>
          {(token && token.supply)
            ? (
              <GlobalModalSettingsCustomTokenConfirm
                token={token}
                onSubmit={this.addToken}
              />
            )
            : (
              <GlobalModalSettingsCustomTokenForm
                loading={loading}
                onChange={this.onChange}
                onSubmit={this.checkToken}
                ref={(c) => { this.form = c; }}
                values={this.state}
              />
            )
          }
          {(token && token.status === 'not-found')
            ? (
              <Message error icon="warning sign">
                <Header>
                  {t('global_modal_settings_customtoken_notfound_header')}
                  <Header.Subheader>
                    {t('global_modal_settings_customtoken_notfound_subheader')}
                  </Header.Subheader>
                </Header>
              </Message>
            )
            : false
          }

        </Modal.Content>
        <Modal.Actions>
          <Segment basic clearing>
            <Button
              content={t('close')}
              onClick={this.onClose}
              primary
            />
          </Segment>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalSettingsCustomTokens);
