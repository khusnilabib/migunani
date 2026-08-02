// src/shared/components/home/faq-section.tsx — Homepage FAQ section.

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';

const FAQS = [
  {
    question: 'Do I need to create an account?',
    answer: 'No. All tools work without any account or sign-up. You can start using any tool immediately. Accounts are optional and only add features like history sync and favorites across devices.',
  },
  {
    question: 'Are my files uploaded to a server?',
    answer: 'No. All core tools run entirely in your browser using WebAssembly, Canvas, and Web APIs. Your files never leave your device. This is a core architectural principle we call "browser-first".',
  },
  {
    question: 'Is Migunani really free?',
    answer: 'Yes. All tools are completely free with no usage limits, no watermarks, and no premium tier. We don\'t sell your data because we never collect it in the first place.',
  },
  {
    question: 'How is this different from other tool sites?',
    answer: 'Three ways: (1) Privacy — your data stays on your device. (2) Speed — no server round-trip means instant results. (3) Consistency — every tool follows the same 7-stage lifecycle with predictable UX.',
  },
  {
    question: 'Can I use Migunani offline?',
    answer: 'After the first visit, the platform is cached by your browser via a service worker. Most tools will work offline. We\'re working on full PWA support for offline tool execution.',
  },
  {
    question: 'What browsers are supported?',
    answer: 'Migunani works on all modern browsers: Chrome, Firefox, Safari, and Edge (latest 2 versions). Some tools use advanced Web APIs that may not be available in older browsers.',
  },
];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="bg-muted/30">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Help"
          title="Frequently asked questions"
          description="Everything you need to know about the platform."
        />

        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </PageContainer>
    </section>
  );
}
