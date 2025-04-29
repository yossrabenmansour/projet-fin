import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-6">
          Welcome to our clothing shop! We started our journey with a mission to provide high-quality and fashionable clothing
          at affordable prices. Our passion for fashion and dedication to customer satisfaction drive us to continuously
          improve and innovate.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          Our mission is to offer stylish and trendy clothing options for all. We believe that everyone deserves to look and
          feel their best, regardless of their budget. We strive to provide a diverse range of products that cater to different
          tastes and preferences.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">Quality: We prioritize quality in everything we do, from the materials we use to the craftsmanship of our products.</li>
          <li className="mb-2">Customer Satisfaction: Our customers are at the heart of our business. We aim to provide exceptional service and create a positive shopping experience.</li>
          <li className="mb-2">Innovation: We constantly seek new ways to improve our products and services, staying ahead of fashion trends and technological advancements.</li>
          <li className="mb-2">Sustainability: We are committed to sustainable practices and minimizing our environmental impact. We believe in creating a better future for our planet.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          If you have any questions, feedback, or just want to say hello, feel free to reach out to us. We're always here to help and listen to our customers.
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:support@clothingshop.com" className="text-blue-500 hover:underline">support@clothingshop.com</a><br />
          Phone: <a href="tel:+123456789" className="text-blue-500 hover:underline">+123 456 789</a>
        </p>
      </div>
    </div>
  );
};

export default About;
