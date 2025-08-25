import { AnimatePresence, motion } from "framer-motion";
import { Copy, Mail, Calendar, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [open, setOpen] = useState(false);

  const email = "jcasas@simple-ticket.net";

  const copyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
      }).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Email copied to clipboard!");
  };

  const sendEmail = () => {
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${email}`;
    }
  };

  const scheduleMeeting = () => {
    if (typeof window !== "undefined") {
      window.open("https://calendly.com/jcasasmail", "_blank");
    }
  };

  const options = [
    { label: "Copy email", icon: <Copy className="w-4 h-4" />, action: copyEmail },
    { label: "Send email", icon: <Mail className="w-4 h-4" />, action: sendEmail },
    { label: "Schedule meeting", icon: <Calendar className="w-4 h-4" />, action: scheduleMeeting },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-100">
      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {open &&
            options.map((opt, i) => (
              <motion.button
                key={opt.label}
                onClick={opt.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                className="mb-2 flex items-center gap-2 bg-white shadow-lg px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                {opt.icon}
                {opt.label}
              </motion.button>
            ))}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}


