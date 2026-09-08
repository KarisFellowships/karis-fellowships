import type { Metadata } from "next";
import LegalPage, { LegalSection, ToConfirm } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Karis Fellowships website and programs.",
};

// DRAFT — pending Karis review and legal sign-off. See LegalPage.tsx.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The terms that govern your use of this website and our programs."
    >
      <LegalSection heading="Agreement to these terms">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
          use of the Karis Fellowships International website and programs. By
          creating an account, registering, or otherwise using the site, you
          agree to these Terms. If you do not agree, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection heading="Who we are and what we offer">
        <p>
          Karis Fellowships International is a 501(c)(3) not-for-profit,
          volunteer-run ministry. We offer online Christian training and support,
          beginning with the Neurosis and Human Growth (NHG) book study and
          continuing, by invitation, into Karis Fellowships membership. Karis
          Fellowships membership is invitation-only and subject to acceptance by
          the KF board.
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility and your account">
        <p>
          You must provide accurate information when you register and keep it up
          to date. You are responsible for maintaining the confidentiality of
          your password and for all activity under your account. Please tell us
          promptly if you believe your account has been used without your
          permission. You may not share your login or let others access member
          materials through your account.
        </p>
      </LegalSection>

      <LegalSection heading="Donations and payments">
        <p>
          Registration includes an invitation to make a voluntary donation that
          helps cover our technology costs. We suggest an amount, but any amount
          is appreciated, and returning students are not asked to donate again to
          re-register. Donations are handled by our payment processor (Stripe).
          Refunds and recurring gifts are addressed in our{" "}
          <a
            href="/refund"
            className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30"
          >
            Refund &amp; Cancellation Policy
          </a>
          .
        </p>
        <p>
          <ToConfirm>whether donations are tax-deductible and how a receipt or
          acknowledgement is provided, given the organization&rsquo;s 501(c)(3)
          status</ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Program materials and intellectual property">
        <p>
          The lessons, study guides, NHG materials, toolbox documents,
          facilitator guides, recordings, and other content provided through the
          site are the property of Karis Fellowships or their respective owners
          and are provided for your personal use within the program. You may not
          copy, publish, redistribute, sell, or share access to these materials
          without our written permission. The book <em>Neurosis and Human
          Growth</em> by Karen Horney is purchased separately from its publisher
          or retailer and is not provided by us.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          You agree to use the site lawfully and respectfully, and not to
          interfere with its operation or security, attempt to access areas or
          accounts that are not yours, or use the site to harm others. We may
          suspend or end access that violates these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Not professional advice">
        <p>
          Karis Fellowships offers Christian spiritual formation, teaching, and
          peer support. Our materials and meetings are <strong className="font-semibold text-foreground">not medical,
          psychological, psychiatric, or other professional advice</strong>, and
          they are not a substitute for care from a qualified professional.
          Nothing on this site creates a therapist&ndash;client or similar
          professional relationship. If you are in crisis or need professional
          help, please contact a licensed provider or your local emergency
          services.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimers and limitation of liability">
        <p>
          The site and its materials are provided &ldquo;as is&rdquo; and
          &ldquo;as available,&rdquo; without warranties of any kind, to the
          fullest extent permitted by law. To the fullest extent permitted by
          law, Karis Fellowships and its volunteers will not be liable for
          indirect, incidental, or consequential damages arising from your use of
          the site or participation in the programs.{" "}
          <ToConfirm>have counsel review and tailor these disclaimer and
          liability terms to the ministry&rsquo;s needs</ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Termination">
        <p>
          We may suspend or terminate your account or access to the programs if
          you violate these Terms or where necessary to protect the community or
          the ministry.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These Terms are governed by the laws of{" "}
          <ToConfirm>the State of Oklahoma, USA &mdash; confirm the correct
          governing-law jurisdiction</ToConfirm>{" "}
          without regard to its conflict-of-laws rules.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these Terms from time to time. When we make material
          changes, we will update the date on this page. Your continued use of
          the site after changes take effect means you accept the updated Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about these Terms? Email us at{" "}
          <a
            href="mailto:admin@karisfellowships.com"
            className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30"
          >
            admin@karisfellowships.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
