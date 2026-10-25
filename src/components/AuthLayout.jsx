
import { Link } from "react-router-dom";
import {
  MessageCircle,
  MessageSquare,
  Users,
} from "lucide-react";

export default function AuthLayout({
  children,
  title,
  description,
}) {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-promo">
          <Link to="/" className="brand promo-brand">
            <span className="brand-mark">
              <MessageCircle size={19} fill="white" />
            </span>
            ChatConnect
          </Link>

          <div className="promo-copy">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <div className="promo-illustration">
            <div className="illustration-message message-a">
              <span>•••</span>
            </div>
            <div className="illustration-message message-b">
              <span>☰</span>
            </div>
            <div className="illustration-users">
              <Users size={34} />
            </div>
            <span className="illustration-dot dot-a" />
            <span className="illustration-dot dot-b" />
            <span className="illustration-dot dot-c" />
          </div>

          <div className="promo-bottom">
            <span><MessageSquare size={15} /></span>
            Your conversations, all in one place.
          </div>
        </aside>

        <section className="auth-form-panel">
          {children}
        </section>
      </section>
    </main>
  );
}
