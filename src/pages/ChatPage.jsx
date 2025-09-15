import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import { supabase } from "../lib/supabase";

// Default Emily avatar
const emilyAvatar = import.meta.env.BASE_URL + "images/usa-girl.jpg";

// Emily sequential messages
const emilyMessages = [
  { text: "Hello do you like sex?!!", image: import.meta.env.BASE_URL + "images/emily1.jpg" },
  { text: "You Can Find Here Local Girls/Women Nearby , I am local", image: import.meta.env.BASE_URL + "images/emily2.jpg" },
  { text: "I'm really so alone. If you want to make real sex then I will like to have video chat and show you some of my special things. Here https://rebrand.ly/WowYo", image: null },
  { text: "Babe,,, I'm insure you there is no need any C C, it’s just ensure me that I m not meeting any minor or offender. https://rebrand.ly/WowYo", image: null },
  { text: "Okay fine if its any easier for you just go to Sex in Hotel Room and lookup my name. Join here https://rebrand.ly/WowYo", image: null },
  { text: "I'm so horny, rubbing my wet pussy this time. I need your hard dick asap.", image: import.meta.env.BASE_URL + "images/emily3.jpg" },
  { text: "Honestly, I really want to meet you, I'm feeling both energized in the meantime as somewhat stressed at the exceptionally same time.", image: null },
  { text: "Dear, right now I'm so horny and am totally serious about hookup with you. https://rebrand.ly/WowYo", image: null },
  { text: "I live alone in my room. So I need a bed partner who give me real pleasure & sexual satisfaction. https://rebrand.ly/WowYo", image: null },
  { text: "Come on, I love to be fucked hard and I'm very open minded to whatever you want to do to me. https://rebrand.ly/WowYo", image: null },
  { text: "Hi, I'm sure we can make a date if u have no problem with that. https://rebrand.ly/WowYo", image: null },
  { text: "Dear, I want to meet someone real for fun. https://rebrand.ly/WowYo", image: null },
  { text: "Ok, further I will not give you any message again. I'm alone. https://rebrand.ly/WowYo", image: null }
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [emilyIndex, setEmilyIndex] = useState(0);
  const messagesEndRef = useRef(null);

  const [step, setStep] = useState("form");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  const [userAvatar, setUserAvatar] = useState(null);
  const [input, setInput] = useState("");

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isTyping]);

  const addMessageToChat = (text, sender = "user", image = null) => {
    const msg = {
      id: Date.now().toString() + Math.random(),
      text,
      sender,
      image,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, msg]);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUserAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (!userAvatar) { alert("Please upload your profile picture first!"); return; }

    addMessageToChat(`Profile Submitted`);
    setFormCompleted(true);
    setStep("chat");
    setEmilyIndex(0);
    setTimeout(() => addMessageToChat("🎉 Congratulations! You're Invited to Join Our Exclusive Adult Community! 🎉", "emily"), 500);
  };

  const sendEmilySequential = () => {
    if (emilyIndex >= emilyMessages.length) return;
    setIsTyping(true);
    setTimeout(() => {
      let msg = emilyMessages[emilyIndex];
      if (emilyIndex === 1) msg.text = `${msg.text} ${city} ${stateName}`;
      addMessageToChat(msg.text, "emily", msg.image);
      setIsTyping(false);
      setEmilyIndex(prev => prev + 1);
    }, 1500);
  };

  const handleGreetingClick = (greet) => {
    addMessageToChat(`Greeting: ${greet}`);
    setEmilyIndex(0);
    sendEmilySequential();
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    addMessageToChat(input);
    sendEmilySequential();
    setInput("");
  };

  // Love emoji animation
  const LoveEmojis = () => (
    <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} style={{
           position: "absolute",
           top: `${Math.random() * 100}%`,
           left: `${Math.random() * 100}%`,
           fontSize: `${Math.random() * 16 + 8}px`,
           animation: `rise ${5 + Math.random() * 5}s linear infinite`,
           opacity: 0.7
        }}>❤️</span>
      ))}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );

  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column", height: "90vh",
      maxWidth: "400px", margin: "auto", border: "1px solid #ccc",
      backgroundColor: "#fff", color: "#000", borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)", overflow: "hidden"
    }}>
      <LoveEmojis />
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc", backgroundColor: "#fff" }}>
        <img src={emilyAvatar} alt="Emily" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
        <div>
          <div style={{ fontWeight: "bold" }}>Emily</div>
          <div style={{ fontSize: "12px", color: "green" }}>● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} userAvatar={userAvatar || ""} emilyAvatar={emilyAvatar} />
        ))}
        {isTyping && <div style={{ margin: "5px 0", fontStyle: "italic" }}>Emily is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input / Form */}
      {!formCompleted ? (
        <div style={{ padding: "10px", borderTop: "1px solid #ccc", display: "flex", flexDirection: "column", gap: "8px" }}>
          {!userAvatar && (
            <label style={{
              display: "inline-block", padding: "8px 12px", backgroundColor: "red",
              borderRadius: "50px", color: "#fff", fontWeight: "bold", cursor: "pointer",
              textAlign: "center"
            }}>
              Upload Photo
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
            </label>
          )}
          <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9" }} />
          <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9" }} />
          <input type="text" placeholder="State" value={stateName} onChange={e => setStateName(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9" }} />
          <button onClick={handleNextStep} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Next</button>
        </div>
      ) : (
        <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}>
          <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} style={{ flex: 1, padding: "8px", borderRadius: "10px" }} />
          <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Send</button>
        </div>
      )}

      {/* Greeting Buttons */}
      {formCompleted && messages.length === 1 && (
        <div style={{ display: "flex", justifyContent: "space-around", padding: "10px", borderTop: "1px solid #ccc" }}>
          <button onClick={() => handleGreetingClick("Hi")} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Hi</button>
          <button onClick={() => handleGreetingClick("Hello")} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Hello</button>
        </div>
      )}
    </div>
  );
}
