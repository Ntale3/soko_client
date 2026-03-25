export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: "farmer" | "buyer";
  location: string;
  online: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type: "text" | "offer" | "image";
  offer?: { product: string; quantity: string; price: string; unit: string };
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  product?: string;
}

export const MOCK_ME: User = {
  id: "me",
  name: "Ntale Swamadu",
  role: "farmer",
  location: "Wakiso, Uganda",
  online: true,
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    participant: {
      id: "u1",
      name: "Aisha Nakato",
      role: "buyer",
      location: "Kampala",
      online: true,
      avatar: undefined,
    },
    lastMessage: "Can you deliver 50kg of tomatoes by Friday?",
    lastMessageTime: "10:42 AM",
    unreadCount: 3,
    product: "Tomatoes",
  },
  {
    id: "c2",
    participant: {
      id: "u2",
      name: "Joseph Okello",
      role: "buyer",
      location: "Jinja",
      online: false,
      avatar: undefined,
    },
    lastMessage: "What's the price per kg for maize?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    product: "Maize",
  },
  {
    id: "c3",
    participant: {
      id: "u3",
      name: "Grace Amoding",
      role: "farmer",
      location: "Gulu",
      online: true,
      avatar: undefined,
    },
    lastMessage: "I have 200kg of beans available",
    lastMessageTime: "Mon",
    unreadCount: 1,
    product: "Beans",
  },
  {
    id: "c4",
    participant: {
      id: "u4",
      name: "David Ssempa",
      role: "buyer",
      location: "Entebbe",
      online: false,
      avatar: undefined,
    },
    lastMessage: "Deal! I'll send payment today.",
    lastMessageTime: "Sun",
    unreadCount: 0,
    product: "Cassava",
  },
  {
    id: "c5",
    participant: {
      id: "u5",
      name: "Fatuma Nabirye",
      role: "buyer",
      location: "Mbarara",
      online: true,
      avatar: undefined,
    },
    lastMessage: "Is the produce organically grown?",
    lastMessageTime: "Sat",
    unreadCount: 0,
    product: "Groundnuts",
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      conversationId: "c1",
      senderId: "u1",
      text: "Hello! I saw your listing for tomatoes.",
      timestamp: "10:30 AM",
      read: true,
      type: "text",
    },
    {
      id: "m2",
      conversationId: "c1",
      senderId: "me",
      text: "Yes! Fresh Roma tomatoes, harvested yesterday. Very good quality.",
      timestamp: "10:32 AM",
      read: true,
      type: "text",
    },
    {
      id: "m3",
      conversationId: "c1",
      senderId: "u1",
      text: "How much per kg?",
      timestamp: "10:35 AM",
      read: true,
      type: "text",
    },
    {
      id: "m4",
      conversationId: "c1",
      senderId: "me",
      text: "2,500 UGX per kg. Discount for bulk orders above 100kg.",
      timestamp: "10:36 AM",
      read: true,
      type: "text",
    },
    {
      id: "m5",
      conversationId: "c1",
      senderId: "me",
      text: "Here's a formal offer:",
      timestamp: "10:38 AM",
      read: true,
      type: "offer",
      offer: { product: "Roma Tomatoes", quantity: "100", price: "2,200", unit: "kg" },
    },
    {
      id: "m6",
      conversationId: "c1",
      senderId: "u1",
      text: "Can you deliver 50kg of tomatoes by Friday?",
      timestamp: "10:42 AM",
      read: false,
      type: "text",
    },
  ],
  c2: [
    {
      id: "m7",
      conversationId: "c2",
      senderId: "u2",
      text: "Hi, I need maize in bulk.",
      timestamp: "Yesterday",
      read: true,
      type: "text",
    },
    {
      id: "m8",
      conversationId: "c2",
      senderId: "u2",
      text: "What's the price per kg for maize?",
      timestamp: "Yesterday",
      read: true,
      type: "text",
    },
  ],
  c3: [
    {
      id: "m9",
      conversationId: "c3",
      senderId: "u3",
      text: "I have 200kg of beans available",
      timestamp: "Mon",
      read: false,
      type: "text",
    },
  ],
  c4: [
    {
      id: "m10",
      conversationId: "c4",
      senderId: "me",
      text: "Cassava is ready for pickup.",
      timestamp: "Sun",
      read: true,
      type: "text",
    },
    {
      id: "m11",
      conversationId: "c4",
      senderId: "u4",
      text: "Deal! I'll send payment today.",
      timestamp: "Sun",
      read: true,
      type: "text",
    },
  ],
  c5: [
    {
      id: "m12",
      conversationId: "c5",
      senderId: "u5",
      text: "Is the produce organically grown?",
      timestamp: "Sat",
      read: true,
      type: "text",
    },
  ],
};
