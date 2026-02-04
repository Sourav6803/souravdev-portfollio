import { useState, useEffect, useRef } from "react";
import {
  FiBell,
  FiCheck,
  FiAlertCircle,
  FiInfo,
  FiMessageSquare,
} from "react-icons/fi";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from Sarah",
      content: "Hey, I wanted to discuss the project timeline...",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      title: "Project deadline approaching",
      content: 'Your project "Portfolio Redesign" is due in 2 days',
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "System update completed",
      content: "Your dashboard has been updated to version 2.3",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "message",
      title: "New connection request",
      content: "Michael Chen wants to connect with you",
      time: "1 day ago",
      read: true,
    },
  ]);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Delay to ensure DOM is ready in lazy-loaded context
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "alert":
        return <FiAlertCircle className="text-yellow-500" />;
      case "info":
        return <FiInfo className="text-blue-500" />;
      case "message":
        return <FiMessageSquare className="text-purple-500" />;
      default:
        return <FiInfo className="text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full relative hover:bg-gray-800 transition-colors"
      >
        <FiBell className="text-gray-300 text-xl" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-90 bg-gray-900 rounded-lg shadow-xl border border-gray-800 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <button
              onClick={markAllAsRead}
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                    !notification.read ? "bg-gray-800/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="mt-1 mr-3">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {notification.content}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="text-xs text-gray-500 hover:text-white"
                        >
                          <FiCheck size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-800 text-center">
            <a
              href="#"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
