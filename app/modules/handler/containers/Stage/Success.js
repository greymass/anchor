// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';

import ExplorerLink from '../../../../shared/containers/Global/Blockchain/ExplorerLink';

class PromptStageSuccess extends Component<Props> {
  render() {
    const {
      prompt,
    } = this.props;
    const {
      response,
      signed,
    } = prompt;
    const tx = response || signed;
    return (
      <Grid>
        <Grid.Column width={16}>
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
              <Table definition>
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
