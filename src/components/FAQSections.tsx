"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I book a doctor appointment online?",
    answer:
      "Simply click the 'Book Appointment' button on any doctor card, choose your preferred date and time slot, and fill in your basic details. You will receive an instant booking confirmation right away.",
  },
  {
    id: "faq-2",
    question: "Do I need to pay the consultation fee in advance?",
    answer:
      "No advance payment is required for in-person clinic visits. You can pay your consultation fee at the reception desk upon arrival. Advance payment is only applicable for online video consultations.",
  },
  {
    id: "faq-3",
    question: "Can I reschedule or cancel my scheduled appointment?",
    answer:
      "Yes, you can easily cancel or reschedule your appointment without any additional fee through your Patient Dashboard at least 1 hour prior to your scheduled time slot.",
  },
  {
    id: "faq-4",
    question: "Are walk-in consultations allowed without a prior booking?",
    answer:
      "Walk-in patients are always welcome at our primary care clinic. However, scheduled appointments are given priority to minimize waiting room delays.",
  },
  {
    id: "faq-5",
    question: "What should I do in case of a medical emergency?",
    answer:
      "For urgent medical attention, please call our 24/7 emergency helpline (+92 41 111 222 333) or visit our ER department directly. Emergency services operate continuously without prior booking.",
  },
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal">
            Everything you need to know about booking appointments and clinic consultations.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "bg-zinc-50/90 border-emerald-500/40 shadow-xs"
                    : "bg-white border-zinc-200/80 hover:border-zinc-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-zinc-900 text-sm sm:text-base focus:outline-hidden cursor-pointer group"
                >
                  <span className="group-hover:text-emerald-800 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "bg-emerald-600 text-white rotate-180 scale-105"
                        : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth Height Expansion Wrapper using CSS Grid */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/50 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}