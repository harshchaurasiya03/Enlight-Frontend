import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const messagesDiv = useRef(null);

  const questions = [
    {
      text: "Hi there! 👋 Welcome to Englight Property — Thailand’s trusted name in luxury real estate. Can I help you find your dream property today?",
      options: ["Yes", "No"],
    },
    {
      text: "What type of property are you interested in?",
      options: ["Residential Apartment", "Villa", "Commercial Property", "Plot/Land"],
    },
    { text: "Which location or city are you looking in?", options: ["Gurgaon", "Noida", "Greater Noida", "Delhi"] },
    { text: "What is your budget range?", options: ["₹50L–1Cr", "₹1–3Cr", "₹3–5Cr", "₹5Cr+"] },
    { text: "When do you plan to make your Purchase/Rent/Buy?", options: ["Immediately", "Within 3 months", "3–6 months", "After 6 months"] },
    { text: "Do you need home loan assistance or financial guidance?", options: ["Yes", "No"] },
    { text: "Would you like to receive details about upcoming luxury projects or investment offers?", options: ["Yes", "No"] },
    { text: "Would you like to schedule a free consultation call with our real estate expert?", options: ["Yes", "No"] },
  ];

  const botMessage = (text) => {
    const msg = document.createElement("div");
    msg.className = "bg-yellow-100/10 border border-yellow-400 text-yellow-400 self-start p-2.5 rounded-lg max-w-[80%] my-2";
    msg.textContent = text;
    messagesDiv.current.appendChild(msg);
    messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
  };

  const userMessage = (text) => {
    const msg = document.createElement("div");
    msg.className = "bg-gradient-to-r from-yellow-400 to-yellow-700 text-black font-medium self-end p-2.5 rounded-lg max-w-[80%] my-2";
    msg.textContent = text;
    messagesDiv.current.appendChild(msg);
    messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
  };

  const addOptions = (options) => {
    options.forEach((option) => {
      const btn = document.createElement("button");
      btn.className =
        "bg-gray-900 text-yellow-400 border border-yellow-400 rounded-md px-3 py-2 m-1 text-sm hover:bg-yellow-400 hover:text-black transition";
      btn.textContent = option;
      btn.onclick = () => handleUserResponse(option);
      messagesDiv.current.appendChild(btn);
    });
    messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
  };

  const handleUserResponse = (response) => {
    userMessage(response);
    setFormData((prev) => ({ ...prev, [`q_${step + 1}`]: response }));

    // If user said No at step 0
    if (step === 0 && response === "No") {
      botMessage("Totally fine 😊 Thank you for visiting Enlight ! Have a wonderful day! 🌟");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const nextQuestion = () => {
    // Rent-specific flow example (if needed)
    if (formData.intent === "Rent" && step === 3) {
      botMessage("What is your monthly rental budget?");
      addOptions(["<₹25,000", "₹25,000–₹50,000", ">₹50,000"]);
      setStep((prev) => prev + 1);
      return;
    }

    // Skip loan question if Rent
    if (formData.intent === "Rent" && step === 5) {
      setStep((prev) => prev + 1);
    }

    if (step < questions.length) {
      botMessage(questions[step].text);
      addOptions(questions[step].options);
    } else {
      botMessage(
        `Thank you, ${formData.name || "there"}! 🎉 Our expert advisor will contact you shortly with the best ${formData.intent?.toLowerCase()} options in your preferred location and budget.`
      );
      sendDataToFormspree();
      setTimeout(() => {
        Swal.fire("✅ Thank you!", "Your details have been received. We’ll reach out soon.", "success");
        setIsOpen(false);
      }, 2000);
    }
  };

  const startChat = () => {
    Swal.fire({
      title: "Let’s Get Started!",
      html: `
        <form id="chatbotForm">
          <input name="name" class="swal2-input bg-gray-900 border border-yellow-400 text-yellow-400" required placeholder="Enter your Name">
          <input name="phone" type="tel" class="swal2-input bg-gray-900 border border-yellow-400 text-yellow-400" required placeholder="Enter Phone Number">
          <select name="intent" class="swal2-select bg-gray-900 border border-yellow-400 text-yellow-400" required>
            <option>Select your Interest</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
            <option value="Invest">Invest</option>
          </select>
        </form>
      `,
      confirmButtonText: "Start Chat",
      preConfirm: () => {
        const name = document.querySelector("input[name=name]").value;
        const phone = document.querySelector("input[name=phone]").value;
        const intent = document.querySelector("select[name=intent]").value;
        setFormData({ name, phone, intent });
      },
    }).then(() => {
      setIsOpen(true);
      setTimeout(nextQuestion, 500);
    });
  };

  const sendDataToFormspree = () => {
    fetch("https://formspree.io/f/xjkanlqw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  useEffect(() => {
    if (step > 0 && isOpen) {
      setTimeout(nextQuestion, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={startChat}
        className="fixed bottom-6 left-6 w-18 h-18 rounded-full z-50 shadow-xl"
      >
        <img
          src="/images/112.gif"
          alt="Chatbot Assistant"
          className="w-full h-full object-cover rounded-full shadow-[0_0_20px_rgba(255,215,0,0.6)] hover:scale-110 hover:shadow-[0_0_25px_rgba(255,215,0,0.9)] transition-transform duration-200"
        />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-28 left-6 w-80 max-h-[550px] flex flex-col bg-black border-2 border-yellow-500 rounded-xl shadow-xl overflow-hidden z-50">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between bg-linear-to-r from-black to-gray-900 text-yellow-400 font-bold p-3 border-b border-yellow-400">
            <span>Englight Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-yellow-400 hover:text-red-500 font-bold text-lg"
            >
              ✕
            </button>
          </div>
          <div
            ref={messagesDiv}
            className="flex-1 p-3 overflow-y-auto text-sm text-white flex flex-col"
          ></div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
