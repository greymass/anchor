// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';

import PromptStageCallback from './Callback';
import ExplorerLink from '../../../../shared/containers/Global/Blockchain/ExplorerLink';

class PromptStageSuccess extends Component<Props> {
  render() {
    const {
      blockchain,
      callbacking,
      hasForegroundCallback,
      prompt,
      settings,
    } = this.props;
    const {
      response,
      signed,
    } = prompt;
    const tx = response || signed;
    return (
      <Grid>
        {(hasForegroundCallback)
          ? (
            <Grid.Column width={7}>
              <PromptStageCallback
                blockchain={blockchain}
                callbacking={callbacking}
                prompt={prompt}
                settings={settings}
                singleColumn
              />
            </Grid.Column>
          )
          : false
        }
        <Grid.Column width={hasForegroundCallback ? 9 : 16}>
          <Segment color="green" secondary stacked>
            <Header
              size="huge"
            >
              <Icon color="green" name="check circle outline" />
              <Header.Content>
                Transaction Submitted
                <Header.Subheader>
                  The transaction was successfuly sent to the
                  {(response && response.processed)
                    ? ' blockchain.'
                    : ' callback service.'
                  }
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment basic>
              <Table
                definition
                style={{
                  display: 'block',
                  overflowX: 'scroll',
                }}
              >
                {(tx.transaction_id)
                  ? (
                    <Table.Row>
                      <Table.Cell collapsing>Transaction ID</Table.Cell>
                      <Table.Cell>
                        <ExplorerLink
                          content={tx.transaction_id}
                          linkData={tx.transaction_id}
                          linkBlockId={(tx.processed) ? tx.processed.block_num : false}
                          linkType="txid"
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
                  : false
                }
                <Table.Row>
                  <Table.Cell collapsing>Submitted via</Table.Cell>
                  <Table.Cell>
                    {(response && response.processed)
                      ? prompt.endpoint
                      : prompt.callbackURL
                    }
                  </Table.Cell>
                </Table.Row>
              </Table>
              {(tx.transaction_id)
                ? (
                  <Message
                    color="grey"
                    content={(
                      <React.Fragment>
                        <p>
                          The Transaction ID listed above can be used to monitor this transaction. The service it was submitted to is responsible for ensuring the transaction makes it into the greater blockchain network.
                        </p>
                      </React.Fragment>
                    )}
                    header="Monitor your Transaction"
                    icon="info circle"
                    size="large"
                  />
                )
                : (
                  <Message
                    color="grey"
                    content={(
                      <React.Fragment>
                        <p>
                          This transaction has been signed and submitted to the callback URL listed above. It has NOT been broadcast to the blockchain, and depending on the type of transaction, its the responsibility of the application listening to the callback to complete the transaction.
                        </p>
                      </React.Fragment>
                    )}
                    header="Transaction not broadcast to the blockchain"
                    icon="info circle"
                    size="large"
                  />
                )
              }
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt,
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(PromptStageSuccess);
