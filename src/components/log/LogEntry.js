import React from "react";
import PropTypes from "prop-types";
import "../common/LogFormat.css";
import "../common/MonospacedText.css";
// import * as logLevels from "../../constants/logLevels";

const LogEntry = ({ timeStamp, source, level, message }) => {
  /*  console.log(
    `LogEntry, timeStamp: ${timeStamp}, source: ${source}, level: ${level}, message: ${message}`
  );*/
  let levelClass;
  switch (level) {
    case "info":
      levelClass = "";
      break;
    case "warn":
      levelClass = "warn";
      break;
    case "error":
      levelClass = "error";
      break;
    default:
      levelClass = "";
  }
  return (
    <div className={levelClass}>
      <span className="log-entry-time monospaced">{timeStamp}</span>
      <span className="log-entry-source monospaced">{source}</span>
      <span className="log-entry-level monospaced">{level}</span>
      <span className="log-entry-message monospaced">{message}</span>
    </div>
  );
};

LogEntry.propTypes = {
  timeStamp: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default LogEntry;
