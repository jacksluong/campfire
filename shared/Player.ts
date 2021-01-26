export default interface Player {
  userId: string;
  socketId: string;
  pfp: string;
  name: string;
  health: number;
  wordFrequencies: { word: string; frequency: number }[];
  disconnected?: boolean;
}
