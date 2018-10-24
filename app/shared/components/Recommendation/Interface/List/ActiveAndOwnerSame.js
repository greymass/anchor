// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Message } from 'semantic-ui-react';

import EOSAccount from '../../../../utils/EOS/Account';

class RecommendationInterfaceListActiveAndOwnerSame extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      account,
      t
    } = this.props;

    const model = new EOSAccount(account);
    const shouldDisplayWarning = model.getKeysForAuthorization('owner') === model.getKeysForAuthorization('active');

    return (shouldDisplayWarning)
      ? (
        <Message
          content={t('recommendations_warning_active_and_owner_same')}
          icon="warning"
          warning
        />
      ) : (
        <Message
          content={t('recommendations_success_active_and_owner_different')}
          icon="thumbs up"
          success
        />
      );
  }
}

export default translate('recommendations')(RecommendationInterfaceListActiveAndOwnerSame);
