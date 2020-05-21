// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Grid, Header, Icon, Image, Segment, Statistic, Step } from 'semantic-ui-react';

import AnchorLogo from '../../../renderer/assets/images/anchor-logo-blue.svg';

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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          zIndex: 2000,
          '-webkit-app-region': 'drag'
        }}
      >
        <Grid>
          <Grid.Column width={10}>
            <Header size="huge" style={{ marginTop: 0 }}>
              <Image
                src={AnchorLogo}
                style={{
                  marginRight: '0.25em',
                  marginTop: 0,
                  width: '72px',
                }}
              />
              <Header.Content>
                {t('handler_header_header')}
                <Header.Subheader>
                  {t('handler_header_subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign="right">
            {(prompt && blockchain)
              ? (
                <Step.Group>
                  <Step>
                    {(loading)
                      ? (
                        <Statistic size="small">
                          <Statistic.Value>
                            <Icon color="grey" loading name="circle notch" />
                          </Statistic.Value>
                        </Statistic>
                      )
                      : false
                    }
                    {(!loading && hasExpired)
                      ? (
                        <Statistic size="small">
                          <Statistic.Value>
                            <Icon color="orange" name="warning sign" />
                          </Statistic.Value>
                          <Statistic.Label>{t('handler_header_statistic_one')}</Statistic.Label>
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
                          <Statistic.Label>{t('handler_header_statistic_two')}</Statistic.Label>
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
                          <Statistic.Label>{t('handler_header_statistic_three')}</Statistic.Label>
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
              )
              : false
            }
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default withTranslation('handler')(PromptHeader);
