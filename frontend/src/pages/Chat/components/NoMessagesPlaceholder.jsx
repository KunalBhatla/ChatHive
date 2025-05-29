import { useEffect, useState } from "react";
import { FaMusic, FaHeadphones, FaHeart, FaPlay, FaWaveSquare } from "react-icons/fa";

const COLORS = {
  lavender: "#C8A2C8",
  peach: "#FFDDC1",
  darkPurple: "#6A4573",
  softLavender: "#F6EEF7",
};
const NoMessagesPlaceholder = () => {
  const [activeNote, setActiveNote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNote((prev) => (prev + 1) % 5);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const musicNotes = [
    { icon: FaMusic, delay: 0 },
    { icon: FaHeadphones, delay: 0.2 },
    { icon: FaHeart, delay: 0.4 },
    { icon: FaPlay, delay: 0.6 },
    { icon: FaWaveSquare, delay: 0.8 },
  ];

  const floatingElements = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className="position-absolute"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${
          Math.random() * 2
        }s`,
        opacity: 0.1,
        fontSize: "1.5rem",
        color: COLORS.lavender,
        zIndex: 1,
      }}
    >
      ♪
    </div>
  ));

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 162, 200, 0.3); }
          50% { box-shadow: 0 0 30px rgba(200, 162, 200, 0.6); }
        }
        
        .music-container {
          position: relative;
          overflow: hidden;
        }
        
        .floating-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 10;
        }
        
        .music-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .music-icon {
          animation: pulse 2s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        
        .music-icon.active {
          color: ${COLORS.darkPurple} !important;
          transform: scale(1.2);
          filter: drop-shadow(0 0 10px rgba(106, 69, 115, 0.5));
        }
        
        .wave-bars {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin: 1.5rem 0;
        }
        
        .wave-bar {
          width: 4px;
          height: 20px;
          background: linear-gradient(to top, ${COLORS.lavender}, ${COLORS.darkPurple});
          border-radius: 2px;
          animation: wave 1s ease-in-out infinite;
        }
        
        .cta-button {
          background: linear-gradient(135deg, ${COLORS.lavender}, ${COLORS.darkPurple});
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          animation: glow 3s ease-in-out infinite;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(106, 69, 115, 0.4);
        }
      `}</style>

      <div
        className="p-5 d-flex flex-column justify-content-center align-items-center music-container"
        style={{
          background: `linear-gradient(135deg, ${COLORS.softLavender} 0%, ${COLORS.peach} 100%)`,
          borderRadius: "1rem",
          padding: "1.5rem",
          margin: "1rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center",
          height: "fit-content",
          maxHeight: "calc(100vh - 300px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="floating-bg">{floatingElements}</div>

        <div className="content-wrapper">
          {/* Animated Music Icons */}
          <div className="music-icons">
            {musicNotes.map((note, index) => {
              const IconComponent = note.icon;
              return (
                <IconComponent
                  key={index}
                  size={32}
                  className={`music-icon ${activeNote === index ? "active" : ""}`}
                  style={{
                    color: COLORS.lavender,
                    animationDelay: `${note.delay}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Wave Animation */}
          <div className="wave-bars">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: `${15 + Math.random() * 25}px`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                color: COLORS.darkPurple,
                fontWeight: "bold",
                marginBottom: "1rem",
                fontSize: "2rem",
                background: `linear-gradient(135deg, ${COLORS.darkPurple}, ${COLORS.lavender})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              🎵 Let the Music Begin! 🎵
            </h3>
            <p
              style={{
                color: COLORS.darkPurple,
                opacity: 0.8,
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              Your musical journey starts here. Share beats, discover new sounds, and
              connect with fellow music lovers.
            </p>
          </div>

          {/* Call to Action */}
          <button
            className="cta-button"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <FaPlay className="me-2" />
            Start Your First Chat
          </button>

          {/* Fun Facts */}
          <div
            className="mt-4"
            style={{
              background: "rgba(255,255,255,0.3)",
              borderRadius: "15px",
              padding: "1rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <small style={{ color: COLORS.darkPurple, opacity: 0.9 }}>
              💡 <strong>Did you know?</strong> Music brings people together across all
              cultures and languages!
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoMessagesPlaceholder;
