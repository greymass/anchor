const initialState = {
  log: [],
};

export default function systemlog(state = initialState, action) {
  const { payload, type } = action;

  const matches = /^(.*)_(PENDING|SUCCESS|FAILURE)$/.exec(type);
  if (!matches) return state;

  const [, , requestState] = matches;

  const recentLog = [...state.log];
  recentLog.unshift({
    when: new Date().toISOString(),
    payload,
    requestState,
    type,
  });
  return Object.assign({}, state, {
    log: recentLog.slice(0, 1000)
  });
}
