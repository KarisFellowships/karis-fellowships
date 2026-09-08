import type { Metadata } from "next";
import LegalPage, { LegalSection, ToConfirm } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Karis Fellowships collects, uses, and protects your personal information.",
};

// DRAFT — pending Karis review and legal sign-off. See LegalPage.tsx.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
    >
      <LegalSection heading="Who we are">
        <p>
          Karis Fellowships International (&ldquo;Karis Fellowships,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a
          501(c)(3) not-for-profit organization. This policy explains what
          personal information we collect through this website, how we use it,
          and the choices you have.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p>We collect the information you provide directly to us, including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-foreground">Account details</strong> — your
            name, email address, phone number, and location (country, and where
            provided, state and city).
          </li>
          <li>
            <strong className="font-semibold text-foreground">Your password</strong> — used to
            secure your account. Passwords are handled by our authentication
            provider and stored in encrypted (hashed) form; we never see or store
            your password in readable text.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Registration responses</strong> —
            information you enter when you register, such as your chosen meeting
            format, the name of the person who invited you, whether you have
            registered before, and any free-text answers you provide (for
            example, what you hope to gain from the study, and any questions or
            comments).
          </li>
          <li>
            <strong className="font-semibold text-foreground">Donation information</strong> —
            when you make a donation, payment is processed by our payment
            provider (Stripe). We do not collect or store your full card number;
            Stripe processes card details directly. We receive a confirmation and
            the donation amount.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Messages you send us</strong> —
            the contents of any message you submit through our contact form or by
            email.
          </li>
        </ul>
        <p>
          We also use essential cookies and similar technologies needed to keep
          you signed in and to keep the site secure (see &ldquo;Cookies&rdquo;
          below).
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>create and manage your account and give you access to the study materials;</li>
          <li>communicate with you about the book study, meetings, and your registration;</li>
          <li>process donations and keep records of them;</li>
          <li>respond to your messages and provide support;</li>
          <li>maintain the security and integrity of the site; and</li>
          <li>comply with our legal and accounting obligations.</li>
        </ul>
        <p>
          <strong className="font-semibold text-foreground">
            We do not sell or rent your personal information,
          </strong>{" "}
          and we do not use it for third-party advertising.
        </p>
      </LegalSection>

      <LegalSection heading="How we share your information">
        <p>
          We share your information only with the service providers that help us
          operate the site, and only as needed to provide our services:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-foreground">Supabase</strong> — database,
            authentication, and secure file storage.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Stripe</strong> — payment
            processing for donations.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Resend</strong> — sending
            transactional email (for example, contact-form messages and
            account-related email).
          </li>
          <li>
            <strong className="font-semibold text-foreground">Vercel</strong> — website hosting.
          </li>
        </ul>
        <p>
          These providers process information on our behalf under their own
          terms and privacy commitments. We may also disclose information if
          required by law or to protect the rights, safety, or property of Karis
          Fellowships and others.{" "}
          <ToConfirm>
            confirm this list is complete and reflects every provider that
            receives personal data
          </ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and similar technologies">
        <p>
          We use cookies that are strictly necessary to sign you in and to keep
          your session secure. <ToConfirm>whether any analytics or measurement
          tools are enabled; if so, name them and describe the choice offered to
          visitors</ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          We keep your information for as long as your account is active and as
          needed to provide the study, and afterward as required to meet our
          legal, tax, and accounting obligations, or to resolve disputes.{" "}
          <ToConfirm>the specific retention periods Karis wants to state</ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Your choices and rights">
        <p>
          You may ask us to access, correct, or delete your personal
          information, or ask questions about how it is used, by emailing{" "}
          <a
            href="mailto:admin@karisfellowships.com"
            className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30"
          >
            admin@karisfellowships.com
          </a>
          . Depending on where you live, you may have additional rights under
          applicable privacy laws.{" "}
          <ToConfirm>whether any specific regimes (e.g. GDPR, CCPA) apply to
          your members, and add the required disclosures if so</ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Children's privacy">
        <p>
          This site is intended for adults and is not directed to children. We
          do not knowingly collect personal information from children under 13.
          If you believe a child has provided us information, please contact us
          so we can remove it.
        </p>
      </LegalSection>

      <LegalSection heading="Data security">
        <p>
          We use reasonable administrative and technical measures to protect your
          information, including encrypted storage of passwords and access
          controls on member materials. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. When we make material
          changes, we will update the date on this page and, where appropriate,
          notify you.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about this policy or your information? Email us at{" "}
          <a
            href="mailto:admin@karisfellowships.com"
            className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30"
          >
            admin@karisfellowships.com
          </a>
          . <ToConfirm>add a postal mailing address if one should be listed for
          privacy requests</ToConfirm>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
