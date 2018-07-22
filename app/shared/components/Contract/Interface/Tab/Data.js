// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { translate } from 'react-i18next';

import { Header } from 'semantic-ui-react';

class ContractInterfaceTabData extends Component<Props> {
  render() {
    const {
      contract,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Header>
          {t('interface_data_header')}
          <Header.Subheader>
            {t('interface_data_subheader')}
          </Header.Subheader>
        </Header>
        <ReactJson
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={contract}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceTabData);
