// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Modal } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

const { shell } = require('electron');

export default class ModalDangerLink extends Component<Props> {
  state = { open: false }

  isSafeish = (url) => url.startsWith('http:') || url.startsWith('https:')

  openLink() {
    const { link } = this.props;
    if (this.isSafeish(link)) {
      shell.openExternal(link);
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
    const {
      content,
      link
    } = this.props;
    let el = content || link;
    if (this.isSafeish(link)) {
      el = (
        <a
          onClick={this.openWarning.bind(this)}
          onKeyPress={this.openWarning.bind(this)}
          role="link"
          style={{ cursor: 'pointer' }}
          tabIndex={0}
        >
          {content || link}
        </a>
      );
    }
    return (
      <I18n ns="global">
        {
          (t) => (
            <span>
              {el}
              <Modal size="tiny" open={open} onClose={this.close}>
                <Modal.Header>
                  {t('global_dangerlink_warning_title')}
                </Modal.Header>
                <Modal.Content>
                  <p>
                    {t('global_dangerlink_warning_body_1')}
                  </p>
                  <p>
                    URL: {link}
                  </p>
                  <Header>
                    {t('global_dangerlink_warning_body_2')}
                  </Header>
                  <p>
                    {t('global_dangerlink_warning_body_3')}
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
            </span>
          )
        }
      </I18n>
    );
  }
}
