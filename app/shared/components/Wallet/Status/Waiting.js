// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Divider, Icon, Header, List, Segment } from 'semantic-ui-react';

class WalletStatusWaiting extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <Segment basic padded style={{ paddingTop: 0 }}>
        <Segment attached="top" secondary textAlign="center">
          <Header icon size="large">
            <Icon
              color="grey"
              inverted
              name="sync"
            />
            {t('wallet_panel_waiting_header')}
            <Header.Subheader
              content={t('wallet_panel_waiting_subheader')}
            />
          </Header>
        </Segment>
        <Segment attached>
          <Header>
            {t('wallet_wait_instructions_title')}
          </Header>
          <p>{t('wallet_wait_instructions_1')}</p>
          <Divider />
          <Segment basic padded>
            <Header>
              {t('wallet_wait_workflow')}
            </Header>
            <List ordered relaxed>
              <List.Item>
                {t('wallet_wait_instructions_2')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_3')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_4')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_5')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_6')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_7')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_8')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_9')}
              </List.Item>
              <List.Item>
                {t('wallet_wait_instructions_10')}
              </List.Item>
            </List>
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusWaiting);
