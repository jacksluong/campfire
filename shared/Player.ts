export default interface Player {
  userId: string;
  socketId: string;
  name: string;
  health: number;
  wordFrequencies: { word: string; frequency: number }[];
  disconnected?: boolean;
}
