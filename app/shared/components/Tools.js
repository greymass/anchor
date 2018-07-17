// @flow
import React, { Component } from 'react';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import WelcomeConnectionContainer from '../containers/Welcome/Connection';
import GlobalSettingsLanguage from './Global/Settings/Language';
import GlobalSettingsBlockExplorer from './Global/Settings/BlockExplorer';

class Tools extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      i18n,
      settings,
      t
    } = this.props;

    return (
      <Segment attached="top" textAlign="center">
        <Header icon size="large">
          <Icon
            name="cog"
          />
          {t('tools_title')}
          <Header.Subheader
            content={t('tools_description')}
          />
        </Header>
        <Table>
          <Table.Body>
            {(settings.walletMode !== 'cold')
              ? (
                [
                  <Table.Row>
                    <Table.Cell width={4}>
                      {t('tools_change_node')}
                    </Table.Cell>
                    <Table.Cell style={{ maxWidth: '600px' }} width={8}>
                      <WelcomeConnectionContainer />
                    </Table.Cell>
                  </Table.Row>,
                  <Table.Row>
                    <Table.Cell width={4}>
                      {t('tools_change_block_explorer')}
                    </Table.Cell>
                    <Table.Cell width={8}>
                      <GlobalSettingsBlockExplorer
                        actions={actions}
                        blockExplorers={blockExplorers}
                        defaultValue={settings.blockExplorer}
                        selection
                      />
                    </Table.Cell>
                  </Table.Row>
                ]
              ) : ''}
            <Table.Row>
              <Table.Cell width={4}>
                {t('tools_change_language')}
              </Table.Cell>
              <Table.Cell width={8}>
                <GlobalSettingsLanguage
                  actions={actions}
                  setLanguage={settings.lang}
                  i18n={i18n}
                  selection
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(Tools);
