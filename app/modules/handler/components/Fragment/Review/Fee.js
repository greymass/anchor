// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Divider, Grid, Header, Image, Message, Segment, Table } from 'semantic-ui-react';
import { Asset } from '@greymass/eosio';

import PromptReviewControls from '../../../components/Review/Controls';
import ErrorMessage from '../../../components/error';
import PromptFragmentPlaceholderTransactionAction from '../../../components/Fragment/Placeholder/Transaction/Action';
import PromptFragmentTransactionAction from '../../../components/Fragment/Transaction/Action';
import PromptFragmentTransactionActionResourceProvider from '../../../components/Fragment/Transaction/Action/ResourceProvider';
import FuelFullLogo from '../../../../../renderer/assets/images/fuel/greymassfuel-horizontal.png';

class PromptFragmentReviewFee extends Component<Props> {
  render() {
    const {
      globals,
      prompt
    } = this.props;
    const { pricefeed } = globals;
    const { costs } = prompt;
    const price = (pricefeed && pricefeed.eosusd) ? pricefeed.eosusd / 10000 : undefined;
    const cpu = Asset.from(costs.cpu);
    const net = Asset.from(costs.net);
    const ram = Asset.from(costs.ram);
    const total = Asset.from(cpu.value + net.value + ram.value, cpu.symbol.toString());
    return (
      <Grid
        as={Segment}
        divided
        stacked
        size="small"
        style={{
          paddingBottom: 0,
          marginTop: 0
        }}
      >
        <Grid.Row columns={2}>
          <Grid.Column>
            <Message
              block
              color="yellow"
            >
              <Header
                dividing
                style={{
                  color: 'black',
                  paddingBottom: '0.35em'
                }}
                textAlign="center"
              >
                Transaction Fee
              </Header>
              <Header
                size="large"
                style={{
                  color: 'black',
                  marginTop: '0.5em'
                }}
                textAlign="center"
              >
                {String(total)}
                {(price)
                  ? (
                    <Header.Subheader
                      style={{
                        color: 'black',
                        fontSize: '0.6em',
                        marginTop: '0.25em',
                      }}
                    >
                      ~ ${(price * total.value).toFixed(4)} USD
                    </Header.Subheader>
                  )
                  : false
                }
              </Header>
            </Message>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header size="small">
              Network Resources Provided by...
            </Header>
            <Segment basic>
              <Image
                centered
                src={FuelFullLogo}
                style={{
                  height: '48px',
                }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          columns={1}
          style={{
            paddingTop: 0
          }}
          textAlign="center"
        >
          <Grid.Column style={{ padding: '1em' }}>
            <Divider />
            <Header>Cost Breakdown</Header>
            <Table definition size="large">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="right" collapsing>Resource Type</Table.HeaderCell>
                  <Table.HeaderCell>Cost</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell textAlign="right" collapsing>
                    <Header>
                      CPU
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {(cpu.value !== 0)
                      ? costs.cpu
                      : (
                        <strong>Free</strong>
                      )
                    }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="right" collapsing>
                    <Header>
                      NET
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {(net.value !== 0)
                      ? costs.net
                      : (
                        <strong>Free</strong>
                      )
                    }
                  </Table.Cell>
                </Table.Row>
                {(ram === 0)
                  ? false
                  : (
                    <Table.Row>
                      <Table.Cell textAlign="right" collapsing>
                        <Header>
                          RAM
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {costs.ram}
                      </Table.Cell>
                    </Table.Row>
                  )
                }
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          columns={1}
          style={{
            paddingTop: 0
          }}
          textAlign="center"
        >
          <Grid.Column>
            <p>
              The fee included in this transaction will be paid from your account to the resource provider shown above in exchange for network resources.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withTranslation('handler')(PromptFragmentReviewFee);
