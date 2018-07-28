// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Modal } from 'semantic-ui-react';

const { shell } = require('electron');

class GlobalModalDangerLink extends Component<Props> {
  state = { open: false }

  isSafeish = (url) => (url && (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('mailto:')))

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

  openLinkOrWarning() {
    const {
      settings
    } = this.props;

    if (settings.skipLinkModal) {
      this.openLink();
    } else {
      this.openWarning();
    }
  }

  close = () => this.setState({ open: false })

  render() {
    const {
      open
    } = this.state;
    const {
      content,
      link,
      settings,
      t
    } = this.props;
    let el = content || link;
    if (this.isSafeish(link)) {
      el = (
        <a
          onClick={this.openLinkOrWarning.bind(this)}
          onKeyPress={this.openLinkOrWarning.bind(this)}
          role="link"
          style={{ cursor: 'pointer' }}
          tabIndex={0}
        >
          {content || link}
        </a>
      );
    }
    return (
      <span>
        {el}
        {(!settings.skipLinkModal)
          ? (
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
          ) : ''}
      </span>
    );
  }
}

export default translate('global')(GlobalModalDangerLink);
