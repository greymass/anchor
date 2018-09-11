// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Container, Form, Input, Message } from 'semantic-ui-react';

import WalletPanelFormModalConfirm from '../../components/Wallet/Panel/Form/Modal/Confirm';

import * as SettingsActions from '../../actions/settings';
import * as WalletActions from '../../actions/wallet';
import * as types from '../../../shared/actions/types';

type Props = {
  actions: {
    setWalletKey: () => void,
    setTemporaryKey: () => void
  },
  history: {},
  keys: {},
  onStageSelect: () => void,
  settings: {},
  t: () => void
};

class WelcomeWalletContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { settings } = props;
    this.state = {
      // editing: props.editing || false,
      confirming: false,
      encryptWallet: !(settings.walletTemp)
    };
  }

  isSafeish = (url) => url.startsWith('http:') || url.startsWith('https:')

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value.trim()
    });
  }, 300)

  onComplete = () => {
    const {
      encryptWallet,
      password
    } = this.state;
    const {
      actions,
      connection,
      history,
      keys,
      settings
    } = this.props;
    const {
      hash,
      key
    } = keys;
    const {
      decrypt,
      setSetting,
      setSettingWithValidation,
      setWalletKey
    } = actions;
    // if we aren't using a defined chain, search for one by matching chain id and switch to 
    // that if found. user can subsequently use 'manage blockchains' to add new chains 
    const blockchain = settings.blockchain ? 
      settings.blockchains.filter( (c) => { return c.chainId === connection.chainId})[0] : null;

    if (blockchain){
      setSetting('blockchain', blockchain);
      setSettingWithValidation('node', blockchain.node);
    }
    if (encryptWallet) {
      setSetting('walletInit', true);
      setWalletKey(key, password, settings.walletMode, hash);
    } else {
      setSetting('walletTemp', true);
    }
    this.setState({
      confirming: false
    });

    if (settings.walletMode === 'cold') {
      history.push('/coldwallet');
    } else {
      history.push('/voter');
    }
  }

  onToggle = () => this.setState({ encryptWallet: !this.state.encryptWallet });
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ confirming: false });

  render() {
    const {
      onStageSelect,
      t
    } = this.props;
    const {
      confirming,
      encryptWallet,
      password
    } = this.state;
    return (
      <Form>
        <Form.Checkbox
          checked={encryptWallet}
          label={t('wallet_panel_form_encrypt_wallet')}
          name="encryptWallet"
          onChange={this.onToggle}
          value={encryptWallet ? 'on' : 'off'}
        />
        {(encryptWallet)
        ? [(
          <Form.Field
            autoFocus
            control={Input}
            fluid
            icon="lock"
            label={t('wallet_panel_password_label')}
            name="password"
            type="password"
            onChange={this.onChange}
          />
          ), (
            <Message
              content={t('wallet_panel_form_will_save')}
            />
          ), (
            <Container>
              <WalletPanelFormModalConfirm
                open={confirming}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                onSubmit={this.onComplete}
                password={password}
              />
              <Button
                content={t('back')}
                icon="arrow left"
                onClick={() => onStageSelect(types.SETUP_STAGE_KEY_CONFIG)}
                size="small"
              />
            </Container>
          )]
        : [(
          <Message
            content={t('wallet_panel_form_not_saved')}
          />
        ), (
          <Container>
            <Button
              content={t('wallet_panel_form_use_temporary')}
              color="green"
              floated="right"
              onClick={this.onComplete}
            />
            <Button
              content={t('back')}
              icon="arrow left"
              onClick={() => onStageSelect(types.SETUP_STAGE_KEY_CONFIG)}
              size="small"
            />
          </Container>
          )]
        }
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeWalletContainer);
