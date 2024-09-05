import { Timestamp } from "firebase/firestore";

export interface IChatGroup {
  id: string;
  groupId: string;
  senderId: string;
  message: string;
  timestamp: Timestamp;
}
