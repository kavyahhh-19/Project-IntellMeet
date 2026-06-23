export const createPeerConnection = (stream: MediaStream) => {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  stream.getTracks().forEach((track) => {
    peer.addTrack(track, stream);
  });

  return peer;
};