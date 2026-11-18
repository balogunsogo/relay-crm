import { LEADS, OPENING, SCRIPT, STATUS, type State } from "./demo-data";
import { Avatar, StatusPill } from "./ui";
import { Icon } from "./ui/Icon";
export default function InboxList({
  state,
  select,
}: {
  state: State;
  select: () => void;
}) {
  const last = state.sent.length
    ? { ...state.sent.at(-1)!, speaker: "human" }
    : state.step > 0
      ? SCRIPT[state.step - 1]
      : OPENING;
  const prefix =
    last.speaker === "ai"
      ? "Relay AI: "
      : last.speaker === "human"
        ? "Alex: "
        : "";
  const leads = [
    {
      name: "Sarah Mitchell",
      initials: "SM",
      company: "BrightPath",
      preview: prefix + last.text,
      time: last.time,
      status: STATUS[state.stage],
      unread: state.stage === "new",
    },
    ...LEADS,
  ];
  return (
    <section
      id="panel-inbox"
      aria-label="Inbox"
      className={`inbox panel ${state.tab === "inbox" ? "mobile-active" : ""}`}
    >
      <div className="inbox-header">
        <div className="flex items-center justify-between">
          <h2>Inbox</h2>
          <span className="mono text-muted">4 open</span>
        </div>
        <div className="search">
          <Icon name="search" size={16} />
          <label className="sr-only" htmlFor="search">
            Search conversations (display only)
          </label>
          <input
            id="search"
            placeholder="Search conversations"
            readOnly
            aria-disabled="true"
          />
        </div>
      </div>
      <div className="lead-list">
        {leads.map((lead, index) => (
          <button
            key={lead.name}
            className={`lead-row ${index === 0 ? "lead-selected" : ""}`}
            onClick={index === 0 ? select : undefined}
            disabled={index > 0}
            aria-label={`${lead.name}, ${lead.company}, ${lead.status}${index > 0 ? ", display only" : ""}`}
            aria-current={index === 0 ? "true" : undefined}
          >
            <Avatar initials={lead.initials} />
            <span className="lead-copy">
              <span className="lead-top">
                <strong>{lead.name}</strong>
                {lead.unread && <span className="unread" />}
                <time className="mono">{lead.time}</time>
              </span>
              <span className="company">{lead.company}</span>
              <span className="preview">{lead.preview}</span>
              <StatusPill status={lead.status} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
