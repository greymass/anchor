// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Checkbox, Container, Dropdown, Form, Header, Input, Message, Radio, Segment } from 'semantic-ui-react';

import * as AccountActions from '../../actions/accounts';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';
import * as WalletsActions from '../../actions/wallets';

const ecc = require('eosjs-ecc');

type Props = {
  accounts: {},
  actions: {
    setSettingWithValidation: () => void
  },
  connection: {},
  history: {},
  keys: {},
  onStageSelect: () => void,
  settings: {},
  t: () => void,
  validate: {}
};

class WelcomeKeyContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { keys } = props;
    this.state = {
      authorization: 'active',
      key: (keys) ? keys.key : '',
      visible: false
    };
  }

  onChange = (e, { name, value }) => {
    this.setState({
      [name]: value.trim()
    });
  }

  onCompare = () => {
    const {
      authorization,
      key
    } = this.state;
    const {
      actions,
      connection,
      history,
      onStageSelect,
      settings
    } = this.props;
    const {
      importWallet,
      setSetting,
      setTemporaryKey,
      setWalletMode,
      useWallet,
      validateKey
    } = actions;
    // Set for temporary usage
    setSetting('authorization', authorization);
    switch (settings.walletMode) {
      case 'cold': {
        setTemporaryKey(key, authorization);
        if (ecc.isValidPrivate(key) && onStageSelect) {
          onStageSelect(4);
        }
        break;
      }
      case 'watch': {
        const {
          accounts,
        } = this.props;
        const {
          account
        } = settings;
        let validKeys = [];
        let pubkey = false
        try {
          if (accounts[account]) {
            validKeys = new Set(accounts[account].permissions
              .filter((perm) => perm.required_auth.keys.length > 0)
              .map((perm) => perm.required_auth.keys[0].key)).values();
          }
          pubkey = validKeys.next().value;
        } catch (e) {
          // invalid key
        }
        // Import the watch wallet
        importWallet(connection.chainId, settings.account, authorization, false, false, 'watch', pubkey);
        // Set this wallet as the used wallet
        useWallet(connection.chainId, settings.account, authorization);
        // Initialize the wallet setting
        setSetting('authorization', authorization);
        setSetting('chainId', connection.chainId);
        setSetting('walletInit', true);
        // Move on to the voter
        history.push('/voter');
        break;
      }
      default: {
        // Validate against account
        validateKey(key, settings).then((authorization) => {
          setSetting('authorization', authorization);
          setWalletMode('hot');
          setTemporaryKey(key, authorization);
          if (onStageSelect) {
            onStageSelect(4);
          }
        });
        break;
      }
    }
  }

  onToggleKey = () => this.setState({ visible: !this.state.visible });

  onToggleWatch = (e, { checked }) => {
    const {
      actions
    } = this.props;
    const {
      setWalletMode
    } = actions;
    if (checked) {
      // Immediately set the wallet into hot wallet mode
      setWalletMode('hot');
    } else {
      // Immediately set the wallet into watch wallet mode
      setWalletMode('watch');
      // Remove any key we may have had
      this.setState({key: ''});
    }
  }

  setAuthorization = (e, { value }) => {
    this.setState({
      authorization: value
    });
  }

  render() {
    const {
      accounts,
      connection,
      keys,
      onStageSelect,
      settings,
      t,
      validate
    } = this.props;
    const {
      account
    } = settings;
    const {
      authorization,
      key,
      visible
    } = this.state;
    const currentPublic = keys.pubkey || false;
    // For hot wallets
    let validKeys = false;
    if (accounts[account]) {
      validKeys = new Set(accounts[account].permissions
        .filter((perm) => perm.required_auth.keys.length > 0)
        .map((perm) => perm.required_auth.keys[0].key));
    }
    const options = ['active', 'owner'].map((authority) => (
      {
        key: authority,
        text: authority,
        value: authority
      }
    ));
    let buttonColor = 'blue';
    let buttonIcon = 'search';
    let buttonText = t('welcome_compare_key');
    let matching = (
      <p>
        {t('welcome_key_compare_expecting_match_to')}
        <p>
          {Array.from(validKeys).map((key) => (
            <small key={key}><code>{key}</code><br /></small>
          ))}
        </p>
      </p>
    );
    let message = false;
    switch (settings.walletMode) {
      case 'cold': {
        buttonColor = 'purple';
        buttonText = t('welcome_key_coldwallet');
        matching = false;
        message = (
          <Message
            color={buttonColor}
            content={t('welcome_key_coldwallet_content')}
            floated="right"
            icon="snowflake"
            info
            header={t('welcome_key_coldwallet_title')}
          />
        );
        break;
      }
      case 'watch': {
        buttonColor = 'orange';
        buttonIcon = 'circle checkmark';
        buttonText = t('welcome_key_watchwallet');
        matching = false;
        message = (
          <Message
            color={buttonColor}
            content={t('welcome_key_watchwallet_content')}
            floated="right"
            icon="eye"
            info
            header={t('welcome_key_watchwallet_title')}
          />
        );
        break;
      }
      default: {
        // no default
        break;
      }
    }
    // display an error if the account could not be found
    if (settings.walletMode !== 'watch' && validate.KEY === 'FAILURE' && currentPublic) {
      message = (
        <Message
          color="red"
        >
          <Message.Header>
            {t('welcome_key_compare_fail_match_title')}
          </Message.Header>
          <Message.Content>
            <p>
              {t('welcome_key_compare_fail_match_content')}
              <br />
              <small><code>{currentPublic}</code></small>
            </p>
          </Message.Content>
        </Message>
      );
    }
    if (settings.walletMode !== 'watch' && validate.KEY === 'FAILURE' && !currentPublic) {
      message = (
        <Message
          color="red"
          content={t('welcome_key_compare_fail_invalid_content')}
          header={t('welcome_key_compare_fail_invalid_title')}
        />
      );
    }
    if (settings.walletMode !== 'watch' && validate.KEY === 'SUCCESS' && Array.from(validKeys).indexOf(currentPublic) >= 0) {
      matching = false;
      message = (
        <Message
          color="green"
          content={t('welcome_key_compare_matches_content')}
          header={t('welcome_key_compare_matches_title')}
        />
      );
    }
    if (validate.KEY === 'PENDING') message = false;
    return (
      <Form>
        {(settings.walletMode !== 'cold')
          ? (
            <React.Fragment>
              <Header size="small">{t('welcome_instructions_sign_tx')}</Header>
              <Form.Field
                autoFocus
                control={Radio}
                label={t('welcome_key_sign_tx')}
                toggle
                defaultChecked={(settings.walletMode !== 'watch')}
                name="hotWallet"
                onChange={this.onToggleWatch}
              />
            </React.Fragment>
          )
          : false
        }
        {(settings.walletMode !== 'watch')
          ? (
            <React.Fragment>
              <Header size="small">{t('welcome_instructions_5')}</Header>
              <Form.Field
                autoFocus
                control={Input}
                defaultValue={key}
                icon={(validate.KEY === 'SUCCESS') ? 'checkmark' : 'x'}
                loading={(validate.KEY === 'PENDING')}
                name="key"
                onChange={this.onChange}
                placeholder={t('welcome_key_compare_placeholder')}
                type={(visible) ? 'text' : 'password'}
              />
              <Checkbox
                label={t('welcome_key_compare_visible')}
                onChange={this.onToggleKey}
                checked={visible}
              />
              {(settings.walletMode === 'cold')
                ? (
                  <React.Fragment>
                    <Header>{t('tools:tools_form_permissions_auth_permission')}</Header>
                    <Dropdown
                      defaultValue={authorization}
                      fluid
                      onChange={this.setAuthorization}
                      options={options}
                      selection
                    />
                  </React.Fragment>
                )
                : false
              }
            </React.Fragment>
          )
          : false
        }
        {(settings.walletMode === 'watch')
          ? (
            <React.Fragment>
              <Header>{t('tools:tools_form_permissions_auth_permission')}</Header>
              <Dropdown
                defaultValue={authorization}
                fluid
                onChange={this.setAuthorization}
                options={options}
                selection
              />
            </React.Fragment>
          )
          : false
        }
        {matching}
        {message}
        <Container>
          <Button
            color={buttonColor}
            content={buttonText}
            floated="right"
            icon={buttonIcon}
            onClick={this.onCompare}
            size="small"
            style={{ marginTop: '1em' }}
          />
          <Button
            content={t('back')}
            icon="arrow left"
            onClick={() => onStageSelect(2)}
            size="small"
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate(['welcome','tools']),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeKeyContainer);
