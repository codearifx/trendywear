import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FaFacebook, FaXTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative py-20 overflow-hidden bg-primary">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-primary to-purple-900 opacity-90"></div>
      
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Get In Touch</h2>
          <p className="text-indigo-200 mt-2 text-lg">We love to hear from you. Drop us a message.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 justify-center items-center">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8 w-full">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex gap-4 items-start shadow-xl">
              <div className="p-3 bg-secondary rounded-full text-white shadow-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Our Location</h4>
                <p className="text-indigo-200">123 Fashion Street, Mumbai,<br/>Maharashtra 400001, India</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex gap-4 items-start shadow-xl">
              <div className="p-3 bg-blue-500 rounded-full text-white shadow-lg">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Phone Number</h4>
                <p className="text-indigo-200">+91 98765 43210</p>
                <p className="text-indigo-200">+91 11223 34455</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex gap-4 items-start shadow-xl">
              <div className="p-3 bg-purple-500 rounded-full text-white shadow-lg">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Email Address</h4>
                <p className="text-indigo-200">support@trendywear.com</p>
                <p className="text-indigo-200">careers@trendywear.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-pink-500 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg hidden md:block"></div>
            <form onSubmit={handleSubmit} className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 z-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6">Send a Message</h3>
              
              <div className="space-y-5">
                <div>
                  <input 
                    required 
                    type="text" 
                    name="name" 
                    placeholder="Your Full Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full px-5 py-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all" 
                  />
                </div>
                <div>
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    placeholder="Your Email Address" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full px-5 py-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all" 
                  />
                </div>
                <div>
                  <textarea 
                    required 
                    name="message" 
                    placeholder="Your Message..." 
                    rows="4" 
                    value={formData.message} 
                    onChange={handleChange} 
                    className="w-full px-5 py-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Send Message <Send size={20} />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-center text-gray-500 mb-4 font-medium">Or connect with us on</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="p-3 bg-gray-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="p-3 bg-gray-50 text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                    <FaXTwitter size={24} />
                  </a>
                  <a href="#" className="p-3 bg-gray-50 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                    <FaInstagram size={24} />
                  </a>
                  <a href="#" className="p-3 bg-gray-50 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
