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
      proxyAccountName: ''
    };
  }

  state = {};

  onChange = (e, { name, value }) => {
    const newState = { [name]: value };
    if (name === 'quantity') {
      const [, symbol] = value.split(' ');
      newState.symbol = symbol;
    }
    this.setState(newState);
  }

  onRemove = (e) => {
    this.setState({ proxyAccountName: '' }, () => {
      this.onSubmit();
    });

    e.preventDefault();
    return false;
  }

  onConfirm = () => {
    const {
      proxyAccountName
    } = this.state;

    this.setState({ confirming: false }, () => {
      this.props.actions.voteproducers([], proxyAccountName);
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
      username
    } = this.state;

    const usernameRegex = /^[a-z]{12}$/;

    if (!usernameRegex.test(username)) {
      return 'not_valid_username';
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
      proxyAccountName,
      submitDisabled
    } = this.state;

    return (
      <Form
        loading={system.SETPROXY === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(confirming)
          ? (
            <ProducersFormProxyConfirming
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              proxyAccountName={proxyAccountName}
            />
          ) : (
            <Segment basic clearing>
              <FormFieldGeneric
                icon="x"
                label={t('producers_form_proxy_label')}
                loading={false}
                name="memo"
                onChange={this.onChange}
                value={proxyAccountName}
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
                onClick={onRemove}
                primary
              />
              <Button
                content={t('producers_form_proxy_remove')}
                disabled={submitDisabled}
                floated="right"
                color="red"
              />
            </Segment>
          )}
      </Form>
    );
  }
}

export default translate('producers')(ProducersFormProxy);
