// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Table } from 'semantic-ui-react';

class GlobalModalSettingsCustomTokensConfirm extends Component<Props> {
  render() {
    const {
      onSubmit,
      t,
      token
    } = this.props;
    return (
      <React.Fragment>
        <Table definition>
          <Table.Row>
            <Table.Cell width={4}>
              {t('global_modal_settings_customtoken_confirm_issuer')}
            </Table.Cell>
            <Table.Cell>
              {token.issuer}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {t('global_modal_settings_customtoken_confirm_supply')}
            </Table.Cell>
            <Table.Cell>
              {token.supply}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {t('global_modal_settings_customtoken_confirm_maxsupply')}
            </Table.Cell>
            <Table.Cell>
              {token.max_supply}
            </Table.Cell>
          </Table.Row>
        </Table>
        <Container textAlign="center">
          <Button
            color="green"
            content={t('global_modal_settings_customtoken_confirm')}
            onClick={onSubmit}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalModalSettingsCustomTokensConfirm);
