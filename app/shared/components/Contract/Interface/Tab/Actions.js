// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

import ContractInterfaceSelectorAction from '../Selector/Action';
import ContractInterfaceFormAction from '../Form/Action';

class ContractInterfaceTabActions extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      contract,
      contractAction,
      onChange,
      onSubmit,
      settings,
      system,
      transaction,
      unlocked,
    } = this.props;
    return (
      <React.Fragment>
        <ContractInterfaceSelectorAction
          contract={contract}
          contractAction={contractAction}
          onChange={onChange}
          onSubmit={onSubmit}
          system={system}
        />
        {(contractAction)
          ? (
            <Segment secondary>
              <ContractInterfaceFormAction
                actions={actions}
                blockExplorers={blockExplorers}
                connection={connection}
                contract={contract}
                contractAction={contractAction}
                settings={settings}
                system={system}
                transaction={transaction}
                unlocked={unlocked}
              />
            </Segment>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default withTranslation('contract')(ContractInterfaceTabActions);
