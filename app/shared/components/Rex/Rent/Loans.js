// @flow
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Header,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';

import GlobalTransactionModal from '../../Global/Transaction/Modal';

class RexInterfaceLoans extends PureComponent<Props> {
  state = {};

  componentDidMount() {
    const { actions } = this.props;

    actions.getCPULoans();
    actions.getNETLoans();
  }

  confirmTransaction = () => {
    const { actions } = this.props;
    const { refreshingLoan, refundingLoan } = this.state;
    if (refreshingLoan) {
      if (refreshingLoan.type === 'cpu') {
        actions.fundcpuloan(refreshingLoan.loan_num, refreshingLoan.payment);
      } else {
        actions.fundnetloan(refreshingLoan.loan_num, refreshingLoan.payment);
      }
    } else if (refundingLoan.type === 'cpu') {
      actions.defundcpuloan(refundingLoan.loan_num, refundingLoan.balance);
    } else {
      actions.defundnetloan(refundingLoan.loan_num, refundingLoan.balance);
    }
  };

  onClose = () => {
    this.props.actions.clearSystemState();

    this.setState({
      refreshingLoan: undefined,
      refundingLoan: undefined,
    });
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

    const escapedAccount = settings.account.replace(/\./g, '\\.');
    const cpuLoans =
      get(tables, `eosio.${escapedAccount}.cpuloan.rows`, [])
        .map(loan => ({ ...loan, type: 'cpu' }));
    const netLoans =
      get(tables, `eosio.${escapedAccount}.netloan.rows`, [])
        .map(loan => ({ ...loan, type: 'net' }));
    const allLoans = cpuLoans.concat(netLoans);
    const sortedLoans = allLoans.sort(loan => loan.createdAt);

    const confirming = refreshingLoan || refundingLoan;

    const expiresAtDateObject = refreshingLoan && new Date(refreshingLoan.expiration);

    if (expiresAtDateObject) {
      expiresAtDateObject.setDate(expiresAtDateObject.getDate() + 30);
    }

    const confirmationPage = confirming ? (
      <Segment
        basic
        loading={
          system.FUNDCPULOANREX === 'PENDING' ||
          system.FUNDNETLOANREX === 'PENDING' ||
          system.DEFUNDCPULOANREX === 'PENDING' ||
          system.DEFUNDNETLOANREX === 'PENDING'
        }
      >
        <GlobalTransactionModal
          actionName={
            refreshingLoan && refreshingLoan.type === 'cpu' ?
              'FUNDCPULOANREX' : refreshingLoan ?
              'FUNDNETLOANREX' : refundingLoan.type === 'cpu' ?
              'DEFUNDCPULOANREX' :
                'DEFUNDNETLOANREX'
          }
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
                        amount: refreshingLoan.total_staked,
                        payment: refreshingLoan.payment,
                        type: refreshingLoan.type,
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
                        amount: refundingLoan.total_staked,
                        type: refundingLoan.type,
                      }
                    )
                  }
                </p>
              )}
              <Container>
                <Button
                  content={t('common:cancel')}
                  onClick={this.onClose}
                  textAlign="left"
                />
                <Button
                  color="green"
                  content={t('common:confirm')}
                  disabled={
                    system.FUNDCPULOANREX ||
                    system.FUNDNETLOANREX ||
                    system.DEFUNDCPULOANREX ||
                    system.DEFUNDNETLOANREX
                  }
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
        {sortedLoans.length === 0 ? (
          <Message>{t('rex_rent_loans_none')}</Message>
        ) : (
          <Table>
            <Table.Header>
              <Table.HeaderCell>
                {t('rex_rent_table_stake_amount')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('rex_rent_table_funded_balance')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('rex_rent_table_type')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('rex_rent_table_expires')}
              </Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Header>
            <Table.Body>
              {sortedLoans.map(loan => (
                <Table.Row key={loan.loan_num}>
                  <Table.Cell>
                    {loan.total_staked}
                  </Table.Cell>
                  <Table.Cell>
                    {loan.balance}
                  </Table.Cell>
                  <Table.Cell>
                    {loan.type}
                  </Table.Cell>
                  <Table.Cell>
                    {loan.expiration}
                  </Table.Cell>
                  <Table.Cell>
                    {(new Date(loan.expiration).utc)}
                  </Table.Cell>
                  <Table.Cell>
                    {loan.balance === '0.0000 EOS' ? (
                      <Button
                        color="green"
                        content={t('rex_rent_button_fund_renewal')}
                        onClick={() => this.setState({ refreshingLoan: loan })}
                      />
                    ) : (
                      <Button
                        color="yellow"
                        content={t('rex_rent_button_defund_renewal')}
                        onClick={() => this.setState({ refundingLoan: loan })}
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Segment>
    );
  }
}

export default withTranslation('rex')(RexInterfaceLoans);
