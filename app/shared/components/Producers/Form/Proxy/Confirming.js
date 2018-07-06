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
      onBack,
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
          content={t('producers_form_proxy_confirm')}
        />
        <Button
          onClick={onBack}
        >
          <Icon name="x" /> {t('producers_form_proxy_cancel')}
        </Button>
      </Segment>
    );
  }
}

export default translate('producers')(ProducersFormProxyConfirming);
