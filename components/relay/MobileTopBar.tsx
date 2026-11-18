import { Logo } from "./Sidebar";
import { Badge, Button } from "./ui";
import { Icon } from "./ui/Icon";
export default function MobileTopBar({ reset }: { reset: () => void }) {
  return (
    <header className="mobile-topbar">
      <Logo />
      <h1>Conversations</h1>
      <Badge ai>DEMO</Badge>
      <Button
        variant="ghost"
        className="reset-icon"
        aria-label="Reset demo"
        onClick={reset}
      >
        <Icon name="reset" />
      </Button>
    </header>
  );
}
