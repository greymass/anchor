// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Popup } from 'semantic-ui-react';

class GlobalAccountFragmentResourceUsage extends PureComponent<Props> {
  render() {
    const {
      resource,
    } = this.props;
    if (!resource) return false;
    const percent = ((resource.available / resource.max) * 100).toFixed(2);
    let el = false;
    switch (this.props.type) {
      case 'cpu':
        el = (
          <span>
            {((resource.max - resource.available) / 1000)}
          </span>
        );
        break;
      case 'net':
        el = (
          <span>
            {(resource.max - resource.available) / 1000}
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
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourceUsage);
