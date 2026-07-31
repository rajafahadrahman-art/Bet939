import GuidePage, { guideMetadata } from "@/components/GuidePage";

export function generateMetadata() {
  return guideMetadata("login");
}

export default function LoginPage() {
  return <GuidePage pageKey="login" />;
}
