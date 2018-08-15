// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Confirm,
  Header,
  Message,
  Table,
} from 'semantic-ui-react';

import { sortBy } from 'lodash';

import ToolsModalDelegation from './Modal/Delegation';

class ToolsDelegations extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      delegationToEdit: null,
      openModal: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions
    } = this.props;

    actions.getDelegations();
  }

  onOpenModal = (delegation) => this.setState({ openModal: true, delegationToEdit: delegation });

  onCloseModal = () => this.setState({ openModal: false });

  onSuccess = (message) => {
    this.setState({
      openModal: false,
      successMessage: message || 'tools_contacts_success_add'
    });
  }

  render() {
    const {
      actions,
      blockExplorers,
      delegations,
      t
    } = this.props;

    const {
      confirmDelete,
      delegationToEdit,
      delegationToRemove,
      openModal,
      successMessage
    } = this.state;

    const delegationsToDisplay = sortBy(delegations, 'accountName');

    return (
      <React.Fragment>
        <Header>
          {t('tools_delegation_header_text')}
        </Header>
        <ToolsModalDelegation
          open={openModal}
          actions={actions}
          blockExplorers={blockExplorers}
          delegationToEdit={delegationToEdit}
          delegationToRemove={delegationToRemove}
          onClose={this.onCloseModal}
        />

        {(successMessage)
          ? (
            <Message
              content={t(successMessage)}
              success
            />
          ) : <br />}

        {(!delegations || delegations.length === 0)
          ? (
            <Message
              content={t('tools_delegations_none')}
              warning
            />
          ) : (
            <div>
              <br />
              <Table>
                <Table.Header>
                  <Table.Row key="tools_contacts_headers">
                    <Table.HeaderCell width="3">
                      {t('tools_contacts_contact_account_name')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('tools_contacts_contact_label')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('tools_contacts_contact_default_memo')}
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {delegationsToDisplay.map((delegation) => (
                    <Table.Row>
                      <Table.Cell>
                        {delegation.accountName}
                      </Table.Cell>
                      <Table.Cell>
                        {delegation.label}
                      </Table.Cell>
                      <Table.Cell>
                        {delegation.defaultMemo}
                      </Table.Cell>
                      <Table.Cell width="2">
                        <Button
                          content={t('tools_delegation_button_edit')}
                          icon="address book"
                          fluid
                          onClick={() => this.onOpenModal(delegation)}
                          size="mini"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="red"
                          fluid
                          icon="minus circle"
                          onClick={() => {
                            this.setState({
                              confirmDelete: true,
                              delegationToConfirmForDeletion: delegation
                            });
                          }}
                          size="mini"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Confirm
                content={t('tools_delegations_confirm_delete_text')}
                open={confirmDelete}
                onCancel={() => {
                  this.setState({ confirmDelete: false });
                }}
                onConfirm={() => {
                  const {
                    delegationToConfirmForDeletion
                  } = this.state;

                  actions.setState({
                    delegationToDelete: delegationToConfirmForDeletion
                  });
                }}
              />
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsDelegations);
