
import React from 'react';

interface PageProps {
  onBack: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-[#233c48] pb-2">
    {children}
  </h2>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
    {children}
  </p>
);

const ListItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <li className="mb-3 text-slate-600 dark:text-slate-300 leading-relaxed">
    <strong className="text-slate-800 dark:text-white font-semibold">{title}:</strong> {children}
  </li>
);

export const PrivacyPolicy: React.FC<PageProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] animate-[fadeIn_0.3s_ease-out] overflow-y-auto">
    <div className="sticky top-0 bg-white/90 dark:bg-[#111c22]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#233c48] px-6 py-4 flex items-center gap-4 z-10">
      <button 
        onClick={onBack} 
        className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-[#233c48] rounded-full transition-colors"
        aria-label="Go Back"
      >
        <span className="material-symbols-outlined dark:text-white">arrow_back</span>
      </button>
      <div>
        <h1 className="text-xl font-bold dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Last Updated: January 1, 2026</p>
      </div>
    </div>
    
    <div className="max-w-3xl mx-auto w-full p-8 pb-20">
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-2xl mb-8">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined">verified_user</span>
          ClassPlay is a Local-First Application
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
          Unlike most web applications, ClassPlay does not send your student lists, custom questions, or game history to a cloud server. 
          <strong> Your data lives on your device.</strong>
        </p>
      </div>

      <Paragraph>
        At ClassPlay, we respect the privacy of educators and students. This Privacy Policy explains how we handle data, what we do not collect, and your rights regarding your information.
      </Paragraph>

      <SectionTitle>1. Data Collection & Storage</SectionTitle>
      <Paragraph>
        We operate on a "Local Storage" model. This means:
      </Paragraph>
      <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600 dark:text-slate-300">
        <li><strong>Student Data:</strong> Names, groups, and skill levels entered into the Class Manager are stored exclusively in your browser's <code className="bg-slate-100 dark:bg-[#1a2b34] px-1 py-0.5 rounded text-xs">IndexedDB</code> database. This data never leaves your device.</li>
        <li><strong>Game Content:</strong> Custom questions for quizzes, bingo boards, and wheels are stored locally.</li>
        <li><strong>No User Accounts:</strong> We do not require you to create an account, providing an email, or password. Therefore, we do not store personal identification information (PII) about you on our servers.</li>
      </ul>

      <SectionTitle>2. Analytics & Third-Party Services</SectionTitle>
      <Paragraph>
        To help us improve ClassPlay, we use <strong>Vercel Analytics</strong> to collect anonymous usage data.
      </Paragraph>
      <ul className="list-none pl-0 mb-6">
        <ListItem title="What is collected">
          We track page views, button clicks (e.g., "Math Relay Launched"), and general device type (Mobile/Desktop).
        </ListItem>
        <ListItem title="What is NOT collected">
          We do <strong>not</strong> collect input field text, student names, custom questions, IP addresses, or any personally identifiable information via analytics.
        </ListItem>
        <ListItem title="Opt-Out">
          You can opt-out of all analytics tracking at any time by going to <strong>Settings</strong> and toggling "Analytics" to off.
        </ListItem>
      </ul>

      <SectionTitle>3. Hardware Permissions</SectionTitle>
      <Paragraph>
        Certain tools require access to your device's hardware. This access is ephemeral and strictly local:
      </Paragraph>
      <ul className="list-none pl-0 mb-6">
        <ListItem title="Microphone">
          Used solely for the "Voice Boost" noise level monitor. Audio data is analyzed in real-time within your browser memory to determine volume levels. No audio is ever recorded, saved, or transmitted.
        </ListItem>
      </ul>

      <SectionTitle>4. Student Privacy (COPPA & FERPA)</SectionTitle>
      <Paragraph>
        Because ClassPlay does not transmit student data to external servers, it is designed to be compatible with:
      </Paragraph>
      <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600 dark:text-slate-300">
        <li><strong>FERPA (Family Educational Rights and Privacy Act):</strong> You retain full control and ownership of student education records entered into the app.</li>
        <li><strong>COPPA (Children's Online Privacy Protection Act):</strong> We do not knowingly collect personal information from children under 13. The tool is intended for use by educators/adults to facilitate classroom activities.</li>
      </ul>

      <SectionTitle>5. Data Retention & Deletion</SectionTitle>
      <Paragraph>
        Since data is stored on your device:
      </Paragraph>
      <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600 dark:text-slate-300">
        <li><strong>Retention:</strong> Data persists until you clear your browser cache or delete it manually within the app.</li>
        <li><strong>Deletion:</strong> You can delete specific classes or reset tools directly within the interface. Clearing your browser's "Site Data" will permanently erase all ClassPlay data.</li>
        <li><strong>Backups:</strong> You are responsible for backing up your data using the "Export Backup" feature in Settings.</li>
      </ul>

      <SectionTitle>6. Changes to This Policy</SectionTitle>
      <Paragraph>
        We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
      </Paragraph>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#233c48] text-center">
        <p className="text-slate-500 text-sm">Questions about privacy?</p>
        <a href="mailto:landecs.org@gmail.com" className="text-primary font-bold hover:underline">landecs.org@gmail.com</a>
      </div>
    </div>
  </div>
);

export const TermsOfService: React.FC<PageProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] animate-[fadeIn_0.3s_ease-out] overflow-y-auto">
    <div className="sticky top-0 bg-white/90 dark:bg-[#111c22]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#233c48] px-6 py-4 flex items-center gap-4 z-10">
      <button 
        onClick={onBack} 
        className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-[#233c48] rounded-full transition-colors"
        aria-label="Go Back"
      >
        <span className="material-symbols-outlined dark:text-white">arrow_back</span>
      </button>
      <div>
        <h1 className="text-xl font-bold dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Last Updated: January 1, 2026</p>
      </div>
    </div>

    <div className="max-w-3xl mx-auto w-full p-8 pb-20">
      <Paragraph>
        Welcome to ClassPlay. By accessing or using our website and digital tools, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
      </Paragraph>

      <SectionTitle>1. Use License</SectionTitle>
      <Paragraph>
        ClassPlay grants you a personal, non-exclusive, non-transferable, revocable license to use the software for educational, professional, or personal purposes in accordance with these Terms.
      </Paragraph>
      <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-600 dark:text-slate-300">
        <li>You are free to use ClassPlay in classrooms, workshops, and for remote learning.</li>
        <li>You may not modify, reverse engineer, decompile, or disassemble the source code of the software.</li>
        <li>You may not use the software for any illegal or unauthorized purpose.</li>
      </ul>

      <SectionTitle>2. User Data & Responsibility</SectionTitle>
      <Paragraph>
        ClassPlay utilizes a client-side storage architecture.
      </Paragraph>
      <ul className="list-none pl-0 mb-6">
        <ListItem title="Data Ownership">
          You retain full ownership and rights to any data (student names, lists, game configurations) you enter into the application.
        </ListItem>
        <ListItem title="Data Loss">
          You acknowledge that ClassPlay does not store your data on cloud servers. <strong>You are solely responsible for backing up your data.</strong> ClassPlay is not liable for data loss caused by browser clearing, device failure, or software updates.
        </ListItem>
      </ul>

      <SectionTitle>3. Intellectual Property</SectionTitle>
      <Paragraph>
        The ClassPlay interface, graphics, design, code, and game mechanics are the intellectual property of ClassPlay Education. The "ClassPlay" name and logo are trademarks of ClassPlay Education.
      </Paragraph>

      <SectionTitle>4. Disclaimer of Warranties</SectionTitle>
      <div className="bg-slate-100 dark:bg-[#1a2b34] p-6 rounded-xl mb-6 text-sm text-slate-600 dark:text-slate-300 italic border-l-4 border-slate-300 dark:border-slate-500">
        "THE SERVICE IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. CLASSPLAY EXPRESSLY DISCLAIMS ANY WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT."
      </div>

      <SectionTitle>5. Limitation of Liability</SectionTitle>
      <Paragraph>
        To the maximum extent permitted by law, ClassPlay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
      </Paragraph>

      <SectionTitle>6. Changes to Terms</SectionTitle>
      <Paragraph>
        We reserve the right to modify these Terms at any time. We will always post the most current version on our site. By continuing to use the service after changes become effective, you agree to be bound by the revised terms.
      </Paragraph>

      <SectionTitle>7. Governing Law</SectionTitle>
      <Paragraph>
        These Terms shall be governed by the laws of the United States, without respect to its conflict of laws principles.
      </Paragraph>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#233c48] text-center">
        <p className="text-slate-500 text-sm">Questions about these terms?</p>
        <a href="mailto:landecs.org@gmail.com" className="text-primary font-bold hover:underline">landecs.org@gmail.com</a>
      </div>
    </div>
  </div>
);

export const AboutPage: React.FC<PageProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] animate-[fadeIn_0.3s_ease-out] overflow-y-auto">
    <div className="sticky top-0 bg-white/80 dark:bg-[#111c22]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#233c48] p-4 flex items-center gap-4 z-10">
      <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-[#233c48] rounded-full transition-colors">
        <span className="material-symbols-outlined dark:text-white">arrow_back</span>
      </button>
      <h1 className="text-xl font-bold dark:text-white">About ClassPlay</h1>
    </div>
    <div className="max-w-3xl mx-auto w-full p-8 flex flex-col items-center text-center">
      <div className="bg-primary p-6 rounded-3xl shadow-xl mb-8 animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        <span className="material-symbols-outlined text-6xl text-white">school</span>
      </div>
      
      <h2 className="text-4xl font-black dark:text-white mb-4">ClassPlay</h2>
      <p className="text-xl text-slate-500 dark:text-[#92b7c9] max-w-lg mb-8">
        The all-in-one digital toolkit for modern classrooms. Designed to make teaching fun, fair, and engaging.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        <div className="bg-white dark:bg-[#111c22] p-6 rounded-2xl border border-slate-200 dark:border-[#233c48]">
          <span className="material-symbols-outlined text-4xl text-blue-500 mb-2">verified_user</span>
          <h3 className="font-bold dark:text-white">Privacy First</h3>
          <p className="text-sm text-slate-500">Zero tracking. Local storage only.</p>
        </div>
        <div className="bg-white dark:bg-[#111c22] p-6 rounded-2xl border border-slate-200 dark:border-[#233c48]">
          <span className="material-symbols-outlined text-4xl text-green-500 mb-2">offline_bolt</span>
          <h3 className="font-bold dark:text-white">Offline Ready</h3>
          <p className="text-sm text-slate-500">Works without internet once loaded.</p>
        </div>
        <div className="bg-white dark:bg-[#111c22] p-6 rounded-2xl border border-slate-200 dark:border-[#233c48]">
          <span className="material-symbols-outlined text-4xl text-purple-500 mb-2">favorite</span>
          <h3 className="font-bold dark:text-white">Teacher Made</h3>
          <p className="text-sm text-slate-500">Built with classroom needs in mind.</p>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-[#111c22] p-8 rounded-3xl w-full">
        <h3 className="font-bold dark:text-white mb-4">Support Our Mission</h3>
        <p className="text-slate-500 mb-6 max-w-lg mx-auto">
          ClassPlay is provided freely to help teachers everywhere. If you find value in these tools, please consider supporting development.
        </p>
        <a 
          href="https://www.landecs.org/docs/donation" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/30"
        >
          <span className="material-symbols-outlined">volunteer_activism</span>
          Donate to Support
        </a>
      </div>
      
      <p className="mt-12 text-slate-400 text-sm">Version 1.2.0 • © 2026 ClassPlay Education</p>
    </div>
  </div>
);
