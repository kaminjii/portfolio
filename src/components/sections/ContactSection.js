import React, { useState, useRef } from 'react';
import { Mail, Send, Heart, Linkedin, Github } from 'lucide-react';
import FadeIn from '../animations/FadeIn'; 
import { useTheme } from '../../app/ThemeContext'; 
import { cx } from '../../app/ThemeUtils'; 

const ContactSection = ({ sectionRef }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    sending: false,
    sent: false,
    error: false
  });
  const { theme } = useTheme();
  const nameInputRef = useRef(null);

  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";
  const accentColorBorderFocus = theme === 'dark' ? "focus:border-red-500" : "focus:border-red-600";
  const accentColorRingFocus = theme === 'dark' ? "focus:ring-red-500/20" : "focus:ring-red-600/20";
  const primaryButtonBg = theme === 'dark' ? "bg-red-600 text-white hover:bg-red-500" : "bg-red-700 text-white hover:bg-red-600";
  const secondaryButtonBg = theme === 'dark' ? "bg-stone-800 text-stone-200 hover:bg-stone-700" : "bg-stone-200 text-stone-700 hover:bg-stone-300";

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, sending: true });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ sending: false, sent: true, error: false });
        setFormState({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setFormStatus({ sending: false, sent: false, error: false });
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({ sending: false, sent: false, error: true });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 relative font-sans">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <FadeIn>
          <div className="text-center mb-16">
            <span className={cx("font-medium text-sm uppercase tracking-wider", accentColorText)}>Get in Touch</span>
            <h2 className={cx(
              "text-5xl sm:text-6xl font-serif mt-4 mb-6", // Changed to font-serif
              theme === 'dark' ? "text-stone-100" : "text-stone-900"
            )}>
              Let&apos;s Create Together
            </h2>
            <p className={cx(
              "text-xl max-w-2xl mx-auto",
              theme === 'dark' ? "text-stone-300" : "text-stone-600"
            )}>
              I&apos;m always excited to connect and explore new opportunities. 
              Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you.
            </p>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <form onSubmit={handleSubmit} className={cx(
            "p-8 sm:p-12 rounded-3xl backdrop-blur-sm",
            theme === 'dark' 
              ? "bg-stone-900/50" 
              : "bg-white shadow-xl"
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label 
                  htmlFor="name"
                  className={cx(
                    "block text-sm font-medium mb-2",
                    theme === 'dark' ? "text-stone-300" : "text-stone-700"
                  )}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={nameInputRef}
                  value={formState.name}
                  onChange={handleChange}
                  className={cx(
                    "w-full px-4 py-3 rounded-xl transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-stone-800 text-white border-stone-700" 
                      : "bg-stone-50 text-stone-900 border-stone-200",
                    "border focus:outline-none focus:ring-2",
                    accentColorBorderFocus, accentColorRingFocus
                  )}
                  required
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email"
                  className={cx(
                    "block text-sm font-medium mb-2",
                    theme === 'dark' ? "text-stone-300" : "text-stone-700"
                  )}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={cx(
                    "w-full px-4 py-3 rounded-xl transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-stone-800 text-white border-stone-700" 
                      : "bg-stone-50 text-stone-900 border-stone-200",
                    "border focus:outline-none focus:ring-2",
                    accentColorBorderFocus, accentColorRingFocus
                  )}
                  required
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label 
                htmlFor="message"
                className={cx(
                  "block text-sm font-medium mb-2",
                  theme === 'dark' ? "text-stone-300" : "text-stone-700"
                )}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formState.message}
                onChange={handleChange}
                className={cx(
                  "w-full px-4 py-3 rounded-xl transition-all duration-300 resize-none",
                  theme === 'dark' 
                    ? "bg-stone-800 text-white border-stone-700" 
                    : "bg-stone-50 text-stone-900 border-stone-200",
                  "border focus:outline-none focus:ring-2",
                  accentColorBorderFocus, accentColorRingFocus
                )}
                placeholder="Tell me about your project or just say hi..."
                required
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={formStatus.sending || formStatus.sent}
                className={cx(
                  "group flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300",
                  primaryButtonBg,
                  formStatus.sending || formStatus.sent ? "opacity-70 cursor-not-allowed" : ""
                )}
              >
                {formStatus.sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : formStatus.sent ? (
                  <>
                    <Heart size={20} className="text-white" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
            
            {formStatus.sent && (
              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-center">
                Thank you for reaching out! I&apos;ll get back to you soon.
              </div>
            )}
            
            {formStatus.error && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-center">
                Oops! Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </FadeIn>
        
        <FadeIn delay={300}>
          <div className="mt-16 text-center">
            <p className={cx(
              "text-lg mb-6",
              theme === 'dark' ? "text-stone-400" : "text-stone-600"
            )}>
              Prefer to reach out directly?
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <a
                href="mailto:wood.kaitlin3@gmail.com"
                className={cx(
                  "group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto justify-center",
                  secondaryButtonBg,
                  theme === 'dark' ? "hover:text-red-400" : "hover:text-red-600"
                )}
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
              
              <a
                href="https://linkedin.com/in/kaitlinwood03"
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  "group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto justify-center",
                  secondaryButtonBg,
                  theme === 'dark' ? "hover:text-red-400" : "hover:text-red-600"
                )}
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="https://github.com/kaminjii"
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  "group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto justify-center",
                  secondaryButtonBg,
                  theme === 'dark' ? "hover:text-red-400" : "hover:text-red-600"
                )}
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
