// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Segment, Table, Header, Message } from 'semantic-ui-react';

class ToolsFormCreateAccountConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      formAttributes,
      onBack,
      t,
      totalCost,
      totalDelegated
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header textAlign="center">
          <p>{`${t('tools_form_create_account_confirming_header_one')} ${totalCost.toFixed(4)} EOS.`}</p>
          <p>
            {`${t('tools_form_create_account_confirming_header_two')} ${totalDelegated.toFixed(4)} EOS ${t('tools_form_create_account_confirming_header_three')}`}
          </p>
        </Header>
        <Table size="small" celled>
          <Table.Body>
            {formAttributes.map((formAttribute) => {
              return (
                <Table.Row>
                  <Table.Cell width={8}>
                    {t(`tools_form_proxy_info_${formAttribute}`)}
                  </Table.Cell>
                  <Table.Cell width={8}>
                    {this.props[formAttribute]}
                  </Table.Cell>
                </Table.Row>
              );
            })}
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
