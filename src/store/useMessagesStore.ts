import { create } from "zustand";

import {
  Conversation,
  Message,
  MOCK_CONVERSATIONS,
  MOCK_ME,
  MOCK_MESSAGES,
} from "@/constants/mock-messages-api";

interface MessagesStore {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  searchQuery: string;
  isMobileConversationOpen: boolean;

  setActiveConversation: (id: string) => void;
  sendMessage: (text: string) => void;
  setSearchQuery: (q: string) => void;
  closeMobileConversation: () => void;
  markAsRead: (conversationId: string) => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  conversations: MOCK_CONVERSATIONS,
  messages: MOCK_MESSAGES,
  activeConversationId: null,
  searchQuery: "",
  isMobileConversationOpen: false,

  setActiveConversation: (id) => {
    set({ activeConversationId: id, isMobileConversationOpen: true });
    get().markAsRead(id);
  },

  sendMessage: (text) => {
    const { activeConversationId, messages, conversations } = get();
    if (!activeConversationId || !text.trim()) return;

    const newMessage: Message = {
      id: `m_${Date.now()}`,
      conversationId: activeConversationId,
      senderId: MOCK_ME.id,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
      type: "text",
    };

    set({
      messages: {
        ...messages,
        [activeConversationId]: [...(messages[activeConversationId] ?? []), newMessage],
      },
      conversations: conversations.map((c) =>
        c.id === activeConversationId
          ? { ...c, lastMessage: text.trim(), lastMessageTime: newMessage.timestamp }
          : c
      ),
    });
  },

  setSearchQuery: (q) => set({ searchQuery: q }),

  closeMobileConversation: () => set({ isMobileConversationOpen: false }),

  markAsRead: (conversationId) => {
    const { conversations, messages } = get();
    set({
      conversations: conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
      messages: {
        ...messages,
        [conversationId]: (messages[conversationId] ?? []).map((m) => ({ ...m, read: true })),
      },
    });
  },
}));
