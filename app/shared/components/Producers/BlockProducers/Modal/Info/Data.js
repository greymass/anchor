// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

class ProducersModalInfoData extends Component<Props> {
  render() {
    const {
      producerInfo,
      t
    } = this.props;
    return (
      <React.Fragment>
        <p>{t('producer_info_data')}</p>
        <ReactJson
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={producerInfo}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </React.Fragment>
    );
  }
}

export default translate('producers')(ProducersModalInfoData);
