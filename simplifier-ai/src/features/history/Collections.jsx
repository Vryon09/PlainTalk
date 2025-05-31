import Collection from "./Collection";

function Collections({ isMobile }) {
  return (
    <div>
      <p className="pt-4 text-sm font-semibold text-neutral-500">Collections</p>

      <div className="space-y-1 py-2">
        <Collection isMobile={isMobile} />
        <Collection isMobile={isMobile} />
        <Collection isMobile={isMobile} />
        <Collection isMobile={isMobile} />
      </div>
    </div>
  );
}

export default Collections;
