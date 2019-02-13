// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeWalletContainer from '../../containers/Welcome/Wallet';

class WelcomeWallet extends Component<Props> {
  render() {
    const {
      onStageSelect,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Header>
          <Header.Subheader>
            {t('welcome_step')} #4
          </Header.Subheader>
          {t('welcome_stage_wallet')}
        </Header>
        <Segment
          color="green"
          size="small"
          stacked
        >
          <p>{t('welcome_instructions_6')}</p>
          <WelcomeWalletContainer
            editing
            onStageSelect={onStageSelect}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('welcome')(WelcomeWallet);
