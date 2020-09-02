// @flow
import React, { Component } from 'react';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import GlobalSettingsAnchorLinkService from './Global/Settings/AnchorLinkService';
import GlobalSettingsLanguage from './Global/Settings/Language';
import GlobalSettingsBackground from './Global/Settings/Background';
import GlobalSettingsBlockExplorer from './Global/Settings/BlockExplorer';
import GlobalSettingsDfuse from './Global/Settings/Dfuse';
import GlobalSettingsShowTestnets from './Global/Settings/ShowTestnets';
import GlobalSettingsIdleTimeout from './Global/Settings/IdleTimeout';
import GlobalSettingsSkipLinkModal from './Global/Settings/SkipLinkModal';
import GlobalSettingsResourceDisplayFormat from './Global/Settings/ResourceDisplayFormat';
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
    return (
      <React.Fragment>
        <Segment>
          <Header>
            {t('tools_settings_header')}
            <Header.Subheader
              content={t('tools_settings_subheader')}
            />
          </Header>
          <Form>
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
            <Form.Field>
              <label>{t('tools_change_language2')}</label>
              <GlobalSettingsLanguage
                actions={actions}
                setLanguage={settings.lang}
                i18n={i18n}
                selection
              />
            </Form.Field>
            {(settings.walletMode !== 'cold')
              ? (
                <Form.Field>
                  <label>{t('tools_change_block_explorer2')}</label>
                  <GlobalSettingsBlockExplorer
                    actions={actions}
                    blockExplorers={allBlockExplorers[connection.chainKey]}
                    defaultValue={settings.blockExplorer}
                    selection
                  />
                </Form.Field>
              ) : false
            }
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
                    <label>{t('tools_change_skip_link_modal')}</label>
                    <GlobalSettingsSkipLinkModal
                      actions={actions}
                      defaultValue={settings.skipLinkModal}
                      selection
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>{t('tools_change_resource_display_format')}</label>
                    <GlobalSettingsResourceDisplayFormat
                      actions={actions}
                      value={settings.displayResourcesAvailable || false}
                      selection
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>{t('tools_change_transfer_spam_filter')}</label>
                    <GlobalSettingsFilterSpamTransfers
                      actions={actions}
                      defaultValue={settings.filterSpamTransfersUnder}
                      selection
                    />
                  </Form.Field>
                </React.Fragment>
              )
              : false
            }
            <Form.Field>
              <label>{t('tools_change_display_test_networks')}</label>
              <GlobalSettingsShowTestnets
                actions={actions}
                defaultValue={settings.displayTestNetworks}
                selection
              />
            </Form.Field>
            {(settings.walletMode !== 'cold')
              ? (
                <React.Fragment>
                  <Form.Field>
                    <label>{t('tools_change_allow_dangerous_transactions')}</label>
                    <GlobalSettingsAllowDangerousTransactions
                      actions={actions}
                      defaultValue={settings.allowDangerousTransactions}
                      selection
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>{t('tools_settings_anchorlink_service')}</label>
                    <GlobalSettingsAnchorLinkService
                      actions={actions}
                      defaultValue={settings.anchorLinkServiceUrl}
                    />
                  </Form.Field>
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
      </React.Fragment>
    );
  }
}

export default withTranslation('tools')(Tools);
