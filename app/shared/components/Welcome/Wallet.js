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
      <Segment
        size="small"
        stacked
      >
        <Header>
          {t('welcome_stage')} #4: {t('welcome_stage_wallet')}
        </Header>
        <p>{t('welcome_instructions_6')}</p>
        <WelcomeWalletContainer
          editing
          onStageSelect={onStageSelect}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomeWallet);
