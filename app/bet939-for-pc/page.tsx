import GuidePage, { guideMetadata } from "@/components/GuidePage";

export function generateMetadata() {
  return guideMetadata("pc");
}

export default function PcPage() {
  return <GuidePage pageKey="pc" />;
}
