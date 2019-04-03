// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

import ReactJson from 'react-json-view';

import NavigationActions from '../../actions/navigation';
import URIActions from '../../../handler/actions/uri';

const { ipcRenderer } = require('electron');

class TestsContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  testURI = (uri) => {
    ipcRenderer.send('openUri', uri);
  }
  render() {
    const uris = {
      BEOS: [
        ['refund', 'eosio:gWPgZACDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
      BOS: [
        ['refund', 'eosio:gWNgYwCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
      EOS: [
        ['refund', 'eosio:gWNgZACDVwahIGrJyum7GKFCDDCaAy4AZAAA'],
        ['proxy greymassvote', 'eosio:gWNgZACDVwahBaKXOu-tMrrLCBVigNGCMMYCo7sS0i-vpjKAlAAA'],
        ['proxy greymassvote w/ foreground callback', 'eosio:gWNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mMjAyimSUlBQUW-nrpxelVuYmFhfrJefnMgAA'],
        ['proxy greymassvote w/ background callback', 'eosio:gWNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mMjAyimSUlBQUW-nrpxelVuYmFhfrJefnMgIA'],
        ['set voting permission', 'eosio:gWNgZGRkAIFXBqEMDqdvrcgJugoVYWCA0c4wBghseGl0F0SveGtkxAhWxDztS840vZjD1YqCj_WcJip5_dr06mGZgV_AhneH-I58dWQFKwMSAA'],
        ['link voting permission to eosio:voteproducer', 'eosio:gWNgZACDVwahQFI3m3l5NyNUiAFGK8AYMJUFopc6760yugvibnhpdBekAwA'],
        ['link voting permission to eosio:updateauth (wont allow)', 'eosio:gWNgZACDVwahQFI3m3l5NyNUiAFGK8AYcJUOp2-tyAm6CuJueGl0F6QDAA'],
        ['set active key (wont allow)', 'eosio:gWNgZGRkAIFXBqEMDqdvrcgJugoVYWCA0c4wBgiseGtkBKIbVqstZwQrYp72JWeaXszhakXBx3pOE5W8fm169bDMwC9gw7tDfEe-OrKClQEJAA'],
        ['set owner key (wont allow)', 'eosio:gWNgZGRkAIFXBqEMDqdvrcgJugoVYWCA0c4wBgg0rFZbzoCkgJGBedqXnGl6MYerFQUf6zlNVPL6tenVwzIDv4AN7w7xHfnqyApWBiQA'],
      ],
      INSIGHTS: [
        ['refund', 'eosio:gWPgYACDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
      JUNGLE: [
        ['refund', 'eosio:gWNgZgCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
      KYLIN: [
        ['refund', 'eosio:gWNgZACDVwahIGrJyum7GKFCDDCaAy4AZAAA'],
      ],
      MEETONE: [
        ['refund', 'eosio:gWNgZwCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
      TELOS: [
        ['refund', 'eosio:gWNgYgCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
      WORBLI: [
        ['refund', 'eosio:gWNgZQCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
      ],
    };
    return (
      <Segment style={{ margin: 0 }}>
        {Object.keys(uris).map((blockchain) => (
          <Segment basic>
            <Header content={blockchain} />
            {uris[blockchain].map(([desc, uri]) => (
              <div>
                <Button
                  color="blue"
                  content={desc}
                  onClick={() => this.testURI(uri)}
                />
                {uri}
              </div>
            ))}
          </Segment>
        ))}
        <Segment basic>
          <Header>
            action (single)
          </Header>
          <Segment>
            <p>eosio:gWPgYACDVwahBaKXOu-tMrrLyAgRYoDRgjDGA-u9osFLF_QxgJQAAA</p>
            <Button
              color="blue"
              content="EOS URI Test (set proxy)"
              onClick={() => this.testURI('eosio:gWPgYACDVwahBaKXOu-tMrrLyAgRYoDRgjDGA-u9osFLF_QxgJQAAA')}
            />
          </Segment>
          <Segment>
            <p>eosio:gWN8zrVqx8w62T9P-_evaTi9u__Nm-qZ52doTXFRt9mTckSkmAEMXhmEFohe6ry3yuguIyNEiAFGC8IYD6z3igYvXdDHAFICAA</p>
            <Button
              color="blue"
              content="Telos URI Test (set proxy)"
              onClick={() => this.testURI('eosio:gWN8zrVqx8w62T9P-_evaTi9u__Nm-qZ52doTXFRt9mTckSkmAEMXhmEFohe6ry3yuguIyNEiAFGC8IYD6z3igYvXdDHAFICAA')}
            />
          </Segment>
        </Segment>
        <Segment basic>
          <Segment>
            <p>eosio:gWNgZACDVwahIGrJyum7GKFCDDCaAy4AZAAA</p>
            <Button
              color="blue"
              content="EOS URI (action)"
              onClick={() => this.testURI('eosio:gWNgZACDVwahIGrJyum7GKFCDDCaAy4AZAAA')}
            />
          </Segment>
          <Segment>
            <p>eosio:gWNgZGRkAIFXBqEgasnK6bugIgwMMJoDLgBkAAA</p>
            <Button
              color="blue"
              content="EOS URI (action[] - multi)"
              onClick={() => this.testURI('eosio:gWNgZGRkAIFXBqEgasnK6bugIgwMMJoDLgBkAAA')}
            />
          </Segment>
          <Segment>
            <p>eosio:gWNgZFoYOi-m6p4oQ91nBiBgBBEMrwxCQdSSldN3MUJEYDIMDBwwBgNICgA</p>
            <Button
              color="blue"
              content="EOS URI (tx - whole)"
              onClick={() => this.testURI('eosio:gWNgZFoYOi-m6p4oQ91nBiBgBBEMrwxCQdSSldN3MUJEYDIMDBwwBgNICgA')}
            />
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    auths: state.auths,
    connection: state.connection,
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...URIActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestsContainer));
