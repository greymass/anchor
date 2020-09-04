// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import WalletMessageContractBuyRamBytes from '../../../../Global/Message/Contract/BuyRamBytes';
import GlobalDataBytes from '../../../../Global/Data/Bytes';

class WalletPanelFormRamBuyConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      buying,
      connection,
      ramAmount,
      onBack,
      priceOfRam,
      newRamAmount,
      settings,
      t
    } = this.props;

    return (
      <Segment basic clearing padding="true">
        <Segment textAlign="center">
          <Header size="large">
            {t('ram_confirming_message_price_estimate_header')}
            <Header.Subheader>
              {t('ram_confirming_message_price_estimate_subheader')}
            </Header.Subheader>
          </Header>
          {(connection.chainSymbol !== 'UTX')
            ? (
                <React.Fragment>
                  <Header>
                    {(buying)
                      ? (
                        <span>{t('ram_buy_confirming_message_one')}</span>
                      ) : (
                        <span>{t('ram_sell_confirming_message_one')}</span>
                      )}

                    <font color="green">
                      <GlobalDataBytes
                        bytes={Number(ramAmount)}
                      />
                    </font>


                    {` ${t('ram_confirming_message_in_ram_for')} ~${priceOfRam.toFixed(4)} ${connection.chainRamSymbol || connection.chainSymbol || 'EOS'}.`}
                  </Header>
                  <Header>
                    {t('ram_confirming_message_will_have')}
                    <GlobalDataBytes
                      bytes={newRamAmount}
                    />
                    {t('ram_confirming_message_in_ram_left')}
                  </Header>
                  <Message warning>
                    {t('ram_confirming_message_price_includes_chain_fee', { chainSymbol: connection.chainRamSymbol || connection.chainSymbol })}
                  </Message>
                  {(buying) ?
                    (
                      <WalletMessageContractBuyRamBytes
                        data={{
                          buyer: settings.account,
                          bytes: `${ramAmount} B`,
                          chainSymbol: connection.chainRamSymbol || connection.chainSymbol
                        }}
                      />
                    ) : ''}
                </React.Fragment>
            )
            : false
          }
        </Segment>


        <Button
          floated="left"
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('ram_button_confirm_back')}
        </Button>
        <Button
          color="red"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('ram_button_confirm_transaction')}
        </Button>
      </Segment>
    );
  }
}

export default withTranslation('ram')(WalletPanelFormRamBuyConfirming);
