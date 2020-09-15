// @flow
import React, { Component } from 'react';
import debounceRender from 'react-debounce-render';
import { withTranslation } from 'react-i18next';
import { defer, filter, isEmpty, map, orderBy, remove, sum, uniqBy } from 'lodash';

import { Header, Segment } from 'semantic-ui-react';

import ToolsPingControls from './Ping/Controls';
import ToolsPingHeader from './Ping/Header';
import ToolsPingLoader from './Ping/Loader';
import ToolsPingResults from './Ping/Results';

const initialState = {
  actualRequests: 0,
  endpoints: [],
  estimatedRequests: 0,
  estimatedPercent: 0,
  pass: 0,
  results: [],
  run: false,
  showUnsupported: false,
  totalRequests: 0,
  totalRequestsInPass: 0,
};

class ToolsPing extends Component<Props> {
  constructor(props) {
    super(props);
    const { actions, producers } = props;
    if (producers.producersInfo !== {}) {
      actions.getProducersInfo();
    }
    this.state = Object.assign({}, initialState, {
      estimatedRequests: props.ping.estimated,
      results: props.ping.results,
    });
  }
  static getDerivedStateFromProps(props, state) {
    let derived = {};
    if (props.settings.node !== state.node) {
      derived = Object.assign({}, derived, {
        node: props.settings.node
      });
    }
    if (state.run && props.ping && props.ping.results && props.ping.results.length > 0) {
      const success = sum(map(props.ping.results, 'success'));
      const failure = sum(map(props.ping.results, 'failure'));
      const attempts = success + failure;
      if (attempts !== state.actualRequests) {
        derived = Object.assign({}, derived, {
          actualRequests: attempts,
          estimatedPercent: parseInt((attempts / state.estimatedRequests) * 100, 10),
          results: props.ping.results
        });
      }
    }
    if (isEmpty(derived)) {
      return false;
    }
    return derived;
  }
  componentDidUpdate() {
    // Load producer endpoints
    if (
      this.state.endpoints.length === 0
      && !isEmpty(this.props.producers.producersInfo)
    ) {
      const {
        producersInfo
      } = this.props.producers;
      const endpoints = [];
      Object.keys(producersInfo).forEach((key) => {
        const producer = producersInfo[key];
        if (producer.nodes && producer.nodes.length) {
          const nodes = filter(producer.nodes, {
            node_type: 'full'
          });
          nodes.forEach((node) => {
            if (node && node.ssl_endpoint) {
              endpoints.push({
                host: node.ssl_endpoint,
                producer: producer.producer_account_name
              });
            } else if (node && node.api_endpoint) {
              endpoints.push({
                host: node.api_endpoint,
                producer: producer.producer_account_name
              });
            }
          });
        }
      });
      this.setState({
        endpoints: uniqBy(endpoints, 'host'),
        total: endpoints.length
      });
    }
  }
  componentWillUnmount() {
    this.props.actions.pingStop();
    clearInterval(this.interval);
  }
  cancel = () => {
    this.stop(() => {
      this.reset();
    });
  }
  ping = (endpoint) => {
    const { settings } = this.props;
    this.props.actions.pingNode(endpoint, {
      account_name: settings.account || 'teamgreymass',
    });
  }
  pingAll = (batches = 1) => defer(() => {
    const { settings } = this.props;
    const { endpoints } = this.state;
    const estimatedRequests = endpoints.length * batches;
    this.setState({
      estimatedRequests,
      totalRequests: this.state.totalRequests + endpoints.length,
    }, () => {
      this.props.actions.pingSetEstimatedRequests(estimatedRequests);
      this.props.actions.pingNodes(endpoints, {
        account_name: settings.account || 'teamgreymass'
      });
    });
  })
  start = () => {
    this.reset(() => {
      this.setState({
        estimatedRequests: this.state.endpoints.length * 4,
        run: true,
        showUnsupported: false
      }, () => {
        setTimeout(() => {
          this.tick(true);
          this.startInterval(1000);
        }, 500);
      });
    });
  }
  startInterval = (ms) => {
    this.interval = setInterval(this.tick.bind(this), ms);
  }
  stop = (cb = () => {}) => {
    clearInterval(this.interval);
    this.setState({ run: false }, cb);
  }
  resume = () => {
    this.setState({ run: true }, () => {
      this.tick();
      this.startInterval(1000);
    });
  }
  reset = (cb = () => {}) => {
    this.props.actions.pingReset();
    this.setState(Object.assign({}, initialState), cb);
  }
  tick = (init = false) => {
    const { ping } = this.props;
    const { pingAll } = this;
    if (ping.pending === 0) {
      this.setState({
        pass: this.state.pass + 1
      });
      if (init) {
        [1, 2, 3].forEach(() => pingAll(3));
      } else {
        this.pingAll();
      }
    }
  }
  toggleUnsupported = (e, { checked }) => this.setState({ showUnsupported: checked })
  useAPI = (host) => {
    const {
      actions
    } = this.props;
    const {
      setSettingWithValidation
    } = actions;
    setSettingWithValidation('node', host);
  }
  render() {
    const {
      actualRequests,
      estimatedRequests,
      estimatedPercent,
      node,
      results,
      run,
      showUnsupported,
      total,
    } = this.state;
    const { connection, settings } = this.props;
    if (!connection.supportedContracts || !connection.supportedContracts.includes('producerinfo')) {
      return (
        <Segment color="orange">
          <Header>
            This tool does not work with the currently selected blockchain
            <Header.Subheader>
              In order for this tool to work on this network, the "producerjson" smart contract must be deployed and populated with API endpoints and Anchor needs to be made aware of its deployent. Please contact the Greymass team for assistance in this matter.
            </Header.Subheader>
          </Header>
        </Segment>
      )
    }

    const data = [...results];
    if (!showUnsupported) {
      remove(data, (result) => !result.available);
      remove(data, (result) => result.failing);
    }
    const ordered = orderBy(data, ['seq', 'median'], ['desc', 'asc']);
    if (results.host === 'https://wax.greymass.com') {
      console.log(results)
    }
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <ToolsPingHeader
          settings={settings}
          setSetting={this.props.actions.setSetting}
        />
        <ToolsPingControls
          onCancel={this.cancel}
          onResume={this.resume}
          onStart={this.start}
          onStop={this.stop}
          onToggleUnsupported={this.toggleUnsupported}
          settings={settings}
          showUnsupported={showUnsupported}
          results={ordered.length}
          run={run}
        />
        {(run && ordered.length === 0)
          ? (
            <ToolsPingLoader
              nodes={total}
              onCancel={this.cancel}
              percent={estimatedPercent}
              total={estimatedRequests}
              value={actualRequests}
            />
          )
          : false
        }
        {(ordered.length > 0)
          ? (
            <ToolsPingResults
              onStop={this.stop}
              node={node}
              results={ordered}
              run={run}
              useAPI={this.useAPI}
            />
          )
          : false
        }
      </Segment>
    );
  }
}

export default debounceRender(withTranslation('ping')(ToolsPing), 100, {
  leading: true,
  maxWait: 100,
  trailing: true
});
