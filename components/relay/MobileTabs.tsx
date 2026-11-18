import type { Stage, Tab } from "./demo-data";
const TABS: { id: Tab; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "chat", label: "Chat" },
  { id: "details", label: "Details" },
];
export default function MobileTabs({
  tab,
  stage,
  select,
}: {
  tab: Tab;
  stage: Stage;
  select: (tab: Tab) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Conversation panels"
      className="mobile-tabs"
    >
      {TABS.map(({ id, label }, index) => (
        <button
          id={`tab-${id}`}
          key={id}
          role="tab"
          aria-selected={tab === id}
          aria-controls={`panel-${id}`}
          tabIndex={tab === id ? 0 : -1}
          onClick={() => select(id)}
          onKeyDown={(event) => {
            let target: number | undefined;
            if (event.key === "ArrowRight") target = (index + 1) % 3;
            if (event.key === "ArrowLeft") target = (index + 2) % 3;
            if (event.key === "Home") target = 0;
            if (event.key === "End") target = 2;
            if (target !== undefined) {
              event.preventDefault();
              select(TABS[target].id);
              document.getElementById(`tab-${TABS[target].id}`)?.focus();
            }
          }}
        >
          {label}
          {id === "details" && stage === "qualified" && tab !== "details" && (
            <span className="tab-dot" aria-label="Lead qualified" />
          )}
        </button>
      ))}
    </div>
  );
}
