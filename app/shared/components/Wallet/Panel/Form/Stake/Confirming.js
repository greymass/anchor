// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import EOSAccount from '../../../../../utils/EOS/Account';

import checkForBeos from '../../../../helpers/checkCurrentBlockchain';

class WalletPanelFormStakeConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      account,
      accountName,
      balance,
      connection,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      netOriginal,
      onBack,
      t
    } = this.props;

    const cpuAmount = decimalCpuAmount.toNumber();
    const netAmount = decimalNetAmount.toNumber();

    const cpuDifference = cpuAmount - cpuOriginal.toNumber();
    const netDifference = netAmount - netOriginal.toNumber();

    const lessThanOneUnitStaked = (cpuAmount < 1 || netAmount < 1);

    const eosAccount = new EOSAccount(account, balance);

    const refundDate = eosAccount.getRefundDate();

    const unstaking = (cpuDifference < 0 || netDifference < 0);

    const unstakingWhenAmountBeingUnstaked = refundDate && unstaking;

    let jurisdictionsForm = (<div />);

    if (checkForBeos(connection)) {
      jurisdictionsForm = (
        <div>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>{t('stake_label_jurisdictions')}</label>
          <div className="confirm-scroll">
            {this.props.jurisdictions.map((jurisdiction) => (
              <span className="confirm-wrapper ">{jurisdiction.value}<br /></span>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        {(accountName !== account.account_name)
        ? (
          <Header textAlign="center">
            <p>{t('stake_confirming_header_one')} {accountName}</p>
          </Header>
        ) : ''}

        <Segment padding="true" basic>
          {(unstaking) ? (
            <Header textAlign="center">
              {t('about_to_unstake_tokens')}
            </Header>
          ) : ''}
          <Segment.Group>
            {(netDifference > 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="green">
                    <Icon name="wifi" />{t('about_to_stake_units_to_net', { amount: `${netDifference.toFixed(4)} ${connection.chainSymbol || 'EOS'}` })}
                  </font>
                  <Header.Subheader>
                    ({t('will_have_units_in_net_after', { amount: `${netAmount.toFixed(4)} ${connection.chainSymbol}` })})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(netDifference < 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="red">
                    <Icon name="wifi" />{t('about_to_unstake_units_from_net', { amount: `${(-netDifference).toFixed(4)} ${connection.chainSymbol || 'EOS'}` })})
                  </font>
                  <Header.Subheader>
                    ({t('will_have_units_in_net_after', { amount: `${netAmount.toFixed(4)} ${connection.chainSymbol}` })})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(cpuDifference > 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="green">
                    <Icon name="microchip" />{t('about_to_stake_units_to_cpu', { amount: `${(cpuDifference).toFixed(4)} ${connection.chainSymbol || 'EOS'}` })}
                  </font>
                  <Header.Subheader>
                    ({t('will_have_units_in_cpu_after', { amount: `${cpuAmount.toFixed(4)} ${connection.chainSymbol}` })})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(cpuDifference < 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="red">
                    <Icon name="microchip" />{t('about_to_unstake_units_from_cpu', { amount: `${(-cpuDifference).toFixed(4)} ${connection.chainSymbol || 'EOS'}` })}
                  </font>
                  <Header.Subheader>
                    ({t('will_have_units_in_cpu_after', { amount: `${cpuAmount.toFixed(4)} ${connection.chainSymbol}` })})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}
          </Segment.Group>

          {(accountName === account.account_name && lessThanOneUnitStaked) ? (
            <Message warning="true">{t('will_have_less_than_one_unit_staked', { chainSymbol: connection.chainSymbol })}</Message>
          ) : ''}

          {(unstakingWhenAmountBeingUnstaked) ? (
            <Message
              icon="warning sign"
              warning="true"
            >
              {t('have_already_unstaked')} {eosAccount.getTotalBeingUnstaked().toFixed(4)} EOS {t('unstaking_will_be_reset')}
            </Message>
          ) : ''}
          <Divider />
          {jurisdictionsForm}
          <Divider />
          <Button
            onClick={onBack}
          >
            <Icon name="arrow left" /> {t('back')}
          </Button>
          <Button
            color="blue"
            floated="right"
            onClick={this.onConfirm}
          >
            <Icon name="check" /> {t('confirm_stake')}
          </Button>
        </Segment>
      </div>
    );
  }
}

export default translate('stake')(WalletPanelFormStakeConfirming);
