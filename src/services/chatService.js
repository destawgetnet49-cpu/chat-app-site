
import api from "./api";

export const chatService = {
  async getConversations() {
    const response = await api.get("/conversations");
    return response.data.conversations;
  },

  async getMessages(conversationId) {
    const response = await api.get(
      `/conversations/${conversationId}/messages`
    );

    return response.data.messages;
  },

  async sendMessage(conversationId, content) {
    const response = await api.post(
      `/conversations/${conversationId}/messages`,
      { content }
    );

    return response.data.message;
  },
};
