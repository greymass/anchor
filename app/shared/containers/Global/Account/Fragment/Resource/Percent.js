// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

class GlobalAccountFragmentResourcePercent extends PureComponent<Props> {
  render() {
    const {
      resource,
      settings,
    } = this.props;
    if (!resource) return false;
    let percent = ((resource.available / resource.max) * 100).toFixed(1);
    if (isNaN(percent)) {
      percent = 0;
    }
    if (!settings.displayResourcesAvailable) {
      percent = (100 - percent).toFixed(1);
    }
    return (
      <React.Fragment>
        {(
          (settings.displayResourcesAvailable && percent < 5)
          || (!settings.displayResourcesAvailable && percent > 95)
        )
          ? (
            <Popup
              content="This resource is running low. Consider renting more if you plan to use this account soon."
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
  const account = ownProps.account.replace(/\./g, '\\.');
  return {
    resource: get(state.accounts, `${account}.${ownProps.type}_limit`),
    settings: state.settings,
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourcePercent);
