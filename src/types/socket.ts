export interface MessageData {
    content: string;
    receiver_id?: number;
    group_id?: number;
    conversation_id: number;
}