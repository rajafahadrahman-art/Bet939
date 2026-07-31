import GuidePage, { guideMetadata } from "@/components/GuidePage";

export function generateMetadata() {
  return guideMetadata("download");
}

export default function DownloadPage() {
  return <GuidePage pageKey="download" />;
}
