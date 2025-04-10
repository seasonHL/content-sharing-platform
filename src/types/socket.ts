export interface MessageData {
    content: string;
    sender_id?: number;
    receiver_id?: number;
    group_id?: number;
    conversation_id: number;
}