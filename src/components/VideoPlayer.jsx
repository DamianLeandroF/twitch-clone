const VideoPlayer = ({ streamData }) => {
  const channelName = streamData.canal;
  const currentHostname = window.location.hostname;

  // URL base del embed de Twitch
  const embedUrl = `https://player.twitch.tv/?channel=${channelName}&parent=${currentHostname}&muted=false&autoplay=true`;

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      {/* Div contenedor con aspect ratio 16:9 */}
      <iframe
        src={embedUrl}
        allowFullScreen={true}
        scrolling="no"
        // El iframe debe ser absoluto para ocupar todo el espacio del div 16:9
        className="absolute top-0 left-0 w-full h-full border-none"
        title={`Live Stream de ${channelName}`}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
