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
      service: '',
      player1Points: 0,
      player2Points: 0,
      player1Set: 0,
      player2Set: 0,
      1: { player1: 0, player2: 0 },
      2: { player1: 0, player2: 0 },
      3: { player1: 0, player2: 0 },
      currentSet: 1,
      advantage: '',
      dues: false,
    }
    this.handleToss = this.handleToss.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
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

  handlePlay() {
    const player1Random = Math.random();
    const player2Random = Math.random();
    this.setState({ message: '' });
    this.setState(
      prevState => {
        let pointWinner =
          player1Random > player2Random ? 'player1Points' : 'player2Points';

        return { [pointWinner]: prevState[pointWinner] + 1 };
      },
      () => {
        this.handleScoreIncrement();
      }
    );
  }

  handleScoreIncrement = () => {
    if (this.state.player1Points >= 4 || this.state.player2Points >= 4) {
      if (this.state.player1Points === this.state.player2Points) {
        this.setState({ dues: true, advantage: '' });
      }
    }
    if (this.state.player1Points > 3 || this.state.player2Points > 3) {
      if (this.state.player1Points - this.state.player2Points >= 1) {
        this.setState({ advantage: 'player1', dues: false });
      }
      if (this.state.player2Points - this.state.player1Points >= 1) {
        this.setState({ advantage: 'player2', dues: false });
      }
    }
  }

  render() {
    const points = { 0: 'LOVE', 1: 15, 2: 30, 3: 40 };
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
                {points.hasOwnProperty(this.state.player1Points)
                  ? points[this.state.player1Points]
                  : 40}
              </div>
              <div className="scoreBoardContents">
              {this.state.advantage === 'player1'
                    ? 'Advantage'
                    : this.state.dues
                    ? 'D'
                    : ''}
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
                  {points.hasOwnProperty(this.state.player2Points)
                    ? points[this.state.player2Points]
                    : 40}
              </div>
              <div className="scoreBoardContents">
                {this.state.advantage === 'player2'
                    ? 'Advantage'
                    : this.state.dues
                    ? 'D'
                    : ''}
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
                onClick={this.handlePlay}
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
