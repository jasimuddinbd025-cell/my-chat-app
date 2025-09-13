import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";

const emilyAvatar = "/usa-girl.jpg"; // default Emily avatar

// Emily sequential messages with images
const emilyMessages = [
  { text: "Hello do you like sex?!!", image: "/emily1.jpg" },
  { text: "Nice I am local", image: "/emily2.jpg" }, // city + state will append dynamically
  { text: "I'm really so alone. If you want to make real sex then I will like to have video chat and show you some of my special things. Here https://rebrand.ly/WowYo", image: null },
  { text: "Babe,,, I'm insure you there is no need any C C, it’s just ensure me that I m not meeting any minor or offender. https://rebrand.ly/WowYo", image: null },
  { text: "Okay fine if its any easier for you just go to Sex in Hotel Room and lookup my name. Join here https://rebrand.ly/WowYo", image: null },
  { text: "I'm so horny, rubbing my wet pussy this time. I need your hard dick asap.", image: "/emily3.jpg" },
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

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  const [userAvatar, setUserAvatar] = useState(null);
  const [input, setInput] = useState("");

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  // Step/Form Logic
  const handleNextStep = () => {
    if (step === "email") {
      if (!email.trim()) {
        alert("Please enter your email");
        return;
      }
      addMessageToChat(`Email: ${email}`);
      setStep("country");
    } else if (step === "country") {
      if (!country.trim()) {
        alert("Please enter Country");
        return;
      }
      addMessageToChat(`Country: ${country}`);
      setStep("city");
    } else if (step === "city") {
      if (!city.trim()) {
        alert("Please enter City");
        return;
      }
      addMessageToChat(`City: ${city}`);
      setStep("state");
    } else if (step === "state") {
      if (!stateName.trim()) {
        alert("Please enter State");
        return;
      }
      addMessageToChat(`State: ${stateName}`);
      setIsTyping(true);
      setTimeout(() => {
        addMessageToChat(`Wow nice, you are my close near you`, "emily");
        setIsTyping(false);
        setStep("greeting");
      }, 1000);
    }
  };

  // Sequential Emily Messages
  const sendEmilySequential = () => {
    if (emilyIndex >= emilyMessages.length) return;
    setIsTyping(true);
    setTimeout(() => {
      let msg = emilyMessages[emilyIndex];
      let text = msg.text;
      // Replace placeholders dynamically
      if (emilyIndex === 1) text = `${text} ${city} ${stateName}!!`;

      addMessageToChat(text, "emily", msg.image);
      setIsTyping(false);
      setEmilyIndex(prev => prev + 1);
    }, 1000);
  };

  const handleGreetingClick = (greet) => {
    addMessageToChat(`Greeting: ${greet}`);
    setFormCompleted(true);
    setStep("done");
    setEmilyIndex(0); // reset index
    sendEmilySequential();
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    addMessageToChat(input);
    sendEmilySequential();
    setInput("");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUserAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", maxWidth: "350px", margin: "auto", border: "1px solid #000", backgroundColor: "#fff", color: "#000", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px", borderBottom: "1px solid #000", backgroundColor: "#fff" }}>
        <img src={emilyAvatar} alt="Emily" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
        <div>
          <div style={{ fontWeight: "bold" }}>Emily</div>
          <div style={{ fontSize: "12px", color: "green" }}>● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} userAvatar={userAvatar || ""} emilyAvatar={emilyAvatar} />
        ))}
        {isTyping && <div style={{ margin: "5px 0" }}>Emily is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!formCompleted ? (
        <div style={{ padding: "10px", borderTop: "1px solid #000", display: "flex", flexDirection: "column", gap: "8px" }}>
          {!userAvatar && <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ borderRadius: "10px" }} />}
          {step === "email" && <>
            <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9", backgroundColor: "#001f3f", color: "#fff" }} />
            <button onClick={handleNextStep} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Next</button>
          </>}
          {step === "country" && <>
            <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9", backgroundColor: "#001f3f", color: "#fff" }} />
            <button onClick={handleNextStep} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Next</button>
          </>}
          {step === "city" && <>
            <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9", backgroundColor: "#001f3f", color: "#fff" }} />
            <button onClick={handleNextStep} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Next</button>
          </>}
          {step === "state" && <>
            <input type="text" placeholder="State" value={stateName} onChange={e => setStateName(e.target.value)} style={{ padding: "8px", borderRadius: "10px", border: "1px solid #0074D9", backgroundColor: "#001f3f", color: "#fff" }} />
            <button onClick={handleNextStep} style={{ padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Next</button>
          </>}
          {step === "greeting" && <>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleGreetingClick("Hi")} style={{ flex: 1, padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Hi</button>
              <button onClick={() => handleGreetingClick("Hello")} style={{ flex: 1, padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Hello</button>
            </div>
          </>}
        </div>
      ) : (
        <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #000" }}>
          <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} style={{ flex: 1, padding: "8px", borderRadius: "10px" }} />
          <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "8px", borderRadius: "10px", backgroundColor: "#0074D9", color: "#fff" }}>Send</button>
        </div>
      )}
    </div>
  );
}
