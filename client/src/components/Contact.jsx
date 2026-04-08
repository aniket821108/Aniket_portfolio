import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';
import { submitContactForm } from '../utils/api';

const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate(form) {
  const e = {};
  if (!form.name.trim()) e.name = 'Name is required';
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
  if (!form.subject.trim()) e.subject = 'Subject is required';
  if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
  return e;
}

const inputBase =
  'w-full bg-surface-2 border border-border hover:border-border-light focus:border-accent/50 rounded-xl px-4 py-3 text-text-primary font-body text-sm outline-none transition-all duration-200 placeholder:text-text-muted';

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block font-mono text-xs text-text-muted tracking-wide mb-2">{label}</label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1 font-mono">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { ref, inView } = useScrollAnimation();

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await submitContactForm(form);
      setSent(true);
      setForm(EMPTY);
      toast.success("Message sent! I'll get back to you soon. 🚀");
    } catch (err) {
      toast.error(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index={6} label="Contact" inView={inView} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-body text-text-secondary text-lg max-w-xl mb-14 -mt-8"
        >
          Have a project idea, a collaboration proposal, or just want to connect? My inbox is open.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {[
              {
                icon: Github,
                label: 'GitHub',
                value: 'aniket821108',
                href: 'https://github.com/aniket821108',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'Drop a message →',
                href: '#contact',
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="glass rounded-xl p-5 flex items-center gap-4 hover:border-accent/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Icon size={16} className="text-accent-light" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-text-muted tracking-widest">{label}</p>
                  <p className="font-body text-sm text-text-primary">{value}</p>
                </div>
              </a>
            ))}

            <div className="glass rounded-xl p-5 mt-1">
              <p className="font-mono text-[10px] text-text-muted tracking-widest mb-2">AVAILABILITY</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="font-body text-sm text-text-secondary">
                  Open to internships &amp; full-time roles
                </span>
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <p className="font-mono text-[10px] text-text-muted tracking-widest mb-2">RESPONSE TIME</p>
              <p className="font-body text-sm text-text-secondary">
                Usually within <span className="text-accent-light font-medium">24 hours</span>
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            {sent ? (
              <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[320px]">
                <CheckCircle2 size={40} className="text-green-400" />
                <h3 className="font-display text-xl font-bold text-text-primary">Message Sent!</h3>
                <p className="font-body text-text-secondary text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 font-mono text-xs text-text-muted hover:text-accent-light transition-colors underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 flex flex-col gap-5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="YOUR NAME" error={errors.name}>
                    <input
                      className={inputBase}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={set('name')}
                    />
                  </Field>
                  <Field label="EMAIL ADDRESS" error={errors.email}>
                    <input
                      type="email"
                      className={inputBase}
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                  </Field>
                </div>
                <Field label="SUBJECT" error={errors.subject}>
                  <input
                    className={inputBase}
                    placeholder="Project collaboration..."
                    value={form.subject}
                    onChange={set('subject')}
                  />
                </Field>
                <Field label="MESSAGE" error={errors.message}>
                  <textarea
                    rows={5}
                    className={`${inputBase} resize-none`}
                    placeholder="Tell me about your project or idea..."
                    value={form.message}
                    onChange={set('message')}
                  />
                </Field>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent/85 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-body font-semibold transition-all duration-300 shadow-accent-sm hover:shadow-accent hover:scale-[1.02] active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
