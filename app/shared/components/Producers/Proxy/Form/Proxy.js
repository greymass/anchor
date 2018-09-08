// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import ProducersFormProxyConfirming from './Proxy/Confirming';
import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';

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
      addProxy,
      removeProxy
    } = this.props;

    this.setState({
      confirming: addProxy || removeProxy,
      proxyAccount: addProxy
    });
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
    let {
      proxyAccount
    } = this.state;

    this.setState({ confirming: false }, () => {
      this.props.actions.voteproducers([], proxyAccount || '');
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
      addProxy,
      currentProxy,
      isProxying,
      onClose,
      removeProxy,
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
        warning
        loading={system.VOTEPRODUCER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(confirming)
          ? (
            <ProducersFormProxyConfirming
              currentProxy={currentProxy}
              showBackButton={!addProxy && !removeProxy}
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
                    {currentProxy}
                  </Header.Content>
                </Header>
              ) : ''}

              <GlobalFormFieldAccount
                autoFocus
                contacts={settings.contacts}
                label={`${t('producers_form_proxy_label')}:`}
                name="account"
                onChange={this.onChange}
                value={proxyAccount || ''}
              />

              <Message
                content={t('producers_form_proxy_message')}
                warning
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
