import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

function updateCallsCount(count, suffix, callType) {
  if (suffix == "BEGIN_API_CALL") {
    console.log(
      `updateApiCallsCount, increment ${count}, type: ${callType}, suffix: ${suffix}`
    );
    return count + 1;
  } else if (suffix == "API_CALL_ERROR" || actionTypeEndsInSuccess(suffix)) {
    console.log(
      `updateApiCallsCount, decrement ${count}, type: ${callType}, suffix: ${suffix}`
    );
    return count - 1;
  }

  console.log(
    `updateApiCallsCount, no change ${count}, type: ${callType}, suffix: ${suffix}`
  );
  return count;
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  const callType = action.type.substring(0, action.type.indexOf("_"));
  const callTypeSuffix = action.type.substring(action.type.indexOf("_") + 1);

  /*  console.log(
    `apiCallStatusReducer, action: ${JSON.stringify(
      action
    )}\n state: ${JSON.stringify(state)}\n ${callType} / ${callTypeSuffix}`
  );*/

  switch (callType) {
    case "WEBEX":
      return {
        ...state,
        webexApiCallsInProgress: updateCallsCount(
          state.webexApiCallsInProgress,
          callTypeSuffix,
          callType
        ),
      };
    case "O365":
      return {
        ...state,
        o365ApiCallsInProgress: updateCallsCount(
          state.o365ApiCallsInProgress,
          callTypeSuffix,
          callType
        ),
      };
    case "DEVICE":
      return {
        ...state,
        deviceApiCallsInProgress: updateCallsCount(
          state.deviceApiCallsInProgress,
          callTypeSuffix,
          callType
        ),
      };
    default:
      return state;
  }
}
