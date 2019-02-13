// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentResourcePercent extends PureComponent<Props> {
  render() {
    const {
      resource,
    } = this.props;
    if (!resource) return false;
    return (
      <React.Fragment>
        {((resource.available / resource.max) * 100).toFixed(1)}%
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  resource: get(state.accounts, `${ownProps.account}.${ownProps.type}_limit`),
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourcePercent);
