// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Message } from 'semantic-ui-react';

class RecommendationInterfaceListActiveAndOwnerSame extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      t
    } = this.props;

    const shouldDisplay = true;

    return (shouldDisplay)
      ? (
        <Message
          content={t('recommendations_warning_active_and_owner_same')}
          icon="warning"
          warning
        />
      ) : null;
  }
}

export default translate('recommendations')(RecommendationInterfaceListActiveAndOwnerSame);
