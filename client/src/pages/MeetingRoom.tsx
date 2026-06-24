import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket";
import { createPeerConnection } from "../utils/webrtc";
import useNotificationStore from "../store/notificationStore";


function MeetingRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const meetingId = location.state?.meetingId;
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peers = useRef<Record<string, RTCPeerConnection>>({});

  const [remoteStreams, setRemoteStreams] = useState<
    Record<string, MediaStream>
  >({});

  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const toggleMute = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;

    if (!stream) return;

    stream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;

    if (!stream) return;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setCameraOff(!cameraOff);
  };


  const copyMeetingId = async () => {
    await navigator.clipboard.writeText(meetingId);
    alert("Meeting ID copied!");
  };

  useEffect(() => {
    if (!meetingId) {
      navigate("/meeting-lobby");
      return;
    }

    let localStream: MediaStream;

    const init = async () => {
      // 🎥 Get camera
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      
      socket.on("participant-joined", ({ user }) => {
        addNotification({
          id: Date.now().toString(),
          message: `${user.name} joined the meeting`,
          type: "success",
          time: Date.now(),
        });
      });

      socket.on("participant-left", ({ name }) => {
        addNotification({
          id: Date.now().toString(),
          message: `${name} left the meeting`,
          type: "warning",
          time: Date.now(),
        });
      });

      socket.on("new-message", ({ message }) => {
        addNotification({
          id: Date.now().toString(),
          message: `New message from ${message.sender?.name || "user"}`,
          type: "info",
          time: Date.now(),
        });
      });

      socket.on("meeting-error", ({ message }) => {
        addNotification({
          id: Date.now().toString(),
          message,
          type: "warning",
          time: Date.now(),
        });
      });







      // 🔌 Join meeting
      socket.emit("join-meeting", { meetingId });

      // 👤 New participant
      socket.on("participant-joined", async ({ user }) => {
        const peer = createPeerConnection(localStream);

        peers.current[user.id] = peer;

        peer.ontrack = (event) => {
          setRemoteStreams((prev) => ({
            ...prev,
            [user.id]: event.streams[0],
          }));
        };

        peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("webrtc-ice-candidate", {
              meetingId,
              targetUserId: user.id,
              candidate: event.candidate,
            });
          }
        };

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        socket.emit("webrtc-offer", {
          meetingId,
          targetUserId: user.id,
          offer,
        });
      });

      // 📩 Receive offer
      socket.on("webrtc-offer", async ({ fromUserId, offer }) => {
        const peer = createPeerConnection(localStream);

        peers.current[fromUserId] = peer;

        await peer.setRemoteDescription(offer);

        peer.ontrack = (event) => {
          setRemoteStreams((prev) => ({
            ...prev,
            [fromUserId]: event.streams[0],
          }));
        };

        peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("webrtc-ice-candidate", {
              meetingId,
              targetUserId: fromUserId,
              candidate: event.candidate,
            });
          }
        };

        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socket.emit("webrtc-answer", {
          meetingId,
          targetUserId: fromUserId,
          answer,
        });
      });

      // 📩 Receive answer
      socket.on("webrtc-answer", async ({ fromUserId, answer }) => {
        const peer = peers.current[fromUserId];
        if (peer) {
          await peer.setRemoteDescription(answer);
        }
      });

      // ❄ ICE candidates
      socket.on("webrtc-ice-candidate", async ({ fromUserId, candidate }) => {
        const peer = peers.current[fromUserId];
        if (peer) {
          await peer.addIceCandidate(candidate);
        }
      });
    };

    init();

    return () => {
      socket.off("participant-joined");
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
      
      socket.off("participant-joined");
      socket.off("participant-left");
      socket.off("new-message");
      socket.off("meeting-error");

    };
  }, [meetingId]);

  return (
    <div className="h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <h1>Meeting Room: {meetingId}</h1>

        <div className="flex gap-3">

          <button
            onClick={copyMeetingId}
            className="w-80 h-60 bg-gray-800 rounded-xl object-cover border border-gray-700"
          >
            📋 Copy ID
          </button>

          <button
            onClick={toggleMute}
            className="w-80 h-60 bg-gray-800 rounded-xl object-cover border border-gray-700"
          >
            {isMuted ? "🎤 Unmute" : "🎤 Mute"}
          </button>

          <button
            onClick={toggleCamera}
            className="w-80 h-60 bg-gray-800 rounded-xl object-cover border border-gray-700"
          >
            {cameraOff ? "📷 Start Video" : "📷 Stop Video"}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-80 h-60 bg-red-600 rounded-xl object-cover border border-gray-700"
          >
            Leave
          </button>

        </div>
      </div>

      {/* Video Grid */}
      <div className="flex flex-wrap gap-4 p-4">

        {/* Local Video */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-80 h-60 bg-gray-800 rounded-xl object-cover border border-gray-700"
        />

        {/* Remote Videos */}
        {Object.entries(remoteStreams).map(([id, stream]) => (
          <video
            key={id}
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            className="w-80 h-60 bg-gray-800 rounded-xl object-cover border border-gray-700"
          />
        ))}

      </div>
    </div>
  );
}

export default MeetingRoom;