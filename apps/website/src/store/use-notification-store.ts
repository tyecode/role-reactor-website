import { create } from "zustand";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  icon: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isOpen: boolean;
  hasFetched: boolean;

  setOpen: (open: boolean) => void;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  isOpen: false,
  hasFetched: false,

  setOpen: (open: boolean) => {
    set({ isOpen: open });
    if (open) {
      get().fetchNotifications();
    }
  },

  fetchNotifications: async () => {
    if (get().isLoading) return;

    if (!get().hasFetched) {
      set({ isLoading: true });
    }

    try {
      const response = await fetch("/api/user/notifications?limit=30");
      const data = await response.json();

      if (data.success) {
        set({
          notifications: data.notifications || [],
          unreadCount: data.unreadCount || 0,
          hasFetched: true,
        });
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const response = await fetch("/api/user/notifications/unread-count");
      const data = await response.json();

      if (data.success) {
        set({ unreadCount: data.unreadCount || 0 });
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  },

  markAsRead: async (notificationId: string) => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));

    try {
      const response = await fetch(
        `/api/user/notifications/${notificationId}/read`,
        { method: "PATCH" }
      );
      const data = await response.json();

      if (!data.success) {
        // Revert on failure
        get().fetchNotifications();
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      get().fetchNotifications();
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await fetch("/api/user/notifications", {
        method: "PATCH",
      });
      const data = await response.json();

      if (data.success) {
        set((state) => ({
          unreadCount: 0,
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  },
}));
