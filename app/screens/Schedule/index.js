import React, { Component } from 'react';
import Modal from 'react-modal';
import StyleSheet from 'react-style';
import { Styles, Links } from 'helpers/constants';
import ScheduleData from '../../../api/schedule';
import SpeakerData from '../../../api/speakers';
import Session from './components/Session';

Modal.setAppElement(document.getElementById('container'));
Modal.injectCSS();

const poleColor = 'rgb(50, 96, 124)';
const STYLES = StyleSheet.create({
  section: {
    background: `url(assets/dist/img/weatheredBackground.png) ${Styles.BG_COLOR_SCHEDULE}`,
    paddingBottom: 150
  },
  container: {
    position: 'relative',
    padding: 0,
    minHeight: 3600
  },
  h2: {
    color: Styles.FONT_COLOR_SCHEDULE
  },
  img: {
    position: 'absolute',
    left: -100
  },
  a: {
    color: Styles.FONT_COLOR_SCHEDULE
  },
  pole: {
    width: 4,
    marginLeft: -2,
    backgroundColor: poleColor,
    position: 'absolute',
    top: -15,
    bottom: -15,
    left: '50%'
  },
  poleTopOuter: {
    width: 75,
    height: 75,
    borderRadius: 75,
    marginLeft: -37,
    border: '7px solid ' + poleColor,
    padding: 7,
    position: 'absolute',
    top: -75,
    left: '50%'
  },
  poleTopInner: {
    width: 47,
    height: 47,
    borderRadius: 47,
    backgroundColor: poleColor
  },
  poleBottomOuter: {
    width: 75,
    height: 75,
    borderRadius: 75,
    marginLeft: -37,
    border: '2px solid ' + poleColor,
    padding: 10,
    position: 'absolute',
    bottom: -75,
    left: '50%'
  },
  poleBottomInner: {
    width: 51,
    height: 51,
    borderRadius: 51,
    border: '6px solid ' + poleColor
  },
  orientLeft: {
    float: 'left',
    width: '50%'
  },
  orientRight: {
    float: 'right',
    width: '50%',
    marginTop: 125
  },
  dayHeader: {
    marginLeft: 100,
    marginBottom: 50,
    color: poleColor
  },
  modal__content: {
    position: 'relative',
    height: 500
  },
  modal__header: {
    margin: 0,
    padding: 20,
    borderBottom: '1px solid #aaa'
  },
  modal__speaker: {
    color: '#aaa',
    marginLeft: 10
  },
  modal__description: {
    padding: 20
  },
  modal__toolbar: {
    padding: 20,
    borderTop: '1px solid #aaa',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'right'
  }
});

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSessionClick(session) {
    this.setState({
      isModalOpen: true,
      session
    });
  }

  handleCloseModalClick() {
    this.setState({ isModalOpen: false });
  }

  handleModalRequestClose() {
    this.setState({ isModalOpen: false });
  }

  renderSessions(which) {
    return ScheduleData[which].map((session, index) => {
      var speaker = SpeakerData[session.speaker];
      return <Session
        key={index}
        orient={which === 'dayOne' ? 'left' : 'right'}
        session={session}
        speaker={speaker}
        onClick={speaker ? this.handleSessionClick.bind(this) : null}
      />;
    });
  }

  renderModal() {
    if (!this.state.isModalOpen) {
      return null;
    }

    var session = this.state.session;
    var speaker = SpeakerData[session.speaker];

    return (
      <div style={STYLES.modal__content}>
        <h4 style={STYLES.modal__header}>
          {session.title}
          <small style={STYLES.modal__speaker}>by {speaker.name}</small>
        </h4>
        <p
          style={STYLES.modal__description}
          dangerouslySetInnerHTML={{__html: session.description.replace(/\n/g, '<br/>')}}
        />
        <div style={STYLES.modal__toolbar}>
          <button
            type="button"
            onClick={this.handleCloseModalClick.bind(this)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section id="schedule" style={STYLES.section}>
        <h2 style={STYLES.h2}>Schedule</h2>
        <img src="assets/dist/img/cropCircle.png" style={STYLES.img}/>
        <div style={STYLES.container}>
          <div className="Schedule__pole">
            <div style={STYLES.pole}></div>
            <div style={STYLES.poleTopOuter}>
              <div style={STYLES.poleTopInner}></div>
            </div>
            <div style={STYLES.poleBottomOuter}>
              <div style={STYLES.poleBottomInner}></div>
            </div>
          </div>
          <div style={STYLES.orientLeft} className="dayOne">
            <h3 style={STYLES.dayHeader}>Sunday, August 23rd, 2015</h3>
            <Session orient="left" session={{time: "6:00", title: "Speaker Dinner"}}/>
            <h3 style={STYLES.dayHeader}>Monday, August 24th, 2015</h3>
            {this.renderSessions("dayOne")}
            <h3 style={STYLES.dayHeader}>Wednesday, August 26th, 2015</h3>
            <Session orient="left" session={{time: "9:00", title: "Workshop Day One"}}/>
          </div>
          <div style={STYLES.orientRight} className="dayTwo">
            <h3 style={STYLES.dayHeader}>Tuesday, August 25th, 2015</h3>
            {this.renderSessions("dayTwo")}
            <h3 style={STYLES.dayHeader}>Thursday, August 27th, 2015</h3>
            <Session orient="right" session={{time: "9:00", title: "Workshop Day Two"}}/>
          </div>
        </div>
        <Modal
          closeTimeoutMS={150}
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleModalRequestClose.bind(this)}
        >
          {this.renderModal()}
        </Modal>
      </section>
    );
  }
}
