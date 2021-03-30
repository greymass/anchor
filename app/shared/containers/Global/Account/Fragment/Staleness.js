// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Icon, Popup } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import { getAccount } from '../../../../../shared/actions/accounts';

class GlobalAccountFragmentDataStaleness extends PureComponent<Props> {
  render() {
    const {
      account,
      currentHeight,
      lastHeight,
      lastUpdate,
      t,
    } = this.props;
    const age = currentHeight - lastHeight;
    return (
      <React.Fragment>
        <Popup
          content={(
            <div>
              <p><TimeAgo date={`${lastUpdate}z`} /></p>
              <Button
                content="Refresh Account"
                icon="refresh"
                primary
                onClick={() => this.props.actions.getAccount(account)}
                size="tiny"
              />
            </div>
          )}
          flowing
          header={t('last_updated')}
          hoverable
          position="right center"
          size="tiny"
          trigger={(
            <Icon
              color={(age > 1000) ? 'red' : 'grey'}
              name="clock outline"
            />
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  return {
    currentHeight: get(state, 'chain.head_block_num'),
    lastHeight: get(state, `accounts.${account}.head_block_num`),
    lastUpdate: get(state, `accounts.${account}.head_block_time`),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAccount,
    }, dispatch)
  };
}

export default compose(
  withTranslation('common'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountFragmentDataStaleness);
