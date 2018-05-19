// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';

import ProducersTable from './Producers/Table';

type Props = {
  actions: {
    getAccount: () => void,
    getProducers: () => void
  },
  accounts: {},
  producers: {}
};

export default class Producers extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      account: 'longshotxxxx',
      key: '5wifkey'
    };
  }

  componentDidMount() {
    this.getProducers();
    if (this.state.account) {
      this.getAccount();
    }
    this.interval = setInterval(this.getProducers.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getAccount = () => {
    const { account } = this.state;
    const { getAccount } = this.props.actions;
    getAccount(account);
  }

  getProducers = () => {
    const { getProducers } = this.props.actions;
    getProducers();
  }

  close = () => {
    window.close();
  }

  onInputChange = (e, { name, value }) => this.setState({ [name]: value });

  onSubmit = () => {

  };

  test = () => {
    // Eos = require('eosjs')
    // const keyProvider = [
    //   '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'  // eosio
    // ];
    // eos = Eos.Localnet({keyProvider});
    // // cleos push action eosio.token issue '{"to":"bob", "quantity":"100.0000 EOS", "memo":"issue to bob"}' -p eosio
    // eos.transaction({
    //   actions: [
    //     {
    //       account: 'eosio.token',
    //       name: 'issue',
    //       authorization: [{
    //         actor: 'eosio',
    //         permission: 'active'
    //       }],
    //       data: {
    //         to: 'bob',
    //         quantity: '100.0000 EOS',
    //         memo: 'issue to bob'
    //       }
    //     }
    //   ]
    // });
  }

  render() {
    const {
      account,
      key
    } = this.state;
    const {
      accounts,
      producers
    } = this.props;
    return (
      <I18n ns="basic">
        {
          (t) => (
            <div style={{ margin: '2px' }}>
              <Segment
                attached="top"
                color="black"
                inverted
                textAlign="left"
                style={{ WebkitAppRegion: 'drag' }}
              >
                <Header>
                  {t('title')}
                </Header>
              </Segment>
              <Segment attached>
                <Form onSubmit={this.onSubmit}>
                  <div>
                    Account: <Input name="account" onChange={this.onInputChange} value={account} />
                  </div>
                  <div>
                    WIF Key: <Input name="key" onChange={this.onInputChange} value={key} />
                  </div>
                  <Button>
                    Add
                  </Button>
                </Form>
              </Segment>
              {(producers.list.length > 0)
                ? <ProducersTable producers={producers} />
                : "Loading"
              }
            </div>
          )
        }
      </I18n>
    );
  }
}
