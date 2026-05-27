import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";

const CONTACT_EMAIL = "intimatehygiene@gmail.com";
const CONTACT_PHONE = "+94 72 999 1950";
const BUSINESS_NAME = "Intimate Hygiene Enterprises";
const ADDRESS = "193/12, Prasanna Uyana, Mattegoda, Sri Lanka";

function PolicyShell({ title, description, path, children }) {
  return (
    <>
      <SEO title={title} description={description} path={path} />
      <Navbar />

      <section className="bg-green-50 border-b border-green-100 px-5 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-[#28a745] mb-3">
            Intimate Hygiene Enterprises
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {description}
          </p>
          <p className="text-xs text-gray-500 mt-4">Last updated: May 27, 2026</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-5 py-12">
        <article className="prose-policy space-y-8 text-gray-700 leading-relaxed">
          {children}
        </article>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-sm sm:text-base">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ContactBlock() {
  return (
    <div className="rounded-xl border border-green-100 bg-green-50 p-5">
      <p className="font-semibold text-gray-900 mb-2">Contact us</p>
      <p>
        Email:{" "}
        <a className="text-[#28a745] font-semibold" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>
        Phone / WhatsApp:{" "}
        <a className="text-[#28a745] font-semibold" href="tel:+94729991950">
          {CONTACT_PHONE}
        </a>
      </p>
      <p>Address: {ADDRESS}</p>
    </div>
  );
}

export function RefundPolicy() {
  return (
    <PolicyShell
      title="Refund Policy"
      description="Our return, exchange, and refund process for online orders placed with Intimate Hygiene Enterprises."
      path="/refund-policy"
    >
      <Section title="Overview">
        <p>
          Thank you for shopping with {BUSINESS_NAME}. We want every order to
          reach you safely and accurately. Because our products are personal
          hygiene products, returns are accepted only under the conditions below.
        </p>
      </Section>

      <Section title="Returns">
        <p>
          We accept return requests within 7 days from the date you receive your
          order. To be eligible for a return, the item must be unused, unopened,
          undamaged, and in its original packaging.
        </p>
      </Section>

      <Section title="Non-Returnable Items">
        <p>
          For hygiene and safety reasons, opened, used, damaged-after-delivery,
          or partially consumed packs cannot be returned or refunded unless the
          issue was caused by our error.
        </p>
      </Section>

      <Section title="Damaged, Defective, or Wrong Items">
        <p>
          If your order arrives damaged, defective, or different from what you
          ordered, please contact us within 24 hours of delivery with your order
          reference and clear photos. We will arrange a replacement, exchange, or
          refund depending on product availability and the nature of the issue.
        </p>
      </Section>

      <Section title="Refunds">
        <p>
          Once we receive and inspect the returned item, we will notify you
          whether the refund has been approved. Approved refunds will be issued
          to the original payment method where possible.
        </p>
        <p>
          Delivery or shipping charges are non-refundable unless the return is
          due to our error, such as sending the wrong product or a defective item.
        </p>
      </Section>

      <Section title="Exchanges">
        <p>
          Exchanges are available for eligible unopened items within 7 days of
          delivery. Please contact us before sending any item back so we can
          confirm availability and provide return instructions.
        </p>
      </Section>

      <Section title="Return Shipping">
        <p>
          Customers are responsible for return shipping costs unless the return
          is due to an error by {BUSINESS_NAME}. We recommend using a trackable
          delivery method for returned items.
        </p>
      </Section>

      <Section title="Processing Time">
        <p>
          Approved refunds or exchanges are usually processed within 5 to 10
          business days after we receive the returned item. Your bank or payment
          provider may take additional time to reflect the refund.
        </p>
      </Section>

      <ContactBlock />
    </PolicyShell>
  );
}

export function PrivacyPolicy() {
  return (
    <PolicyShell
      title="Privacy Policy"
      description="How Intimate Hygiene Enterprises collects, uses, stores, and protects customer information."
      path="/privacy-policy"
    >
      <Section title="Overview">
        <p>
          At {BUSINESS_NAME}, we respect your privacy and are committed to
          protecting the personal information you share with us when you browse
          our website, place an order, contact us, or subscribe to updates.
        </p>
      </Section>

      <Section title="Information We Collect">
        <BulletList
          items={[
            "Name, phone number, email address, delivery address, and city or district.",
            "Order details including selected products, quantities, payment method, and notes you provide.",
            "Messages, inquiries, quiz responses, newsletter subscriptions, and customer support details.",
            "Basic website usage information such as device, browser, IP address, pages visited, and interaction data.",
          ]}
        />
      </Section>

      <Section title="How We Use Your Information">
        <BulletList
          items={[
            "To process, confirm, deliver, and support your orders.",
            "To communicate with you about delivery, payment, returns, refunds, and customer service requests.",
            "To send order confirmations, promotional updates, or newsletter messages where applicable.",
            "To improve our website, products, offers, and customer experience.",
            "To detect fraud, prevent misuse, and comply with applicable legal or payment-processing requirements.",
          ]}
        />
      </Section>

      <Section title="Payments">
        <p>
          Online payments may be processed through trusted third-party payment
          providers such as PayHere or supported wallet/payment partners. We do
          not store your full card details on our website. Payment information is
          handled securely by the payment provider according to their own
          security standards and policies.
        </p>
      </Section>

      <Section title="Information Sharing">
        <p>
          We do not sell your personal information. We may share necessary order
          and contact details with trusted service providers who help us operate
          the website, process payments, send emails, manage orders, and deliver
          products. We may also disclose information when required by law or a
          valid legal request.
        </p>
      </Section>

      <Section title="Cookies and Analytics">
        <p>
          Our website may use cookies, local storage, and analytics tools to
          remember cart details, improve website performance, understand visitor
          activity, and provide a better browsing experience. You can disable
          cookies through your browser settings, but some features may not work
          correctly.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We use reasonable technical and organizational measures to protect
          customer information. However, no method of internet transmission or
          electronic storage is completely secure, so we cannot guarantee
          absolute security.
        </p>
      </Section>

      <Section title="Your Rights and Choices">
        <p>
          You may contact us to request access, correction, or deletion of your
          personal information, subject to order records, legal obligations, and
          legitimate business requirements.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated date.
        </p>
      </Section>

      <ContactBlock />
    </PolicyShell>
  );
}

export function TermsAndConditions() {
  return (
    <PolicyShell
      title="Terms and Conditions"
      description="The terms that apply when using our website and purchasing products from Intimate Hygiene Enterprises."
      path="/terms-and-conditions"
    >
      <Section title="Acceptance of Terms">
        <p>
          By accessing this website or placing an order with {BUSINESS_NAME},
          you agree to these Terms and Conditions. If you do not agree with
          these terms, please do not use the website or place an order.
        </p>
      </Section>

      <Section title="Use of the Website">
        <BulletList
          items={[
            "You agree to provide accurate and current information when placing an order or contacting us.",
            "You must not use the website for unlawful, fraudulent, abusive, or unauthorized purposes.",
            "You are responsible for ensuring that your order details, contact details, and delivery address are correct.",
          ]}
        />
      </Section>

      <Section title="Product Information">
        <p>
          We make reasonable efforts to display product details, images,
          quantities, pricing, and availability accurately. Minor differences in
          packaging, presentation, or product appearance may occur. Product
          availability may change without prior notice.
        </p>
      </Section>

      <Section title="Orders and Payments">
        <BulletList
          items={[
            "Placing an order means you are offering to purchase the selected products.",
            "We may accept, reject, or cancel an order due to stock availability, pricing errors, suspected fraud, incorrect information, or delivery limitations.",
            "Payments may be made through the payment methods displayed at checkout, including cash on delivery, bank transfer, wallet transfer, or online payment gateway where available.",
            "Online payments are processed by trusted third-party payment processors. We do not store your full card details.",
          ]}
        />
      </Section>

      <Section title="Delivery">
        <p>
          We deliver within Sri Lanka using available delivery or courier
          services. Delivery times are estimates and may vary based on your
          location, courier delays, weather, public holidays, or other events
          beyond our control. Please refer to our{" "}
          <Link className="text-[#28a745] font-semibold" to="/delivery">
            Delivery Info
          </Link>{" "}
          page for current delivery details.
        </p>
      </Section>

      <Section title="Returns and Refunds">
        <p>
          Returns, exchanges, and refunds are handled according to our{" "}
          <Link className="text-[#28a745] font-semibold" to="/refund-policy">
            Refund Policy
          </Link>
          . Because our products are personal hygiene products, opened or used
          products are not eligible for return unless the issue was caused by
          our error.
        </p>
      </Section>

      <Section title="Intellectual Property">
        <p>
          All website content, including text, logos, product images, graphics,
          layouts, and branding, belongs to {BUSINESS_NAME} or its content
          providers. You may not copy, reproduce, distribute, or modify website
          content without our prior written permission.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, {BUSINESS_NAME} will
          not be liable for indirect, incidental, special, or consequential
          losses arising from use of the website, delays, delivery issues, or use
          of our products. Our total liability for any order is limited to the
          amount paid for that order.
        </p>
      </Section>

      <Section title="Changes to These Terms">
        <p>
          We may update these Terms and Conditions at any time. Updated terms
          will be posted on this page with a revised date. Continued use of the
          website after changes means you accept the updated terms.
        </p>
      </Section>

      <ContactBlock />
    </PolicyShell>
  );
}
