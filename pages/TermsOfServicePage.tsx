import React from 'react';
import { APP_NAME, IconLogo } from '../constants';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <IconLogo className="w-16 h-16 text-primary dark:text-accent-light mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Terms of Service</h1>
        <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-d-light/50 p-6 md:p-10 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-d-dark">
          <p>
            Welcome to {APP_NAME}! These terms and conditions outline the rules and regulations for the use of {APP_NAME}'s Website, located at bookin.com (conceptual).
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use {APP_NAME} if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">1. Introduction (Placeholder)</h2>
          <p>
            This is a demonstration application. The services, bookings, payments, and user accounts are all simulated. No real transactions will occur, and no personal data is stored on a production server.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, {APP_NAME} and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
          </p>

          <h2 className="text-2xl font-bold mt-8">3. User Accounts (Mock)</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">4. Bookings and Payments (Mock)</h2>
          <p>
            All bookings and payments on this platform are for demonstration purposes only. They do not represent real services or financial transactions. Do not enter real payment information.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">5. Limitation of Liability</h2>
          <p>
            In no event shall {APP_NAME}, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. {APP_NAME} shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">6. Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the State of Example, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Example for the resolution of any disputes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;