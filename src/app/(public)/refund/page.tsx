import type { Metadata } from "next";
import LegalPage, { LegalSection, ToConfirm } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "How donations, refunds, and recurring gifts are handled at Karis Fellowships.",
};

// DRAFT — pending Karis review and legal sign-off. See LegalPage.tsx.
export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      subtitle="How donations, refunds, and recurring gifts are handled."
    >
      <LegalSection heading="Donations">
        <p>
          Karis Fellowships International is a 501(c)(3) not-for-profit. When you
          register for the NHG book study, you are invited to make a voluntary
          donation that helps cover our technology costs. We suggest an amount,
          but any amount is appreciated, and the study is not withheld based on
          the amount given.
        </p>
        <p>
          Because these are voluntary donations to a nonprofit, they are
          generally non-refundable. If you believe a donation was made in error,
          or you change your mind, contact us and we will work with you.{" "}
          <ToConfirm>the refund window and terms Karis wants to offer &mdash;
          for example, &ldquo;refunds available within 14 days of a donation made
          in error&rdquo; &mdash; or confirm that donations are non-refundable
          </ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="Returning students">
        <p>
          Returning students are not asked to make a donation again in order to
          re-register for the book study.
        </p>
      </LegalSection>

      <LegalSection heading="Recurring gifts">
        <p>
          If you set up a recurring (monthly) gift, you can cancel future charges
          at any time by emailing{" "}
          <a
            href="mailto:admin@karisfellowships.com"
            className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30"
          >
            admin@karisfellowships.com
          </a>
          . Cancelling stops future charges; it does not automatically refund
          gifts that have already been made.{" "}
          <ToConfirm>whether donors will also be given a self-service billing
          portal to manage or cancel recurring gifts, and whether any past
          recurring charge is refundable</ToConfirm>
        </p>
      </LegalSection>

      <LegalSection heading="How to request a refund or cancellation">
        <p>
          Email{" "}
          <a
            href="mailto:admin@karisfellowships.com"
            className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30"
          >
            admin@karisfellowships.com
          </a>{" "}
          with your name and the email address used for the donation, and let us
          know what you need. We will respond as soon as we can.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. When we make material
          changes, we will update the date on this page.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
