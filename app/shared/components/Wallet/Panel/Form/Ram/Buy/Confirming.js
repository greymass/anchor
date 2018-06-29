// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Divider, Icon, Segment } from 'semantic-ui-react';

class WalletPanelFormRamBuyConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      aboutToBuy,
      onBack,
      ramQuota,
      t
    } = this.props;

    return (
      <Segment padding="true" textAlign="center" basic>
        <Segment textAlign="center">
          <h2>
            {`${t('ram_confirming_message_about_to_sell')} ${(parseFloat(aboutToBuy) / 1000)}`}
          </h2>
          <h2>
            {`${t('ram_confirming_message_will_have')} ${(parseFloat(ramQuota.minus(aboutToBuy)) / 1000)}`}
          </h2>
        </Segment>

        <Divider />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('ram_button_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('ram_button_confirm_sell')}
        </Button>
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuyConfirming);
