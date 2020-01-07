// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

class GlobalAccountFragmentResourcePercent extends PureComponent<Props> {
  render() {
    const {
      resource,
    } = this.props;
    if (!resource) return false;
    let percent = ((resource.available / resource.max) * 100).toFixed(2);
    if (isNaN(percent)) {
      percent = 0;
    }
    return (
      <React.Fragment>
        {(percent < 5)
          ? (
            <Popup
              content="This resource is running low. Consider staking more tokens in order to increase the resources made available to this account."
              trigger={(
                <span>
                  <Icon color="yellow" name="warning sign" />
                  {percent}%
                </span>
              )}
            />
          )
          : (
            <span>
              {percent}%
            </span>
          )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  return {
    resource: get(state.accounts, `${account}.${ownProps.type}_limit`),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourcePercent);
