// import React from "react";

// const FullPageLoader = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light flex-column text-center">
//       <div className="d-flex gap-2 mb-4">
//         <div
//           className="bar bg-primary rounded"
//           style={{ animationDelay: "0s" }}
//         ></div>
//         <div
//           className="bar bg-primary rounded"
//           style={{ animationDelay: "0.1s" }}
//         ></div>
//         <div
//           className="bar bg-primary rounded"
//           style={{ animationDelay: "0.2s" }}
//         ></div>
//         <div
//           className="bar bg-primary rounded"
//           style={{ animationDelay: "0.3s" }}
//         ></div>
//         <div
//           className="bar bg-primary rounded"
//           style={{ animationDelay: "0.4s" }}
//         ></div>
//       </div>
//       <h5 style={{ color: "#6A4573", fontWeight: 600 }}>Syncing Chat & Beats...</h5>

//       <style jsx>{`
//         .bar {
//           width: 6px;
//           height: 30px;
//           background-color: #c8a2c8;
//           animation: bounce 1s infinite ease-in-out;
//         }

//         @keyframes bounce {
//           0%, 100% {
//             transform: scaleY(1);
//           }
//           50% {
//             transform: scaleY(1.8);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FullPageLoader;

import React from "react";

const FullPageLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 w-100"
      style={{
        background: "linear-gradient(to right, #f6eef7, #ffddc1)",
        flexDirection: "column",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Equalizer Bars */}
      <div className="d-flex gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bar"
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Animated Logo Text */}
      <h4
        className="text-center"
        style={{
          color: "#6A4573",
          fontWeight: "bold",
          animation: "pulseText 2s ease-in-out infinite",
        }}
      >
        Chat<span style={{ color: "#C8A2C8" }}>Hive</span> is loading...
      </h4>

      {/* Embedded styles */}
      <style jsx>{`
        .bar {
          width: 8px;
          height: 30px;
          background: #c8a2c8;
          border-radius: 12px;
          box-shadow: 0 0 10px #c8a2c8aa;
          animation: bounce 1.2s infinite ease-in-out;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: scaleY(1);
            opacity: 0.8;
          }
          50% {
            transform: scaleY(1.8);
            opacity: 1;
          }
        }

        @keyframes pulseText {
          0%,
          100% {
            letter-spacing: 0px;
            opacity: 1;
          }
          50% {
            letter-spacing: 1px;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;
