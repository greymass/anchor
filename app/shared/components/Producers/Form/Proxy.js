// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Dropdown, Message } from 'semantic-ui-react';
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

  componentDidMount = () => {
    const { actions } = this.props;

    actions.getTable('regproxyinfo', 'regproxyinfo', 'proxies');
  }

  onChange = (e, { value, valid }) => {
    const {
      actions
    } = this.props;

    this.setState({
      submitDisabled: !valid,
      proxyAccount: value
    }, () => {
      actions.getAccount(value);
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

    const proxyOptions = tables.regproxyinfo &&
      tables.regproxyinfo.regproxyinfo.proxies.rows.map((contract) => {
        return {
          key: contract.account,
          text: contract.name,
          value: contract.account
        };
      });

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
                content={t('producers_form_message')}
                warning
              />

              <Button
                onClick={this.switchFormMode}
                content={
                  browsingProxies
                  ? (
                      t('producers_form_browsing_button')
                    ) : (
                      t('producers_form_by_account_button')
                  )
                }
              />
              {(browsingProxies)
                ? (
                  <Dropdown
                    defaultValue={proxyOptions[0]}
                    name="proxy"
                    onChange={this.onChange}
                    options={proxyOptions}
                    search
                    selection
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


              {(proxyAccount)
                ? (
                  <div>
                    <Divider />
                    <p>
                      {t('producers_form_proxy_summary_one')}
                      {proxyAccount}
                      {t('producers_form_proxy_summary_two')}
                      {accounts[proxyAccount] && accounts[proxyAccount].voter_info.producers.join(', ')}
                    </p>
                  </div>
                ) : ''}

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
