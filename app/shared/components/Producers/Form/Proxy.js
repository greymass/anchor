// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import ProducersFormProxyConfirming from './Proxy/Confirming';

class ProducersFormProxy extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirming: false,
      proxyAccount: '',
      submitDisabled: true
    };
  }

  state = {};

  onChange = (e, { value, valid }) => {
    this.setState({
      submitDisabled: !valid,
      proxyAccount: value
    });
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
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

  render() {
    const {
      currentProxyAccount,
      onClose,
      isProxying,
      settings,
      system,
      t
    } = this.props;

    const {
      confirming,
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
              currentProxyAccount={currentProxyAccount}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              proxyAccount={proxyAccount}
              settings={settings}
            />
          ) : (
            <Segment basic clearing>
              {(isProxying) ? (
                <Header block size="large">
                  <Icon name="circle info" />
                  <Header.Content>
                    <Header.Subheader>
                      {t('producers_table_votes_proxied')}
                    </Header.Subheader>
                    {currentProxyAccount}
                  </Header.Content>
                </Header>
              ) : ''}
              <GlobalFormFieldAccount
                autoFocus
                label={`${t('producers_form_proxy_label')}:`}
                name="account"
                onChange={this.onChange}
                value={proxyAccount}
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
              {(isProxying) ? (
                <Button
                  content={t('producers_form_proxy_remove')}
                  floated="right"
                  onClick={this.onRemove}
                  color="red"
                />
              ) : ''}
            </Segment>
          )}
      </Form>
    );
  }
}

export default translate('producers')(ProducersFormProxy);
