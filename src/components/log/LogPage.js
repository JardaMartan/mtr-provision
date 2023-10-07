import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LogEntry from "./LogEntry";

const LogPage = ({ log }) => {
  const logEndRef = useRef(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // console.log(`LogPage, log: ${JSON.stringify(log)}`);
  return (
    <div>
      <h4>Activity Log</h4>
      <div className="scrollable">
        {log.map((entry, index) => (
          <div key={index}>
            <LogEntry
              timeStamp={entry.timeStamp}
              source={entry.source}
              level={entry.level}
              message={entry.message}
            />
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

LogPage.propTypes = {
  log: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    log: state.log,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LogPage);
