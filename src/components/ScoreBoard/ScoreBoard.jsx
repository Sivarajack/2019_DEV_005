import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import './ScoreBoard.css';

// This component handles core functionality of calculating score and decides winner.

export class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toss: false,
      message: "",
      service: ''
    }
    this.handleToss = this.handleToss.bind(this);
  };
  handleToss() {
    const player1Random = Math.random();
    const player2Random = Math.random();
    let resultantPlayer = player1Random > player2Random ? 'player1' : 'player2';
    this.setState({
      toss: true,
      service: resultantPlayer,
      message: `${this.props.players[resultantPlayer].name} serves`
    });
  }

  render() {
    const { players } = this.props;
    return (
      <div>
        <div id="scoreBoardContainer">
        <Panel id="scoreBoardPanel">
          <Panel.Body>
            <div id="scoreBoardHeader">
              <div className="scoreBoardContents">Player</div>
              <div className="scoreBoardContents">Set1</div>
              <div className="scoreBoardContents">Set2</div>
              <div className="scoreBoardContents">Set3</div>
              <div className="scoreBoardContents">Points</div>
              <div className="scoreBoardContents" />
            </div>
            <div id="scoreBoardPlayer1">
              <div className="scoreBoardContents">{players.player1.name}</div>
              <div className="scoreBoardContents">

              </div>
              <div className="scoreBoardContents">

              </div>
              <div className="scoreBoardContents">

              </div>

              <div className="scoreBoardContents">

              </div>
              <div className="scoreBoardContents">

              </div>
            </div>
            <div id="scoreBoardPlayer2">
              <div className="scoreBoardContents">{players.player2.name}</div>
              <div className="scoreBoardContents">

              </div>
              <div className="scoreBoardContents">

              </div>
              <div className="scoreBoardContents">

              </div>

              <div className="scoreBoardContents">

              </div>
              <div className="scoreBoardContents">

              </div>
            </div>
          </Panel.Body>
        </Panel>
        <div id="buttonContainer">
            {this.state.toss ? (
              <Button
                id="playButton"
                bsStyle="info"
                bsSize="large"
                onClick={this.handleServe}
                className="scoreboardButton"
                disabled={this.state.stopPlay}>
                Play
              </Button>
            ) : (
              <Button
                id="tossButton"
                bsStyle="info"
                bsSize="large"
                onClick={this.handleToss}
                className="scoreboardButton">
                Toss
              </Button>
            )}
          </div>
        </div>
        <h3>{this.state.message}</h3>
      </div>
     

    );
  }
}
const mapStateToProps = state => {
  return { players: state.players };
};

export default connect(mapStateToProps)(ScoreBoard);
