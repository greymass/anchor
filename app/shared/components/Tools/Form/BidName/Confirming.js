// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Divider,
  Header,
  Icon,
  Message,
  Segment,
  Table
} from 'semantic-ui-react';

class ToolsFormBidNameConfirming extends Component<Props> {
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
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header textAlign="center">
          {t('tools_form_bid_name_confirming_header')}
        </Header>
        <Table size="small" celled>
          <Table.Body>
            {formAttributes.map((formAttribute) => {
              return (
                <Table.Row key={formAttribute}>
                  <Table.Cell width={8}>
                    {t(`tools_form_bid_name_${formAttribute}`)}
                  </Table.Cell>
                  <Table.Cell width={8}>
                    {this.props.formValues[formAttribute]}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Divider />
        <Message
          content={t('tools_form_bid_name_warning')}
          icon="warning sign"
          warning
        />
        <Divider />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('tools_form_bid_name_confirming_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('tools_form_bid_name_confirming_button')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormBidNameConfirming);
