// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Divider, Icon, Header, List, Segment } from 'semantic-ui-react';

class ColdWalletInfo extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <Segment basic padded style={{ paddingTop: 0 }}>
        <Segment attached="top" secondary textAlign="center">
          <Header icon size="large">
            <Icon
              color="blue"
              name="snowflake"
            />
            {t('coldwallet_wallet_title')}
            <Header.Subheader
              content={t('coldwallet_wallet_description')}
            />
          </Header>
        </Segment>
        <Segment attached>
          <Header>
            {t('coldwallet_wallet_instructions_title')}
          </Header>
          <p>{t('coldwallet_wallet_instructions_1')}</p>
          <Divider />
          <Segment basic padded>
            <Header>
              {t('coldwallet_wallet_workflow')}
            </Header>
            <List ordered relaxed>
              <List.Item>
                {t('coldwallet_wallet_instructions_2')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_3')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_4')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_5')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_6')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_7')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_8')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_9')}
              </List.Item>
              <List.Item>
                {t('coldwallet_wallet_instructions_10')}
              </List.Item>
            </List>

          </Segment>
        </Segment>
      </Segment>
    );
  }
}

export default translate('coldwallet')(ColdWalletInfo);
