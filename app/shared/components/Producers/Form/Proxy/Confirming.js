// @flow
import React, { Component } from 'react';
import { Button, Divider, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class ProducersFormProxyConfirming extends Component<Props> {
  onConfirm = (e) => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
    e.preventDefault();
    return false;
  }

  render() {
    const {
      proxyAccountName,
      t
    } = this.props;

    return (
      <Segment basic clearing vertical>
        <Header size="small">
          {t('producers_proxy_confirming_title')}
        </Header>
        <p>
          {t('producers_proxy_confirming_text')} <b>{proxyAccountName}</b>
        </p>
        <Divider />
        <Button
          color="green"
          floated="right"
          onClick={this.onConfirm}
        />
        <Button
          onClick={this.onCancel}
        >
          <Icon name="x" /> {t('cancel')}
        </Button>
      </Segment>
    );
  }
}

export default translate('producers')(ProducersFormProxyConfirming);
