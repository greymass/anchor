// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Icon, Header, List, Segment } from 'semantic-ui-react';
import { isEmpty, sum, sumBy } from 'lodash';

import { retryWithFee } from '../../../../../actions/fuel';

class GlobalTransactionMessageErrorResourceUsage extends PureComponent<Props> {
  tryWithFee = () => {
    const { fuel, system } = this.props;
    this.props.actions.retryWithFee(system.latestFailure, fuel.alternative.request);
  }
  render() {
    const {
      fuel,
      system,
      t
    } = this.props;
    const canProceedWithFee = (fuel && fuel.alternative && fuel.alternative.request && fuel.alternative.request.code === 402);
    return (
      <Segment basic>
        <Header
          content="Transaction Fee"
          icon="stop"
          size="large"
          subheader="Your account lacks the network resources for this transaction and it cannot be covered for free."
        />
        <Segment basic size="large" textAlign="center">
          <p>To perform this transaction you will either need to pay a fee or visit the Resources section of the wallet to manage your own resources.</p>
          <Button
            content={`Accept Fee of ${fuel.alternative.request.data.fee}`}
            onClick={this.tryWithFee}
            primary
            size="large"
          />
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  fuel: state.fuel,
  system: state.system,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      retryWithFee
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalTransactionMessageErrorResourceUsage);
