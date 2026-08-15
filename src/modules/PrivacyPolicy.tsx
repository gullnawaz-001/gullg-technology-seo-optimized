import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: August 2026</p>

        <p className="text-slate-600 mb-8 leading-relaxed">
          GullG Technologies ("we," "us," "our") operates gullgtech.online. This Privacy Policy explains how we collect, use, and protect information when you visit our site or engage with our services.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Information We Collect</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-8 space-y-2">
          <li>Contact information you provide through our forms (name, email, phone/WhatsApp, company, project details)</li>
          <li>Basic usage data collected automatically (browser type, pages visited, general location) for site improvement purposes</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-8 space-y-2">
          <li>To respond to inquiries and discuss potential projects</li>
          <li>To communicate about ongoing or completed work</li>
          <li>To improve our website and services</li>
          <li>We do not sell or rent your personal information to third parties</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Data Sharing</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We do not share your information with third parties except where necessary to deliver a service you've requested (e.g. a form-handling provider) or where required by law.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Data Retention</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We retain contact and project information for as long as necessary to maintain our business relationship and comply with legal obligations.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Your Rights</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          You may request access to, correction of, or deletion of your personal information by contacting us at info@gullgtech.online.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Cookies</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Our website may use basic cookies for essential site functionality and analytics. You can control cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Changes to This Policy</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Contact</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Questions about this policy can be directed to <a href="mailto:info@gullgtech.online" className="text-slate-900 font-semibold hover:underline">info@gullgtech.online</a>.
        </p>
      </div>
    </div>
  );
}
