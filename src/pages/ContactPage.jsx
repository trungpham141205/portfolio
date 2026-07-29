import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';

const contactItems = [
  {
    label: 'Email',
    value: 'pquoctrung141205@gmail.com',
    href: 'mailto:pquoctrung141205@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/trungpham141205',
    href: 'https://github.com/trungpham141205',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
];

const ContactPage = () => (
  <div className="content-page contact-page page-enter">
    <header className="contact-hero">
      <p className="page-overline">05 / Contact</p>
      <h1>Let’s build something<br />that thinks in logic.</h1>
      <p>
        Open to learning opportunities, digital IC projects, verification practice,
        and FPGA or SoC collaborations.
      </p>
      <a className="button-primary" href="mailto:pquoctrung141205@gmail.com">
        Start a conversation
        <ArrowUpRight size={15} />
      </a>
    </header>

    <div className="contact-list">
      {contactItems.map(({ label, value, href, icon: Icon }, index) => (
        <a
          className="contact-row"
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          key={label}
        >
          <span className="contact-index">{String(index + 1).padStart(2, '0')}</span>
          <Icon size={20} strokeWidth={1.3} />
          <span className="contact-name">{label}</span>
          <span className="contact-value">{value}</span>
          <ArrowUpRight size={18} />
        </a>
      ))}
    </div>
  </div>
);

export default ContactPage;
