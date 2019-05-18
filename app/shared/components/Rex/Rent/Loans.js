// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Container,
  Header,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';
import { find } from 'lodash';

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
      actions.refreshloan(refreshingLoan);
    } else {
      actions.refundloan(refundingLoan);
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
    const cpuLoans =
      get(tables, `eosio.${escapedAccount}.cpuloan.rows`, [])
        .map(loan => ({ ...loan, type: 'cpu' }));
    const netLoans =
      get(tables, `eosio.${escapedAccount}.netloan.rows`, [])
        .map(loan => ({ ...loan, type: 'net' }));
    const allLoans = cpuLoans.concat(netLoans);
    const sortedLoans = allLoans.sort(loan => loan.createdAt)
    const loanBeingRefreshed = refreshingLoan && find(allLoans, { loan_num: refreshingLoan });
    const loanBeingRefunded = refundingLoan && find(allLoans, { loan_num: refundingLoan });

    console.log({allLoans});

    const confirming = refreshingLoan || refundingLoan;

    const expiresAtDateObject = loanBeingRefreshed && new Date(loanBeingRefreshed.expiration);

    if (expiresAtDateObject) {
      expiresAtDateObject.setDate(expiresAtDateObject.getDate() + 30);
    }

    const confirmationPage = confirming ? (
      <Segment basic loading={system.REFRESHLOANREX === 'PENDING' || system.REFUNDLOANREX === 'PENDING'}>
        <GlobalTransactionModal
          actionName={refreshingLoan ? 'REFRESHLOANREX' : 'REFUNDLOANREX'}
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <React.Fragment>
              {loanBeingRefreshed ? (
                <p>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_refresh_loan',
                      {
                        amount: loanBeingRefreshed.total_staked,
                        expiresAt: expiresAtDateObject.toString(),
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
                        amount: loanBeingRefunded.total_staked,
                        type: loanBeingRefunded.type,
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
        {sortedLoans.length === 0 ? (
          <Message>{t('rex_rent_loans_none')}</Message>
        ) : (
          <Table>
            <Table.Header>
              <Table.HeaderCell>
                {t('rex_rent_table_stake_amount')}
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
                <Table.Row>
                  <Table.Cell>
                    {loan.total_staked}
                  </Table.Cell>
                  <Table.Cell>
                    {loan.type}
                  </Table.Cell>
                  <Table.Cell>
                    {loan.expiration}
                  </Table.Cell>
                  <Table.Cell>
                    {(new Date(loan.expiration)).utc}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="green"
                      content={t('common:renew')}
                      onClick={() => this.setState({ refreshingLoan: loan.loan_num })}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      content={t('common:remove')}
                      onClick={() => this.setState({ refundingLoan: loan.loan_num })}
                    />
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

export default translate('rex')(RexInterfaceLoans);
