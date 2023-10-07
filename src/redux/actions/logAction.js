import * as types from "../actions/actionTypes";
import * as logLevels from "../../constants/logLevels";

export function log({ message, level, source }) {
  const now = new Date();
  let logFunction = console.log;
  switch (level) {
    case logLevels.ERROR:
      logFunction = console.error;
      break;
    case logLevels.WARN:
      logFunction = console.warn;
      break;
    case logLevels.INFO:
      logFunction = console.info;
      break;
  }

  logFunction(`${source}: ${message}`);
  return {
    type: types.LOG_ADD,
    log: { timeStamp: now.toISOString(), source, level, message },
  };
}
