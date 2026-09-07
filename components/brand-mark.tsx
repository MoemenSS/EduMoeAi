export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" aria-label="EduMoe home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      {!compact && <span>EduMoe</span>}
    </span>
  );
}
