// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Grid, Header, Icon, Modal, Segment, Step } from 'semantic-ui-react';

import WalletPanelFormAccountRequest from '../../../../Wallet/Panel/Form/Account/Request';
import WalletPanelModalAccountRequestBackup from './Request/Backup';
import WalletPanelModalAccountRequestCode from './Request/Code';
import WalletPanelModalAccountRequestImport from './Request/Import';

const { ipcRenderer } = require('electron');

class WalletPanelModalAccountRequest extends Component<Props> {
  state = {
    confirming: false,
    keys: {
      active: '',
      owner: ''
    },
    stage: 1,
    values: {
      accountName: '',
      active: '',
      password: '',
      owner: ''
    },
    validated: {
      accountName: false,
      active: false,
      owner: false,
      keyBackup: false
    },
  }
  onChange = (e, { name, valid, value }) => {
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    values[name] = value;
    validated[name] = valid;
    this.setState({
      values,
      validated
    }, () => {
      if (name === 'accountName' && value.length !== 0) {
        const { actions } = this.props;
        actions.checkAccountAvailability(value);
      }
    });
  }
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ confirming: false });
  onStageSelect = (stage) => this.setState({ confirming: false, stage });
  setPrivateKey = (type, publicKey, privateKey) => {
    const keys = { ...this.state.keys };
    keys[type] = {
      type,
      publicKey,
      privateKey,
    };
    this.setState({
      keys
    });
  }
  render() {
    const {
      actions,
      history,
      onClose,
      open,
      system,
      t,
      trigger
    } = this.props;

    const {
      confirming,
      keys,
      stage,
      values,
      validated
    } = this.state;

    let error;
    let isValid = !!(validated.active && validated.owner && validated.accountName);
    if (values.accountName
        && values.accountName.length !== 0
        && system.ACCOUNT_AVAILABLE === 'FAILURE'
        && system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === values.accountName
    ) {
      isValid = false;
      error = 'account_name_not_available';
    }

    const shouldShowAccountNameWarning = values.accountName && values.accountName.length !== 12;

    let stageElement = (
      <WalletPanelFormAccountRequest
        error={error}
        isValid={isValid}
        onChange={this.onChange}
        onSubmit={() => this.onStageSelect(2)}
        setPrivateKey={this.setPrivateKey}
        shouldShowAccountNameWarning={shouldShowAccountNameWarning}
        values={values}
      />
    );

    if (stage === 2) {
      stageElement = (
        <WalletPanelModalAccountRequestBackup
          confirming={confirming}
          keys={keys}
          onBack={() => this.onStageSelect(1)}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onSubmit={() => this.onStageSelect(3)}
          values={values}
        />
      );
    }

    if (stage === 3) {
      stageElement = (
        <WalletPanelModalAccountRequestCode
          keys={keys}
          onBack={() => this.onStageSelect(2)}
          // onNext={() => this.onStageSelect(4)}
          values={values}
        />
      );
    }

    if (stage === 4) {
      stageElement = (
        <WalletPanelModalAccountRequestImport
          actions={actions}
          history={history}
          keys={keys}
          onBack={() => this.onStageSelect(3)}
          onClose={onClose}
          values={values}
        />
      );
    }

    return (
      <Modal
        centered={false}
        closeIcon={false}
        closeOnDimmerClick={false}
        trigger={trigger}
        onClose={onClose}
        open={open}
        size="fullscreen"
      >
        <Header icon="users" content={t('wallet_account_request_title')} />
        <Modal.Content>
          <Grid unstackable>
            <Grid.Row>
              <Grid.Column width={8}>
                <Step.Group fluid vertical>
                  <Step active={stage === 1} completed={stage > 1}>
                    <Icon name="lock" />
                    <Step.Content>
                      <Step.Title>{t('wallet_account_request_step_generate')}</Step.Title>
                      <Step.Description>{t('wallet_account_request_step_generate_desc')}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === 2} completed={stage > 2}>
                    <Icon name="file outline" />
                    <Step.Content>
                      <Step.Title>{t('wallet_account_request_step_save')}</Step.Title>
                      <Step.Description>{t('wallet_account_request_step_save_desc')}</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step active={stage === 3} completed={stage > 3}>
                    <Icon name="users" />
                    <Step.Content>
                      <Step.Title>{t('wallet_account_request_step_request')}</Step.Title>
                      <Step.Description>{t('wallet_account_request_step_request_desc')}</Step.Description>
                    </Step.Content>
                  </Step>
                  {/* <Step active={stage === 4}>
                    <Icon name="disk" />
                    <Step.Content>
                      <Step.Title>{t('wallet_account_request_step_import')}</Step.Title>
                      <Step.Description>{t('wallet_account_request_step_import_desc')}</Step.Description>
                    </Step.Content>
                  </Step> */}
                </Step.Group>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment>
                  {stageElement}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Container textAlign="center">
            <Button
              onClick={onClose}
            >
              <Icon name="x" /> {t('close')}
            </Button>
          </Container>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('wallet')(WalletPanelModalAccountRequest);
