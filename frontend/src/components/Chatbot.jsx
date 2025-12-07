import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";

// Simple client-side rule-based chatbot. It can be extended to call a backend AI.
const cannedReplies = (text) => {
  const t = text.toLowerCase();
  if (t.includes("hello") || t.includes("hi"))
    return "Hello! I can help with students, exams, timetables and login. How can I help?";
  if (t.includes("enrollment") || t.includes("enrol") || t.includes("enroll"))
    return "Enrollment numbers are auto-generated at student creation (e.g. 123456). Admin can find them in Student Management.";
  if (t.includes("login"))
    return "Students login with their enrollment number as email (enrollment@ gmail.com) and default password 'student123'.";
  if (t.includes("exam"))
    return "Exams can be added from the Admin → Exam page. You can upload a timetable file or leave it blank.";
  return "Sorry, I don't understand. Try asking about 'enrollment', 'login', or 'exam'.";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi — I'm help-bot. Ask me about the app." },
  ]);
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);

    // Simple local reply. Replace here with an API call to your AI backend if you have one.
    const reply = cannedReplies(text.trim());
    setMessages((m) => [...m, { from: "bot", text: reply }]);
    setText("");
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="px-4 py-2 bg-blue-600 text-white flex items-center justify-between">
            <div className="font-semibold">Help Bot</div>
            <button onClick={() => setOpen(false)} className="text-white">✕</button>
          </div>
          <div className="p-3 flex-1 overflow-y-auto h-56 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "bot" ? "text-sm text-gray-700 dark:text-gray-200" : "text-sm text-right text-gray-800"}>
                <div className={m.from === "bot" ? "inline-block bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded" : "inline-block bg-blue-100 px-3 py-2 rounded"}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm" placeholder="Ask me..." />
              <button onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg"
        title="Open chat"
      >
        <FiMessageSquare />
      </button>
    </>
  );
};

export default Chatbot;
