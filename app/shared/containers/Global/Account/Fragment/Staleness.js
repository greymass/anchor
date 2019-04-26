// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

class GlobalAccountFragmentDataStaleness extends PureComponent<Props> {
  render() {
    const {
      currentHeight,
      lastHeight,
      lastUpdate,
      t,
    } = this.props;
    const age = currentHeight - lastHeight;
    return (
      <React.Fragment>
        <Popup
          content={<TimeAgo date={`${lastUpdate}z`} />}
          flowing
          header={t('last_updated')}
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

const mapStateToProps = (state, ownProps) => ({
  currentHeight: get(state, 'chain.head_block_num'),
  lastHeight: get(state, `accounts.${ownProps.account}.head_block_num`),
  lastUpdate: get(state, `accounts.${ownProps.account}.head_block_time`),
});

export default compose(
  translate('common'),
  connect(mapStateToProps)
)(GlobalAccountFragmentDataStaleness);
