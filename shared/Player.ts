export default interface Player {
    userId: string;
    socketId: string;
    name: string;
    health: number;
    wordFrequencies: Map<string, number>;
    disconnected?: boolean;
}