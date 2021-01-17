export default interface Player {
    userId: string;
    name: string;
    health: number;
    disconnected?: boolean;
}