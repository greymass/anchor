// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Header, Segment } from 'semantic-ui-react';

import NavigationActions from '../../actions/navigation';
import URIActions from '../../../handler/actions/uri';

const { ipcRenderer } = require('electron');

const uris = {
  // BEOS: [
  //   ['refund', 'esr:gWPgZACDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
  // BOS: [
  //   ['refund', 'esr:gWNgYwCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
  EOS: [
    [
      'proxy, broadcast',
      'esr:gmNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mgmQA'
    ],
    [
      'proxy, fuel, broadcast',
      'esr:gmNgZGQK0JwrIf3yaioDCAA5jAJT4-ACPs8MXMESDK8MQgtEL3XeW2V0l5ERIsQAowVhjAVGdyFagQIA'
    ],
    [
      'proxy, broadcast, background callback',
      'esr:gmNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mMjBbZ5SUFBRb6esnJ-kl5iVn5Bfp5WTmZesnG5slG1mYpuqaWyRa6poYphrrWhikpOqaWZqZpZgZGicmGycyAAA'
    ],
    [
      'proxy, no broadcast, background callback',
      'esr:gmNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mMjBZZ5SUFBRb6esnJ-kl5iVn5Bfp5WTmZesnG5slG1mYpuqaWyRa6poYphrrWhikpOqaWZqZpZgZGicmGycyAAA'
    ],
    [
      'proxy, fuel, broadcast, background callback',
      'esr:gmNgZGQK0JwrIf3yaioDCAA5jAJT4-ACPs8MXMESDK8MQgtEL3XeW2V0l5ERIsQAowVhjAVGdyFama0zSkoKiq309ZOT9BLzkjPyi_RyMvOy9ZONzZKNLExTdc0tEi11TQxTjXUtDFJSdc0szcxSzAyNE5ONExkA'
    ],
    [
      'proxy, fuel, no broadcast, background callback',
      'esr:gmNgZGQK0JwrIf3yaioDCAA5jAJT4-ACPs8MXMESDK8MQgtEL3XeW2V0l5ERIsQAowVhjAVGdyFamawzSkoKiq309ZOT9BLzkjPyi_RyMvOy9ZONzZKNLExTdc0tEi11TQxTjXUtDFJSdc0szcxSzAyNE5ONExkA'
    ],
    [
      'proxy, broadcast, foreground callback',
      'esr:gmNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mMjBaZ5SUFBRb6esnJ-kl5iVn5Bfp5WTmZesnG5slG1mYpuqaWyRa6poYphrrWhikpOqaWZqZpZgZGicmGycyAAA'
    ],
    [
      'proxy, no broadcast, foreground callback',
      'esr:gmNgZGRkAIFXBqEFopc6760yugsVYWCA0YIwxgKjuxLSL6-mMjBYZ5SUFBRb6esnJ-kl5iVn5Bfp5WTmZesnG5slG1mYpuqaWyRa6poYphrrWhikpOqaWZqZpZgZGicmGycyAAA'
    ],
    [
      'proxy, fuel, broadcast, foreground callback',
      'esr:gmNgZGQK0JwrIf3yaioDCAA5jAJT4-ACPs8MXMESDK8MQgtEL3XeW2V0l5ERIsQAowVhjAVGdyFaGa0zSkoKiq309ZOT9BLzkjPyi_RyMvOy9ZONzZKNLExTdc0tEi11TQxTjXUtDFJSdc0szcxSzAyNE5ONExkA'
    ],
    [
      'proxy, fuel, no broadcast, foreground callback',
      'esr:gmNgZGQK0JwrIf3yaioDCAA5jAJT4-ACPs8MXMESDK8MQgtEL3XeW2V0l5ERIsQAowVhjAVGd6FarTNKSgqKrfT1k5P0EvOSM_KL9HIy87L1k43Nko0sTFN1zS0SLXVNDFONdS0MUlJ1zSzNzFLMDI0Tk40TGQA'
    ],
  ],
  // INSIGHTS: [
  //   ['refund', 'esr:gWPgYACDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
  // JUNGLE: [
  //   ['refund', 'esr:gWNgZgCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
  // KYLIN: [
  //   ['refund', 'esr:gWNgZACDVwahIGrJyum7GKFCDDCaAy4AZAAA'],
  // ],
  // MEETONE: [
  //   ['refund', 'esr:gWNgZwCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
  // TELOS: [
  //   ['refund', 'esr:gWNgYgCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
  // WORBLI: [
  //   ['refund', 'esr:gWNgZQCDVwahIGrJyum7GBkhQgwwmgMuAGQAAA'],
  // ],
};

class TestsContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  testURI = (uri) => {
    ipcRenderer.send('openUri', uri);
  };
  render() {
    return (
      <Segment style={{ margin: 0 }}>
        <Header
          content="EOSIO Signing Request - Tests"
          size="large"
        />
        {Object.keys(uris).map((blockchain) => (
          <Segment basic>
            <Header content={blockchain} />
            {uris[blockchain].map(([desc, uri]) => (
              <Segment attached>
                <p>{uri}</p>
                <Button
                  color="blue"
                  content={desc}
                  onClick={() => this.testURI(uri)}
                />
              </Segment>
            ))}
          </Segment>
        ))}
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TestsContainer);
