// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

class GlobalAccountFragmentRamPercent extends PureComponent<Props> {
  render() {
    const {
      used,
      max,
    } = this.props;
    if (!max) return false;
    const percent = (((max - used) / max) * 100).toFixed(2);
    return (
      <React.Fragment>
        {(percent < 5)
          ? (
            <Popup
              content="This specific resource is currently running low. Consider either purchasing more RAM or freeing up some existing RAM used by various smart contracts."
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
  used: get(state.accounts, `${ownProps.account}.ram_usage`),
  max: get(state.accounts, `${ownProps.account}.ram_quota`),
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamPercent);
