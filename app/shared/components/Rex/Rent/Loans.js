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

class RexInterfaceLoans extends PureComponent<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.getCPULoans();
    actions.getNetLoans();
  }

  refreshLoan = () => {
    const { actions } = this.props;
    const { refreshingLoan } = this.state;

    actions.refreshLoan(refreshingLoan);
  };

  refundLoan = () => {
    const { actions } = this.props;
    const { refundingLoan } = this.state;

    actions.refundLoan(refundingLoan);
  };

  render() {
    const {
      settings,
      tables,
      t
    } = this.props;

    const escapedAccount = settings.account.replace('.', '\\.');
    const cpuLoans = get(tables, `eosio.eosio.cpuloans.${escapedAccount}.rows`, []);
    const netLoans = get(tables, `eosio.eosio.netloans.${escapedAccount}.rows`, []);

    const allLoans = cpuLoans.concat(netLoans);
    console.log({allLoans})
    const sortedLoans = allLoans.sort(loan => loan.createdAt)

    return (
      <Segment basic>
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
              {t('rex_rent_table_valid_until')}
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
                    onClick={this.refreshLoan}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="green"
                    content={t('common:remove')}
                    onClick={this.refundLoan}
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
