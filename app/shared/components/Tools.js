// @flow
import React, { Component } from 'react';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import GlobalSettingsLanguage from './Global/Settings/Language';
import GlobalSettingsBlockExplorer from './Global/Settings/BlockExplorer';
import GlobalSettingsShowTestnets from './Global/Settings/ShowTestnets';
import GlobalSettingsIdleTimeout from './Global/Settings/IdleTimeout';
import GlobalSettingsSkipLinkModal from './Global/Settings/SkipLinkModal';
import GlobalSettingsResourceDisplayFormat from './Global/Settings/ResourceDisplayFormat';
import GlobalSettingsFilterSpamTransfers from './Global/Settings/FilterSpamTransfers';

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
              <label>{t('tools_change_language2')}</label>
              <GlobalSettingsLanguage
                actions={actions}
                setLanguage={settings.lang}
                i18n={i18n}
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
                      defaultValue={settings.displayResourcesAvailable || false}
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
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(Tools);
