// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Divider, Header, Segment } from 'semantic-ui-react';

import ActiveAndOwnerSame from './List/ActiveAndOwnerSame';
import CpuStakedLow from './List/CpuStakedLow';
import CpuAvailableLow from './List/CpuAvailableLow';
import BandwidthStakedLow from './List/BandwidthStakedLow';
import BandwidthAvailableLow from './List/BandwidthAvailableLow';


const listItemsMapping = [
  ActiveAndOwnerSame,
  BandwidthAvailableLow,
  BandwidthStakedLow,
  CpuAvailableLow,
  CpuStakedLow
];

class RecommendationInterfaceList extends Component<Props> {
  render() {
    const {
      account,
      settings,
      t
    } = this.props;

    const recommendations = listItemsMapping.map((RecommendationComponent, idx) => {
      return <RecommendationComponent key={idx} account={account} settings={settings} />;
    });

    return (
      <Segment basic>
        <Header
          content={t('recommendations_header_title')}
          floated="left"
          subheader={t('recommendations_subheader_text')}
        />
        <Divider style={{ marginTop: '60px', marginBottom: '20px' }} />
        {recommendations}
      </Segment>
    );
  }
}

export default translate('recommendations')(RecommendationInterfaceList);
