export default interface Player {
    userId: string;
    socketId: string;
    name: string;
    health: number;
    disconnected?: boolean;
    wordFrequencies: Map<string, number>;
}