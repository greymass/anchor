// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Header,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';
import { find } from 'lodash';
import GlobalTransactionModal, { Container } from './Manage';

class RexInterfaceLoans extends PureComponent<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.getCPULoans();
    actions.getNETLoans();
  }

  confirmTransaction = () => {
    const { actions } = this.props;
    const { refreshingLoan, refundingLoan } = this.state;
    if (refreshingLoan) {
      actions.refreshLoan(refreshingLoan);
    } else {
      actions.refundLoan(refundingLoan);
    }
  };

  render() {
    const {
      actions,
      blockExplorers,
      contract,
      settings,
      system,
      tables,
      transaction,
      t
    } = this.props;

    const {
      refreshingLoan,
      refundingLoan,
    } = this.state;

    const escapedAccount = settings.account.replace('.', '\\.');
    const cpuLoans = get(tables, `eosio.eosio.cpuloans.${escapedAccount}.rows`, []);
    const netLoans = get(tables, `eosio.eosio.netloans.${escapedAccount}.rows`, []);

    const allLoans = cpuLoans.concat(netLoans);
    const sortedLoans = allLoans.sort(loan => loan.createdAt);
    const loanBeingRefreshed = refreshingLoan && find(allLoans, { id: refreshingLoan });
    const loanBeingRefunded = refreshingLoan && find(allLoans, { id: refreshingLoan });

    console.log({allLoans});

    const confirming = refreshingLoan || refundingLoan;

    const confirmationPage = confirming ? (
      <Segment basic loading={system.REFRESHLOANREX === 'PENDING' || system.REFUNDLOANREX === 'PENDING'}>
        <GlobalTransactionModal
          actionName={refreshingLoan ? 'REFRESHLOANREX' : 'REFUNDLOANREX'}
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <React.Fragment>
              {refreshingLoan ? (
                <p>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_refresh_loan',
                      {
                        amount: loanBeingRefreshed.amount,
                        expiresAt: (loanBeingRefreshed.expires_at + 30.days).utc,
                        type: loanBeingRefreshed.type,
                      }
                    )
                  }
                </p>
              ) : (
                <p>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_refund_loan',
                      {
                        amount: loanBeingRefunded.amount,
                        type: loanBeingRefreshed.type,
                      }
                    )
                  }
                </p>
              )}
              <Container>
                <Button
                  content={t('common:cancel')}
                  onClick={() => this.setState({
                    refreshingLoan: undefined,
                    refundingLoan: undefined,
                  })}
                  textAlign="left"
                />
                <Button
                  color="green"
                  content={t('common:confirm')}
                  disabled={system.REFRESHLOANREX || system.REFUNDLOANREX}
                  floated="right"
                  onClick={this.confirmTransaction}
                  textAlign="right"
                />
              </Container>
            </React.Fragment>
          )}
          contract={contract}
          onClose={this.onClose}
          onSubmit={this.onSubmit}
          open
          settings={settings}
          system={system}
          title={t('rex_interface_rent_resources_confirmation_modal_header')}
          transaction={transaction}
        />
      </Segment>
    ) : '';

    return (
      <Segment basic>
        {confirming && confirmationPage}
        <Header
          content={t('rex_rent_loans_header')}
        />
        <Message
          content={[t('rex_rent_loans_warning')]}
          warning
        />
        <Table>
          <Table.Header>
            <Table.HeaderCell>
              {t('rex_rent_table_name')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('rex_rent_table_expires')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Header>
          <Table.Body>
            {sortedLoans.map(loan => (
              <Table.Row>
                <Table.Cell>
                  {loan.quantity}
                </Table.Cell>
                <Table.Cell>
                  {loan.type}
                </Table.Cell>
                <Table.Cell>
                  {(new Date(loan.expires_at)).utc}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="green"
                    content={t('common:renew')}
                    onClick={() => this.setState({ refreshingLoan: loan.id })}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="green"
                    content={t('common:remove')}
                    onClick={() =>  this.setState({ refundingLoan: loan.id })}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceLoans);
