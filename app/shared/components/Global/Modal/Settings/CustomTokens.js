// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Header, Input, List, Modal, Segment } from 'semantic-ui-react';

class GlobalModalSettingsCustomTokens extends Component<Props> {
  state = {
    name: ''
  }
  addToken = () => {
    const { actions, settings } = this.props;
    const { name } = this.state;
    const { customTokens } = settings;

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    if (name && name.length > 0) {
      const { refreshAccountBalances, setSetting } = actions;
      tokens.push(this.state.name);
      tokens = new Set(tokens.filter((e) => e));
      setSetting('customTokens', Array.from(tokens));
      this.setState({ name: '' });
      refreshAccountBalances(settings.account);
    }
  }
  removeToken = (token) => {
    const { actions, settings } = this.props;
    const { customTokens } = settings;

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    const position = tokens.indexOf(token);
    if (position >= 0) {
      const { refreshAccountBalances, setSetting } = actions;
      tokens.splice(position, 1);
      tokens = new Set(tokens.filter((e) => e));
      setSetting('customTokens', Array.from(tokens));
      refreshAccountBalances(settings.account);
    }
  }
  onChange = (e, { value }) => this.setState({ name: value.trim() });
  render() {
    const {
      name
    } = this.state;
    const {
      onClose,
      open,
      settings,
      t
    } = this.props;
    const {
      customTokens
    } = settings;
    return (
      <Modal
        open={open}
        size="small"
      >
        <Modal.Header>
          {t('global_modal_settings_customtoken_header')}
        </Modal.Header>
        <Modal.Content>
          <p>{t('global_modal_settings_customtoken_description')}</p>
          {(customTokens && customTokens.length > 0)
            ? (
              <Segment>
                <List>
                  {customTokens.map((token, idx) => (
                    <List.Item
                      content={(
                        <Segment basic clearing secondary={!(idx % 2)}>
                          <Button
                            content={t('remove')}
                            floated="right"
                            onClick={() => this.removeToken(token)}
                            size="mini"
                          />
                          {token}
                        </Segment>
                      )}
                      key={token}
                    />
                  ))}
                </List>
              </Segment>
            )
            : (
              <Segment>
                <p>{t('global_modal_settings_customtoken_none_tracked')}</p>
              </Segment>
            )
          }
          <Form
            onSubmit={this.addToken}
            ref={(c) => { this.form = c; }}
          >
            <Form.Field
              autoFocus
              control={Input}
              fluid
              label={t('global_modal_settings_customtoken_form_label')}
              name="token"
              onChange={this.onChange}
              placeholder={t('global_modal_settings_customtoken_form_placeholder')}
              type="text"
              value={name}
            />
            <Container textAlign="center">
              <Button
                color="green"
                content={t('global_modal_settings_customtoken_add')}
              />
            </Container>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Segment basic clearing>
            <Button
              content={t('close')}
              onClick={onClose}
              primary
            />
          </Segment>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalSettingsCustomTokens);
