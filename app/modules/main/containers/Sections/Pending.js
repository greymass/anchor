// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { find } from 'lodash';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Header, Label, Segment, Table } from 'semantic-ui-react';

import { changeModule } from '../../actions/navigation';
import eos from '../../../../shared/actions/helpers/eos';
import PendingActions from '../../../../shared/actions/pending';
import WalletActions from '../../../../shared/actions/wallets';
import GlobalFragmentChainLogo from '../../../../shared/components/Global/Fragment/ChainLogo';
const { clipboard, ipcRenderer } = require('electron');

class PendingContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      queue: [...props.pending.accounts],
      loading: {},
      ready: {},
      warning: {}
    };
  }
  componentDidMount() {
    this.tick();
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  accountKey = (data) => `${data.chainId}-${data.account}`
  copyToClipboard = (data) => clipboard.writeText(data)

  tick = () => {
    const { queue } = this.state;
    // Set the next iteration of the queue
    const modified = [...queue];
    // Shift the first element out of the queue to check
    const next = modified.shift();
    // Push next record to the end of queue
    modified.push(next);
    // If no next queue item exists, abort
    if (!next) return;
    // Set the loading state for the next item
    this.setState({
      loading: Object.assign({}, this.state.loading, {
        [this.accountKey(next)]: true
      })
    }, () => {
      this.checkAccount(next, modified);
    });
    // Set the updated queue
    this.setState({
      queue: modified
    });
  }

  checkAccount = (next) => {
    const { blockchains } = this.props;

    const blockchain = find(blockchains, { chainId: next.chainId });

    const EOS = eos({
      broadcast: false,
      chainId: blockchain.chainId,
      httpEndpoint: blockchain.node,
      sign: false,
    }, false, true);

    EOS.api.rpc.get_account(next.account)
      .then((result) => {
        // If an account was found, ensure the keys are correct before allowing the user to import
        if (result && result.permissions) {
          // Get the permissions that match the expected configuration
          const matchingKeys = result.permissions.filter((permission) => (
            permission.required_auth.keys.length === 1
              && permission.required_auth.accounts.length === 0
              && permission.required_auth.waits.length === 0
              && permission.required_auth.threshold === 1
              && permission.required_auth.keys[0].key === next[permission.perm_name]
              && permission.required_auth.keys[0].weight === 1
          ));
          // Get the number of defined permissions
          const permissions = result.permissions.length;
          if (
            // Ensure only 2 premissions were created
            permissions === 2
            // and that the permissions were created correctly
            && matchingKeys.length === 2
          ) {
            this.setState({
              ready: Object.assign({}, this.state.ready, {
                [this.accountKey(next)]: true
              })
            });
          } else {
            this.setState({
              ready: Object.assign({}, this.state.ready, {
                [this.accountKey(next)]: false
              }),
              warning: Object.assign({}, this.state.warning, {
                [this.accountKey(next)]: true
              }),
            });
          }
        }
        return true;
      })
      .finally(() => {
        this.setState({
          loading: Object.assign({}, this.state.loading, {
            [`${next.chainId}-${next.account}`]: false
          }),
        });
      })
      .catch(() => {
        // An error is expected if the account doesn't exist
      });
  }

  import = (account) => {
    this.props.actions.importWalletPending(account);
  }

  removeRequest = (account) => {
    this.props.actions.removePendingAccountCreate(account);
  }

  render() {
    const { loading, ready, warning } = this.state;
    const { actions, pending, t } = this.props;
    const pendingAccountRequests = pending && pending.accounts && pending.accounts.length > 0;
    const pendingCertificates = pending && pending.certificates && pending.certificates.length > 0;
    const pendingSigningRequest = pending && pending.request;
    return (
      <React.Fragment>
        {(pendingCertificates)
          ? (
            <Segment>
              <Header
                content={t('main_sections_pending_certs_header')}
              />
              <p>{t('main_sections_pending_certs_subheader')}</p>
                <Table size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        Network
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Account Name
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        Controls
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {pending.certificates.map(cert => (
                      <Table.Row>
                        <Table.Cell collapsing textAlign="center">
                          <GlobalFragmentChainLogo
                            avatar
                            chainId={cert.chainId}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Header size="small">{cert.account}</Header>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <Button
                            content="Backup account"
                            icon="print"
                            primary
                            onClick={() => actions.changeModule(`home/account/backup/${cert.chainId}/${cert.account}`)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
            </Segment>
          )
          : false
        }
        {(pendingSigningRequest)
          ? (
            <Segment>
              <Header
                content="Pending Signing Request"
              />
              <p>A signing request is waiting for your approval.</p>
              <Segment stacked textAlign="center">
                <GlobalFragmentChainLogo
                  chainId={pending.request.chainId}
                  noPopup
                  size="tiny"
                />
                <Header>Signing Request pending for </Header>
                <p>If this signing request is not visible, click the button below to open it on your current display.</p>
                <Button
                  content="Display Signing Request Prompt"
                  primary
                  onClick={() => ipcRenderer.send('openUri', pending.request.uri)}
                />
              </Segment>
            </Segment>
          )
          : false
        }
        {(pendingAccountRequests)
          ? (
            <Segment>
              <Header
                content={t('main_sections_pending_accounts_header')}
              />
              <p>{t('main_sections_pending_accounts_subheader')}</p>
              <Table size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      Network
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Account Name
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Status
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Controls
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {pending.accounts.map((account) => {
                    const isReady = ready[this.accountKey(account)];
                    const isLoading = loading[this.accountKey(account)];
                    const hasWarning = warning[this.accountKey(account)];
                    return (
                      <Table.Row textAlign="center">
                        <Table.Cell collapsing>
                          <GlobalFragmentChainLogo
                            avatar
                            chainId={account.chainId}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                          {account.account}
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                          {(isReady)
                            ? (
                              <Label color="green">Ready to Import</Label>
                            )
                            : false
                          }
                          {(!isReady && hasWarning)
                            ? (
                              <Label color="red">Warning, account created incorrectly!</Label>
                            )
                            : false
                          }
                          {(!isReady && !hasWarning)
                            ? (
                              <Label color="grey">Awaiting Creation</Label>
                            )
                            : false
                          }
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="left">
                          {(isReady)
                            ? (
                              <Button
                                content={(isReady) ? 'Account created, click to add!' : 'Waiting'}
                                disabled={!isReady}
                                fluid
                                icon="checkmark"
                                onClick={() => this.import(account)}
                                primary={isReady}
                                size="tiny"
                              />
                            )
                            : false
                          }
                          {(!isReady && !hasWarning)
                            ? (
                              <React.Fragment>
                                <Button
                                  content="Copy URL"
                                  icon="clipboard"
                                  onClick={() => this.copyToClipboard(account.request)}
                                />
                                <Button
                                  content="Check"
                                  loading={isLoading}
                                  icon="refresh"
                                  onClick={() => this.checkAccount(account)}
                                />
                              </React.Fragment>
                            )
                            : false
                          }
                          {(!isReady)
                            ? (
                              <Dropdown
                                direction="left"
                                button
                                className="icon"
                                icon="ellipsis vertical"
                                size="tiny"
                              >
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    content="Delete Request"
                                    icon="trash"
                                    key="trash"
                                    onClick={() => this.removeRequest(account)}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            )
                            : false
                          }
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Segment>
          )
          : false
        }
        {(!pendingSigningRequest && !pendingAccountRequests && !pendingCertificates)
          ? (
            <Segment>
              <p>No pending actions.</p>
            </Segment>
          )
          : false
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    blockchains: state.blockchains,
    connection: state.connection,
    pending: state.pending,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      ...PendingActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation(['tools']),
  connect(mapStateToProps, mapDispatchToProps)
)(PendingContainer);
