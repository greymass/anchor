// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Header } from 'semantic-ui-react';

type Props = {
  transaction: {}
};

class GlobalTransactionViewFull extends Component<Props> {
  props: Props;
  render() {
    const {
      t,
      transaction
    } = this.props;
    return (
      <React.Fragment>
        <Header>
          {t('global_transaction_full_details_title')}
          <Header.Subheader>
            {t('global_transaction_full_details_content')}
          </Header.Subheader>
        </Header>
        <ReactJson
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={transaction}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalTransactionViewFull);
