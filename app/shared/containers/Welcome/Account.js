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

const ecc = require('eosjs-ecc');

type Props = {
  accounts: {},
  actions: {
    setSettingWithValidation: () => void
  },
  history: {},
  onStageSelect: () => void,
  settings: {
    node: string
  },
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
    if (validate.ACCOUNT !== 'SUCCESS' && this.state.account) {
      const { validateAccount } = actions;
      validateAccount(this.state.account);
    }
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }, 300)

  onLookup = () => {
    const {
      account
    } = this.state;
    const {
      actions,
      onStageSelect
    } = this.props;
    if (ecc.isValidPublic(account) === true) {
      const { getAccountByKey } = actions;
      getAccountByKey(account);
    } else {
      const { setSettingWithValidation } = actions;
      setSettingWithValidation('account', account);
      if (onStageSelect) {
        onStageSelect(2);
      }
    }
  }

  onToggle = () => this.setState({ editing: !this.state.editing });

  render() {
    const {
      accounts,
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
    return [(
      <p>{instruction}</p>
    ), (
      <Form
        onSubmit={this.onLookup}
      >
        {input}
        {message}
        <Container textAlign="center">
          <Button
            color={buttonColor}
            content={buttonText}
            icon="search"
            size="small"
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Form>
      )];
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
      ...ValidateActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeAccountContainer);
