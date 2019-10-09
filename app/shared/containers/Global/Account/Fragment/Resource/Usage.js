// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');
const humanizeDuration = require('humanize-duration')

class GlobalAccountFragmentResourceUsage extends PureComponent<Props> {
  render() {
    const {
      resource,
      settings,
    } = this.props;
    if (!resource) return false;
    const percent = ((resource.available / resource.max) * 100).toFixed(2);
    let el = false;
    const options = {
      maxDecimalPoints: 3,
      largest: 2,
    }
    switch (this.props.type) {
      case 'cpu':
        el = (
          <span>
            {humanizeDuration(((resource.max - resource.available) / 1000), options)}
          </span>
        );
        break;
      case 'net':
        el = (
          <span>
            {prettyBytes(resource.max - resource.available)}
          </span>
        );
        break;
      default:
        break;
    }
    return (
      <React.Fragment>
        {(percent < 5)
          ? (
            <Popup
              content="This resource is running low. Consider staking more tokens in order to increase the resources made available to this account."
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
    resource: get(state.accounts, `${account}.${ownProps.type}_limit`),
    settings: state.settings,
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourceUsage);
