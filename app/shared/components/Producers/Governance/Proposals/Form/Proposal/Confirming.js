// @flow
import React, { Component } from 'react';
import { Button, Divider, Icon, Segment, Table, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import GlobalButtonElevate from '../../../../../../containers/Global/Button/Elevate';
const { shell } = require('electron');

class GovernanceProposalsFormProposalConfirming extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      walletUnLockRequested: false
    };
  }
  onConfirm = (e) => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
    e.preventDefault();
    return false;
  }
  unlockWallet = (password = false) => {
    const { actions, system } = this.props;

    this.setState({walletUnLockRequested: true});

    actions.unlockWallet(password);
    system.GOVERNANCE_CREATEPROPOSAL_LAST_ERROR = null;
  }
  openLink = (link) => shell.openExternal(link);
  render() {
    const { 
      walletUnLockRequested 
    } = this.state;
    const {
      amount,
      cycles,
      fileInfo,
      ipfs_location,
      ipfsHash,
      onBack,
      onClose,
      send_to,
      settings,
      system,
      t,
      title,
      validate,
      wallet
    } = this.props;
    let ipfsSuccess = (ipfsHash && ipfsHash.length > 0);
    let lastError = system.GOVERNANCE_CREATEPROPOSAL_LAST_ERROR;
    const cycleDays = cycles * 29;

    if (walletUnLockRequested && validate.WALLET_PASSWORD === 'SUCCESS'){
      lastError = '';
      ipfsSuccess = false;
      this.setState({ walletUnLockRequested: false });
    }
    return (
      <Segment basic clearing vertical>
        <Header block size="large">
          <Icon name="circle info" />
          <Header.Content>
            <Header.Subheader>
              Please confirm your submission before proceeding. Once submitted, no further changes can be made 
              and a new proposal must be created to replace this request.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>
                Title:
              </Table.Cell>
              <Table.Cell>
                {title}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Proposal Details:
              </Table.Cell>
              <Table.Cell>
                Committing the contents of <strong>{fileInfo.name}</strong> to IPFS
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Requested Amount:
              </Table.Cell>
              <Table.Cell>
                {amount} {settings.blockchain.tokenSymbol}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Recipient:
              </Table.Cell>
              <Table.Cell>
                {send_to}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Number of Cycles:
              </Table.Cell>
              <Table.Cell>
                {cycles} (~ {cycleDays} Days)
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider style={{ marginTop: '40px' }} />

        {(lastError)
          ? (
            <Message negative size="tiny">
              {(lastError.code)
                ? (
                  <div>
                    <Message.Header>
                      {lastError.code}: {lastError.name}
                    </Message.Header>
                    <code>{lastError.message}</code>
                  </div>
                )
                : (
                  <div>
                    <Message.Header>
                      {t(['producer_voter_preview_error_title'])}
                    </Message.Header>
                    <code>{new String(lastError)}</code>
                  </div>
                )
              }
            </Message>
          )
          : ''
        }

        {(lastError && lastError.message && lastError.message.indexOf('keyProvider') !== -1) ?
          <GlobalButtonElevate
            onSuccess={(password) => this.unlockWallet(password)}
            settings={settings}
            trigger={(
              <Button
                color="red"
                content="Unlock Wallet"
                icon="unlock"
                style={{ marginBottom: '10px' }}
              />
            )}
            validate={validate}
            wallet={wallet}
          />
          : ''}

        { (ipfsSuccess === true && system.GOVERNANCE_CREATEPROPOSAL === 'SUCCESS') ?
        <div>
            <Message
            positive
            content={(
              <p>
                <a
                  onClick={() => this.openLink(ipfs_location)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                >{ipfs_location}
                </a>
              </p>
            )}
            icon="inbox"
            info
            header="Worker Proposal Submitted to IPFS"
          />
          <Button
            onClick={onClose}
            floated="left">
            <Icon name="x" /> {t('close')}
          </Button>
        </div>
        :
        <div>
        <Button
          color="green"
          floated="right"
          onClick={this.onConfirm}
          content='Submit Proposal'
        />
        <Button
          onClick={onBack}
          floated="left">
          <Icon name="arrow left" /> Go Back
        </Button>
        </div>
        }
      </Segment>
    );
  }
}

export default translate('producers')(GovernanceProposalsFormProposalConfirming);
