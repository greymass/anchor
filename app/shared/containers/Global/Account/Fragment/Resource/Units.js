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
      resourceType,
      settings,
    } = this.props;
    if (!resource) return false;
    let units = (resource.available / 1000).toFixed(3);
    if (isNaN(units)) {
      units = 0;
    }
    if (!settings.displayResourcesAvailable) {
      units = (100 - units).toFixed(1);
    }
    const unit = resourceType === 'cpu' ? 'ms' : 'kb';
    return (
      <React.Fragment>
        {(
          (settings.displayResourcesAvailable && units < 5)
          || (!settings.displayResourcesAvailable && units > 95)
        )
          ? (
            <Popup
              content="This resource is running low. Consider staking more tokens in order to increase the resources made available to this account."
              trigger={(
                <span>
                  <Icon color="yellow" name="warning sign" />
                  {units} <span style={{ color: '#aaa' }}>{unit}</span>
                </span>
              )}
            />
          )
          : (
            <span>
              {units} <span style={{ color: '#aaa' }}>{unit}</span>
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
    resourceType: ownProps.type,
    settings: state.settings,
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourcePercent);
