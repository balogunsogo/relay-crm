import { Avatar } from "./ui";
import { Icon } from "./ui/Icon";
export function Logo() {
  return (
    <span className="logo">
      <Icon name="relay" size={21} />
    </span>
  );
}
export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="brand">
        <Logo />
        <span>
          Relay <span className="text-muted">CRM</span>
        </span>
      </div>
      <nav>
        <button
          className="nav-item"
          aria-label="Overview"
          disabled
          title="Not included in this concept demo"
        >
          <Icon name="grid" />
          <span>Overview</span>
        </button>
        <button
          className="nav-item selected"
          aria-current="page"
          aria-label="Conversations"
        >
          <Icon name="chat" />
          <span>Conversations</span>
        </button>
        <button
          className="nav-item"
          aria-label="Contacts"
          disabled
          title="Not included in this concept demo"
        >
          <Icon name="users" />
          <span>Contacts</span>
        </button>
      </nav>
      <div className="rep">
        <Avatar initials="AM" size={28} dark />
        <div>
          <strong>Alex Morgan</strong>
          <span>Sales rep</span>
        </div>
      </div>
    </aside>
  );
}
