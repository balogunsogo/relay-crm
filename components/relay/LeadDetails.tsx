import {
  ACTIVITY,
  FACTS,
  NEXT,
  STATUS,
  SUMMARY,
  type Stage,
  type State,
} from "./demo-data";
import { Avatar, Button, OwnerBadge, StatusPill } from "./ui";
import { Icon } from "./ui/Icon";
function FactRow({
  fact,
  state,
}: {
  fact: (typeof FACTS)[number];
  state: State;
}) {
  const captured = state.step >= fact.step;
  return (
    <div className={`fact-row ${captured ? "fact-captured" : ""}`}>
      <span className="fact-icon">
        <Icon name={fact.icon} size={17} />
      </span>
      <div>
        <span className="fact-label">{fact.label}</span>
        {captured ? (
          <strong>{fact.value}</strong>
        ) : state.stage === "qualifying" ? (
          <span
            className="skeleton"
            style={{ width: fact.width }}
            aria-label="Waiting for Sarah's answer"
          />
        ) : (
          <span className="not-asked">Not asked yet</span>
        )}
      </div>
      {captured && <Icon className="text-success" name="check" size={16} />}
    </div>
  );
}
function NextAction({ stage, assign }: { stage: Stage; assign: () => void }) {
  const copy = NEXT[stage];
  return (
    <section className="details-section">
      <h3 className="overline">Next action</h3>
      <div className={`next-card next-${stage}`}>
        <div className="flex items-start justify-between gap-2">
          <h4>{copy.title}</h4>
          <span className="mono due">{copy.due}</span>
        </div>
        <p>{copy.body}</p>
        {stage === "qualified" && (
          <Button onClick={assign}>
            <Icon name="userCheck" size={16} />
            Assign to sales
          </Button>
        )}
      </div>
    </section>
  );
}
function ActivityList({ stage }: { stage: Stage }) {
  const count = { new: 1, qualifying: 2, qualified: 3, handoff: 4 }[stage];
  return (
    <section className="details-section">
      <h3 className="overline">Activity</h3>
      <ol className="activity-list">
        {ACTIVITY.slice(0, count)
          .reverse()
          .map((event) => (
            <li key={event.time}>
              <span className={`activity-ring ring-${event.tone}`} />
              <span>{event.text}</span>
              <time className="mono">{event.time}</time>
            </li>
          ))}
      </ol>
    </section>
  );
}
export default function LeadDetails({
  state,
  assign,
}: {
  state: State;
  assign: () => void;
}) {
  const count = FACTS.filter((fact) => state.step >= fact.step).length;
  return (
    <aside
      id="panel-details"
      aria-label="Lead details"
      className={`details panel ${state.tab === "details" ? "mobile-active" : ""}`}
    >
      <section className="contact-section">
        <div className="details-contact">
          <Avatar size={44} bordered />
          <div>
            <h2>Sarah Mitchell</h2>
            <p>BrightPath</p>
          </div>
        </div>
        <dl className="contact-data">
          <dt>Status</dt>
          <dd aria-live="polite">
            <StatusPill status={STATUS[state.stage]} />
          </dd>
          <dt>Owner</dt>
          <dd aria-live="polite">
            <OwnerBadge stage={state.stage} compact />
          </dd>
          <dt>Email</dt>
          <dd>sarah@brightpath.example</dd>
          <dt>Source</dt>
          <dd>Website chat</dd>
          <dt>Created</dt>
          <dd>Today, 9:41</dd>
        </dl>
      </section>
      <section className="details-section">
        <div className="section-heading">
          <h3 className="overline">Qualification</h3>
          <span className="mono text-muted" aria-live="polite">
            {count} of 3
          </span>
        </div>
        <div className="facts">
          {FACTS.map((fact) => (
            <FactRow key={fact.label} fact={fact} state={state} />
          ))}
        </div>
        {(state.stage === "qualified" || state.stage === "handoff") && (
          <div className="ai-summary">
            <h4>
              <Icon name="sparkle" size={14} />
              AI summary
            </h4>
            <p>{SUMMARY}</p>
          </div>
        )}
      </section>
      <NextAction stage={state.stage} assign={assign} />
      <ActivityList stage={state.stage} />
    </aside>
  );
}
