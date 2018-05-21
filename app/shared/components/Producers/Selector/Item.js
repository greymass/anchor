// @flow
import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';

export default class ProducersSelectorItemEmpty extends Component<Props> {
  render() {
    const {
      producer,
      removeProducer
    } = this.props;
    return (
      <List.Item key={producer}>
        <List.Content>
          <Button
            color="red"
            icon="circle minus"
            onClick={() => removeProducer(producer)}
            size="tiny"
            style={{ marginRight: '1em' }}
          />
          {producer}
        </List.Content>
      </List.Item>
    );
  }
}
