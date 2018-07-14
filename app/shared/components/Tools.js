// @flow
import React, { Component } from 'react';
import { Header, Icon, Segment, Divider, Table } from 'semantic-ui-react';
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

    const dropdownStyling = {
      width: '200px',
      border: '1px solid #D3D3D3',
      padding: '12px',
      margin: '20px'
    };

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
            <Table.Row>
              <Table.Cell width={4}>
                {t('tools_change_node')}
              </Table.Cell>
              <Table.Cell style={{ maxWidth: '600px' }} width={8}>
                <WelcomeConnectionContainer />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>
                {t('tools_change_language')}
              </Table.Cell>
              <Table.Cell width={8}>
                <div style={dropdownStyling}>
                  <GlobalSettingsLanguage
                    actions={actions}
                    setLanguage={settings.lang}
                    i18n={i18n}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>
                {t('tools_change_block_explorer')}
              </Table.Cell>
              <Table.Cell width={8}>
                <div style={dropdownStyling}>
                  <GlobalSettingsBlockExplorer
                    actions={actions}
                    blockExplorers={blockExplorers}
                    defaultValue={settings.block_explorer}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(Tools);
