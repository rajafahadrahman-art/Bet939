import GuidePage, { guideMetadata } from "@/components/GuidePage";

export function generateMetadata() {
  return guideMetadata("deposit");
}

export default function DepositPage() {
  return <GuidePage pageKey="deposit" />;
}
