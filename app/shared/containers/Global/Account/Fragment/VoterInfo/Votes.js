// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Popup } from 'semantic-ui-react';

class GlobalAccountFragmentVoterInfoVotes extends PureComponent<Props> {
  render() {
    const {
      producers,
      votes,
    } = this.props;
    const sorted = producers.sort();
    if (votes === 0) return votes;
    return (
      <React.Fragment>
        <Popup
          content={
            <span>
              {sorted.join(', ')}
            </span>
          }
          hoverable
          position="right center"
          trigger={(<div>{votes}</div>)}
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  let proxy;
  let voter = get(state, `accounts.${account}.voter_info`, {});
  let producers = [];
  let votes = 0;
  if (voter) {
    ({ producers } = voter);
    // The get call above will return null as a retrieved value, and if so, set to {}
    if (voter === null) {
      voter = {};
    }
    // Overwrite local account if proxy is set
    if (voter.proxy) {
      ({ proxy } = voter);
      proxy = proxy.replace('.', '\\.');
      voter = get(state, `accounts.${proxy}.voter_info`, {});
      ({ producers } = voter);
    }
    votes = get(voter, 'producers', []).length;
  }
  return ({
    producers,
    proxy,
    votes,
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentVoterInfoVotes);
