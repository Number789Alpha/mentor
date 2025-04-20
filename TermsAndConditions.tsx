import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <ScrollArea className="h-[70vh] w-full rounded-md border p-6 bg-card">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h2 className="text-2xl font-semibold mb-4">Welcome to EchoMentor!</h2>
          <p className="mb-4">
            Our goal is to offer a secure and supportive community that brings together mentors and mentees for guidance, skill development, and self-improvement. By using or accessing EchoMentor, you consent to the Terms & Conditions, Privacy Policy, and Ethical Guidelines below. Read carefully before continuing.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Terms & Conditions</h3>
          
          <h4 className="text-lg font-medium mt-4 mb-2">1.1 Acceptance of Terms:</h4>
          <p>By registering or using EchoMentor, you acknowledge that:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>You have read, understood, and agreed to these terms.</li>
            <li>You are 18 years of age or older, or have the consent of a parent.</li>
            <li>You will observe all relevant legislation and regulations.</li>
          </ul>
          <p>If you don't agree to any of these terms, don't use our services.</p>

          <h4 className="text-lg font-medium mt-4 mb-2">1.2 Account & User Obligations:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>You are responsible for entering correct, complete, and current information when opening an account.</li>
            <li>You are responsible for keeping your login details confidential.</li>
            <li>You should not represent another individual, use fictitious profiles, or commit fraudulent schemes.</li>
          </ul>
          <p>EchoMentor holds the right to suspend or discontinue any offending account that disobeys our policies.</p>

          <h4 className="text-lg font-medium mt-4 mb-2">1.3 Acceptable Use & Platform Behavior:</h4>
          <p>By accessing EchoMentor, you understand:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To remain respectful and professional towards all the users.</li>
            <li>To utilize the site for mentorship, career development, and competency enhancement purposes alone.</li>
            <li>Not to harass, discriminate, or carry out hate speeches or improper behaviors.</li>
            <li>Not to post explicit, deceptive, or inaccurate information.</li>
            <li>Not to try hacking, phishing, or any process that violates platform security.</li>
          </ul>
          <p>Any breach will lead to account suspension, legal proceedings, or a permanent ban.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Privacy Policy</h3>
          <p>EchoMentor respects your privacy. This section describes how we collect, use, and protect your information.</p>

          <h4 className="text-lg font-medium mt-4 mb-2">2.1 Information We Gather:</h4>
          <p>We gather the following kinds of data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal Information – Name, email, phone number, education/profession details.</li>
            <li>Usage Data – Messages, mentorship activity, and engagement to enhance user experience.</li>
            <li>Technical Data – IP addresses, cookies, and analytics to advance security.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Ethical Guidelines</h3>
          
          <h4 className="text-lg font-medium mt-4 mb-2">3.1 Respect & Inclusivity:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Each user is to be respectful, kind, and professional.</li>
            <li>You are not allowed to discriminate based on race, gender, religion, nationality, or disabilities.</li>
            <li>Users who indulge in harassment, threats, or misconduct will be dealt with instantly.</li>
          </ul>

          <h4 className="text-lg font-medium mt-4 mb-2">3.2 Confidentiality & Privacy:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>All discussions between mentors and mentees should be kept confidential unless otherwise agreed upon.</li>
            <li>Sharing screenshots or personal data without permission goes against our policy.</li>
            <li>Mentors should refrain from biased counsel or excessive influence over mentees.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Contact Information</h3>
          <p>In case you have questions, contact us at info.echomentor@gmail.com</p>

          <p className="mt-6 font-medium">
            You accept these Terms & Conditions, Privacy Policy, and Ethical Guidelines when using EchoMentor. 
            You must cease the use of the platform immediately in case you do not agree with any of the terms.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TermsAndConditions;