// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Modal, Label, Form, Button, Segment, Grid, Input, Checkbox, Icon } from 'semantic-ui-react';
import ReactDOM from 'react-dom';

export default class JurisdictionsForm extends Component<Props> {
  constructor() {
    super();
    this.refSearchAll = React.createRef();
    this.refSearchYours = React.createRef();
  }

  state = {
    options: [],
    choosenOptions: [],
    allSearch: '',
    yoursSearch: '',
    showModal: false,
    eventSet: false,
    jurisdictions: [],
    choosenJurisdictions: [],
    clickedAll: [],
    clickedYours: [],
    shiftClicked: false,
    tempChoosen: [],
    tempJurisdictions: [],
    ctrlClicked: false,
    oneActive: {
      index: 0,
      status: 'all'
    }
  };

  componentDidMount() {
    const { actions, jurisdictions } = this.props;
    actions.getJurisdictions();
    this.makeOptions(jurisdictions);
    this.setUsersJurisdictionsDefault();
  }

  async setUsersJurisdictionsDefault(data?) {
    if (data) {
      await this.setState({
        choosenOptions: data.choosenJurisdictions,
        choosenJurisdictions: data.choosenJurisdictions
      });
    } else {
      await this.setState({
        choosenOptions: this.props.jurisdictions.choosenJurisdictions,
        choosenJurisdictions: this.props.jurisdictions.choosenJurisdictions
      });
    }
    return this.props.jurisdictions.choosenJurisdictions;
  }

  async makeOptions(jurisdictions, choosen?) {
    const options = [];
    const j = jurisdictions.jurisdictions;
    const cj = (choosen !== undefined) ? choosen : jurisdictions.choosenJurisdictions;
    this.optionsRefs = {};
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
            description: j[i].description,
            active: false
          };
        }
        this.optionsRefs[j[i].name] = React.createRef();
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
    await this.setState({
      options,
      jurisdictions: options
    });
    if (this.state.options && this.state.options.length > 0) {
      this.clickedLabel(this.state.options[this.state.oneActive.index], this.state.oneActive.status);
    }
    return options;
  }

  async handleEditClick(e) {
    this.props.actions.getJurisdictions();
    let choosen = [];
    let jurisdictions = [];
    if (this.props.jurisdictions.jurisdictions && this.props.jurisdictions.choosenJurisdictions) {
      choosen = this.makeAllInactive(this.props.jurisdictions.choosenJurisdictions);
      jurisdictions = this.makeAllInactive(this.props.jurisdictions.jurisdictions);
    }
    await this.setState({
      choosenOptions: choosen,
      choosenJurisdictions: choosen,
      options: jurisdictions,
      showModal: true,
      clickedAll: [],
      clickedYours: [],
      oneActive: {
        index: 0,
        status: 'all'
      }
    });
    this.makeOptions(this.props.jurisdictions);
    e.preventDefault();
    if (this.props.jurisdictions.onlyActive) {
      this.handleOnlyActive(false);
    }
  }

  makeAllInactive(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      arr[i].active = false;
    }
    return arr;
  }

  clickedLabel(value, status, arrayForActive?, scrolling = false) {
    if (value) {
      if (scrolling) {
        const r = ReactDOM.findDOMNode(this.optionsRefs[value.name].current);
        if (r) {
          r.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
      }
      let arrayForActiveTemp = [];
      if (!arrayForActive) {
        if (status === 'all') {
          arrayForActiveTemp = this.state.options;
        } else {
          arrayForActiveTemp = this.state.choosenOptions;
        }
      } else {
        arrayForActiveTemp = arrayForActive;
      }
      for (let i = 0; i < arrayForActiveTemp.length; i += 1) {
        if (arrayForActiveTemp[i].code === value.code) {
          this.setState({
            oneActive: {
              index: i,
              status
            }
          });
        }
      }
      if (this.state.shiftClicked) {
        let arr = [];
        let ac = false;
        let clicked = [];
        if (value.active === false) {
          ac = true;
        }
        if (status === 'all') {
          arr = this.state.options;
          clicked = Array.from(this.state.clickedAll);
        } else {
          arr = this.state.choosenOptions;
          clicked = Array.from(this.state.clickedYours);
        }
        const index = arr.indexOf(value);
        let firstActive = 0;
        for (let i = index; i >= 0; i -= 1) {
          if (firstActive === 0) {
            if (arr[i].active === ac) {
              firstActive = i;
            }
          }
        }
        if (firstActive !== 0) {
          firstActive += 1;
        }
        if (ac === true) {
          for (let i = firstActive; i <= index; i += 1) {
            arr[i].active = ac;
            clicked.push(arr[i]);
          }
        } else {
          for (let i = firstActive; i <= index; i += 1) {
            arr[i].active = ac;
            for (let j = 0; j < clicked.length; j += 1) {
              if (clicked[j].code === arr[i].code) {
                clicked.splice(j, 1);
                j -= 1;
              }
            }
          }
        }
        if (status === 'all') {
          this.setState({
            options: arr,
            clickedAll: clicked
          });
        } else {
          this.setState({
            choosenOptions: arr,
            clickedYours: clicked
          });
        }
      } else if (this.state.ctrlClicked) {
        let oldValue = [];
        if (status === 'all') {
          let tempClicked = Array.from(this.state.clickedAll);
          if (value.active === true) {
            for (let i = 0; i < tempClicked.length; i += 1) {
              if (tempClicked[i].code === value.code) {
                tempClicked.splice(i, 1);
                i -= 1;
              }
            }
          } else {
            tempClicked = this.state.clickedAll.concat([value]);
          }
          oldValue = Array.from(this.state.options);
          oldValue.map((val) => {
            if (val.code === value.code) {
              val.active = !val.active;
            }
            return val;
          });
          this.setState({
            options: oldValue,
            clickedAll: tempClicked
          });
        } else {
          let tempClicked = Array.from(this.state.clickedYours);
          if (value.active === true) {
            for (let i = 0; i < tempClicked.length; i += 1) {
              if (tempClicked[i].code === value.code) {
                tempClicked.splice(i, 1);
                i -= 1;
              }
            }
          } else {
            tempClicked = this.state.clickedYours.concat([value]);
          }
          oldValue = Array.from(this.state.choosenOptions);
          oldValue.map((val) => {
            if (val.code === value.code) {
              val.active = !val.active;
            }
            return val;
          });
          this.setState({
            choosenOptions: oldValue,
            clickedYours: tempClicked
          });
        }
      } else {
        let oldValue = [];
        if (status === 'all') {
          oldValue = this.makeAllInactive(Array.from(this.state.jurisdictions));
          oldValue.map((val) => {
            if (val.code === value.code) {
              val.active = !val.active;
            }
            return val;
          });
          this.setState({
            options: oldValue,
            clickedAll: [value]
          });
        } else {
          oldValue = this.makeAllInactive(Array.from(this.state.choosenJurisdictions));
          oldValue.map((val) => {
            if (val.code === value.code) {
              val.active = !val.active;
            }
            return val;
          });
          this.setState({
            choosenOptions: oldValue,
            clickedYours: [value]
          });
        }
        let jur = this.state.options;
        let choJur = this.state.choosenOptions;
        if (status === 'all') {
          jur = oldValue;
        } else {
          choJur = oldValue;
        }
        this.applySearches(jur, choJur);
      }
    }
  }

  applySearches(jurisdictions, choosenJurisdictions) {
    this.search(this.state.allSearch, 'all', false, false, jurisdictions);
    this.search(this.state.yoursSearch, 'yours', false, false, choosenJurisdictions);
  }

  search(val, status, makeInactive = true, normalSearch = true, arrayOfJurisdictions?) {
    if (status === 'all') {
      if (makeInactive === true) {
        this.setState({
          options: this.makeAllInactive(this.state.options),
          clickedAll: []
        });
      }
      const jurisdictions = (arrayOfJurisdictions !== undefined) ?
        arrayOfJurisdictions :
        this.state.jurisdictions;
      const searched = jurisdictions.filter((option) => option.value.includes(val));
      if (normalSearch) {
        if (searched[0]) {
          this.clickedLabel(searched[0], 'all', searched, true);
        }
      }
      this.setState({
        options: searched,
        allSearch: val
      });
    } else {
      if (makeInactive === true) {
        this.setState({
          choosenOptions: this.makeAllInactive(this.state.choosenOptions),
          clickedYours: []
        });
      }
      const choosen = (arrayOfJurisdictions !== undefined) ?
        arrayOfJurisdictions :
        this.state.choosenJurisdictions;
      const searchedChoosen = choosen.filter((option) => option.value.includes(val));
      if (normalSearch) {
        if (searchedChoosen[0]) {
          this.clickedLabel(searchedChoosen[0], 'yours', searchedChoosen, true);
        }
      }
      this.setState({
        choosenOptions: searchedChoosen,
        yoursSearch: val
      });
    }
  }

  onCloseModal() {
    this.setState({
      showModal: false
    });
  }

  async handleArrowClick(status) {
    if (status === 'all') {
      let temp = this.state.jurisdictions.filter((el) => {
        return el.active === true;
      });
      if (this.props.jurisdictions.onlyActive) {
        const t = this.state.tempChoosen.concat(temp);
        t.sort((a, b) => a.code - b.code);
        this.setState({
          tempChoosen: t
        });
      }
      temp = temp.concat(this.state.choosenJurisdictions);
      temp.map((val) => {
        val.active = false;
        return val;
      });
      temp.sort((a, b) => a.code - b.code);

      const newJur = [];
      this.state.jurisdictions.map((val) => {
        if (this.state.clickedAll.includes(val) === false) {
          newJur.push(val);
        }
      });
      if (this.props.jurisdictions.onlyActive) {
        const tArray = [];
        this.state.tempJurisdictions.map((val) => {
          if (this.state.clickedAll.includes(val) === false) {
            tArray.push(val);
          }
        });
        tArray.sort((a, b) => a.code - b.code);
        this.setState({
          tempJurisdictions: tArray
        });
      }

      newJur.sort((a, b) => a.code - b.code);
      await this.setState({
        choosenOptions: temp,
        choosenJurisdictions: temp,
        options: newJur,
        jurisdictions: newJur,
        clickedAll: [],
        clickedYours: [],
        allSearch: '',
        yoursSearch: '',
        oneActive: {
          index: 0,
          status: 'all'
        }
      });
    if (this.refSearchAll.current && this.refSearchYours.current) {
        this.refSearchAll.current.inputRef.value = '';
        this.refSearchYours.current.inputRef.value = '';
    }
    } else {
      let temp = this.state.choosenJurisdictions.filter((el) => {
        return el.active === true;
      });
      if (this.props.jurisdictions.onlyActive) {
        const t = this.state.tempJurisdictions.concat(temp);
        t.sort((a, b) => a.code - b.code);
        this.setState({
          tempJurisdictions: t
        });
      }
      temp = temp.concat(this.state.jurisdictions);
      temp.map((val) => {
        val.active = false;
        return val;
      });
      temp.sort((a, b) => a.code - b.code);

      const newJur = [];
      this.state.choosenJurisdictions.map((val) => {
        if (this.state.clickedYours.includes(val) === false) {
          newJur.push(val);
        }
        return val;
      });
      if (this.props.jurisdictions.onlyActive) {
        const tArray = [];
        this.state.tempChoosen.map((val) => {
          if (this.state.clickedYours.includes(val) === false) {
            tArray.push(val);
          }
        });
        tArray.sort((a, b) => a.code - b.code);
        this.setState({
          tempChoosen: tArray
        });
      }

      newJur.sort((a, b) => a.code - b.code);
      await this.setState({
        choosenOptions: newJur,
        choosenJurisdictions: newJur,
        options: temp,
        jurisdictions: temp,
        clickedYours: [],
        clickedAll: [],
        allSearch: '',
        yoursSearch: '',
        oneActive: {
          index: 0,
          status: 'all'
        }
      });
      if (this.refSearchAll.current && this.refSearchYours.current) {
        this.refSearchYours.current.inputRef.value = '';
        this.refSearchAll.current.inputRef.value = '';
      }
    }
    if (this.refSearchYours.current !== null) {
      this.refSearchYours.current.inputRef.value = '';
    }
    if (this.state.options && this.state.options.length > 0) {
      this.clickedLabel(this.state.options[this.state.oneActive.index], this.state.oneActive.status);
    }
  }

  onSubmit() {
    this.props.actions.saveChoosenJurisdictions(this.state.choosenJurisdictions);
    this.setState({
      choosenOptions: this.state.choosenJurisdictions,
      showModal: false
    });
  }

  handleOnlyActive(change = true) {
    if (this.props.jurisdictions.onlyActive && change === true) {
      this.props.actions.saveOnlyActive();
      this.setUsersJurisdictionsDefault({
        choosenJurisdictions: this.makeAllInactive(this.state.tempChoosen),
        jurisdictions: this.makeAllInactive(this.state.tempJurisdictions)
      });
      this.setState({
        allSearch: '',
        yoursSearch: '',
        clickedAll: [],
        clickedYours: []
      });
      this.makeOptions(this.props.jurisdictions, this.state.tempChoosen);
      if (this.refSearchAll.current && this.refSearchYours.current) {
        this.refSearchAll.current.inputRef.value = '';
        this.refSearchYours.current.inputRef.value = '';
      }
    } else if (this.props.jurisdictions.onlyActive && change === false) {
      this.filterOptions();
    } else {
      if (change === true) {
        this.props.actions.saveOnlyActive();
        this.filterOptions();
      }
    }
  }

  async filterOptions() {
    await this.props.actions.getActiveJurisdictions();
    this.setState({
      tempChoosen: this.state.choosenJurisdictions,
      tempJurisdictions: this.state.jurisdictions
    });
    let newOptions = [];
    let newChoosenOptions = [];
    if (this.props.jurisdictions.activeJurisdictions) {
      newOptions = this.state.jurisdictions.filter((a) => this.props.jurisdictions.activeJurisdictions.includes(a.code));
      newChoosenOptions = this.state.choosenJurisdictions.filter((a) => this.props.jurisdictions.activeJurisdictions.includes(a.code));
    }
    this.setState({
      options: newOptions,
      jurisdictions: newOptions,
      choosenOptions: newChoosenOptions,
      choosenJurisdictions: newChoosenOptions,
      allSearch: '',
      yoursSearch: '',
      clickedAll: [],
      clickedYours: []
    });
    if (this.refSearchAll.current && this.refSearchYours.current) {
      this.refSearchAll.current.inputRef.value = '';
      this.refSearchYours.current.inputRef.value = '';
    }
  }

  checkSearchBoxesFocus() {
    if (ReactDOM.findDOMNode(this.refSearchAll.current) && ReactDOM.findDOMNode(this.refSearchYours.current)) {
      if (document.activeElement === ReactDOM.findDOMNode(this.refSearchAll.current).children[0] || document.activeElement === ReactDOM.findDOMNode(this.refSearchYours.current).children[0]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { label } = this.props;
    if (this.state.eventSet === false) {
      this.setState({
        eventSet: true
      });
      document.addEventListener('keydown', (e) => {
        if (this.state.showModal) {
          if (e.keyCode === 27) {
            this.setState({
              showModal: false,
              eventSet: true
            });
          } else if (e.keyCode === 16) {
            this.setState({
              shiftClicked: true
            });
          } else if (e.keyCode === 17) {
            this.setState({
              ctrlClicked: true
            });
          } else if (e.keyCode === 40 || e.keyCode === 34) {
            // down
            e.preventDefault();
            let arr = [];
            if (this.state.oneActive.status === 'all') {
              arr = this.state.options;
            } else {
              arr = this.state.choosenOptions;
            }
            let item = this.state.oneActive.index;
            if (this.state.oneActive.index < arr.length - 1) {
              item += 1;
            }
            this.clickedLabel(arr[item], this.state.oneActive.status, arr, true);
          } else if (e.keyCode === 38 || e.keyCode === 33) {
            // up
            e.preventDefault();
            let arr = [];
            if (this.state.oneActive.status === 'all') {
              arr = this.state.options;
            } else {
              arr = this.state.choosenOptions;
            }
            let item = this.state.oneActive.index;
            if (this.state.oneActive.index !== 0) {
              item -= 1;
            }
            this.clickedLabel(arr[item], this.state.oneActive.status, arr, true);
          } else if (e.keyCode === 37) {
            // left
            // e.preventDefault();
            if (!this.checkSearchBoxesFocus()) {
              this.handleArrowClick('yours');
            }
          } else if (e.keyCode === 39) {
            // right
            // e.preventDefault();
            if (!this.checkSearchBoxesFocus()) {
              this.handleArrowClick('all');
            }
          } else if (e.keyCode === 13) {
            this.handleArrowClick(this.state.oneActive.status);
          } else if (e.keyCode === 36) {
            // home
            if (!this.checkSearchBoxesFocus()) {
              let arr = [];
              if (this.state.oneActive.status === 'all') {
                arr = this.state.options;
              } else {
                arr = this.state.choosenOptions;
              }
              this.clickedLabel(arr[0], this.state.oneActive.status, arr, true);
            }
          } else if (e.keyCode === 35) {
            // end
            if (!this.checkSearchBoxesFocus()) {
              let arr = [];
              if (this.state.oneActive.status === 'all') {
                arr = this.state.options;
              } else {
                arr = this.state.choosenOptions;
              }
              this.clickedLabel(arr[arr.length - 1], this.state.oneActive.status, arr, true);
            }
          }
        }
      });
      document.addEventListener('keyup', (e) => {
        if (this.state.showModal) {
          if (e.keyCode === 16) {
            this.setState({
              shiftClicked: false
            });
          } else if (e.keyCode === 17) {
            this.setState({
              ctrlClicked: false
            });
          }
        }
      });
    }

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <Form.Group inline>
                <label>{label}</label>
              </Form.Group>
              <Form.Group inline style={{ margin: '0 0 1em', boxAlign: 'center', alignItems: 'center', display: 'flex' }}>
                <div style={styles.jurisdictionsLabels}>
                  {this.props.jurisdictions.loading === false ? this.props.jurisdictions.fetchingError === false ? (this.props.jurisdictions.choosenJurisdictions.length > 0 ?
                  this.props.jurisdictions.choosenJurisdictions.map((option) => <Label key={option.code} style={{ marginTop: '5px' }}>{option.name}</Label>) :
                  'No jurisdictions.') : 'Error fetching data' : 'Loading...'}
                </div>
                <Modal
                  // centered={false}
                  open={this.state.showModal}
                  trigger={
                    <Button
                      floated="right"
                      size="small"
                      onClick={(e) => this.handleEditClick(e)}
                      primary
                      disabled={this.props.jurisdictions.fetchingError || this.props.jurisdictions.loading}
                    >
                      Edit
                    </Button>}
                >
                  <Modal.Header>Select jurisdictions</Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      <Grid columns={3} textAlign="center">
                        <Grid.Row stretched verticalAlign="middle">
                          <Grid.Column width={7}>
                            <label style={styles.labelText}>All jurisdictions ({ this.state.options.length + ' of ' + this.state.jurisdictions.length})</label>
                            <Input disabled={this.props.jurisdictions.fetchingError} ref={this.refSearchAll} autoFocus placeholder="Search..." type="text" onChange={(e, data) => this.search(data.value, 'all')} onFocus={() => this.search('', 'all')} />
                            <Segment style={styles.segment}>
                              {this.props.jurisdictions.activeLoading === false ?
                                (this.props.jurisdictions.fetchingError === false ?
                                  this.state.options.map((options) => <Label ref={this.optionsRefs[options.name]} key={options.code} active={options.active} onClick={() => this.clickedLabel(options, 'all')} style={styles.label}>{options.text}</Label>) :
                                  'Error fetching data') :
                                'Loading...'}
                            </Segment>
                          </Grid.Column>
                          <Grid.Column width={1}>
                            <Icon style={{ cursor: 'pointer' }} onClick={() => this.handleArrowClick('all')} name="arrow right" size="big" /><br />
                            <Icon style={{ cursor: 'pointer' }} onClick={() => this.handleArrowClick('yours')} name="arrow left" size="big" />
                          </Grid.Column>
                          <Grid.Column width={7}>
                            <label style={styles.labelText}>Your jurisdictions ({this.state.choosenOptions.length + ' of ' + this.state.choosenJurisdictions.length})</label>
                            <Input disabled={this.props.jurisdictions.fetchingError} ref={this.refSearchYours} placeholder="Search..." type="text" onChange={(e, data) => this.search(data.value, 'yours')} onFocus={() => this.search('', 'yours')} />
                            <Segment style={styles.segment}>
                              {this.props.jurisdictions.activeLoading === false ?
                                (this.props.jurisdictions.fetchingError === false ?
                                  this.state.choosenOptions.map((value) => <Label ref={this.optionsRefs[value.name]} key={value.code} active={value.active} onClick={() => this.clickedLabel(value, 'yours')} style={styles.label}>{value.text}</Label>) :
                                  'Error fetching data') :
                                'Loading...'}
                            </Segment>
                          </Grid.Column>
                        </Grid.Row>
                        <Checkbox disabled={this.props.jurisdictions.fetchingError} checked={this.props.jurisdictions.onlyActive} onClick={() => this.handleOnlyActive()} label="Only active jurisdictions" />
                      </Grid>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      content={t('confirm')}
                      floated="right"
                      primary
                      onClick={() => this.onSubmit()}
                    />
                    <Button
                      onClick={() => this.onCloseModal()}
                    >
                      <Icon name="x" /> {t('cancel')}
                    </Button>
                  </Modal.Actions>
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
    cursor: 'pointer',
    userSelect: 'none'
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
