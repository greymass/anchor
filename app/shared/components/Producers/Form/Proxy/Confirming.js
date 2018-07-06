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
      <Segment style={{ textAlign: 'center' }} basic clearing vertical>
        {(proxyAccountName)
          ? (
            <div>
              {t('producers_form_proxy_confirming_change_text_one')}
              &nbsp;<b><u>{proxyAccountName}</u></b>.<br /><br />
              {t('producers_form_proxy_confirming_change_text_two')}
            </div>
          ) : (
            <div>
              {t('producers_form_proxy_confirming_remove_text')}
            </div>
          )
        }
        <Divider style={{ marginTop: '40px' }} />
        <Button
          color="green"
          floated="right"
          onClick={this.onConfirm}
          content={t('producers_form_proxy_confirm')}
        />
        <Button
          onClick={onBack}
          floated="left"
        >
          <Icon name="arrow left" /> {t('producers_form_proxy_cancel')}
        </Button>
      </Segment>
    );
  }
}

export default translate('producers')(ProducersFormProxyConfirming);
