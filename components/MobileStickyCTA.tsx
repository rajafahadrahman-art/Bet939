import ExternalActionButton from "./ExternalActionButton";

export default function MobileStickyCTA() {
  return (
    <div className="mobile-sticky" role="navigation" aria-label="Quick actions">
      <ExternalActionButton
        label="Download"
        ariaLabel="Download Bet939 externally"
      />
      <ExternalActionButton
        label="Login"
        ariaLabel="Login to Bet939 externally"
        variant="outline"
      />
    </div>
  );
}
