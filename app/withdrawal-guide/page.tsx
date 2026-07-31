import GuidePage, { guideMetadata } from "@/components/GuidePage";

export function generateMetadata() {
  return guideMetadata("withdrawal");
}

export default function WithdrawalPage() {
  return <GuidePage pageKey="withdrawal" />;
}
