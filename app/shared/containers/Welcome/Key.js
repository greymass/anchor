// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Checkbox, Container, Form, Input, Message, Segment } from 'semantic-ui-react';

import * as AccountActions from '../../actions/accounts';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';

const ecc = require('eosjs-ecc');

type Props = {
  accounts: {},
  actions: {
    setSettingWithValidation: () => void
  },
  history: {},
  keys: {},
  onStageSelect: () => void,
  settings: {
    node: string
  },
  t: () => void,
  validate: {},
  wallet: {}
};

class WelcomeKeyContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { keys } = props;
    this.state = {
      key: (keys) ? keys.key : '',
      visible: false
    };
  }

  componentDidMount() {
    const {
      history,
      wallet
    } = this.props;
    if (wallet.account) {
      history.push('/voter');
    }
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value.trim()
    });
  }, 300)

  onCompare = () => {
    const {
      key
    } = this.state;
    const {
      actions,
      onStageSelect,
      settings
    } = this.props;
    const {
      setTemporaryKey,
      validateKey
    } = actions;
    // Validate against account
    validateKey(key, settings);
    // Set for temporary usage
    setTemporaryKey(key);
    if (onStageSelect) {
      onStageSelect(3);
    }
  }

  onToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const {
      accounts,
      keys,
      settings,
      t,
      validate
    } = this.props;
    const {
      account
    } = settings;
    const {
      visible
    } = this.state;
    let currentPublic;
    try {
      currentPublic = ecc.privateToPublic(keys.key);
    } catch (e) {
      // invalid key
    }

    const validKeys = new Set(accounts[account].permissions.map((perm) =>
      perm.required_auth.keys[0].key));
    let message = (
      <Message
        color="blue"
        content={t('welcome_key_compare_content')}
        icon="info circle"
        info
        header={t('welcome_key_compare_title')}
      />
    );

    // display an error if the account could not be found
    if (validate.KEY === 'FAILURE' && currentPublic) {
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
    if (validate.KEY === 'FAILURE' && !currentPublic) {
      message = (
        <Message
          color="red"
          content={t('welcome_key_compare_fail_invalid_content')}
          header={t('welcome_key_compare_fail_invalid_title')}
        />
      );
    }
    if (validate.KEY === 'SUCCESS' && Array.from(validKeys).indexOf(currentPublic) >= 0) {
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
      <Form
        onSubmit={this.onCompare}
      >
        <Form.Field
          autoFocus
          control={Input}
          defaultValue={keys.key}
          fluid
          icon={(validate.KEY === 'SUCCESS') ? 'checkmark' : 'x'}
          loading={(validate.KEY === 'PENDING')}
          name="key"
          onChange={this.onChange}
          placeholder={t('welcome_key_compare_placeholder')}
          type={(visible) ? 'text' : 'password'}
        />
        <Checkbox
          label={t('welcome_key_compare_visible')}
          onChange={this.onToggle}
          checked={visible}
        />
        <Segment secondary>
          {t('welcome_key_compare_expecting_match_to')}
          <br />
          {Array.from(validKeys).map((key) => (
            <small><code>{key}</code><br /></small>
          ))}
        </Segment>
        {message}
        <Container textAlign="center">
          <Button
            content={t('welcome_compare_key')}
            icon="search"
            primary
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
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeKeyContainer);
