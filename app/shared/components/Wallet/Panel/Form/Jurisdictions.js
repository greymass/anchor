// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Modal, Label, Form, Button, Segment, Grid, Input } from 'semantic-ui-react';

export default class JurisdictionsForm extends Component<Props> {
  state = {
    options: [],
    choosenJurisdictions: [],
    allSearch: '',
    yoursSearch: ''
  };

  componentDidMount() {
    const { actions, jurisdictions } = this.props;
    actions.getJurisdictions();
    this.makeOptions(jurisdictions);
    this.setUsersJurisdictionsDefault();
  }

  setUsersJurisdictionsDefault() {
    this.setState({
      choosenJurisdictions: this.props.jurisdictions.choosenJurisdictions
    });
    return this.props.jurisdictions.choosenJurisdictions;
  }

  makeOptions(jurisdictions, choosen?) {
    const options = [];
    const j = jurisdictions.jurisdictions;
    const cj = (choosen !== undefined) ? choosen : jurisdictions.choosenJurisdictions;
    if (j) {
      for (let i = 0; i < j.length; i += 1) {
        let obj = j[i];
        if (j[i].description) {
          const name = `${j[i].name} (${j[i].description})`;
          obj = {
            code: j[i].code,
            value: name,
            text: name,
            name: j[i].name,
            description: j[i].description
          };
        }
        let status = false;
        for (let x = 0; x < cj.length; x += 1) {
          if (j[i].code === cj[x].code) {
            status = true;
          }
        }
        if (!status) {
          options.push(obj);
        }
      }
    }
    this.setState({
      options
    });
    return options;
  }

  handleEditClick(e) {
    this.setState({
      choosenJurisdictions: this.props.jurisdictions.choosenJurisdictions,
      options: this.props.jurisdictions.jurisdictions,
      allSearch: '',
      yoursSearch: ''
    });
    e.preventDefault();
  }

  clickedLabel(value, status) {
    let oldValue = Array.from(this.props.jurisdictions.choosenJurisdictions);
    if (status === 'all') {
      oldValue.push(value);
    } else if (oldValue.indexOf(value) !== -1) {
      oldValue.splice(oldValue.indexOf(value), 1);
    }
    oldValue = oldValue.sort((a, b) => a.code > b.code);
    this.props.actions.saveChoosenJurisdictions(oldValue);
    this.setState({
      choosenJurisdictions: oldValue
    });
    const tempJuri = this.makeOptions(this.props.jurisdictions, oldValue);
    this.applySearches(tempJuri, oldValue);
  }

  applySearches(jurisdictions, choosenJurisdictions) {
    this.search(this.state.allSearch, 'all', jurisdictions);
    this.search(this.state.yoursSearch, 'yours', choosenJurisdictions);
  }

  search(val, status, arrayOfJurisdictions?) {
    if (status === 'all') {
      const jurisdictions = (arrayOfJurisdictions !== undefined) ? arrayOfJurisdictions : this.makeOptions(this.props.jurisdictions);
      const searched = jurisdictions.filter((option) => option.value.includes(val));
      this.setState({
        options: searched
      });
      this.setState({
        allSearch: val
      });
    } else {
      const choosen = (arrayOfJurisdictions !== undefined) ? arrayOfJurisdictions : this.props.jurisdictions.choosenJurisdictions;
      const searchedChoosen = choosen.filter((option) => option.value.includes(val));
      this.setState({
        choosenJurisdictions: searchedChoosen
      });
      this.setState({
        yoursSearch: val
      });
    }
  }

  render() {
    const { label } = this.props;

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <Form.Group inline>
                <label>{label}</label>
              </Form.Group>
              <Form.Group inline>
                <div style={styles.jurisdictionsLabels}>
                  {this.props.jurisdictions.choosenJurisdictions.map((option) => <Label style={{ marginTop: '5px' }}>{option.name}</Label>)}
                </div>
                <Modal
                  // centered={false}
                  trigger={
                    <Button
                      floated="right"
                      size="small"
                      onClick={(e) => this.handleEditClick(e)}
                      primary
                    >
                      Edit
                    </Button>}
                  onOpen={() => this.makeOptions(this.props.jurisdictions)}
                  closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                >
                  <Modal.Header>Select jurisdictions</Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      <Grid columns={2} divided textAlign="center">
                        <Grid.Row stretched verticalAlign="middle">
                          <Grid.Column>
                            <label style={styles.labelText}>All jurisdictions ({this.state.options.length})</label>
                            <Input placeholder="Search..." type="text" onChange={(e, data) => this.search(data.value, 'all')} />
                            <Segment style={styles.segment}>
                              {this.state.options.map((options) => <Label onClick={() => this.clickedLabel(options, 'all')} style={styles.label}>{options.text}</Label>)}
                            </Segment>
                          </Grid.Column>
                          <Grid.Column>
                            <label style={styles.labelText}>Your jurisdictions ({this.state.choosenJurisdictions.length})</label>
                            <Input placeholder="Search..." type="text" onChange={(e, data) => this.search(data.value, 'yours')} />
                            <Segment style={styles.segment}>
                              {this.state.choosenJurisdictions.map((value) => <Label onClick={() => this.clickedLabel(value, 'yours')} style={styles.label}>{value.text}</Label>)}
                            </Segment>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Form.Group>
            </div>
          )
        }
      </I18n>
    );
  }
}

const styles = {
  label: {
    width: '100%',
    marginBottom: '5px',
    cursor: 'pointer'
  },
  segment: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '30vh',
    minHeight: '30vh'
  },
  labelText: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  jurisdictionsLabels: {
    maxHeight: '50px',
    maxWidth: '87%',
    minWidth: '87%',
    overflow: 'auto'
  }
};
