// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');
const humanizeDuration = require('humanize-duration')

class GlobalAccountFragmentRamMax extends PureComponent<Props> {
  render() {
    const {
      max,
      settings,
      used,
    } = this.props;
    if (!max || !used) return false;
    const percent = (((parseInt(max, 10) - parseInt(used, 10)) / parseInt(max, 10)) * 100).toFixed(1);
    const el = (
      <span>
        {prettyBytes(parseInt(max, 10))}
      </span>
    );
    return (
      <React.Fragment>
        {(percent < 5)
          ? (
            <Popup
              content="This resource is running low. Consider buying more RAM in order to increase the capacity of this account."
              trigger={el}
            />
          )
          : el
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  return {
    used: get(state.accounts, `${account}.ram_usage`),
    max: get(state.accounts, `${account}.ram_quota`),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamMax);
