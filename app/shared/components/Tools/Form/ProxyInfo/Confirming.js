// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Segment, Table, Header } from 'semantic-ui-react';

class ToolsFormProxyinfoConfirming extends Component<Props> {
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
          {t('tools_form_proxy_info_confirming_header')}
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
                    {this.props.formValues[formAttribute]}
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
          <Icon name="arrow left" /> {t('tools_form_proxy_info_confirming_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('tools_form_proxy_info_confirming_button')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormProxyinfoConfirming);
