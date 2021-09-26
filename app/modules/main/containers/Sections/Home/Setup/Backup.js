// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';

import { Button, Dimmer, Header, Image, Icon, Loader, Modal, Segment, Select, Table } from 'semantic-ui-react';

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
      print: false,
      printer: undefined,
      printers: undefined,
      printing: false,
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
      printers,
      saved,
    } = this.state;
    if (method && nextProps.accountcreate.saved !== saved) {
      this.setState({
        generating: false,
        print: false,
        printer: false,
        printing: false,
        saved: nextProps.accountcreate.saved,
        words: nextProps.accountcreate.words,
      });
    }
    if (method && nextProps.accountcreate.cancelled !== cancelled) {
      this.setState({
        cancelled: nextProps.accountcreate.cancelled,
        generating: false,
        print: false,
        printer: false,
        printing: false,
        words: nextProps.accountcreate.words,
      });
    }
    if (method === 'print' && !printers && nextProps.app.printers) {
      // { key: 'bj', value: 'bj', text: 'Benin' },
      const options = nextProps.app.printers.map((printer) => ({
        key: printer.name,
        value: printer.name,
        text: printer.displayName
      }));
      this.setState({
        generating: false,
        printer: options[0].key,
        printers: options,
        printing: true,
      });
    }
  }
  componentWillUnmount() {
    ipcRenderer.send('resetKeyCertificateCache');
    this.props.actions.resetAccountCreation();
  }
  onPrint = () => {
    const { password, printer, request } = this.state;
    const { account, chainId, owner } = request;
    ipcRenderer.send('printKeyCertificate', password, owner, chainId, account, printer);
    this.setState({
      password,
      print: true,
      printing: true,
    });
  }
  onCancelPrint = () => {
    this.setState({
      generating: false,
      method: undefined,
      password: undefined,
      printer: undefined,
      printers: undefined,
      printing: false,
    });
  }
  onSelectPrinter = (password) => {
    ipcRenderer.send('getPrinters');
    this.setState({
      generating: true,
      method: 'print',
      password,
      printers: undefined,
    });
  }
  setPrinter = (e, { value }) => {
    this.setState({ printer: value });
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
      print,
      printing,
      printer,
      printers,
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
          <Loader size="big"><Header>Printing...</Header></Loader>
        </Dimmer>
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
                onClick={() => this.onSelectPrinter(password)}
                size="large"
              />
            )
            : (
              <GlobalButtonElevate
                onSuccess={(p) => this.onSelectPrinter(p)}
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
          onComplete={this.onComplete}
          words={words}
        />
      );
    }
    let modal = false;
    if (printing && !print && printers) {
      modal = (
        <Modal
          open
          closeIcon
          onClose={this.onCancelPrint}
          size="small"
        >
          <Header icon>
            <Icon name="print" />
            Select a printer...
          </Header>
          <Modal.Content>
            <Select
              fluid
              placeholder="Select a printer from the list"
              onChange={this.setPrinter}
              options={printers}
              value={printers[0].key}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Cancel"
              onClick={this.onCancelPrint}
            />
            <Button
              content="Print to selected printer"
              disabled={!printer}
              onClick={this.onPrint}
              primary
            />
          </Modal.Actions>
        </Modal>
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
