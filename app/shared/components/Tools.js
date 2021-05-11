// @flow
import React, { Component } from 'react';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import GlobalButtonResetContainer from '../containers/Global/Button/Reset';
import GlobalSettingsAdvancedOptions from './Global/Settings/AdvancedOptions';
import GlobalSettingsAnchorLinkService from './Global/Settings/AnchorLinkService';
import GlobalSettingsLanguage from './Global/Settings/Language';
import GlobalSettingsBackground from './Global/Settings/Background';
import GlobalSettingsBlockExplorer from './Global/Settings/BlockExplorer';
import GlobalSettingsDfuse from './Global/Settings/Dfuse';
import GlobalSettingsIdleTimeout from './Global/Settings/IdleTimeout';
import GlobalSettingsRefreshRate from './Global/Settings/RefreshRate';
import GlobalSettingsSigningRequests from './Global/Settings/SigningRequests';
import GlobalSettingsShowTestnets from './Global/Settings/ShowTestnets';
import GlobalSettingsSkipLinkModal from './Global/Settings/SkipLinkModal';
import GlobalSettingsResourceDisplayFormat from './Global/Settings/ResourceDisplayFormat';
import GlobalSettingsTransactionFees from './Global/Settings/TransactionFees';
import GlobalSettingsFilterSpamTransfers from './Global/Settings/FilterSpamTransfers';
import GlobalSettingsAllowDangerousTransactions from './Global/Settings/AllowDangerousTransactions';

const os = require('os');

class Tools extends Component<Props> {
  render() {
    const {
      actions,
      allBlockExplorers,
      connection,
      i18n,
      settings,
      t
    } = this.props;
    const platform = os.platform();
    return (
      <React.Fragment>
        <Segment basic>
          <Segment padded color="grey">
            <Form>
              <Header dividing>
                {t('tools_settings_header_interface')}
              </Header>
              <Form.Field>
                <label>{t('tools_change_language2')}</label>
                <GlobalSettingsLanguage
                  actions={actions}
                  setLanguage={settings.lang}
                  i18n={i18n}
                  selection
                />
              </Form.Field>
              <Form.Field>
                <label>{t('tools_change_advanced_options')}</label>
                <GlobalSettingsAdvancedOptions
                  actions={actions}
                  defaultValue={settings.advancedOptions}
                  selection
                />
              </Form.Field>
              {(settings.walletMode !== 'cold')
                ? (
                  <Form.Field>
                    <label>{t('tools_change_signing_requests')}</label>
                    <GlobalSettingsSigningRequests
                      actions={actions}
                      defaultValue={settings.allowSigningRequests}
                      selection
                    />
                  </Form.Field>
                ) : false
              }
              {(settings.walletMode !== 'cold')
                ? (
                  <Form.Field>
                    <label>{t('tools_change_block_explorer2')}</label>
                    <GlobalSettingsBlockExplorer
                      actions={actions}
                      blockExplorers={allBlockExplorers[connection.chainKey]}
                      chainId={connection.chainId}
                      defaultValue={settings.blockExplorer}
                      selection
                    />
                  </Form.Field>
                ) : false
              }
              {(platform === 'darwin')
                ? (
                  <Form.Field>
                    <label>{t('tools_change_background_process')}</label>
                    <GlobalSettingsBackground
                      actions={actions}
                      value={settings.backgroundMode}
                    />
                  </Form.Field>
                )
                : false
              }
              {(settings.walletMode !== 'cold')
                ? (
                  <React.Fragment>
                    <Form.Field>
                      <label>{t('tools_change_skip_link_modal')}</label>
                      <GlobalSettingsSkipLinkModal
                        actions={actions}
                        defaultValue={settings.skipLinkModal}
                        selection
                      />
                    </Form.Field>
                  </React.Fragment>
                )
                : false
              }
            </Form>
          </Segment>
          <Segment padded color="grey">
            <Form>
              <Header dividing>
                {t('tools_settings_header_wallet')}
              </Header>
              <Form.Field>
                <label>{t('tools_change_fees')}</label>
                <GlobalSettingsTransactionFees
                  actions={actions}
                  defaultValue={settings.transactionFees}
                  selection
                />
              </Form.Field>
              <Form.Field>
                <label>{t('tools_change_timeout')}</label>
                <GlobalSettingsIdleTimeout
                  actions={actions}
                  defaultValue={settings.idleTimeout}
                  selection
                />
              </Form.Field>
              {(settings.walletMode !== 'cold')
                ? (
                  <React.Fragment>
                    <Form.Field>
                      <label>{t('tools_change_resource_display_format')}</label>
                      <GlobalSettingsResourceDisplayFormat
                        actions={actions}
                        value={settings.displayResourcesAvailable || false}
                        selection
                      />
                    </Form.Field>
                  </React.Fragment>
                )
                : false
              }
            </Form>
          </Segment>
          <Segment padded color="grey">
            <Form>
              <Header dividing>
                {t('tools_settings_header_connection')}
              </Header>
              {(settings.walletMode !== 'cold')
                ? (
                  <React.Fragment>
                    <Form.Field>
                      <label>{t('tools_wallet_refresh_rate')}</label>
                      <GlobalSettingsRefreshRate
                        actions={actions}
                        defaultValue={settings.refreshRate}
                        selection
                      />
                    </Form.Field>
                    {(true === false)
                      ? (
                        <Form.Field>
                          <label>{t('tools_settings_anchorlink_service')}</label>
                          <GlobalSettingsAnchorLinkService
                            actions={actions}
                            defaultValue={settings.anchorLinkServiceUrl}
                          />
                        </Form.Field>
                      )
                      : false
                    }
                    <Form.Field>
                      <label>{t('tools_change_dfuse_api_key')}</label>
                      <GlobalSettingsDfuse
                        actions={actions}
                        value={settings.dfuseKey}
                      />
                    </Form.Field>
                  </React.Fragment>
                )
                : false
              }
            </Form>
          </Segment>
          <Segment padded color="orange">
            <Form>
              <Header dividing>
                {t('tools_settings_header_developer')}
              </Header>
              <Form.Field>
                <label>{t('tools_change_allow_dangerous_transactions')}</label>
                <GlobalSettingsAllowDangerousTransactions
                  actions={actions}
                  defaultValue={settings.allowDangerousTransactions}
                  selection
                />
              </Form.Field>
              <Form.Field>
                <label>{t('tools_change_display_test_networks')}</label>
                <GlobalSettingsShowTestnets
                  actions={actions}
                  defaultValue={settings.displayTestNetworks}
                  selection
                />
              </Form.Field>
            </Form>
          </Segment>
          <Segment clearing padded color="orange">
            <Header dividing>
              Danger Zone!
            </Header>
            <p>Delete everything and completely reset Anchor.</p>
            <GlobalButtonResetContainer />
          </Segment>
        </Segment>
      </React.Fragment>
    );
  }
}

export default withTranslation('tools')(Tools);
