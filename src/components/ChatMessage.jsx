import React from "react";

export default function ChatMessage({ message, userAvatar, emilyAvatar }) {
  const isEmily = message.sender === "emily";
  const bubbleStyle = {
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: "15px",
    margin: "5px 0",
    backgroundColor: isEmily ? "#f0f0f0" : "#e63946",
    color: isEmily ? "#000" : "#fff",
    alignSelf: isEmily ? "flex-start" : "flex-end",
    wordBreak: "break-word",
  };

  const renderMessageContent = (text) => {
    if (!text) return null;

    // Check if text contains a URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "#007aff", textDecoration: "underline" }}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: isEmily ? "row" : "row-reverse", alignItems: "flex-end" }}>
      <img
        src={isEmily ? emilyAvatar : userAvatar}
        alt={message.sender}
        style={{ width: "30px", height: "30px", borderRadius: "50%", margin: "0 5px" }}
      />
      <div style={bubbleStyle}>
        {renderMessageContent(message.text)}
        {message.image && <img src={message.image} alt="Emily" style={{ width: "120px", borderRadius: "10px", marginTop: "5px" }} />}
      </div>
    </div>
  );
}
