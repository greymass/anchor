// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Divider, Header, Segment } from 'semantic-ui-react';

import ActiveAndOwnerSame from './List/ActiveAndOwnerSame';
import ResourcesLow from './List/ResourcesLow';


const listItemsMapping = [
  ActiveAndOwnerSame,
  ResourcesLow
];

class RecommendationInterfaceList extends Component<Props> {
  render() {
    const {
      account,
      t
    } = this.props;

    const recommendations = listItemsMapping.map((RecommendationComponent) => {
      return <RecommendationComponent account={account} />;
    });

    return (
      <Segment basic>
        <Header
          content={t('recommendations_header_text')}
          floated="left"
          subheader={t('recommendations_subheader_text')}
          padded
        />
        <Divider style={{ marginTop: '60px', marginBottom: '20px' }} />
        {recommendations}
      </Segment>
    );
  }
}

export default translate('recommendations')(RecommendationInterfaceList);
