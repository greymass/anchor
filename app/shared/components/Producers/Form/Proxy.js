// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash';

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
      actions,
      tables
    } = this.props;

    if (tables.regproxyinfo &&
        findIndex(tables.regproxyinfo.regproxyinfo.proxies.rows, { owner: value }) !== -1) {
      actions.getAccount(value);
    }

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

    const proxyRows = tables.regproxyinfo && tables.regproxyinfo.regproxyinfo.proxies.rows;

    const proxyOptions = proxyRows && proxyRows.map((contract) => {
      return {
        key: contract.owner,
        text: contract.name,
        value: contract.owner
      };
    });

    const currentProxy = proxyRows && proxyRows[findIndex(proxyRows, { owner: proxyAccount })];
    const currentProxyKeys = currentProxy && Object.keys(currentProxy).filter((key) => currentProxy[key]);

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


              {(proxyAccount && currentProxy && accounts[proxyAccount])
                ? (
                  <div>
                    <Divider />
                    <h3>{t('producers_form_proxy_info_header')}</h3>
                    <Table>
                      {currentProxyKeys.map((key) => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              {t(`producers_form_proxy_${key}`)}
                            </Table.Cell>
                            <Table.Cell>
                              {currentProxy[key]}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                      <Table.Row>
                        <Table.Cell>
                          {t('producers_form_proxy_current_votes')}
                        </Table.Cell>
                        <Table.Cell>
                          {(accounts[proxyAccount].voter_info.producers.length !== 0)
                            ? (
                              accounts[proxyAccount].voter_info.producers.join(', ')
                            ) : (
                              t('producers_form_proxy_summary_no_one')
                            )}
                        </Table.Cell>
                      </Table.Row>
                    </Table>
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
