import { Timestamp } from "firebase/firestore";

export interface IChat {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  timestamp: Timestamp;
}
