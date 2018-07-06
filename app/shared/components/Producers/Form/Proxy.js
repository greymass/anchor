// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import FormFieldGeneric from '../../Global/Form/Field/Generic';
import FormMessageError from '../../Global/Form/Message/Error';
import ProducersFormProxyConfirming from './Proxy/Confirming';

class ProducersFormProxy extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirming: false,
      formError: '',
      proxyAccount: '',
      submitDisabled: true
    };
  }

  state = {};

  onChange = (e, { value }) => {
    this.setState({
      submitDisabled: false,
      formError: null,
      proxyAccount: value
    }, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  onRemove = (e) => {
    this.setState({ proxyAccount: '' }, () => {
      this.onSubmit();
    });

    e.preventDefault();
    return false;
  }

  onConfirm = () => {
    const {
      proxyAccount
    } = this.state;

    this.setState({ confirming: false }, () => {
      this.props.actions.voteproducers([], proxyAccount);
    });
  }

  onSubmit = () => {
    this.setState({
      confirming: true
    });
  }

  onBack = (e) => {
    this.setState({
      confirming: false
    });
    e.preventDefault();
    return false;
  }

  errorsInForm = () => {
    const {
      proxyAccount
    } = this.state;

    const usernameRegex = /^[a-z]{12}$/;

    if (!usernameRegex.test(proxyAccount)) {
      return 'not_valid_account_name';
    }

    return false;
  }

  onError = (error) => {
    let errorMessage;

    if (error !== true) {
      errorMessage = error;
    }

    this.setState({
      submitDisabled: true,
      formError: errorMessage
    });
  }

  render() {
    const {
      onClose,
      system,
      t
    } = this.props;

    const {
      confirming,
      formError,
      proxyAccount,
      submitDisabled
    } = this.state;

    return (
      <Form
        loading={system.VOTEPRODUCER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(confirming)
          ? (
            <ProducersFormProxyConfirming
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              proxyAccount={proxyAccount}
            />
          ) : (
            <Segment basic clearing>
              <FormFieldGeneric
                icon="x"
                label={t('producers_form_proxy_label')}
                loading={false}
                name="memo"
                onChange={this.onChange}
                value={proxyAccount}
              />

              <FormMessageError
                error={formError}
              />
              <Divider />
              <Button
                onClick={onClose}
              >
                <Icon name="x" /> {t('close')}
              </Button>
              <Button
                content={t('producers_form_proxy_confirm')}
                disabled={submitDisabled}
                floated="right"
                primary
              />
              <Button
                content={t('producers_form_proxy_remove')}
                floated="right"
                onClick={this.onRemove}
                color="red"
              />
            </Segment>
          )}
      </Form>
    );
  }
}

export default translate('producers')(ProducersFormProxy);
