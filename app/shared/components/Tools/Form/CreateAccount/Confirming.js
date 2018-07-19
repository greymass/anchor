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
      activeKey,
      delegatedBw,
      delegatedCpu,
      onBack,
      ownerKey,
      ramAmount,
      t
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header>
          {t('tools_form_create_account_confirming_header')}
        </Header>
        <Table size="small" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_confirming_title_one')}
              </Table.Cell>
              <Table.Cell width={8}>
                {accountName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_confirming_title_two')}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedBw}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_confirming_title_three')}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedCpu}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_confirming_title_four')}
              </Table.Cell>
              <Table.Cell width={8}>
                {ownerKey}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_confirming_title_five')}
              </Table.Cell>
              <Table.Cell width={8}>
                {activeKey}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_confirming_title_six')}
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
          <Icon name="arrow left" /> {t('tools_form_create_account_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('tools_form_create_account_button')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormCreateAccountConfirming);
