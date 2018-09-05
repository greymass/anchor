// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import ProducersFormProxyConfirming from './Proxy/Confirming';

class ProducersFormProxy extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      browsingProxies: false,
      confirming: false,
      proxyAccount: '',
      submitDisabled: true
    };
  }

  state = {};

  componentWillMount = () => {
    const {
      proxyAccount
    } = this.state;

    if (proxyAccount) {
      this.setState({
        confirming: true,
        proxyAccount
      });
    }
  }

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

  switchFormMode = (e) => {
    this.setState({
      browsingProxies: !this.state.browsingProxies
    });

    e.preventDefault();
    return false;
  }

  render() {
    const {
      accounts,
      currentProxyAccount,
      onClose,
      isProxying,
      settings,
      system,
      t,
      tables
    } = this.props;

    const {
      browsingProxies,
      confirming,
      proxyAccount,
      submitDisabled
    } = this.state;

    return (
      <Form
        warning
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

              <Message
                content={t('producers_form_proxy_message')}
                warning
              />

              <Button
                content={
                  browsingProxies
                  ? (
                      t('producers_form_proxy_by_account_button')
                    ) : (
                      t('producers_form_proxy_browsing_button')
                  )
                }
                onClick={this.switchFormMode}
                primary
                style={{ marginBottom: '10px' }}
              />
              {(browsingProxies)
                ? (
                  <Form.Dropdown
                    defaultValue={proxyAccount}
                    name="proxy"
                    onChange={(e, { value }) => this.onChange(e, { value, valid: true })}
                    options={proxyOptions}
                    placeholder={t('producers_form_proxy_dropdown_placeholder')}
                    search
                    selection
                    padded
                  />
                ) : (
                  <GlobalFormFieldAccount
                    autoFocus
                    contacts={settings.contacts}
                    label={`${t('producers_form_proxy_label')}:`}
                    name="account"
                    onChange={this.onChange}
                    value={proxyAccount}
                  />
                )}

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
