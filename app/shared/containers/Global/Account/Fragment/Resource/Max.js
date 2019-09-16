// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');
const humanizeDuration = require('humanize-duration')

class GlobalAccountFragmentResourceMax extends PureComponent<Props> {
  render() {
    const {
      resource,
      settings,
    } = this.props;
    if (!resource) return false;
    const percent = ((parseInt(resource.available, 10) / parseInt(resource.max, 10)) * 100).toFixed(2);
    let valid;
    try {
      valid = parseInt(resource.max, 10);
    } catch (e) {
      console.log(e)
      console.log(valid)
    }
    let el = false;
    const options = {
      maxDecimalPoints: 3,
      largest: 2,
    }
    switch (this.props.type) {
      case 'cpu':
        el = (
          <span>
            {humanizeDuration((parseInt(resource.max, 10) / 1000), options)}
          </span>
        );
        break;
      case 'net':
        el = (
          <span>
            {prettyBytes(parseInt(resource.max, 10))}
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
              content="This specific resource is currently running low. Consider staking more in order to increase the account resources to avoid any potential interruptions in its actions."
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
)(GlobalAccountFragmentResourceMax);
