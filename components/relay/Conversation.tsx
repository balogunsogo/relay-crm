import { useEffect, useRef, type Dispatch } from "react";
import {
  EVENTS,
  FACTS,
  HINT,
  OPENING,
  PLACEHOLDER,
  SCRIPT,
  type ChatMessage,
  type Stage,
  type State,
} from "./demo-data";
import type { Action } from "./state";
import { Avatar, Badge, Button, OwnerBadge } from "./ui";
import { Icon, type IconName } from "./ui/Icon";
function Message({ message }: { message: ChatMessage }) {
  const { speaker, text, time } = message;
  return (
    <div className={`message message-${speaker}`}>
      <div className="message-meta">
        {speaker === "ai" && <Icon name="sparkle" size={13} />}{" "}
        {speaker === "human" && <Avatar initials="AM" size={16} dark />}
        <strong>
          {
            {
              customer: "Sarah Mitchell",
              ai: "Relay AI",
              human: "Alex Morgan",
            }[speaker]
          }
        </strong>
        <span>·</span>
        <time className="mono">{time}</time>
      </div>
      <div className="bubble">{text}</div>
    </div>
  );
}
function SystemEvent({ kind }: { kind: keyof typeof EVENTS }) {
  const event = EVENTS[kind];
  return (
    <div className={`system-event event-${kind}`}>
      <span className="event-rule" />
      <span>
        <Icon
          name={
            kind === "joined"
              ? "sparkle"
              : kind === "qualified"
                ? "check"
                : "userCheck"
          }
          size={14}
        />
        <strong>{event.text}</strong>
        <span className="event-separator">·</span>
        <time className="mono">{event.time}</time>
      </span>
      <span className="event-rule" />
    </div>
  );
}
function RunQualificationCard({ run }: { run: () => void }) {
  return (
    <div className="run-card thread-card">
      <span className="ai-tile">
        <Icon name="sparkle" size={20} />
      </span>
      <h3>New lead · not yet qualified</h3>
      <p>
        Relay AI asks Sarah about team size, budget and timeline, then updates
        the lead. This demo plays a scripted conversation.
      </p>
      <Button variant="accent" className="run-button" onClick={run}>
        <Icon name="sparkle" size={16} />
        Run AI qualification
      </Button>
      <Badge>SIMULATION</Badge>
    </div>
  );
}
function QualifiedCard({
  stage,
  assign,
}: {
  stage: Stage;
  assign: () => void;
}) {
  return (
    <div className="qualified-card thread-card">
      <div className="qualified-heading">
        <span className="success-circle">
          <Icon name="check" size={17} />
        </span>
        <div>
          <h3>Lead qualified</h3>
          <p>3 of 3 facts captured by Relay AI</p>
        </div>
      </div>
      <div className="fact-chips">
        {FACTS.map((fact) => (
          <span key={fact.label}>{fact.value}</span>
        ))}
      </div>
      {stage === "qualified" && (
        <Button className="inline-assign" onClick={assign}>
          <Icon name="userCheck" size={16} />
          Assign to sales
        </Button>
      )}
    </div>
  );
}
function TypingIndicator({ step }: { step: number }) {
  const next = SCRIPT[step];
  return (
    <div className={`message message-${next.speaker} typing`}>
      <div className="bubble">
        <span className="typing-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{next.speaker === "ai" ? "Relay AI" : "Sarah"} is typing</span>
      </div>
    </div>
  );
}
const HINT_ICON: Record<Stage, IconName> = {
  new: "info",
  qualifying: "sparkle",
  qualified: "pause",
  handoff: "user",
};
function Composer({
  state,
  dispatch,
}: {
  state: State;
  dispatch: Dispatch<Action>;
}) {
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch({ type: "SEND" });
      }}
    >
      <p
        className={`composer-hint ${state.stage === "qualifying" ? "text-accent" : ""}`}
      >
        <Icon name={HINT_ICON[state.stage]} size={14} />
        {HINT[state.stage]}
      </p>
      <div className="composer-row">
        <label htmlFor="reply" className="sr-only">
          Reply to Sarah
        </label>
        <input
          id="reply"
          autoComplete="off"
          placeholder={PLACEHOLDER[state.stage]}
          disabled={state.stage !== "handoff"}
          value={state.draft}
          onChange={(event) =>
            dispatch({ type: "DRAFT", value: event.target.value })
          }
        />
        <Button
          type="submit"
          aria-label="Send message"
          className="send-button"
          disabled={state.stage !== "handoff" || !state.draft.trim()}
        >
          <Icon name="arrow" size={20} />
        </Button>
      </div>
    </form>
  );
}
export default function Conversation({
  state,
  dispatch,
}: {
  state: State;
  dispatch: Dispatch<Action>;
}) {
  const thread = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (thread.current) thread.current.scrollTop = thread.current.scrollHeight;
  }, [state.step, state.stage, state.sent.length, state.tab]);
  const completed = state.stage === "qualified" || state.stage === "handoff";
  return (
    <section
      id="panel-chat"
      aria-label="Conversation with Sarah Mitchell"
      className={`conversation panel ${state.tab === "chat" ? "mobile-active" : ""}`}
    >
      <header className="conversation-header">
        <Avatar />
        <div className="contact-heading">
          <h2>Sarah Mitchell</h2>
          <p>BrightPath · Website chat</p>
        </div>
        <div className="header-owner" aria-live="polite">
          <OwnerBadge stage={state.stage} />
        </div>
      </header>
      <div
        className="thread"
        role="log"
        aria-live="polite"
        aria-label="Conversation thread"
        ref={thread}
      >
        <div className="today-label">Today</div>
        <Message message={OPENING} />
        {state.stage === "new" ? (
          <RunQualificationCard run={() => dispatch({ type: "RUN_AI" })} />
        ) : (
          <>
            <SystemEvent kind="joined" />
            {SCRIPT.slice(0, state.step).map((message, index) => (
              <Message message={message} key={index} />
            ))}
            {state.stage === "qualifying" && state.step < SCRIPT.length && (
              <TypingIndicator step={state.step} />
            )}
          </>
        )}
        {completed && (
          <>
            <SystemEvent kind="qualified" />
            <QualifiedCard
              stage={state.stage}
              assign={() => dispatch({ type: "ASSIGN" })}
            />
          </>
        )}
        {state.stage === "handoff" && <SystemEvent kind="handoff" />}
        {state.sent.map((message, index) => (
          <Message
            key={`sent-${index}`}
            message={{ ...message, speaker: "human" }}
          />
        ))}
      </div>
      <Composer state={state} dispatch={dispatch} />
    </section>
  );
}
