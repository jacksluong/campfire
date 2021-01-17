import socketIOClient from "socket.io-client";
const endpoint = `${window.location.hostname}:${window.location.port}`;
export const socket = socketIOClient.io(endpoint);

// NOTE: should probably migrate more client-socket actions here