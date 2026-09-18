import { redirect } from "next/navigation";

// The facilitator sign-up now lives in the combined "NHG Facilitator Resources"
// section at the bottom of the NHG page (KF-members-only). This route just sends
// any old link there.
export default function FacilitatorRedirect() {
  redirect("/nhg#facilitator");
}
