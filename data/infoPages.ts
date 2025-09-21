import React from 'react';
import { APP_NAME, IconGlobe, IconBriefcase, IconStar, IconQuestionMarkCircle, IconLockClosed, IconTicket, IconShieldCheck } from '../constants';

interface InfoPageContent {
  title: string;
  subtitle?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  content: {
    type: 'h2' | 'p' | 'ul';
    text?: string;
    items?: string[];
  }[];
}

export const infoPages: { [key: string]: InfoPageContent } = {
  about: {
    title: `About ${APP_NAME}`,
    subtitle: `Discover the story behind ${APP_NAME} and our commitment to making booking simple and enjoyable for everyone.`,
    icon: IconGlobe,
    content: [
      { type: 'h2', text: 'Our Mission' },
      { type: 'p', text: `At ${APP_NAME}, our mission is to connect people with unforgettable experiences and essential services through a seamless, trustworthy, and innovative booking platform. We believe that planning your next adventure, stay, or event should be exciting, not stressful.` },
      { type: 'p', text: `We strive to empower travelers and users by providing a comprehensive selection, transparent pricing, and user-friendly tools. This is a demonstration project to showcase modern web development capabilities.` },
      { type: 'h2', text: 'How We Work' },
      { type: 'p', text: `We partner with a wide (mock) range of service providers to bring you a vast selection of booking options. Our platform is designed to make the discovery and booking process as easy as possible.` },
    ],
  },
  careers: {
    title: 'Careers',
    subtitle: 'Join our passionate team and help us revolutionize the booking experience.',
    icon: IconBriefcase,
    content: [
      { type: 'h2', text: 'Why Work at Bookin?' },
      { type: 'p', text: 'We are a (mock) dynamic and innovative company that values creativity, collaboration, and a commitment to excellence. We offer a stimulating work environment where you can grow your skills and make a real impact.' },
      { type: 'h2', text: 'Current Openings (Placeholder)' },
      { type: 'p', text: 'We are always looking for talented individuals. Here are some roles we are hypothetically hiring for:' },
      { type: 'ul', items: ['Senior Frontend Engineer', 'Lead Backend Developer', 'UX/UI Designer', 'Product Manager'] },
      { type: 'p', text: 'To apply, please send your resume and a cover letter to careers@bookin.example (this is a mock email).' },
    ],
  },
  'genius-loyalty': {
    title: 'Genius Loyalty Programme',
    subtitle: 'Unlock instant rewards, discounts, and perks with our free loyalty program.',
    icon: IconStar,
    content: [
      { type: 'h2', text: 'Welcome to Genius!' },
      { type: 'p', text: 'Genius is our way of rewarding our most frequent travelers. The more you book, the more you get. And the best part? It’s completely free to join.' },
      { type: 'h2', text: 'Genius Levels & Benefits (Mock)' },
      { type: 'ul', items: [
        'Genius Level 1: Get 10% discounts on the price of your stay at participating properties.',
        'Genius Level 2: Enjoy 15% discounts, free breakfast, and free room upgrades on select options.',
        'Genius Level 3: Receive up to 20% discounts, priority support, and all the benefits from Level 2.'
      ]},
      { type: 'p', text: 'Sign up today and start enjoying your rewards!' },
    ],
  },
  'partner-help': {
    title: 'Partner Help Center',
    subtitle: 'Resources and support for our valued business partners.',
    icon: IconQuestionMarkCircle,
    content: [
      { type: 'h2', text: 'Welcome, Partner!' },
      { type: 'p', text: 'This section is dedicated to helping you get the most out of your partnership with Bookin. Find answers to common questions below.' },
      { type: 'h2', text: 'Frequently Asked Questions (Placeholder)' },
      { type: 'ul', items: [
        'How do I list my property/service?',
        'How do I manage my bookings?',
        'How does the payment process work?',
        'How can I contact partner support?'
      ]},
      { type: 'p', text: 'For direct assistance, please log in to your extranet or contact partners@bookin.example.' },
    ],
  },
  privacy: {
    title: 'Privacy & Cookies Policy',
    subtitle: `Your privacy is important to us. This policy explains what data we (mock) collect and how we use it.`,
    icon: IconLockClosed,
    content: [
        { type: 'h2', text: '1. Introduction' },
        { type: 'p', text: 'This is a demonstration application. No real personal data is collected, processed, or stored for commercial purposes. Any data you enter is stored in your browser\'s local storage for the demo experience.' },
        { type: 'h2', text: '2. Information We "Collect"' },
        { type: 'p', text: 'For the purpose of this demo, we "collect":' },
        { type: 'ul', items: ['User information you provide at sign-up (e.g., name, email).', 'Booking details you enter.', 'Your search history.'] },
        { type: 'h2', text: '3. Use of Cookies' },
        { type: 'p', text: 'We use local storage (which is similar to cookies) to remember your preferences like theme, language, and mock user session. We do not use third-party tracking cookies.' },
    ],
  },
  security: {
    title: 'Security & Trust',
    subtitle: `Learn about the measures we take to keep your data safe and your bookings secure.`,
    icon: IconShieldCheck,
    content: [
        { type: 'h2', text: 'Our Commitment to Your Security' },
        { type: 'p', text: `At ${APP_NAME}, we take your security and privacy seriously. While this is a demonstration application, we have implemented mock features that represent real-world best practices to show our commitment.` },
        { type: 'h2', text: 'Account Protection' },
        { type: 'ul', items: [
            '<strong>Mock Two-Factor Authentication (2FA):</strong> We have implemented a mock 2FA system on login to demonstrate how we protect your account from unauthorized access, adding an extra layer of security.',
            '<strong>Secure Password Handling:</strong> In a real-world application, all user passwords would be securely hashed and salted using industry-standard algorithms, never stored in plaintext.'
        ]},
        { type: 'h2', text: 'Data Privacy' },
        { type: 'p', text: `We believe you should be in control of your data. Our mock "Cookie Consent" banner demonstrates our commitment to transparency. Your search history is stored locally on your device and can be cleared by you at any time from the history page.` },
        { type: 'h2', text: 'Secure Transactions (Mock)' },
        { type: 'p', text: `Our payment forms are for demonstration only. In a live environment, we would partner with PCI-compliant payment gateways like Stripe, Braintree, or Cybersource. Your financial data would be handled with the highest level of security and would never be stored on our servers directly.` },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    subtitle: `Last updated: ${new Date().toLocaleDateString()}`,
    icon: IconTicket,
    content: [
        { type: 'h2', text: '1. Agreement to Terms' },
        { type: 'p', text: `By using our application, you agree to be bound by these Terms. This is a demonstration application. The services, bookings, and user accounts are all simulated.` },
        { type: 'h2', text: '2. User Accounts (Mock)' },
        { type: 'p', text: `When you create an account, you must provide accurate information. You are responsible for safeguarding your password. Our mock authentication does not provide real security.` },
        { type: 'h2', text: '3. Bookings and Payments (Mock)' },
        { type: 'p', text: `All bookings and payments on this platform are for demonstration purposes only. They do not represent real services or financial transactions. Do not enter real payment information.` },
        { type: 'h2', text: '4. Limitation of Liability' },
        { type: 'p', text: `In no event shall ${APP_NAME} be liable for any damages arising out of the use or inability to use the materials on this website.` },
    ],
  },
  'travel-articles': {
    title: 'Travel Articles',
    subtitle: 'Inspiration for your next journey from the travel experts at Bookin.',
    icon: IconBriefcase,
    content: [
        { type: 'h2', text: 'Top 5 Treks in Nepal for Beginners' },
        { type: 'p', text: 'Thinking of trekking in the Himalayas but not sure where to start? We break down five of the most accessible and rewarding treks that offer stunning views without requiring mountaineering experience...' },
        { type: 'h2', text: 'A Culinary Tour of New Delhi' },
        { type: 'p', text: 'From street-side chaat to fine dining, Delhi is a food lover\'s paradise. Join us as we explore the can\'t-miss dishes and restaurants in India\'s bustling capital...' },
        { type: 'h2', text: 'Finding Serenity: The Best Beach Resorts in Sri Lanka' },
        { type: 'p', text: 'Looking to unwind? Discover our handpicked selection of Sri Lanka\'s most beautiful and relaxing beach resorts, perfect for your next getaway...' },
    ],
  },
};