// @flow
import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import * as types from '../../../shared/actions/types';

class WelcomeBreadcrumb extends Component<Props> {
  render() {
    const {
      onStageSelect,
      stage,
      t,
      walletMode
    } = this.props;
    return (
      <Breadcrumb size="large">
        {(walletMode !== 'cold')
          ? [(
            <Breadcrumb.Section
              active={(stage === types.SETUP_STAGE_CONNECTION)}
              key="connection_stage"
              onClick={(stage > types.SETUP_STAGE_CONNECTION) ? 
                () => onStageSelect(types.SETUP_STAGE_CONNECTION) : null}
            >
              {t('welcome_stage_connection')}
            </Breadcrumb.Section>
          ), (
            <Breadcrumb.Divider key="divider" icon="right angle" />
          )]
          : [(
            <Breadcrumb.Section
              key="connection_stage_cold"
            >
              {t('welcome_stage_coldwallet')}
            </Breadcrumb.Section>
          ), (
            <Breadcrumb.Divider key="divider" icon="right angle" />
          )]
        }
        <Breadcrumb.Section
          active={(stage === types.SETUP_STAGE_ACCOUNT_LOOKUP)}
          onClick={(stage > types.SETUP_STAGE_ACCOUNT_LOOKUP) ? 
            () => onStageSelect(types.SETUP_STAGE_ACCOUNT_LOOKUP) : null}
        >
          {t('welcome_stage_account')}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        {(walletMode !== 'watch')
          ? (
            <React.Fragment>
              <Breadcrumb.Section
                active={(stage === types.SETUP_STAGE_KEY_CONFIG)}
                onClick={(stage > types.SETUP_STAGE_KEY_CONFIG) ? 
                  () => onStageSelect(types.SETUP_STAGE_KEY_CONFIG) : null}
              >
                {t('welcome_stage_authorize')}
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right angle" />
              <Breadcrumb.Section
                active={(stage === types.SETUP_STAGE_WALLET_CONFIG)}
              >
                {t('welcome_stage_wallet')}
              </Breadcrumb.Section>
            </React.Fragment>
          )
          : (
            <Breadcrumb.Section
              active={(stage === types.SETUP_STAGE_KEY_CONFIG)}
            >
              {t('welcome_stage_watchwallet')}
            </Breadcrumb.Section>
          )
        }
      </Breadcrumb>
    );
  }
}

export default translate('welcome')(WelcomeBreadcrumb);
