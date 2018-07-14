// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header } from 'semantic-ui-react';

import GlobalTransactionViewAction from './Action';

type Props = {
  actions: [],
  t: () => void
};

class GlobalTransactionViewActions extends Component<Props> {
  props: Props;
  render() {
    const {
      actions,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Header>
          {t('global_transaction_actions_details_title')}
          <Header.Subheader>
            {t('global_transaction_actions_details_content')}
          </Header.Subheader>
        </Header>
        {actions.map((action, idx) => (
          <GlobalTransactionViewAction
            action={action}
            key={idx}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalTransactionViewActions);
