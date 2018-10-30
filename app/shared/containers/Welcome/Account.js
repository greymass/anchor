// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Container, Dropdown, Form, Input, Message } from 'semantic-ui-react';

import * as AccountActions from '../../actions/accounts';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';
import * as types from '../../../shared/actions/types';

const ecc = require('eosjs-ecc');

type Props = {
  accounts: {},
  actions: {
    setSettingWithValidation: () => void
  },
  history: {},
  onStageSelect: () => void,
  settings: {},
  t: () => void,
  validate: {}
};

class WelcomeAccountContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { settings } = props;
    this.state = {
      account: settings.account || ''
    };
  }

  componentDidMount() {
    const {
      actions,
      history,
      settings,
      validate
    } = this.props;
    if (settings.skipImport) {
      history.push('/voter');
    }
    switch (settings.walletMode) {
      default: {
        if (validate.ACCOUNT !== 'SUCCESS' && this.state.account) {
          const { validateAccount } = actions;
          validateAccount(this.state.account);
        }
        break;
      }
    }
  }

  cancelColdWallet = (e) => {
    const {
      actions,
      onStageSelect
    } = this.props;
    const {
      setWalletMode
    } = actions;
    setWalletMode('hot');
    onStageSelect(types.SETUP_STAGE_ACCOUNT_OPTIONS);
    e.preventDefault();
    return false;
  }

  onChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }

  onLookup = () => {
    var {
      account
    } = this.state;
    const {
      actions,
      onStageSelect,
      settings
    } = this.props;
    switch (settings.walletMode) {
      // with cold wallets, there's no way to validate, assume true
      case 'cold': {
        const { setSetting } = actions;
        setSetting('account', account);
        if (onStageSelect) {
          onStageSelect(types.SETUP_STAGE_KEY_CONFIG);
        }
        break;
      }
      default: {
        if (ecc.isValidPublic(account) === true) {
          const { getAccountByKey } = actions;
          getAccountByKey(account);
        } else {
          const { setSettingWithValidation } = actions;
          setSettingWithValidation('account', String(account).toLowerCase());
          if (onStageSelect) {
            onStageSelect(types.SETUP_STAGE_KEY_CONFIG);
          }
        }
        break;
      }
    }
  }

  onToggle = () => this.setState({ editing: !this.state.editing });

  render() {
    const {
      accounts,
      onStageSelect,
      settings,
      t,
      validate
    } = this.props;
    const {
      account
    } = this.state;
    let buttonColor = 'blue';
    let buttonText = t('welcome:welcome_lookup_account');
    let instruction = t('welcome:welcome_instructions_3');
    let input = (
      <Form.Field
        autoFocus
        control={Input}
        fluid
        icon={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS') ? 'checkmark' : 'x'}
        loading={(validate.ACCOUNT === 'PENDING')}
        name="account"
        onChange={this.onChange}
        defaultValue={account}
      />
    );
    let message = (
      <Message
        color="blue"
        content={t('welcome:welcome_account_lookup_content')}
        icon="search"
        info
        header={t('welcome:welcome_account_lookup_title')}
      />
    );
    // display an error if the account could not be found
    if (validate.ACCOUNT === 'FAILURE') {
      message = (
        <Message
          color="red"
          content={t('welcome:welcome_account_lookup_fail_content')}
          header={t('welcome:welcome_account_lookup_fail_title')}
          icon="warning sign"
        />
      );
    }
    if (account && accounts.__lookups && accounts.__lookups.length > 0) {
      instruction = t('welcome:welcome_instructions_4');
      buttonColor = 'purple';
      buttonText = t('welcome:welcome_select_account');
      input = (
        <Dropdown
          defaultValue={account}
          fluid
          loading={(validate.ACCOUNT === 'PENDING')}
          name="account"
          selection
          size="small"
          onChange={this.onChange}
          options={accounts.__lookups.map((account) => {
            return {
              key: account,
              text: account,
              value: account
            };
          })}
        />
      );
      message = (
        <Message
          color="purple"
          content={t('welcome:welcome_account_select_content')}
          icon="group"
          header={t('welcome:welcome_account_select_title')}
        />
      );
    }
    // If we're operating in cold storage
    if (settings.walletMode === 'cold') {
      buttonText = t('welcome:welcome_enter_account');
      buttonColor = 'purple';
      instruction = t('welcome:welcome_instructions_3_cold');
      message = (
        <Message
          color={buttonColor}
          content={t('welcome:welcome_account_coldwallet_content')}
          icon="snowflake"
          header={t('welcome:welcome_account_coldwallet_title')}
        />
      );
    }
    return (
      <React.Fragment>
        <p>{instruction}</p>
        <Form>
          {input}
          {message}
          <Container>
            <Button
              color={buttonColor}
              content={buttonText}
              floated="right"
              icon="search"
              onClick={this.onLookup}
              primary
              size="small"
              style={{ marginTop: '1em' }}
            />
            {(settings.walletMode === 'cold')
              ? (
                <Button
                  content={t('welcome_cancel_coldwallet')}
                  icon="x"
                  onClick={this.cancelColdWallet}
                  size="small"
                  style={{ marginTop: '1em' }}
                />
              )
              : (
                <Button
                  content={t('back')}
                  icon="arrow left"
                  onClick={() => onStageSelect(types.SETUP_STAGE_ACCOUNT_OPTIONS)}
                  size="small"
                  style={{ marginTop: '1em' }}
                />
              )
            }
          </Container>
        </Form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeAccountContainer);
