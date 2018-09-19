// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, List, Segment } from 'semantic-ui-react';

class ToolsHardwareLedgerStatusUnavailable extends Component<Props> {
  render() {
    const {
      t,
    } = this.props;
    return (
      <React.Fragment>
        <Segment attached="top" color="orange">
          <Header icon size="large" textAlign="center">
            <Icon
              name="usb"
            />
            {t('ledger_unavailable_header')}
            <Header.Subheader
              content={t('ledger_unavailable_subheader')}
            />
          </Header>
        </Segment>
        <Segment attached padded size="large">
          <p>{t('ledger_unavailable_text_1')}</p>
          <List>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_1')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_2')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_3')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_4')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_5')}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('ledger')(ToolsHardwareLedgerStatusUnavailable);
