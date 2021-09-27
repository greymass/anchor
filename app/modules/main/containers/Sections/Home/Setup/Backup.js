// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';

import { Button, Confirm, Dimmer, Header, Image, Icon, Loader, Modal, Segment, Select, Table } from 'semantic-ui-react';

import PrintArrow from '../../../../../../renderer/assets/images/print-arrow.jpg';

import { createWallet, resetAccountCreation } from '../../../../actions/account';
import { changeModule } from '../../../../actions/navigation';
import { removeKeyFromStorageByPublic } from '../../../../../../shared/actions/storage';
import { removePendingAccountCertificate } from '../../../../../../shared/actions/pending';

import Certificate from '../../../../../../renderer/assets/images/certificate.png';
import GlobalButtonElevate from '../../../../../../shared/containers/Global/Button/Elevate';

import AccountSetupElementsWords from './Elements/Words';

const { ipcRenderer } = require('electron');

class AccountSetupBackup extends Component<Props> {
  constructor(props) {
    super(props);
    const chainId = (props.match && props.match.params && props.match.params.chain_id)
      ? props.match.params.chain_id
      : false;
    const account = (props.match && props.match.params && props.match.params.account_name)
      ? props.match.params.account_name
      : false;
    const request = find(props.pending.certificates, {
      account,
      chainId,
    });
    const isLedger = !!(props.paths[request.active]);
    this.state = {
      cancelled: false,
      creating: false,
      isLedger,
      method: false,
      password: undefined,
      printing: false,
      printConfirm: false,
      request,
      saved: false,
      verifying: false,
      words: undefined
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      cancelled,
      method,
      saved,
    } = this.state;
    if (method && nextProps.accountcreate.saved && nextProps.accountcreate.saved !== saved) {
      this.setState({
        generating: false,
        printing: false,
        saved: nextProps.accountcreate.saved,
        words: nextProps.accountcreate.words,
      });
    }
    if (method && nextProps.accountcreate.cancelled && nextProps.accountcreate.cancelled !== cancelled) {
      this.setState({
        cancelled: nextProps.accountcreate.cancelled,
        generating: false,
        printing: false,
        words: nextProps.accountcreate.words,
      });
    }
  }
  componentWillUnmount() {
    ipcRenderer.send('resetKeyCertificateCache');
    this.props.actions.resetAccountCreation();
  }
  onPrint = () => {
    const { password, request } = this.state;
    const { account, chainId, owner } = request;
    ipcRenderer.send('printKeyCertificate', password, owner, chainId, account);
    this.setState({
      method: 'print',
      password,
      printing: true,
      printConfirm: false,
    });
  }
  onPrintPrompt = (password) => {
    this.setState({
      method: 'print',
      password,
      printConfirm: true,
    });
  }
  onSave = (password) => {
    const { account, chainId, owner } = this.state.request;
    ipcRenderer.send('saveKeyCertificate', password, owner, chainId, account);
    this.setState({
      generating: true,
      method: 'save',
      password,
    });
  }
  onSelectBackup = () => {
    this.setState({
      verifying: false,
    });
  }
  onComplete = () => {
    const { actions } = this.props;
    const { request, isLedger } = this.state;
    const {
      account, active, chainId, owner
    } = request;
    const { password } = this.state;
    this.setState({
      creating: true,
    });
    // Create the local wallet for use
    actions.createWallet(chainId, account, active, isLedger);
    // Remove the owner key from local wallet storage
    actions.removeKeyFromStorageByPublic(password, owner);
    // Remove the pending certificate request
    actions.removePendingAccountCertificate(request);
    // Forward on to the home screen
    setTimeout(() => {
      actions.changeModule('');
    }, 1000);
  }
  render() {
    const { actions, blockchains } = this.props;
    const {
      creating,
      generating,
      password,
      printing,
      printConfirm,
      request,
      saved,
      verifying,
      words
    } = this.state;
    const blockchain = find(blockchains, { chainId: request.chainId });
    let loader = false;
    if (generating) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big"><Header>Generating certificate...</Header></Loader>
        </Dimmer>
      );
    }
    if (printing) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big">
            <Header>
              Printing...
              <Header.Subheader>
                Print and close the PDF from the new window to proceed.
              </Header.Subheader>
            </Header>
          </Loader>
        </Dimmer>
      );
    }
    let modal;
    if (printConfirm) {
      modal = (
        <Confirm
          content={(
            <Segment attached="top">
              <Header size="large">
                Printing your owner key certificate
              </Header>
              <p style={{ margin: '2em 0' }}>A new window will be opened displaying your owner key certificate. Click the Print icon in the upper right as shown in the screenshot below in order to start printing.</p>
              <Image src={PrintArrow} />
              <p style={{ margin: '2em 0' }}>Click OK to open your certificate in a new window.</p>
            </Segment>
          )}
          open
          onCancel={this.cancelPrint}
          onConfirm={() => this.onPrint(password)}
        />
      );
    }
    let stage = (
      <Segment clearing size="large">
        <Header size="large">
          Backup Account
          <Header.Subheader>
            Save or print your owner key certificate.
          </Header.Subheader>
        </Header>
        {modal}
        {loader}
        <Image
          floated="right"
          src={Certificate}
          style={{
            height: '360px'
          }}
        />
        <Table collapsing definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Network</Table.Cell>
              <Table.Cell>{blockchain.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Account Name</Table.Cell>
              <Table.Cell>{request.account}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <p>To be able to recover your account or import it to another device you'll need the owner key certificate.</p>
        <p>Let's create it now - you'll ideally need access to a printer and a good pen.</p>
        <Segment basic textAlign="center">
          {(password)
            ? (
              <Button
                color="green"
                content="Print Certificate"
                icon="print"
                onClick={() => this.onPrintPrompt(password)}
                size="large"
              />
            )
            : (
              <GlobalButtonElevate
                onSuccess={(p) => this.onPrintPrompt(p)}
                trigger={(
                  <Button
                    color="green"
                    content="Print Certificate"
                    icon="print"
                    size="large"
                  />
                )}
              />
            )
          }
          {(password)
            ? (
              <Button
                color="green"
                content="Save Certificate"
                icon="disk"
                onClick={() => this.onSave(password)}
                size="large"
              />
            )
            : (
              <GlobalButtonElevate
                onSuccess={(p) => this.onSave(p)}
                trigger={(
                  <Button
                    color="green"
                    content="Save Certificate"
                    icon="disk"
                    size="large"
                  />
                )}
              />
            )
          }

        </Segment>
        <Segment attached="top" basic style={{ border: 'none' }} textAlign="center">
          <Button
            content={!saved ? 'Print or save to continue' : 'Continue to next step...'}
            disabled={!saved}
            onClick={() => this.setState({ verifying: true })}
            primary={saved}
            size="large"
          />
        </Segment>
        <Segment attached="bottom" basic style={{ border: 'none' }} textAlign="center">
          <Button
            content="Cancel Backup"
            onClick={() => actions.changeModule('pending')}
            size="small"
          />
        </Segment>
      </Segment>
    );
    if (verifying) {
      stage = (
        <AccountSetupElementsWords
          creating={creating}
          onCancel={this.onSelectBackup}
          onComplete={this.onComplete}
          words={words}
        />
      );
    }
    return (
      <Modal
        open
      >
        {stage}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
    app: state.app,
    blockchains: state.blockchains,
    paths: state.storage.paths,
    pending: state.pending,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      createWallet,
      removeKeyFromStorageByPublic,
      removePendingAccountCertificate,
      resetAccountCreation,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupBackup);
