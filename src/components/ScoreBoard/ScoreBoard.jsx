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
    if (this.state.player1Points >= 3 || this.state.player2Points >= 3) {
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
      if (this.state.player1Points - this.state.player2Points >= 2) {
        this.gamePointCaculator('player1');
      }
      if (this.state.player2Points - this.state.player1Points >= 2) {
        this.gamePointCaculator('player2');
      }
    }
  };
  gamePointCaculator = player => {
    this.setState(
      prevState => {
        return Object.assign({}, prevState, {
          player1Points: 0,
          player2Points: 0,
          dues: false,
          advantage: '',
          [prevState.currentSet]: Object.assign(
            {},
            prevState[prevState.currentSet],
            { [player]: prevState[prevState.currentSet][player] + 1 }
          )
        });
      },
      () => {
        this.setPointCaculator();
      }
    );
  };
  setPointCaculator = () => {
   
    let setData = this.state[this.state.currentSet];
    if (
      (setData.player1 >= 4 || setData.player2 >= 4) &&
      setData.player1 - setData.player2 >= 2
    ) {
      this.matchSetCalculator('player1Set', 'player1');
    }
    if (
      (setData.player1 >= 4 || setData.player2 >= 4) &&
      setData.player2 - setData.player1 >= 2
    ) {
      this.matchSetCalculator('player2Set', 'player2');
    }
  };
  matchSetCalculator = (playerSet, playerName) => {
    this.setState(
      prevState => {
        return {
          currentSet: prevState.currentSet + 1,
          [playerSet]: prevState[playerSet] + 1
        };
      },
      () => {
        if (this.state[playerSet] >= 2) {
          this.setState({
            message: `${this.props.players[playerName].name} wins!!`,
            stopPlay: true
          });
        }
      }
    );
  };

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
                  {this.state[1].player1}
                </div>
                <div className="scoreBoardContents">
                  {this.state[2].player1}
                </div>
                <div className="scoreBoardContents">
                  {this.state[3].player1}
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
                  {this.state[1].player2}
                </div>
                <div className="scoreBoardContents">
                  {this.state[2].player2}
                </div>
                <div className="scoreBoardContents">
                  {this.state[3].player2}
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
                id="playButton"s
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
    )
  }
}
const mapStateToProps = state => {
  return { players: state.players };
};

export default connect(mapStateToProps)(ScoreBoard);
