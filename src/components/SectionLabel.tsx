/** 英字ラベル。dark 面ではライムの罫線を伴う。 */
export function SectionLabel({
  children,
  rule = false,
  className = "",
}: {
  children: React.ReactNode;
  /** 先頭にライムの短いラインを出す */
  rule?: boolean;
  className?: string;
}) {
  return (
    <p className={`lab-label ${className}`}>
      {rule && <span className="lab-label-rule" aria-hidden="true" />}
      {children}
    </p>
  );
}
