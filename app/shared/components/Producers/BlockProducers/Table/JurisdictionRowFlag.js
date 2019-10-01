// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Flag } from 'semantic-ui-react';

class JurisdictionRowFlag extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      flags: []
    };
  }

  setProducerFlag = (producer) => {
    switch (producer.jurisdictions[0].name) {
      case 'bolivia, plurinational state of': {
        this.state.flags[producer.owner] = { class: 'bolivia', name: 'bolivia, plurinational state of' };
        break;
      }
      case 'bonaire, sint eustatius and saba': {
        this.state.flags[producer.owner] = { class: 'netherlands', name: 'bonaire, sint eustatius and saba' };
        break;
      }
      case 'cabo verde': {
        this.state.flags[producer.owner] = { class: 'cape verde', name: 'cabo verde' };
        break;
      }
      case 'congo': {
        this.state.flags[producer.owner] = { class: 'congo brazzaville', name: 'congo' };
        break;
      }
      case 'congo, the democratic republic of the': {
        this.state.flags[producer.owner] = { class: 'congo', name: 'congo, the democratic republic of the' };
        break;
      }
      case 'czechia': {
        this.state.flags[producer.owner] = { class: 'czech republic', name: 'czechia' };
        break;
      }
      case "côte d'ivoire": {
        this.state.flags[producer.owner] = { class: 'cote divoire', name: "côte d'ivoire" };
        break;
      }
      case 'eswatini': {
        this.state.flags[producer.owner] = { class: 'swaziland', name: 'eswatini' };
        break;
      }
      case 'guadeloupe': {
        this.state.flags[producer.owner] = { class: 'france', name: 'guadeloupe' };
        break;
      }
      case 'holy see (vatican city state)': {
        this.state.flags[producer.owner] = { class: 'vatican city', name: 'holy see (vatican city state)' };
        break;
      }
      case 'iran, islamic republic of': {
        this.state.flags[producer.owner] = { class: 'iran', name: 'iran, islamic republic of' };
        break;
      }
      case "korea, democratic people's republic of": {
        this.state.flags[producer.owner] = { class: 'north korea', name: "korea, democratic people's republic of" };
        break;
      }
      case 'korea, republic of': {
        this.state.flags[producer.owner] = { class: 'south korea', name: 'korea, republic of' };
        break;
      }
      case "lao people's democratic republic": {
        this.state.flags[producer.owner] = { class: 'laos', name: "lao people's democratic republic" };
        break;
      }
      case 'macao': {
        this.state.flags[producer.owner] = { class: 'macau', name: 'macao' };
        break;
      }
      case 'micronesia, federated states of': {
        this.state.flags[producer.owner] = { class: 'micronesia', name: 'micronesia, federated states of' };
        break;
      }
      case 'moldova, republic of': {
        this.state.flags[producer.owner] = { class: 'moldova', name: 'moldova, republic of' };
        break;
      }
      case 'palestine, state of': {
        this.state.flags[producer.owner] = { class: 'palestine', name: 'palestine, state of' };
        break;
      }
      case 'pitcairn': {
        this.state.flags[producer.owner] = { class: 'pitcairn islands', name: 'pitcairn' };
        break;
      }
      case 'russian federation': {
        this.state.flags[producer.owner] = { class: 'russia', name: 'russian federation' };
        break;
      }
      case 'réunion': {
        this.state.flags[producer.owner] = { class: 'reunion', name: 'réunion' };
        break;
      }
      case 'saint barthélemy': {
        this.state.flags[producer.owner] = { class: 'france', name: 'saint barthélemy' };
        break;
      }
      case 'saint helena, ascension and tristan da cunha': {
        this.state.flags[producer.owner] = { class: 'united kingdom', name: 'saint helena, ascension and tristan da cunha' };
        break;
      }
      case 'saint martin (french part)': {
        this.state.flags[producer.owner] = { class: 'france', name: 'saint martin (french part)' };
        break;
      }
      case 'syrian arab republic': {
        this.state.flags[producer.owner] = { class: 'syria', name: 'syrian arab republic' };
        break;
      }
      case 'taiwan, province of china': {
        this.state.flags[producer.owner] = { class: 'taiwan', name: 'taiwan, province of china' };
        break;
      }
      case 'tanzania, united republic of': {
        this.state.flags[producer.owner] = { class: 'tanzania', name: 'tanzania, united republic of' };
        break;
      }
      case 'timor-leste': {
        this.state.flags[producer.owner] = { class: 'timorleste', name: 'timor-leste' };
        break;
      }
      case 'venezuela, bolivarian republic of': {
        this.state.flags[producer.owner] = { class: 'venezuela', name: 'venezuela, bolivarian republic of' };
        break;
      }
      case 'viet nam': {
        this.state.flags[producer.owner] = { class: 'vietnam', name: 'viet nam' };
        break;
      }
      case 'virgin islands, british': {
        this.state.flags[producer.owner] = { class: 'british virgin islands', name: 'virgin islands, british' };
        break;
      }
      case 'virgin islands, u.s.': {
        this.state.flags[producer.owner] = { class: 'us virgin islands', name: 'virgin islands, u.s.' };
        break;
      }
      case 'Åland islands': {
        this.state.flags[producer.owner] = { class: 'aland islands', name: 'Åland islands' };
        break;
      }
      default: {
        this.state.flags[producer.owner] = { class: producer.jurisdictions[0].name, name: producer.jurisdictions[0].name };
        break;
      }
    }
  }

  render() {
    const {
      producer
    } = this.props;

    this.setProducerFlag(producer);

    return (
      <React.Fragment>
        <Flag name={this.state.flags[producer.owner].class} /><span>{this.state.flags[producer.owner].name}</span>
      </React.Fragment>
    );
  }
}

export default translate('producers')(JurisdictionRowFlag);
