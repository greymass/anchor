// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';
import { Header, Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowGeneric extends Component<Props> {
  render() {
    const {
      act,
    } = this.props;

    const headerStyle = {
      backgroundColor: '#737373',
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
      color: 'white',
      fontSize: '14px',
      fontweight: '600',
      height: '40px',
      marginBottom: '0',
      padding: '9px'
    };

    return (
      <div>
        <div>
          <Header style={headerStyle}>
            <Icon name="clipboard outline" />
            {`${act.account}   ${act.name}`}
          </Header>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={act.data}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowGeneric);

