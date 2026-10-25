
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useChat } from "../hooks/useChat";
import { chatService } from "../services/chatService";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] =
    useState(null);

  const [conversationsLoading, setConversationsLoading] =
    useState(true);

  const [conversationsError, setConversationsError] = useState("");

  const {
    messages,
    loading: messagesLoading,
    sending,
    error: messagesError,
    sendMessage,
  } = useChat(selectedConversationId);

  // Load the conversations belonging to the logged-in user.
  const loadConversations = useCallback(async () => {
    setConversationsLoading(true);
    setConversationsError("");

    try {
      const result = await chatService.getConversations();
      const list = Array.isArray(result) ? result : [];

      setConversations(list);

      // Select the first conversation if none is selected.
      setSelectedConversationId((currentId) => {
        const stillExists = list.some(
          (conversation) =>
            String(conversation.id) === String(currentId)
        );

        return stillExists
          ? currentId
          : list.length > 0
            ? list[0].id
            : null;
      });
    } catch (error) {
      setConversationsError(
        error.response?.data?.message ||
          "Could not load conversations."
      );
    } finally {
      setConversationsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const selectConversation = useCallback((conversationId) => {
    setSelectedConversationId(conversationId);
  }, []);

  const selectedConversation = useMemo(
    () =>
      conversations.find(
        (conversation) =>
          String(conversation.id) ===
          String(selectedConversationId)
      ) ?? null,
    [conversations, selectedConversationId]
  );

  const value = useMemo(
    () => ({
      conversations,
      conversationsLoading,
      conversationsError,
      loadConversations,

      selectedConversationId,
      selectedConversation,
      selectConversation,

      messages,
      messagesLoading,
      messagesError,
      sending,
      sendMessage,
    }),
    [
      conversations,
      conversationsLoading,
      conversationsError,
      loadConversations,
      selectedConversationId,
      selectedConversation,
      selectConversation,
      messages,
      messagesLoading,
      messagesError,
      sending,
      sendMessage,
    ]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside a ChatProvider"
    );
  }

  return context;
}
