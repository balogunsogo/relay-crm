import { SCRIPT, type State, type Tab } from "./demo-data";
export const initialState: State = {
  stage: "new",
  step: 0,
  sent: [],
  draft: "",
  tab: "chat",
};
export type Action =
  | { type: "RUN_AI" | "TICK" | "ASSIGN" | "SEND" | "RESET" }
  | { type: "DRAFT"; value: string }
  | { type: "TAB"; value: Tab };
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RUN_AI":
      return state.stage === "new"
        ? { ...state, stage: "qualifying", step: 0 }
        : state;
    case "TICK":
      return state.stage !== "qualifying"
        ? state
        : state.step < SCRIPT.length
          ? { ...state, step: state.step + 1 }
          : { ...state, stage: "qualified" };
    case "ASSIGN":
      return state.stage === "qualified"
        ? { ...state, stage: "handoff" }
        : state;
    case "DRAFT":
      return state.stage === "handoff"
        ? { ...state, draft: action.value }
        : state;
    case "SEND": {
      const text = state.draft.trim();
      if (state.stage !== "handoff" || !text) return state;
      const minutes = 9 * 60 + 52 + state.sent.length;
      return {
        ...state,
        draft: "",
        sent: [
          ...state.sent,
          {
            text,
            time: `${Math.floor(minutes / 60) % 12 || 12}:${String(minutes % 60).padStart(2, "0")}`,
          },
        ],
      };
    }
    case "RESET":
      return { ...initialState, sent: [] };
    case "TAB":
      return { ...state, tab: action.value };
  }
}
