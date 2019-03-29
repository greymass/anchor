// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Divider, Grid, Header, Icon, Image, Responsive, Segment, Statistic, Step } from 'semantic-ui-react';

import AnchorLogo from '../../../renderer/assets/images/anchor-shape.svg';
import GlobalFragmentChainLogo from '../../../shared/components/Global/Fragment/ChainLogo';

class PromptHeader extends Component<Props> {
  render() {
    const {
      blockchain,
      hasBroadcast,
      hasExpired,
      loading,
      prompt,
      t,
    } = this.props;
    const { req } = prompt;
    let actions = 0;
    if (req) {
      const [reqType, reqData] = req;
      switch (reqType) {
        case 'transaction': {
          actions = reqData.actions.length;
          break;
        }
        case 'action[]': {
          actions = reqData.length;
          break;
        }
        default:
        case 'action': {
          actions = 1;
          break;
        }
      }
    }
    return (
      <Segment
        attached="top"
        clearing
        className="prompt-header"
        secondary
      >
        <Grid>
          <Grid.Column width={10}>
            <Header size="huge" style={{ marginTop: 0 }}>
              <Image src={AnchorLogo} style={{ marginRight: '0.25em' }} />
              <Header.Content>
                Signing Request
                <Header.Subheader>
                  An incoming signing request has been triggered.
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign="right">
            <Step.Group>
              <Step>
                {(loading)
                  ? (
                    <Statistic>
                      <Statistic.Value>
                        <Icon color="grey" loading name="circle notch" />
                      </Statistic.Value>
                    </Statistic>
                  )
                  : false
                }
                {(!loading && hasExpired)
                  ? (
                    <Statistic>
                      <Statistic.Value>
                        <Icon color="orange" name="warning sign" />
                      </Statistic.Value>
                      <Statistic.Label>Expired</Statistic.Label>
                    </Statistic>
                  )
                  : false
                }
                {(!loading && hasBroadcast)
                  ? (
                    <Statistic>
                      <Statistic.Value>
                        <Icon color="grey" name="checkmark" />
                      </Statistic.Value>
                      <Statistic.Label>Complete</Statistic.Label>
                    </Statistic>
                  )
                  : false
                }
                {(!loading && !hasBroadcast && !hasExpired && actions)
                  ? (
                    <Statistic>
                      <Statistic.Value>
                        {actions}
                      </Statistic.Value>
                      <Statistic.Label>Action(s)</Statistic.Label>
                    </Statistic>
                  )
                  : false
                }
              </Step>
              <Step active>
                <Step.Content>
                  <GlobalFragmentChainLogo
                    chainId={blockchain.chainId}
                    noPopup
                  />
                  <Header
                    content={blockchain.name}
                    size="small"
                    style={{ margin: 0 }}
                    textAlign="center"
                  />
                </Step.Content>
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default translate('global')(PromptHeader);
