"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@role-reactor/ui/components/accordion";

const faqs = [
  {
    question: "What is Core Energy?",
    answer:
      "Think of it like credits for AI stuff. Every dollar you chip in gets you 10 Cores. Right now you can use them for AI avatars (1 Core per image), but we're working on adding more features. The cool part? They don't expire, so you can hoard them if you want.",
  },
  {
    question: "Is Role Reactor still free?",
    answer:
      "Yep, totally free! All the main features—roles, reactions, welcome messages, XP, all that—are free and always will be. Core Energy is just for the optional AI features. You can use the bot 100% without spending a cent.",
  },
  {
    question: "Do my Cores expire?",
    answer:
      "Nope, never. Buy them once and they're yours forever. Use them right away or save them for later, doesn't matter. They'll just sit in your account until you need them.",
  },
  {
    question: "What can I use Core Energy for?",
    answer:
      "Right now it's just for AI avatars. Use <code>/avatar</code> in Discord and it'll generate one for you. We've got more stuff in the works though, so there'll be other ways to spend them eventually.",
  },
  {
    question: "How do I check my Core balance?",
    answer:
      "Just type <code>/core balance</code> in any server with Role Reactor. It'll show you how many you've got.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We use Coinbase Commerce, so crypto payments only. Log in with Discord, pick an amount, and pay. USDC or USDT work best, but we take other cryptos too. Your Cores get added automatically once the payment goes through.",
  },
];

export function PricingFAQ() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />

      <div className="max-w-[1120px] mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Questions? Here's the stuff people usually ask.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-lg px-6 transition-all duration-200 hover:border-gray-600/50 hover:bg-gray-900/80"
            >
              <AccordionTrigger className="text-base font-medium text-white hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-400 leading-relaxed pb-5">
                {faq.answer.split("<code>").map((part, i) => {
                  if (i === 0) return part;
                  const [code, rest] = part.split("</code>");
                  return (
                    <span key={i}>
                      <code className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono border border-purple-500/30">
                        {code}
                      </code>
                      {rest}
                    </span>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

