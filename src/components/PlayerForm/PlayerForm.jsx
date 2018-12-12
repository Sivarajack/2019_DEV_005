import React from 'react';
import './PlayerForm.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';
import {
  addPlayerName
} from '../../Redux/actions/player-form-actions';

// this component handles function of getting player names and
// store it in application state via Redux

export class PlayerForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleNameChange(event) {
    const playerId = event.target.id;
    const { addPlayerName } = this.props;
    addPlayerName({ id: [playerId], value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
      }
  render() {
    const { players } = this.props;
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
                  value={players.player1.name || ''}
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
                  value={players.player2.name || ''}
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
const mapStateToProps = state => {
  return {
    players: state.players
  };
};
const mapDipatchToProps = dispatch => {
  return {
    addPlayerName: payload => dispatch(addPlayerName(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(PlayerForm);
