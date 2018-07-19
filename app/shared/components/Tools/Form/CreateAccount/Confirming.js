// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Segment, Table, Header } from 'semantic-ui-react';

import GlobalDataBytes from '../../../Global/Data/Bytes';

class ToolsFormCreateAccountConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      accountName,
      delegatedResources,
      onBack,
      publicKey,
      ramAmount,
      t
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header>
          {t('tools_create_account_confirming_header')}
        </Header>
        <Table size="small" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_one')}
              </Table.Cell>
              <Table.Cell width={8}>
                {accountName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_two')}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedResources}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_three')}
              </Table.Cell>
              <Table.Cell width={8}>
                {publicKey}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_four')}
              </Table.Cell>
              <Table.Cell width={8}>
                <GlobalDataBytes
                  bytes={Number(ramAmount)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Divider />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('confirm_stake')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormCreateAccountConfirming);
