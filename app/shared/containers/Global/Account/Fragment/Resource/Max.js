// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Popup } from 'semantic-ui-react';

class GlobalAccountFragmentResourceMax extends PureComponent<Props> {
  render() {
    const {
      resource,
    } = this.props;
    if (!resource) return false;
    const percent = ((
      parseInt(resource.available, 10) / parseInt(resource.max, 10)
    ) * 100).toFixed(2);
    let el = false;
    switch (this.props.type) {
      case 'cpu':
        el = (
          <span>
            {parseInt(resource.max, 10) / 1000} ms
          </span>
        );
        break;
      case 'net':
        el = (
          <span>
            {parseInt(resource.max, 10) / 1000} kb
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
              content="This resource is running low. Consider renting more if you plan to use this account soon."
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
  const account = ownProps.account.replace(/\./g, '\\.');
  return {
    resource: get(state.accounts, `${account}.${ownProps.type}_limit`),
    settings: state.settings,
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourceMax);
