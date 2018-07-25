// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Container, Divider, Form, Grid, Header, Icon, Input, Modal, Segment, Step, TextArea } from 'semantic-ui-react';

const { clipboard } = require('electron');

class WalletPanelModalAccountRequestCode extends Component<Props> {
  constructor(props) {
    super(props);
    const code = btoa(JSON.stringify({
      n: props.values.accountName,
      o: props.values.owner,
      a: props.values.active,
      t: new Date().getTime()
    }));
    this.state = {
      code,
      copied: false
    };
  }
  copy = () => {
    const { code } = this.state;
    clipboard.writeText(code);
    this.setState({ copied: true });
  }
  render() {
    const {
      keys,
      onBack,
      onNext,
      t,
      values,
    } = this.props;
    const {
      code,
      copied
    } = this.state;
    return (
      <Segment>
        <Header>
          {t('wallet_account_request_code_header')}
          <Header.Subheader>
            {t('wallet_account_request_code_subheader')}
          </Header.Subheader>
        </Header>
        <Form>
          <Form.TextArea
            rows={6}
            value={code}
          />
          <Container textAlign="center">
            <Form.Button
              color="purple"
              content={t('copy_to_clipboard')}
              onClick={this.copy}
            />
          </Container>
        </Form>
        <Divider hidden />
        <Button
          content={t('back')}
          onClick={onBack}
          size="small"
        />
        {(onNext)
          ? (
            <Button
              color="blue"
              content={t('next')}
              disabled={!copied}
              onClick={onNext}
              floated="right"
            />
          )
          : false
        }
      </Segment>
    );
  }
}

export default translate('wallet')(WalletPanelModalAccountRequestCode);
