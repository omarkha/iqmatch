import React, { useEffect, useState } from "react";
import "../styles/app.css";
import { useStopwatch } from "react-timer-hook";
import ActionEvent from "../components/ActionEvent";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";

const AppPage = () => {
  const data = useSelector(actions);
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [videoElement, setVideoElement] = useState();
  const [isPaused, setIsPaused] = useState(true);

  const [videoId, setVideoId] = useState("");

  const onSearch = () => {
    setVideoId(url.split("=")[1]);
  };

  const _onReady = (event) => {
    setVideoElement(event);
  };

  const toggleVideo = () => {
    if (!isPaused) {
      videoElement.target.pauseVideo();
    } else {
      videoElement.target.playVideo();
    }
  };

  const opts = {
    height: "62.8vh",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const [eventData, setEventData] = useState([{}]);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const [clockBtnText, setClockBtnText] = useState("Start Clock");

  const handleClock = () => {
    if (isRunning) {
      pause();
      setIsPaused(true);
      setClockBtnText("Resume Clock");
      toggleVideo();
    } else {
      start();
      setIsPaused(false);
      setClockBtnText("Pause Clock");
      toggleVideo();
    }
  };

  const [newTime, setNewTime] = useState("0:0");
  const [player, setPlayer] = useState(0);
  const [action_result, setActionResult] = useState("None");
  const [action_type, setActionType] = useState("None");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const resetData = () => {
    setSelectedIndex(eventData.length);
    setNewTime("0:0");
    setPlayer(0);
    setActionResult("None");
    setActionType("None");
  };

  const addActionEvent = () => {
    resetData();
    const time = String(minutes + ":" + seconds);
    const newData = [
      {
        action_type: action_type,
        action_result: action_result,
        time: time,
        player: player,
        index: eventData.length,
      },
      ...eventData,
    ];
    setEventData(newData);
  };

  const publishData = (data) => {
    setEventData(data);
  };
  const [selectedInfo, setSelectedInfo] = useState("");
  const handleActionEventCallback = (index) => {
    eventData.forEach((e) => {
      if (e.index === index) {
        setPlayer(e.player);
        setActionResult(e.action_result);
        setActionType(e.action_type);
        setNewTime(e.time);
        setSelectedIndex(e.index);
        setSelectedInfo(
          e.index +
            " --:-- " +
            e.action_type +
            " - " +
            e.time +
            " - " +
            e.action_result +
            " - P#" +
            e.player
        );
      }
    });
  };

  const handleActionType = (type) => {
    setActionType(type);
    changeItemData();
  };

  const handleActionResult = (result) => {
    setActionResult(result);
    changeItemData();
  };

  const handlePlayer = (input) => {
    setPlayer(input);
    changeItemData();
  };

  const changeItemData = () => {
    const newData = eventData.map((e) => {
      if (e.index === selectedIndex) {
        return {
          index: e.index,
          player: player,
          action_result: action_result,
          action_type: action_type,
          time: String(newTime),
        };
      } else {
        return { ...e };
      }
    });

    setEventData(newData);
  };

  return (
    <div className="app-page">
      <div className="container">
        <div className="search-section">
          <input
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            id="search-bar"
            type="text"
            placeholder="YouTube video"
          />
          <button onClick={() => onSearch()} type="submit">
            Get Video
          </button>
        </div>
        <div className="video-section">
          <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
        </div>
        <div className="top-section">
          <div className="controls-section">
            <div className="main-controls">
              <button id="add-event-btn" onClick={() => addActionEvent()}>
                Add Event
              </button>
              <button onClick={() => handleClock()} id="start-clock-btn">
                {clockBtnText}
              </button>
            </div>
            <div className="action-types">
              <button onClick={() => handleActionType("Pass")} id="pass-btn">
                PASS
              </button>
              <button onClick={() => handleActionType("Tackle")} id="cut-btn">
                TACKLE
              </button>
              <button
                onClick={() => handleActionType("Dribble")}
                id="dribble-btn"
              >
                DRIBBLE
              </button>
              <button onClick={() => handleActionType("Shot")} id="shot-btn">
                SHOT
              </button>
              <button onClick={() => handleActionType("Cross")} id="cross-btn">
                CROSS
              </button>
            </div>
            <div className="action-results">
              <button onClick={() => handleActionResult("S")} id="success-btn">
                Success
              </button>
              <button onClick={() => handleActionResult("F")} id="fail-btn">
                Fail
              </button>
              <input
                onChange={(e) => handlePlayer(e.target.value)}
                type="text"
                placeholder="Player #"
              />
            </div>
            <h6>Selected: {selectedInfo}</h6>
          </div>
          <div className="action-table">
            {eventData.map((e, i) => {
              return (
                <ActionEvent
                  time={e.time}
                  index={e.index}
                  action_result={e.action_result}
                  action_type={e.action_type}
                  player={e.player}
                  handleActionEventCallback={handleActionEventCallback}
                  key={"k" + i}
                />
              );
            })}
          </div>
          <div className="timing-section">
            <label>Clock</label>
            <input type="text" value={minutes + ":" + seconds} />
            <label>Set Time</label>
            <input
              type="text"
              placeholder="set event time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
