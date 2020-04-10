// @flow
import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const { shell } = require('electron');

class ProducersLink extends Component<Props> {
  state = { open: false }

  isSafeish = (url) => url.startsWith('http:') || url.startsWith('https:')

  openLink() {
    const { url } = this.props.producer;
    if (this.isSafeish(url)) {
      shell.openExternal(url);
    }
    this.setState({
      open: false
    });
  }

  openWarning() {
    this.setState({ open: true });
  }

  close = () => this.setState({ open: false })

  render() {
    const {
      open
    } = this.state;
    const { t } = this.props;
    let link = this.props.producer.url;
    if (this.isSafeish(this.props.producer.url)) {
      link = (
        <a
          onClick={this.openWarning.bind(this)}
          onKeyPress={this.openWarning.bind(this)}
          role="link"
          style={{ cursor: 'pointer' }}
          tabIndex={0}
        >
          {this.props.producer.url}
        </a>
      );
    }
    return (
      <div>
        {link}
        <Modal size="tiny" open={open} onClose={this.close}>
          <Modal.Header>
            {t('producer_link_warning_title')}
          </Modal.Header>
          <Modal.Content>
            <p>
              {t('producer_link_warning_body_1')}
            </p>
            <Header>
              {t('producer_link_warning_body_2')}
            </Header>
            <p>
              {t('producer_link_warning_body_3')}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={t('cancel')}
              onClick={this.close}
              negative
            />
            <Button
              positive
              onClick={this.openLink.bind(this)}
              icon="external"
              labelPosition="right"
              content={t('confirm')}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default withTranslation('producers')(ProducersLink);
