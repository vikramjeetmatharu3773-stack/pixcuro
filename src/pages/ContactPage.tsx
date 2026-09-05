import { useState } from 'react';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description: `Contact ${SITE.name}.`,
    path: '/contact',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Since we have no backend, we open the user's mail client with a prefilled message.
    const subject = encodeURIComponent(`[${SITE.name}] message from ${name || 'visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <article className="container-narrow py-12 max-w-2xl">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">Contact</h1>
      <p className="text-ink-700 mt-3">
        Have a question, suggestion, or bug report? Use the form below. It opens your email client
        with a prefilled message — we don't store anything.
      </p>

      <form onSubmit={onSubmit} className="card p-6 mt-6 space-y-4">
        <label className="block">
          <span className="label">Your name</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" required />
        </label>
        <label className="block">
          <span className="label">Message</span>
          <textarea className="textarea min-h-32" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What would you like to tell us?" required />
        </label>
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Opening email…' : 'Send via your email client'}
        </button>
        {status === 'sent' && (
          <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            Your email client should now be open with the message prefilled.
          </p>
        )}
      </form>
    </article>
  );
}
