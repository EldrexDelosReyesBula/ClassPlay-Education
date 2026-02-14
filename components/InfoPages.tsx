
import React from 'react';

interface PageProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PageProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] animate-[fadeIn_0.3s_ease-out] overflow-y-auto">
    <div className="sticky top-0 bg-white/80 dark:bg-[#111c22]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#233c48] p-4 flex items-center gap-4 z-10">
      <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-[#233c48] rounded-full transition-colors">
        <span className="material-symbols-outlined dark:text-white">arrow_back</span>
      </button>
      <h1 className="text-xl font-bold dark:text-white">Privacy Policy</h1>
    </div>
    <div className="max-w-3xl mx-auto w-full p-8 text-slate-700 dark:text-slate-300 space-y-6">
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">1. Local Data Storage</h2>
        <p>ClassPlay is designed with privacy as a priority. All data, including student lists, game history, and settings, is stored locally on your device using IndexedDB and LocalStorage.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">2. No Cloud Tracking</h2>
        <p>We do not collect, transmit, or store any personal data on external servers. There are no tracking pixels, analytics scripts, or third-party cookies.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">3. Microphone Usage</h2>
        <p>Some tools (like the Noise Level Monitor) require microphone access. This audio data is processed in real-time within your browser to calculate volume levels and is never recorded or sent anywhere.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">4. Data Export</h2>
        <p>You have full control over your data. You can export a full backup of your class lists and settings at any time via the Settings menu.</p>
      </section>
    </div>
  </div>
);

export const TermsOfService: React.FC<PageProps> = ({ onBack }) => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] animate-[fadeIn_0.3s_ease-out] overflow-y-auto">
    <div className="sticky top-0 bg-white/80 dark:bg-[#111c22]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#233c48] p-4 flex items-center gap-4 z-10">
      <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-[#233c48] rounded-full transition-colors">
        <span className="material-symbols-outlined dark:text-white">arrow_back</span>
      </button>
      <h1 className="text-xl font-bold dark:text-white">Terms of Service</h1>
    </div>
    <div className="max-w-3xl mx-auto w-full p-8 text-slate-700 dark:text-slate-300 space-y-6">
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">1. Usage License</h2>
        <p>ClassPlay is provided for educational and personal use. Teachers are free to use these tools in their classrooms without restriction.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">2. Disclaimer</h2>
        <p>The software is provided "as is", without warranty of any kind. While we strive for reliability, we are not liable for any data loss resulting from browser cache clearing or device issues.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-2">3. Updates</h2>
        <p>We reserve the right to update or modify the application to improve functionality. Major changes will be communicated via the application interface.</p>
      </section>
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
      <div className="bg-primary p-6 rounded-3xl shadow-xl mb-8">
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
