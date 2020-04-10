// @flow
import React, { Component } from 'react';

import ColdWalletPanelButtonSignTransaction from './Button/SignTransaction';

class ColdWalletPanelUnlocked extends Component<Props> {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const {
      actions,
    } = this.props;
    return (
      <ColdWalletPanelButtonSignTransaction
        actions={actions}
      />
    );
  }
}

export default ColdWalletPanelUnlocked;
