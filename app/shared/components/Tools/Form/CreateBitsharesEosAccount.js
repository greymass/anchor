// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';

import { Segment, Form, Header, Button, Icon, Table } from 'semantic-ui-react';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../Global/Form/Field/Key/Public';

class ToolsFormCreateBitsharesEosAccount extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      accountName: '',
      activeKey: '',
      ownerKey: '',
      showAccountValidationError: false,
      showPublicActiveKeyError: false,
      showPublicOwnerKeyError: false,
      confirming: false,
      submitDisabled: true
    };
  }

  onSubmit = (e) => {
    this.setState({
      confirming: true
    });
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.props.system.ACCOUNT_AVAILABLE === 'SUCCESS'
          && !this.state.showAccountValidationError
          && !this.state.showPublicActiveKeyError
          && !this.state.showPublicOwnerKeyError
          && this.state.accountName !== ''
          && this.state.activeKey !== ''
          && this.state.ownerKey !== '') {
        this.onSubmit(e);
        e.preventDefault();
        return false;
      }
    }
  }

  onChange = debounce((e, { name, value, valid }) => {
    const newState = {
      [name]: value
    };
    const re = /^[a-z1-5.]+$/;
    if (name === 'accountName') {
      if ((re.test(value) && (value.length === 12) && (value.substr(value.length - 1) !== '.')) || (value === '')) {
        newState.showAccountValidationError = false;
      } else {
        newState.showAccountValidationError = true;
      }
    }

    if (name === 'ownerKey') {
      if (!valid) {
        this.setState({
          showPublicOwnerKeyError: true
        });
      } else {
        this.setState({
          showPublicOwnerKeyError: false
        });
      }
    }

    if (name === 'activeKey') {
      if (!valid) {
        this.setState({
          showPublicActiveKeyError: true
        });
      } else {
        this.setState({
          showPublicActiveKeyError: false
        });
      }
    }

    this.setState(newState, () => {
      const {
        accountName
      } = this.state;

      const {
        actions
      } = this.props;

      const {
        checkAccountAvailability
      } = actions;

      if (name === 'accountName' && accountName.length !== 0) {
        checkAccountAvailability(accountName);
      }
    });
  }, 200)

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  onConfirm = () => {
    this.setState({
      confirming: false
    });

    const {
      actions
    } = this.props;

    const {
      createAccount
    } = actions;

    const {
      accountName,
      activeKey,
      ownerKey
    } = this.state;
    createAccount(
      accountName,
      activeKey,
      null,
      null,
      ownerKey,
      null,
      null
    );
  }

  render() {
    const {
      hideCancel,
      onClose,
      system,
      t,
      connection
    } = this.props;

    const {
      accountName,
      activeKey,
      ownerKey,
      showAccountValidationError
    } = this.state;

    let {
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;
    let accountTakenError = null;
    let accountValidationError = null;
    let publicActiveKeyError = null;
    let publicOwnerKeyError = null;

    if (system.ACCOUNT_AVAILABLE === 'FAILURE') {
      submitDisabled = true;
      accountTakenError = <p className="beos-validation-error">{`${t('tools_beos_account_taken_error')}`}</p>;
    }

    if (system.ACCOUNT_AVAILABLE === 'SUCCESS' && !showAccountValidationError) {
      submitDisabled = false;
    }

    if (showAccountValidationError && system.ACCOUNT_AVAILABLE === 'SUCCESS') {
      submitDisabled = true;
      accountValidationError = <p className="beos-validation-error">{`${t('tools_beos_account_validation_error')}`}</p>;
    }

    if (this.state.showPublicActiveKeyError) {
      submitDisabled = true;
      publicActiveKeyError = <p className="beos-validation-error">{`${t('tools_public_active_key_error')}`}</p>;
    }

    if (this.state.showPublicOwnerKeyError) {
      submitDisabled = true;
      publicOwnerKeyError = <p className="beos-validation-error">{`${t('tools_public_owner_key_error')}`}</p>;
    }

    if ((this.state.accountName === '') || (this.state.activeKey === '') || (this.state.ownerKey === '')) {
      submitDisabled = true;
    }

    return (
      <Segment
        loading={system.CREATEACCOUNT === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <GlobalFormFieldKeyPublic
                  connection={connection}
                  defaultValue={ownerKey || ''}
                  label={t('tools_form_create_account_owner_key')}
                  name="ownerKey"
                  onChange={this.onChange}
                  value={ownerKey || ''}
                />
                {publicOwnerKeyError}
                <GlobalFormFieldKeyPublic
                  connection={connection}
                  defaultValue={activeKey || ''}
                  label={t('tools_form_create_account_active_key')}
                  name="activeKey"
                  onChange={this.onChange}
                  value={activeKey || ''}
                />
                {publicActiveKeyError}
                <GlobalFormFieldAccount
                  label={t('tools_form_create_account_account_name')}
                  name="accountName"
                  onChange={this.onChange}
                  value={accountName || ''}
                />
                {accountTakenError}
                {accountValidationError}
                <Segment basic clearing>
                  {(!hideCancel)
                    ? (
                      <Button
                        content={t('tools_form_create_account_cancel')}
                        color="grey"
                        onClick={onClose}
                      />
                    ) : ''}

                  <Button
                    content={t('tools_form_create_account_button')}
                    color="green"
                    disabled={submitDisabled}
                    floated="right"
                    primary
                  />
                </Segment>
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <Segment padding="true" basic>
              <Header textAlign="center">
                <p>{`${t('tools_account_creation_header')}`}</p>
              </Header>
              <Table size="small" celled>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={8}>
                      {t('tools_form_create_account_owner_key')}
                    </Table.Cell>
                    <Table.Cell width={8}>
                      {ownerKey}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={8}>
                      {t('tools_form_create_account_active_key')}
                    </Table.Cell>
                    <Table.Cell width={8}>
                      {activeKey}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={8}>
                      {t('tools_form_create_account_account_name')}
                    </Table.Cell>
                    <Table.Cell width={8}>
                      {accountName}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button
                onClick={this.onBack}
              >
                <Icon name="arrow left" /> {t('tools_form_create_account_back')}
              </Button>
              <Button
                color="blue"
                floated="right"
                onClick={this.onConfirm}
              >
                <Icon name="check" /> {t('tools_form_create_account_button')}
              </Button>
            </Segment>
          ) : ''}
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormCreateBitsharesEosAccount);
