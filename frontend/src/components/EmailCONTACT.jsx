import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const EmailCONTACT = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_m33y7zi', 'template_tr9koql', form.current, 'AujDt9pgRMI9RyBH5')
      .then(
        () => {
          alert('Email sent successfully!');
          form.current.reset(); // Clear all fields
        },
        (error) => {
          alert('Failed to send email, please try again.');
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className=" w-[50vw] bg-transparent border-gray-300 border-2 p-6 rounded-lg mx-auto hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-[#333] mb-4">Have any project in mind? <span className='text-golden'>CONTACT US</span></h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
        <input
          type="text"
          name="user_name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-golden"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="user_email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-golden"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
        <textarea
          name="message"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-golden"
          rows="4"
          required
        />
      </div>
      <div className="text-center">
        <input
          type="submit"
          value="Send Email"
          className="px-16 py-2 bg-golden text-white text-xl font-semibold rounded-lg hover:bg-transparent hover:text-golden  border-golden border cursor-pointer focus:outline-none "
        />
      </div>
    </form>
  );
};
