// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Accordion, Menu, Segment } from 'semantic-ui-react';

import ColdWalletPanelButtonSignTransaction from './Button/SignTransaction';
import WalletPanelButtonLock from '../../../Wallet/Panel/Button/Lock';
import GlobalButtonResetContainer from '../../../../containers/Global/Button/Reset';

export default class ColdWalletPanelUnlocked extends Component<Props> {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const {
      actions,
      keys
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <ColdWalletPanelButtonSignTransaction
                actions={actions}
              />
            </div>
          )
        }
      </I18n>
    );
  }
}
