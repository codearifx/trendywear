import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaXTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="bg-primary p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Have a question, feedback, or need help with your order? Our team is available 24/7.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full"><Phone size={20} /></div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold">support@trendywear.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full"><MapPin size={20} /></div>
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-semibold">Fashion Hub, MG Road, Bangalore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 flex flex-col justify-center">
            <form className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-md text-gray-900 bg-accent focus:bg-white border border-transparent focus:border-secondary transition-colors outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-md text-gray-900 bg-accent focus:bg-white border border-transparent focus:border-secondary transition-colors outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-md text-gray-900 bg-accent focus:bg-white border border-transparent focus:border-secondary transition-colors outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
                <button type="button" className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 rounded-md transition-all mt-2 shadow-lg shadow-secondary/30">
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-center text-gray-500 mb-4 font-medium">Stay in touch</p>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
