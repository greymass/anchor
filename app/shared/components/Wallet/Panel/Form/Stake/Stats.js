// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

export default class WalletPanelFormStakeStats extends Component<Props> {
  render() {
    const {
      cpuOriginal,
      EOSbalance,
      netOriginal
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment.Group horizontal>
              <Segment>
                <Header textAlign="center">
                  {(EOSbalance).toFixed(4)} EOS
                  <Header.Subheader>
                    {t('amount_not_staked')}
                  </Header.Subheader>
                </Header>
              </Segment>
              <Segment>
                <Header textAlign="center">
                  {cpuOriginal.toFixed(4)} EOS
                  <Header.Subheader>
                    {t('cpu_staked')}
                  </Header.Subheader>
                </Header>
              </Segment>
              <Segment>
                <Header textAlign="center">
                  {netOriginal.toFixed(4)} EOS
                  <Header.Subheader>
                    {t('net_staked')}
                  </Header.Subheader>
                </Header>
              </Segment>
            </Segment.Group>
          )
        }
      </I18n>
    );
  }
}
