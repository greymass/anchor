// @flow
import React, { Component } from 'react';
import { Header, Icon, Segment, Divider, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import WelcomeConnectionContainer from '../containers/Welcome/Connection';
import GlobalSettingsLanguage from './Global/Settings/Language';

class Tools extends Component<Props> {
  onLanguageChange = (e, { value }) => {
    const { actions, i18n } = this.props;
    i18n.changeLanguage(value);
    actions.setSetting('lang', value);
  }

  render() {
    const {
      actions,
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
        <Divider />
        <Table divided>
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
              <div style={{
                width: '200px',
                border: '1px solid #D3D3D3',
                padding: '12px',
                margin: '20px'
              }}
              >
                <GlobalSettingsLanguage
                  actions={actions}
                  defaultValue={settings.lang}
                  i18n={i18n}
                  onChange={this.onChange}
                />
              </div>
            </Table.Cell>
          </Table.Row>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(Tools);
