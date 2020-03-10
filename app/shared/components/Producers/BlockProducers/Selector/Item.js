// @flow
import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';

export default class ProducersSelectorItem extends Component<Props> {
  render() {
    const {
      producer,
      record,
      removeProducer
    } = this.props;
    const value = (record && record.address) ? record.address : producer
    return (
      <List.Item key={value}>
        <List.Content>
          <Button
            color="red"
            icon="circle minus"
            onClick={() => removeProducer(value)}
            size="mini"
            style={{ marginRight: '1em' }}
          />
          {value}
        </List.Content>
      </List.Item>
    );
  }
}
