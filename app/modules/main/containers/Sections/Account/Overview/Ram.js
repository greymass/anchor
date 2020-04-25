// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Button, Container, Grid, Header, Progress, Segment, Table } from 'semantic-ui-react';

import AccountOverviewRamBuy from './Ram/Buy';
import AccountOverviewRamSell from './Ram/Sell';

import GlobalAccountFragmentRamPercent from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Percent';
import GlobalAccountFragmentRamPrice from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Price';
import GlobalAccountFragmentRamProgress from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Progress';
import GlobalAccountFragmentRamUsage from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Usage';
import GlobalAccountFragmentRamMax from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Max';
import GlobalAccountFragmentRamValue from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Value';

class AccountOverviewRam extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  toggleExpand = () => this.setState({
    expanded: !this.state.expanded
  });
  render() {
    const {
      account,
      connection,
      settings,
      t,
    } = this.props;
    const resource = 'ram';
    const {
      expanded,
    } = this.state;
    return (
      <Segment>
        <Grid divided fluid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header size="large" textAlign="center">
                <Header.Content>
                  RAM
                  <Header.Subheader
                    style={{
                      marginTop: '0.35em',
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: t('main_sections_overview_ram_subheader')
                      }}
                    />
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={7}>
                    <Header textAlign="center">
                      <GlobalAccountFragmentRamPercent
                        account={account}
                      />
                      <Header.Subheader>
                        {(settings.displayResourcesAvailable)
                          ? 'Available '
                          : 'Used '
                        }
                        {resource.toUpperCase()}
                      </Header.Subheader>
                    </Header>
                    <Segment basic style={{ padding: 0 }}>
                      <GlobalAccountFragmentRamProgress
                        account={account}
                        size="tiny"
                        style={{ marginBottom: 0 }}
                        type={resource}
                      />
                      <Table
                        definition
                        size="small"
                        style={{
                          display: (expanded ? 'table' : 'none'),
                          marginBottom: 0,
                        }}
                        unstackable
                      >
                        <Table.Row>
                          <Table.Cell collapsing>Used</Table.Cell>
                          <Table.Cell>
                            <GlobalAccountFragmentRamUsage
                              account={account}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell collapsing>Allowed</Table.Cell>
                          <Table.Cell>
                            <GlobalAccountFragmentRamMax
                              account={account}
                              type={resource}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column
                    textAlign="center"
                    verticalAlign="top"
                    width={2}
                  >
                    <Button
                      basic
                      icon={`angle double ${(expanded ? 'up' : 'down')}`}
                      name={resource}
                      onClick={this.toggleExpand}
                      size="small"
                      style={{
                        marginTop: '5.25em'
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Header textAlign="center">
                      <GlobalAccountFragmentRamMax
                        account={account}
                      />
                      <Header.Subheader>
                        {t('main_sections_overview_ram_grid_subheader')}
                      </Header.Subheader>
                    </Header>
                    <Progress
                      percent={100}
                      size="tiny"
                      style={{ marginBottom: 0 }}
                    />
                    <Table
                      definition
                      size="small"
                      style={{
                        display: (expanded ? 'table' : 'none'),
                        marginBottom: 0,
                      }}
                      unstackable
                    >
                      <Table.Row>
                        <Table.Cell collapsing>{t('main_sections_overview_ram_table_cell_one')}</Table.Cell>
                        <Table.Cell>
                          <GlobalAccountFragmentRamValue
                            account={account}
                            precision={4}
                          />
                          {` ${connection.chainSymbol}`}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell collapsing>{t('main_sections_overview_ram_table_cell_two')}</Table.Cell>
                        <Table.Cell>
                          <GlobalAccountFragmentRamPrice
                            precision={8}
                          />
                          {` ${connection.chainSymbol}`}/byte
                        </Table.Cell>
                      </Table.Row>
                    </Table>
                    <Container
                      fluid
                      style={{
                        marginTop: '1em'
                      }}
                    >
                      <AccountOverviewRamBuy
                        account={account}
                      />
                      <AccountOverviewRamSell
                        account={account}
                      />
                    </Container>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withTranslation('main'),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountOverviewRam);
