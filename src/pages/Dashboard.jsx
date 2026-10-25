
import { useState } from "react";
import {
  MessageCircle,
  Users,
  ContactRound,
  Settings,
  LogOut,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const currentUser = {
  id: "me",
  name: "John Doe",
};

const initialChats = [
  {
    id: "1",
    name: "Sarah Ahmed",
    avatar: "SA",
    online: true,
    unread: 2,
    messages: [
      { id: 1, sender: "1", text: "Hey! How are you today?", time: "10:20" },
      { id: 2, sender: "me", text: "I'm good! 😊", time: "10:22" },
      { id: 3, sender: "1", text: "Are you coming today?", time: "10:24" },
    ],
  },
  {
    id: "2",
    name: "Team Dev",
    avatar: "TD",
    online: true,
    unread: 1,
    messages: [
      { id: 4, sender: "2", text: "Mike: The API is ready.", time: "09:12" },
    ],
  },
  {
    id: "3",
    name: "Family Group",
    avatar: "FG",
    online: false,
    unread: 0,
    messages: [
      { id: 5, sender: "3", text: "Mom: Dinner at 7?", time: "Yesterday" },
    ],
  },
  {
    id: "4",
    name: "Abebe Kebede",
    avatar: "AK",
    online: false,
    unread: 0,
    messages: [
      { id: 6, sender: "4", text: "Thanks!", time: "Yesterday" },
    ],
  },
  {
    id: "5",
    name: "Sara Alemu",
    avatar: "SA",
    online: false,
    unread: 0,
    messages: [
      { id: 7, sender: "5", text: "I sent you the document.", time: "Yesterday" },
    ],
  },
  {
    id: "6",
    name: "Yonas T.",
    avatar: "YT",
    online: false,
    unread: 0,
    messages: [
      { id: 8, sender: "6", text: "Ok, perfect!", time: "Monday" },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState("1");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("Chats");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const selectedChat = chats.find((chat) => chat.id === selectedId);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  function selectChat(chat) {
    setSelectedId(chat.id);
    setMobileChatOpen(true);

    setChats((previous) =>
      previous.map((item) =>
        item.id === chat.id ? { ...item, unread: 0 } : item
      )
    );
  }

  function sendMessage(event) {
    event.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: crypto.randomUUID(),
      sender: currentUser.id,
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((previous) =>
      previous.map((chat) =>
        chat.id === selectedId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setMessage("");
  }

  return (
    <main
      className={`messenger ${
        mobileChatOpen ? "messenger-mobile-chat" : ""
      }`}
    >
      {/* Column 1: dark navigation */}
      <aside className="app-sidebar">
        <a href="/" className="app-logo">
          <span><MessageCircle size={20} fill="white" /></span>
          <strong>ChatConnect</strong>
        </a>

        <div className="sidebar-user">
          <div className="user-avatar">JD</div>
          <div>
            <strong>{currentUser.name}</strong>
            <small><span className="online-indicator" /> Online</small>
          </div>
        </div>

        <nav className="side-menu">
          <button
            className={activeSection === "Chats" ? "selected" : ""}
            onClick={() => setActiveSection("Chats")}
          >
            <MessageCircle size={18} /> Chats
            <span className="menu-count">2</span>
          </button>
          <button onClick={() => setActiveSection("Contacts")}>
            <ContactRound size={18} /> Contacts
          </button>
          <button onClick={() => setActiveSection("Groups")}>
            <Users size={18} /> Groups
          </button>
          <button onClick={() => setActiveSection("Settings")}>
            <Settings size={18} /> Settings
          </button>
        </nav>

        <button className="logout-link" onClick={() => navigate("/login")}>
          <LogOut size={17} /> Logout
        </button>
      </aside>

      {/* Column 2: conversation list */}
      <section className="conversation-panel">
        <div className="conversation-search">
          <Search size={17} />
          <input
            placeholder="Search chats..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search chats"
          />
        </div>

        <div className="recent-heading">
          <h2>
            {activeSection === "Chats" ? "Recent Chats" : activeSection}
          </h2>
        </div>

        <div className="recent-list">
          {activeSection !== "Chats" ? (
            <div className="section-placeholder">
              <Users size={25} />
              <p>{activeSection} will be available when connected to the backend.</p>
              <button onClick={() => setActiveSection("Chats")}>
                Back to chats
              </button>
            </div>
          ) : filteredChats.map((chat) => {
            const last = chat.messages[chat.messages.length - 1];

            return (
              <button
                key={chat.id}
                className={`recent-chat ${
                  selectedId === chat.id ? "active" : ""
                }`}
                onClick={() => selectChat(chat)}
              >
                <div className={`contact-avatar avatar-${chat.id}`}>
                  {chat.avatar}
                  {chat.online && <span className="avatar-online" />}
                </div>

                <div className="recent-info">
                  <div className="recent-top">
                    <strong>{chat.name}</strong>
                    <time>{last.time}</time>
                  </div>
                  <div className="recent-bottom">
                    <span>{last.text}</span>
                    {chat.unread > 0 && (
                      <span className="recent-unread">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Column 3: active conversation */}
      <section className="conversation-window">
        {selectedChat ? (
          <>
            <header className="conversation-header">
              <button
                className="mobile-back"
                onClick={() => setMobileChatOpen(false)}
                aria-label="Back to chats"
              >
                <ArrowLeft size={20} />
              </button>

              <div className={`contact-avatar header-contact avatar-${selectedChat.id}`}>
                {selectedChat.avatar}
              </div>

              <div className="contact-heading">
                <strong>{selectedChat.name}</strong>
                <small>
                  <span className={selectedChat.online ? "online-indicator" : "offline-indicator"} />
                  {selectedChat.online ? "Online" : "Offline"}
                </small>
              </div>

              <div className="conversation-actions">
                <button aria-label="Voice call" title="Voice call">
                  <Phone size={19} />
                </button>
                <button aria-label="Video call" title="Video call">
                  <Video size={20} />
                </button>
                <button aria-label="More options" title="More options">
                  <MoreVertical size={20} />
                </button>
              </div>
            </header>

            <div className="conversation-messages">
              <div className="today-divider"><span>Today</span></div>

              {selectedChat.messages.map((item) => {
                const mine = item.sender === currentUser.id;

                return (
                  <div
                    key={item.id}
                    className={`message-line ${mine ? "outgoing" : "incoming"}`}
                  >
                    <div className="message-content">
                      <p>{item.text}</p>
                      <small>
                        {item.time}
                        {mine && <span className="message-check"> ✓✓</span>}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>

            <form className="message-input-bar" onSubmit={sendMessage}>
              <button type="button" aria-label="Emoji" title="Emoji picker coming soon">
                <Smile size={19} />
              </button>
              <button type="button" aria-label="Attach file" title="File uploads coming soon">
                <Paperclip size={19} />
              </button>
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message"
              />
              <button
                type="submit"
                className="send-message"
                aria-label="Send message"
                disabled={!message.trim()}
              >
                <Send size={19} />
              </button>
            </form>
          </>
        ) : (
          <div className="no-conversation">Select a conversation</div>
        )}
      </section>
    </main>
  );
}
