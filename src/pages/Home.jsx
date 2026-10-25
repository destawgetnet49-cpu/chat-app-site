
import { Link } from "react-router-dom";
import {
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Users,
  Smartphone,
  Send,
} from "lucide-react";

export default function Home() {
  return (
    <main className="home-page">
      <nav className="home-nav">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <MessageCircle size={19} fill="white" />
          </span>
          ChatConnect
        </Link>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-auth">
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/register" className="nav-register">
            Register
          </Link>
        </div>
      </nav>

      <section className="home-hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">YOUR PEOPLE, ONE PLACE</span>
          <h1>
            Connect with
            <br />
            Your People
          </h1>

          <p>
            Fast, simple and secure chat application.
            Stay in touch with your friends, family and
            team — anytime, anywhere.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-green">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
          </div>

          <div className="hero-note">
            <ShieldCheck size={17} />
            Simple conversations. Meaningful connections.
          </div>
        </div>

        <div className="hero-art">
          <div className="art-glow" />
          <div className="floating-bubble bubble-one">
            <MessageCircle size={21} />
          </div>
          <div className="phone-mockup">
            <div className="phone-notch" />
            <div className="phone-content">
              <div className="mock-brand">ChatConnect</div>
              {["Sarah Ahmed", "Abel Kebede", "Team Dev", "Mekdes Alemu"].map(
                (name, index) => (
                  <div className="mock-contact" key={name}>
                    <span className={`mock-avatar avatar-${index}`}>
                      {name[0]}
                    </span>
                    <span>
                      <strong>{name}</strong>
                      <small>
                        {["Hey! How are you?", "Thank you!", "Sounds good!", "See you soon"][index]}
                      </small>
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="laptop-mockup">
            <div className="laptop-top">
              <span>● ChatConnect</span>
              <span>Sarah Ahmed</span>
            </div>
            <div className="laptop-chat">
              <div className="sample-message received">
                Hey! How are you today?
              </div>
              <div className="sample-message sent">
                I'm great! How about you?
              </div>
              <div className="sample-message received">
                Doing well, thanks!
              </div>
              <div className="sample-input">
                Type a message... <Send size={14} />
              </div>
            </div>
          </div>

          <span className="floating-bubble bubble-two">
            <Send size={20} />
          </span>
          <span className="art-dot dot-one" />
          <span className="art-dot dot-two" />
        </div>
      </section>

      <section className="features-strip" id="features">
        <article>
          <span className="feature-icon"><MessageSquare size={19} /></span>
          <h3>Real-time Messaging</h3>
          <p>Instantly send and receive messages</p>
        </article>
        <article>
          <span className="feature-icon"><ShieldCheck size={19} /></span>
          <h3>Secure &amp; Private</h3>
          <p>Your data is always protected</p>
        </article>
        <article>
          <span className="feature-icon"><Users size={19} /></span>
          <h3>Group Chats</h3>
          <p>Chat with multiple people</p>
        </article>
        <article>
          <span className="feature-icon"><Smartphone size={19} /></span>
          <h3>Accessible Anywhere</h3>
          <p>Use it on any device</p>
        </article>
      </section>

      <footer className="home-footer" id="about">
        <span>© 2026 ChatConnect</span>
        <a href="#contact" id="contact">Connect with your people.</a>
      </footer>
    </main>
  );
}
