// @flow
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class FormMessageError extends Component<Props> {
  render() {
    const {
      error,
      errors
    } = this.props;

    const errorObjects = (errors || []);

    errorObjects.push(error);

    const errorMessages = errorObjects.map((err) => {
      if (err && err.code) {
        return err.error.details[0].message;
      }

      return JSON.stringify(err);
    });

    return (error || errors)
      ? (
        <Message negative>
          { errorMessages.map((err) => <p key={err}>{err}</p>) }
        </Message>
      )
      : '';
  }
}
