export type Stage = "new" | "qualifying" | "qualified" | "handoff";
export type Tab = "inbox" | "chat" | "details";
export type Speaker = "customer" | "ai" | "human";
export type ChatMessage = { speaker: Speaker; text: string; time: string };
export type State = {
  stage: Stage;
  step: number;
  sent: { text: string; time: string }[];
  draft: string;
  tab: Tab;
};
export type Status =
  "New lead" | "Qualifying" | "Qualified" | "Contacted" | "Needs attention";
export const STATUS: Record<Stage, Status> = {
  new: "New lead",
  qualifying: "Qualifying",
  qualified: "Qualified",
  handoff: "Qualified",
};
export const OWNER = {
  new: "Unassigned",
  qualifying: "AI · Relay Assistant",
  qualified: "AI · Relay Assistant",
  handoff: "Human · Alex Morgan",
};
export const NEXT = {
  new: {
    title: "Qualify Sarah",
    body: "Run AI qualification from the conversation.",
    due: "Now",
  },
  qualifying: {
    title: "Relay AI is qualifying",
    body: "Facts fill in as Sarah answers.",
    due: "In progress",
  },
  qualified: {
    title: "Assign to sales",
    body: "Hand Sarah to a rep while she's engaged.",
    due: "Now",
  },
  handoff: {
    title: "Alex to book a demo",
    body: "Send an intro and offer demo times.",
    due: "Today",
  },
};
export const HINT = {
  new: "Assign this lead to reply as a human.",
  qualifying: "Relay AI is handling this conversation.",
  qualified: "AI has finished. Assign to sales to reply.",
  handoff: "Replying as Alex Morgan",
};
export const PLACEHOLDER = {
  new: "Run AI qualification or assign to reply",
  qualifying: "Relay AI is replying…",
  qualified: "Assign to sales to reply",
  handoff: "Reply to Sarah…",
};
export const OPENING: ChatMessage = {
  speaker: "customer",
  time: "9:41",
  text: "Hi, we're looking for a CRM for our sales team. Can someone tell me more about Relay?",
};
export const SCRIPT: ChatMessage[] = [
  {
    speaker: "ai",
    time: "9:42",
    text: "Hi Sarah, thanks for reaching out. I'm Relay's assistant. A few quick questions so we can connect you with the right person. How many people on your sales team would use the CRM?",
  },
  {
    speaker: "customer",
    time: "9:42",
    text: "We have 15 sales reps right now.",
  },
  {
    speaker: "ai",
    time: "9:43",
    text: "Got it. Do you have a monthly budget in mind?",
  },
  {
    speaker: "customer",
    time: "9:43",
    text: "Somewhere between $500 and $1,000 a month.",
  },
  {
    speaker: "ai",
    time: "9:44",
    text: "Thanks. And when are you hoping to get started?",
  },
  {
    speaker: "customer",
    time: "9:44",
    text: "Ideally within the next 30 days.",
  },
  {
    speaker: "ai",
    time: "9:45",
    text: "That's everything I need. I'll connect you with someone from our sales team today.",
  },
];
export const FACTS = [
  {
    label: "Team size",
    value: "15 sales reps",
    step: 2,
    icon: "users",
    width: "55%",
  },
  {
    label: "Monthly budget",
    value: "$500–$1,000 / month",
    step: 4,
    icon: "dollar",
    width: "75%",
  },
  {
    label: "Timeline",
    value: "Within 30 days",
    step: 6,
    icon: "calendar",
    width: "45%",
  },
] as const;
export const SUMMARY =
  "BrightPath needs a CRM for 15 sales reps, has a budget of $500–$1,000 a month and wants to start within 30 days. Clear need, confirmed budget, near-term timeline.";
export const LEADS: {
  name: string;
  company: string;
  time: string;
  preview: string;
  status: Status;
  unread: boolean;
  initials: string;
}[] = [
  {
    name: "Olivia Chen",
    company: "Atlas Commerce",
    time: "9:15",
    preview: "Is there a discount for annual billing?",
    status: "Needs attention",
    unread: true,
    initials: "OC",
  },
  {
    name: "Marcus Lee",
    company: "Northstar Labs",
    time: "Yesterday",
    preview: "Thanks, I'll share the pricing page with my team.",
    status: "Contacted",
    unread: false,
    initials: "ML",
  },
  {
    name: "Daniel Brooks",
    company: "Meridian",
    time: "Mon",
    preview: "Sounds good, see you at the demo on Thursday.",
    status: "Qualified",
    unread: false,
    initials: "DB",
  },
];
export const EVENTS = {
  joined: { text: "Relay AI joined the conversation", time: "9:42" },
  qualified: { text: "Lead marked Qualified", time: "9:45" },
  handoff: { text: "Assigned to Alex Morgan · AI paused", time: "9:46" },
};
export const ACTIVITY = [
  { text: "Lead created from website chat", time: "9:41", tone: "created" },
  { text: "AI qualification started", time: "9:42", tone: "ai" },
  {
    text: "Marked Qualified · 3 facts captured",
    time: "9:45",
    tone: "success",
  },
  { text: "Assigned to Alex Morgan", time: "9:46", tone: "human" },
];
