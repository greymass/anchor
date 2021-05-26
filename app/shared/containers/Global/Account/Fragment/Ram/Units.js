// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

class GlobalAccountFragmentResourceUnits extends PureComponent<Props> {
  render() {
    const {
      max,
      settings,
      used,
    } = this.props;
    if (!max || !used) return false;
    const units = ((max - used) / 1000).toFixed(3);
    const el = (
      <span>
        {units} kb
      </span>
    );
    return (
      <React.Fragment>
        {(units < 1)
          ? (
            <Popup
              content="This resource is running low. Consider buying more RAM in order to increase the capacity of this account."
              trigger={(
                <span>
                  <Icon color="yellow" name="warning sign" />
                  {el}
                </span>
              )}
            />
          )
          : el
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  return {
    used: get(state.accounts, `${account}.ram_usage`),
    max: get(state.accounts, `${account}.ram_quota`),
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourceUnits);
