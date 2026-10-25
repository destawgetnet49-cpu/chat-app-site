
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { chatService } from "../services/chatService";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function useChat(conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Load messages and listen for real-time updates.
  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    let active = true;

    async function loadMessages() {
      setLoading(true);
      setError("");

      try {
        const result = await chatService.getMessages(conversationId);

        if (active) {
          setMessages(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message || "Failed to load messages."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMessages();

    const token = localStorage.getItem("chatconnect_token");

    if (!token) {
      return () => {
        active = false;
      };
    }

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.on("connect_error", (err) => {
      if (active) {
        setError(`Realtime connection failed: ${err.message}`);
      }
    });

    // Your Express Socket.IO server must support this event.
    socket.emit("join_conversation", { conversationId });

    // Your server should emit "new_message" to conversation members.
    socket.on("new_message", (message) => {
      if (!active) return;

      // Ignore messages belonging to another conversation.
      if (String(message.conversation_id) !== String(conversationId)) {
        return;
      }

      setMessages((current) => {
        const alreadyExists = current.some(
          (item) => String(item.id) === String(message.id)
        );

        return alreadyExists ? current : [...current, message];
      });
    });

    return () => {
      active = false;
      socket.emit("leave_conversation", { conversationId });
      socket.disconnect();
    };
  }, [conversationId]);

  const sendMessage = useCallback(
    async (content) => {
      const cleanContent = content.trim();

      if (!conversationId || !cleanContent || sending) return null;

      setSending(true);
      setError("");

      try {
        // The backend saves the message and should broadcast it
        // to conversation members through Socket.IO.
        const message = await chatService.sendMessage(
          conversationId,
          cleanContent
        );

        // Add it immediately if it hasn't arrived through the socket.
        setMessages((current) => {
          const exists = current.some(
            (item) => String(item.id) === String(message.id)
          );

          return exists ? current : [...current, message];
        });

        return message;
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to send message."
        );
        throw err;
      } finally {
        setSending(false);
      }
    },
    [conversationId, sending]
  );

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage,
  };
}
