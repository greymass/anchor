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
    const percent = ((resource.available / resource.max) * 100).toFixed(2);
    return (
      <React.Fragment>
        {(percent < 5)
          ? (
            <Popup
              content="This specific resource is currently running low. Consider staking more in order to increase the account resources to avoid any potential interruptions in its actions."
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

const mapStateToProps = (state, ownProps) => ({
  resource: get(state.accounts, `${ownProps.account}.${ownProps.type}_limit`),
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourcePercent);
