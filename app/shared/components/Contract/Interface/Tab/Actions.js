// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

import ContractInterfaceSelectorAction from '../Selector/Action';
import ContractInterfaceFormAction from '../Form/Action';

class ContractInterfaceTabActions extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      contract,
      contractAction,
      onChange,
      onSubmit,
      settings,
      system,
      transaction
    } = this.props;
    return (
      <React.Fragment>
        <ContractInterfaceSelectorAction
          contract={contract}
          contractAction={contractAction}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {(contractAction)
          ? (
            <Segment secondary>
              <ContractInterfaceFormAction
                actions={actions}
                blockExplorers={blockExplorers}
                contract={contract}
                contractAction={contractAction}
                settings={settings}
                system={system}
                transaction={transaction}
              />
            </Segment>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceTabActions);
