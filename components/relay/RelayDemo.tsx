"use client";
import { useEffect, useReducer, useRef } from "react";
import { initialState, reducer } from "./state";
import Sidebar from "./Sidebar";
import MobileTopBar from "./MobileTopBar";
import MobileTabs from "./MobileTabs";
import InboxList from "./InboxList";
import Conversation from "./Conversation";
import LeadDetails from "./LeadDetails";
import { Badge, Button } from "./ui";
import { Icon } from "./ui/Icon";
export default function RelayDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (state.stage === "qualifying")
      timer.current = setInterval(() => dispatch({ type: "TICK" }), 1300);
    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [state.stage]);
  function reset() {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    dispatch({ type: "RESET" });
  }
  return (
    <main className="app-shell">
      <Sidebar />
      <div className="workspace">
        <header className="workspace-header">
          <h1>Conversations</h1>
          <Badge ai>
            <Icon name="sparkle" size={12} />
            SIMULATED AI
          </Badge>
          <span className="header-note">Demo data · scripted conversation</span>
          <Button variant="secondary" small onClick={reset}>
            <Icon name="reset" size={14} />
            Reset demo
          </Button>
        </header>
        <MobileTopBar reset={reset} />
        <MobileTabs
          tab={state.tab}
          stage={state.stage}
          select={(value) => dispatch({ type: "TAB", value })}
        />
        <div className="panels">
          <InboxList
            state={state}
            select={() => dispatch({ type: "TAB", value: "chat" })}
          />
          <Conversation state={state} dispatch={dispatch} />
          <LeadDetails
            state={state}
            assign={() => dispatch({ type: "ASSIGN" })}
          />
        </div>
      </div>
    </main>
  );
}
