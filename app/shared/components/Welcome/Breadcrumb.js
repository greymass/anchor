// @flow
import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { translate } from 'react-i18next';

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
              active={(stage === 0)}
              key="connection_stage"
              onClick={(stage > 0) ? () => onStageSelect(0) : null}
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
          active={(stage === 1)}
          onClick={(stage > 1) ? () => onStageSelect(1) : null}
        >
          {t('welcome_stage_account')}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        {(walletMode !== 'watch')
          ? (
            <React.Fragment>
              <Breadcrumb.Section
                active={(stage === 3)}
                onClick={(stage > 3) ? () => onStageSelect(3) : null}
              >
                {t('welcome_stage_authorize')}
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right angle" />
              <Breadcrumb.Section
                active={(stage === 4)}
              >
                {t('welcome_stage_wallet')}
              </Breadcrumb.Section>
            </React.Fragment>
          )
          : (
            <Breadcrumb.Section
              active={(stage === 3)}
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
