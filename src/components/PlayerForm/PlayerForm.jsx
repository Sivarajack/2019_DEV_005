import React from 'react';
import './PlayerForm.css';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';


// this component handles function of getting player names and


export default class PlayerForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleNameChange(event) {
    
  }
  handleSubmit(event) {
    
  }
  render() {
    
    return (
      <div>
        <Panel>
          <Panel.Body>
            <Form id="playerForm" inline onSubmit={this.handleSubmit}>
              <FormGroup className="playerName">
                <ControlLabel className="formFields">Player 1:</ControlLabel>
                <FormControl
                  className="formFields"
                  required
                  id="player1"
                  type="text"
                  onChange={this.handleNameChange}
                  value=""
                />
              </FormGroup>
              <FormGroup className="playerName">
                <ControlLabel className="formFields">Player 2:</ControlLabel>
                <FormControl
                  className="formFields"
                  required
                  id="player2"
                  type="text"
                  onChange={this.handleNameChange}
                  value=""
                />
              </FormGroup>
              <Button id="playerFormButton" bsStyle="info" type="submit">
                Begin Game
              </Button>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
