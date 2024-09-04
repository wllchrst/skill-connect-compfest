import ToastBuilder from "@/app/builder/toast-builder";
import { chatFriendCollection } from "@/app/config/firebase-config";
import FirebaseHelper from "@/app/helpers/firebase-helper";
import { IChat } from "@/app/interfaces/chat-interface";
import { IUser } from "@/app/interfaces/user-interface";
import UserService from "@/app/service/user-service";
import { and, or, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import Loading from "../loading";

interface I {
  user: IUser;
  friend: IUser;
}

const userService = new UserService();
const firebaseHelper = new FirebaseHelper();

function ChatFriend({ user, friend }: I) {
  const [newMessage, setNewMessage] = useState("");
  const toast = new ToastBuilder("Chat Friend");
  const q = query(
    chatFriendCollection,
    where("senderId", "in", [user.id, friend.id]),
    where("receiverId", "in", [user.id, friend.id]),
    orderBy("timestamp", "desc")
  );
  const { data, isLoading } = firebaseHelper.getAll<IChat>(q);

  if (isLoading) return <Loading />;

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      userService.chatFriend(user.id, friend.id, newMessage).then((result) => {
        if (!result)
          toast.destructive("Something went wrong, please try again later");
        else setNewMessage("");
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-[300px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent p-4 space-y-3 bg-gray-50 dark:bg-gray-950 text-black dark:text-white flex flex-col-reverse">
          {data.map((msg) => (
            <div
              key={msg.id}
              className={`flex mt-3 ${
                msg.senderId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderId === user.id
                    ? "bg-black text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatFriend;
