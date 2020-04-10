// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { withTranslation } from 'react-i18next';

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
          collapsed={2}
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={{}}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </React.Fragment>
    );
  }
}

export default withTranslation('contract')(ContractInterfaceTabData);
