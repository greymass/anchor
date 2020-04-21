// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import ErrorMessage from '../../components/error';
import GlobalAccountDropdownSelect from '../../../../shared/containers/Global/Account/Dropdown/Select';
import ToolsHardwareLedgerStatus from '../../../../shared/components/Tools/Hardware/Ledger/Status';

import * as HardwareLedgerActions from '../../../../shared/actions/hardware/ledger';

class PromptStageIdentity extends Component<Props> {
  render() {
    const {
      actions,
      canSign,
      couldSignWithDevice,
      ledger,
      onSelect,
      prompt,
      settings,
      status,
      wallet,
      t,
    } = this.props;
    const {
      chainId,
      resolved,
    } = prompt;
    if (!resolved) return false
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = wallet;
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
            <Grid.Column width={8}>
              <Form>
                <Form.Field>
                  <label>{t('handler_containers_stage_identity_label')}</label>
                  <GlobalAccountDropdownSelect
                    account={account}
                    authorization={authorization}
                    mode={mode}
                    pubkey={pubkey}
                    chainId={chainId}
                    onSelect={onSelect}
                  />
                </Form.Field>
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
              </Form>
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
