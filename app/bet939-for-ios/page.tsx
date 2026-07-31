import GuidePage, { guideMetadata } from "@/components/GuidePage";

export function generateMetadata() {
  return guideMetadata("ios");
}

export default function IosPage() {
  return <GuidePage pageKey="ios" />;
}
