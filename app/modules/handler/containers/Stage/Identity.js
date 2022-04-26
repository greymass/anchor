// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import ErrorMessage from '../../components/error';
import GlobalAccountDropdownSelect from '../../../../shared/containers/Global/Account/Dropdown/Select';
import GlobalBlockchainDropdown from '../../../../shared/containers/Global/Blockchain/Dropdown';

import ToolsHardwareLedgerStatus from '../../../../shared/components/Tools/Hardware/Ledger/Status';

import * as HardwareLedgerActions from '../../../../shared/actions/hardware/ledger';

class PromptStageIdentity extends Component<Props> {
  render() {
    const {
      actions,
      canSign,
      couldSignWithDevice,
      enableSessions,
      ledger,
      onSelect,
      onSelectChain,
      prompt,
      settings,
      status,
      wallet,
      wallets,
      t,
    } = this.props;

    const {
      resolved,
    } = prompt;
    let { chainId } = prompt;
    if (!resolved) return false;
    let chainIds = [];
    let multiChain = false;
    if (
      resolved.request
      && resolved.request.isMultiChain
      && resolved.request.isMultiChain()
    ) {
      chainIds = JSON.parse(JSON.stringify(resolved.request.getChainIds()));

      const { blockchains } = this.props;
      multiChain = !chainIds || blockchains.filter(b => {
        const hasWallet = wallets.filter(w => w.chainId === b.chainId).length > 0;
        const isEnabled = settings.blockchains.includes(b.chainId);
        const isSelectable = chainIds.includes(b.chainId);
        return (isEnabled && isSelectable && hasWallet);
      }).length > 1;
    }
    const {
      account,
      authorization,
      authAccount,
      authAuthorization,
      mode,
      pubkey,
    } = wallet;
    if (!chainId && chainIds.length > 0) {
      [chainId] = chainIds;
    }
    return (
      <Container>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment basic textAlign="center">
                <Header size="large">
                  {t('handler_containers_stage_identity_header')}
                  <Header.Subheader>
                    {t('handler_containers_stage_identity_subheader')}
                  </Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column width={10}>
              <Form style={{ zIndex: 1000 }}>
                {(multiChain)
                  ? (
                    <Form.Field>
                      <label>{t('handler_containers_stage_identity_chain_label')}</label>
                      <GlobalBlockchainDropdown
                        chainIds={chainIds}
                        onSelect={onSelectChain}
                        selected={chainId}
                        selection
                        showName
                      />
                    </Form.Field>
                  )
                  : false
                }
                <Form.Field>
                  <label>{t('handler_containers_stage_identity_label')}</label>
                  <GlobalAccountDropdownSelect
                    account={account}
                    authorization={authorization}
                    authAccount={authAccount}
                    authAuthorization={authAuthorization}
                    mode={mode}
                    pubkey={pubkey}
                    chainId={chainId}
                    onSelect={onSelect}
                  />
                </Form.Field>
                <Form.Field>
                  <Segment basic textAlign="center">
                    <Header
                      content="Options"
                      size="small"
                    />
                    <Form.Checkbox
                      checked={enableSessions}
                      label="Create a session for future use with this app"
                      onChange={this.props.toggleSessions}
                      toggle
                    />
                  </Segment>
                </Form.Field>
              </Form>
              {(!canSign && couldSignWithDevice)
                ? (
                  <Message
                    content={t('handler_containers_stage_identity_message_one')}
                    info
                  />
                )
                : false
              }
              {(mode === 'watch')
                ? (
                  <Message
                    content={t('handler_containers_stage_identity_message_two')}
                    color="red"
                    icon="warning sign"
                  />
                )
                : false
              }
            </Grid.Column>
            {(!canSign && couldSignWithDevice)
              ? (
                <Grid.Column width={8}>
                  <ToolsHardwareLedgerStatus
                    actions={actions}
                    ledger={ledger}
                    settings={settings}
                    status={status}
                  />
                </Grid.Column>
              )
              : false
            }
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ledger: state.ledger,
    prompt: state.prompt,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...HardwareLedgerActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('handler'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStageIdentity);
