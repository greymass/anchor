// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Grid, Header, Icon, Image, Label, Message, Segment } from 'semantic-ui-react';

import FuelFullLogo from '../../../../../../renderer/assets/images/fuel/greymassfuel-horizontal.png';

class PromptFragmentTransactionActionResourceProvider extends Component<Props> {
  render() {
    const {
      hasResourceProviderFee,
      pair,
      pricefeed,
      transaction,
      total,
      usingResourceProvider,
      t,
    } = this.props;
    const index = 0;
    const [providerAction, potentialFee] = transaction.actions;
    const price = (pricefeed && pricefeed[pair]) ? pricefeed[pair] / 10000 : undefined;
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
            {(hasResourceProviderFee)
              ? (
                <React.Fragment>
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
                      {potentialFee.data.quantity.toString()}
                      {(price)
                        ? (
                          <Header.Subheader
                            style={{
                              color: 'black',
                              fontSize: '0.6em',
                              marginTop: '0.25em',
                            }}
                          >
                            ~ ${(price * potentialFee.data.quantity.value).toFixed(4)} USD
                          </Header.Subheader>
                        )
                        : false
                      }
                    </Header>
                  </Message>
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <Message
                    block
                    color="green"
                  >
                    <Header
                      dividing
                      style={{
                        color: 'black',
                        paddingBottom: '0.5em',
                        marginBottom: '0.5em',
                      }}
                      textAlign="center"
                    >
                      Free Transaction
                    </Header>
                    <p style={{ color: 'black', textAlign: 'center' }}>
                      The cost of this transaction has been covered for you.
                    </p>
                  </Message>
                </React.Fragment>)
            }

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
        {(hasResourceProviderFee)
          ? (
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
          )
          : false
        }
      </Grid>
    );
  }
}

export default withTranslation('handler')(PromptFragmentTransactionActionResourceProvider);
