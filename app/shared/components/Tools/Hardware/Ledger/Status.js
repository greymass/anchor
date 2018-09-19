// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, List, Segment } from 'semantic-ui-react';

import ToolsHardwareLedgerStatusMessage from './Status/Message';

class ToolsHardwareLedgerStatus extends Component<Props> {
  render() {
    const {
      ledger,
      status,
      t,
    } = this.props;
    console.log(status)
    return (
      <React.Fragment>
        {(ledger.devicePath && ledger.application && ledger.application.version)
          ? (
            <p>connected</p>
          )
          : (
            <React.Fragment>
              <Segment attached="top" color="orange">
                <Header icon size="large" textAlign="center">
                  <Icon
                    name="usb"
                  />
                  {t('ledger_unavailable_header')}
                  <Header.Subheader
                    content={t('ledger_unavailable_subheader')}
                  />
                </Header>
              </Segment>
              <ToolsHardwareLedgerStatusMessage
                ledger={ledger}
                status={status}
              />
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

export default translate('ledger')(ToolsHardwareLedgerStatus);
