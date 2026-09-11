// Next Imports
import type { Metadata } from 'next'

// Component Imports
import HeroSection from '@/components/blocks/contact-us-page/hero-section'
import Faq from '@/components/blocks/faq'
import ContactUs from '@/components/blocks/contact-us-page/contact-us-page'

// Util Imports
import {
  generateMetadata as generateSEOMetadata,
  combineSchemas,
  generateWebsiteSchema,
  generateWebPageSchema
} from '@/lib/seo'

// Data Imports
import { faqItems } from '@/assets/data/faq'
import { contactCards } from '@/assets/data/contact-us'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Start a project with MR Marketing Group. Email Maria@mrmarketing-group.com or call +1 (724) 971-0239.',
  url: '/contact-us',
  keywords: ['contact', 'support', 'help', 'get in touch']
})

const ContactUsPage = () => {
  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: 'Contact Us',
      description:
        'Start a project with MR Marketing Group. Email Maria@mrmarketing-group.com or call +1 (724) 971-0239.',
      url: '/contact-us'
    })
  )

  return (
    <>
      <HeroSection />

      <ContactUs contactCards={contactCards} />

      <Faq faqItems={faqItems} background='bg-card' />

      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default ContactUsPage
