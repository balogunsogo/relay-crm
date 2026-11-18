import type { ButtonHTMLAttributes, ReactNode } from "react";
import { OWNER, type Stage, type Status } from "../demo-data";
import { Icon } from "./Icon";
export function Button({
  variant = "primary",
  small,
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "secondary" | "ghost";
  small?: boolean;
}) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${small ? "btn-sm" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Avatar({
  initials = "SM",
  size = 36,
  dark = false,
  bordered = false,
}: {
  initials?: string;
  size?: number;
  dark?: boolean;
  bordered?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`avatar ${dark ? "avatar-dark" : ""} ${bordered ? "avatar-bordered" : ""}`}
      style={{
        width: size,
        height: size,
        fontSize: size < 20 ? 8 : size < 36 ? 10 : 13,
      }}
    >
      {initials}
    </span>
  );
}
export function Badge({
  children,
  ai = false,
}: {
  children: ReactNode;
  ai?: boolean;
}) {
  return <span className={`badge ${ai ? "badge-ai" : ""}`}>{children}</span>;
}
const statusClass: Record<Status, string> = {
  "New lead": "new",
  Qualifying: "qualifying",
  Qualified: "qualified",
  Contacted: "contacted",
  "Needs attention": "attention",
};
export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`status status-${statusClass[status]}`}>
      <span className="status-marker" />
      {status}
    </span>
  );
}
export function OwnerBadge({
  stage,
  compact = false,
}: {
  stage: Stage;
  compact?: boolean;
}) {
  const tone = {
    new: "unassigned",
    qualifying: "ai",
    qualified: "ai",
    handoff: "human",
  }[stage];
  return (
    <span className={`owner owner-${tone} ${compact ? "owner-compact" : ""}`}>
      <Icon name={tone === "ai" ? "sparkle" : "user"} size={14} />
      {OWNER[stage]}
    </span>
  );
}
