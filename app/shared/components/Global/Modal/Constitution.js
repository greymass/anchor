// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Modal } from 'semantic-ui-react';

class ModalConstitution extends Component<Props> {
  state = { open: false }

  componentWillReceiveProps(nextProps) {
    const { isUser, settings } = nextProps;
    if (
      isUser
      && !settings.acceptedConstitution
    ) {
      this.setState({ open: true });
    }
  }

  accept = () => {
    const { actions } = this.props;
    this.setState({ open: false }, () => {
      actions.setSetting('acceptedConstitution', true);
    });
  }

  render() {
    const {
      isUser,
      settings,
      t
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <Modal
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        open={open}
      >
        <Modal.Header>
          {t('constitution_title')}
        </Modal.Header>
        <Modal.Content>
          <Header>
            {t('constitution_preface')}
          </Header>
          <Header size="small">{t('constitution_article_01_title')}</Header>
          <p>{t('constitution_article_01_body')}</p>
          <Header size="small">{t('constitution_article_02_title')}</Header>
          <p>{t('constitution_article_02_body')}</p>
          <Header size="small">{t('constitution_article_03_title')}</Header>
          <p>{t('constitution_article_03_body')}</p>
          <Header size="small">{t('constitution_article_04_title')}</Header>
          <p>{t('constitution_article_04_body')}</p>
          <Header size="small">{t('constitution_article_05_title')}</Header>
          <p>{t('constitution_article_05_body')}</p>
          <Header size="small">{t('constitution_article_06_title')}</Header>
          <p>{t('constitution_article_06_body')}</p>
          <Header size="small">{t('constitution_article_07_title')}</Header>
          <p>{t('constitution_article_07_body')}</p>
          <Header size="small">{t('constitution_article_08_title')}</Header>
          <p>{t('constitution_article_08_body')}</p>
          <Header size="small">{t('constitution_article_09_title')}</Header>
          <p>{t('constitution_article_09_body')}</p>
          <Header size="small">{t('constitution_article_10_title')}</Header>
          <p>{t('constitution_article_10_body')}</p>
          <Header size="small">{t('constitution_article_11_title')}</Header>
          <p>{t('constitution_article_11_body')}</p>
          <Header size="small">{t('constitution_article_12_title')}</Header>
          <p>{t('constitution_article_12_body')}</p>
          <Header size="small">{t('constitution_article_13_title')}</Header>
          <p>{t('constitution_article_13_body')}</p>
          <Header size="small">{t('constitution_article_14_title')}</Header>
          <p>{t('constitution_article_14_body')}</p>
          <Header size="small">{t('constitution_article_15_title')}</Header>
          <p>{t('constitution_article_15_body')}</p>
          <Header size="small">{t('constitution_article_16_title')}</Header>
          <p>{t('constitution_article_16_body')}</p>
          <Header size="small">{t('constitution_article_17_title')}</Header>
          <p>{t('constitution_article_17_body')}</p>
          <Header size="small">{t('constitution_article_18_title')}</Header>
          <p>{t('constitution_article_18_body')}</p>
          <Header size="small">{t('constitution_article_19_title')}</Header>
          <p>{t('constitution_article_19_body')}</p>
          <Header size="small">{t('constitution_article_20_title')}</Header>
          <p>{t('constitution_article_20_body')}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t('constitution_accept')}
            icon="external"
            labelPosition="right"
            onClick={this.accept}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('constitution')(ModalConstitution);
