// @flow
import React, { Component } from 'react';
import { Icon, Step } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class WelcomeBreadcrumb extends Component<Props> {
  render() {
    const {
      onStageSelect,
      stage,
      t,
      walletMode
    } = this.props;
    console.log(stage)
    return (
      <Step.Group attached="bottom" fluid size="small" vertical>
        {(walletMode !== 'cold')
          ? (
            <Step
              active={(stage === 0)}
              completed={(stage > 0)}
              description="test"
              icon="wifi"
              key="connection_stage"
              onClick={(stage > 0) ? () => onStageSelect(0) : null}
              title={t('welcome_stage_connection')}
            />
          )
          : (
            <Step
              description="test"
              icon="snowflake"
              key="connection_stage_cold"
              title={t('welcome_stage_coldwallet')}
            />
          )
        }
        <Step
          active={(stage === 2)}
          completed={(stage > 2)}
          disabled={(stage < 2)}
          description="test"
          icon="id badge"
          onClick={(stage > 2) ? () => onStageSelect(2) : null}
          title={t('welcome_stage_account')}
        />
        {(walletMode !== 'watch')
          ? (
            <React.Fragment>
              <Step
                active={(stage === 3)}
                completed={(stage > 3)}
                description="test"
                disabled={(stage < 3)}
                icon="key"
                onClick={(stage > 3) ? () => onStageSelect(3) : null}
                title={t('welcome_stage_authorize')}
              />
              <Step
                active={(stage === 4)}
                description="test"
                disabled={(stage < 4)}
                icon="lock"
                title={t('welcome_stage_wallet')}
              />
            </React.Fragment>
          )
          : (
            <Step
              active={(stage === 3)}
              disabled={(stage < 3)}
              icon="info"
              title={t('welcome_stage_watchwallet')}
            />
          )
        }
      </Step.Group>
    );
  }
}

export default translate('welcome')(WelcomeBreadcrumb);
