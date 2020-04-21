// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Form, Grid, Header, Message, Modal, Segment } from 'semantic-ui-react';
import GlobalDangerLink from '../../../shared/containers/Global/DangerLink';

const { clipboard } = require('electron');

class PromptShare extends Component<Props> {
  onCopyLink = () => clipboard.writeText(this.props.uri)
  makeLink = () => {
    const { uri } = this.props;
    const uriParts = uri.split(':');
    return `https://eosio.to/${uriParts[1].replace('//', '')}`;
  }
  render() {
    const {
      onClose,
      open,
      t,
      uri
    } = this.props;
    if (!uri) return false;
    const link = this.makeLink();
    return (
      <Modal
        centered={false}
        closeIcon
        onClose={onClose}
        open={open}
        style={{ marginTop: '130px', marginBottom: '110px' }}
      >
        <Modal.Header>{t('handler_share_header')}</Modal.Header>
        <Segment
          as={Modal.Content}
          padded="very"
          scrolling
          style={{ marginTop: 0 }}
        >
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Message
                  header="Share with caution"
                  content="Use the following tools to share this signing request with those you trust in the event you have questions about what you are being asked to sign. These requests may contain metadata and information related to your login sessions with other applications."
                  icon="exclamation sign"
                  size="small"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="center">
                <GlobalDangerLink
                  content={(
                    <Button
                      color="blue"
                      content={t('handler_share_grid_button_one')}
                      icon="external"
                    />
                  )}
                  link={link}
                />
                <Header>
                  {t('handler_share_grid_header_one')}
                </Header>
                <p>
                  {t('handler_share_grid_paragraph_one')}
                </p>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button
                  color="blue"
                  content={t('handler_share_grid_button_two')}
                  icon="clipboard"
                  onClick={this.onCopyLink}
                />
                <Header>
                  {t('handler_share_grid_header_two')}
                </Header>
                <p>
                  {t('handler_share_grid_paragraph_two')}
                </p>
                <Form>
                  <Form.TextArea
                    style={{
                      wordBreak: 'break-all'
                    }}
                    value={uri}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Modal>
    );
  }
}

export default withTranslation('handler')(PromptShare);
