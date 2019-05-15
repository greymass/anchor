// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Header,
  Table,
} from 'semantic-ui-react';
import { get } from "dot-prop-immutable";

class RexInterfaceLoans extends PureComponent<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.getCPULoans();
    actions.getNetLoans();
  }

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
      <React.Fragment>
        <Header
          content={t('rex_rent_loans_header')}
        />
        <Message
          content={[t('rex_rent_loans_warning')]}
          warning
        />
        <Table>
          <Table.Header>
            <Table.Column>
              {t('rex_rent_table_name')}
            </Table.Column>
            <Table.Column>
              {t('rex_rent_table_valid_until')}
            </Table.Column>
            <Table.Column />
            <Table.Column />
          </Table.Header>
          <Table.Body>
            {sortedLoans.map(loan => (
              <Table.Row>
                <Table.Column>
                  {loan.quantity}
                </Table.Column>
                <Table.Column>
                  {loan.type}
                </Table.Column>
                <Table.Column>
                  {(new Date(loan.expires_at)).utc}
                </Table.Column>
                <Table.Column>
                  <Button
                    color="green"
                    content={t('common:renew')}
                  />
                  </Table.Column>
                <Table.Column>
                  <Button
                    color="green"
                    content={t('common:remove')}
                  />
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default translate('rex')(RexInterfaceLoans);
