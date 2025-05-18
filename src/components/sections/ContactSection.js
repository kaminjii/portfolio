import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

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
  const [focused, setFocused] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
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
      
      // Reset success message after 5 seconds
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

  // Handle input focus and blur for floating labels
  const handleFocus = (field) => {
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen py-20 flex flex-col justify-center">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="text-teal-400 opacity-70 mr-2">04.</span> Contact
          <div className="h-px bg-gray-700 flex-grow ml-4"></div>
        </h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        <FadeIn delay={100}>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-100">Let's Connect</h3>
            <p className="text-gray-300">
              I'm always looking for new opportunities. Whether you have a question or just want to say hi,
              I'll try my best to get back to you!
            </p>
            
            {/* Contact info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center group">
                <div className="p-3 rounded-full bg-gray-800 mr-4 transition-all duration-300 group-hover:bg-teal-900/40 group-hover:text-teal-400">
                  <Mail size={24} />
                </div>
                <a 
                  href="mailto:wood.kaitlin3@gmail.com" 
                  className="text-gray-300 group-hover:text-teal-400 transition-colors"
                >
                  wood.kaitlin3@gmail.com
                </a>
              </div>
              
              <div className="flex items-center group">
                <div className="p-3 rounded-full bg-gray-800 mr-4 transition-all duration-300 group-hover:bg-teal-900/40 group-hover:text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <a 
                  href="https://linkedin.com/in/kaitlinwood03" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 group-hover:text-teal-400 transition-colors"
                >
                  linkedin.com/in/kaitlinwood03
                </a>
              </div>
              
              <div className="flex items-center group">
                <div className="p-3 rounded-full bg-gray-800 mr-4 transition-all duration-300 group-hover:bg-teal-900/40 group-hover:text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <a 
                  href="https://github.com/kaminjii" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 group-hover:text-teal-400 transition-colors"
                >
                  github.com/kaminjii
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-6">Send me a message</h3>
            
            {/* Name field */}
            <div className="mb-6 relative">
              <label 
                htmlFor="name"
                className={`absolute transition-all duration-300 ${
                  focused === 'name' || formState.name 
                    ? 'text-xs text-teal-400 top-1 left-3' 
                    : 'text-gray-400 top-3 left-4'
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className={`w-full bg-gray-900/60 border ${
                  focused === 'name' ? 'border-teal-400' : 'border-gray-700'
                } rounded p-3 pt-5 text-white focus:outline-none transition-colors duration-300`}
                required
              />
            </div>
            
            {/* Email field */}
            <div className="mb-6 relative">
              <label 
                htmlFor="email"
                className={`absolute transition-all duration-300 ${
                  focused === 'email' || formState.email 
                    ? 'text-xs text-teal-400 top-1 left-3' 
                    : 'text-gray-400 top-3 left-4'
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className={`w-full bg-gray-900/60 border ${
                  focused === 'email' ? 'border-teal-400' : 'border-gray-700'
                } rounded p-3 pt-5 text-white focus:outline-none transition-colors duration-300`}
                required
              />
            </div>
            
            {/* Message field */}
            <div className="mb-6 relative">
              <label 
                htmlFor="message"
                className={`absolute transition-all duration-300 ${
                  focused === 'message' || formState.message 
                    ? 'text-xs text-teal-400 top-1 left-3' 
                    : 'text-gray-400 top-3 left-4'
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className={`w-full bg-gray-900/60 border ${
                  focused === 'message' ? 'border-teal-400' : 'border-gray-700'
                } rounded p-3 pt-5 text-white focus:outline-none transition-colors duration-300`}
                required
              ></textarea>
            </div>
            
            {/* Submit button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={formStatus.sending || formStatus.sent}
                className={`group relative overflow-hidden border border-teal-400 text-teal-400 px-6 py-3 rounded hover:bg-teal-900/20 transition-all duration-300 ${
                  formStatus.sending || formStatus.sent ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span className={`inline-block transition-transform duration-300 ${
                  formStatus.sending ? 'translate-y-10' : 'translate-y-0'
                }`}>
                  Send Message
                </span>
                <span className={`absolute left-0 right-0 transition-transform duration-300 ${
                  formStatus.sending ? 'translate-y-0' : '-translate-y-10'
                }`}>
                  Sending...
                </span>
              </button>
            </div>
            
            {/* Success message */}
            {formStatus.sent && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-400 text-green-400 rounded">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {/* Error message */}
            {formStatus.error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-400 text-red-400 rounded">
                There was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
