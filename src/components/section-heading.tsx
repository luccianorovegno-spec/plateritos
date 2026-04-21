type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function SectionHeading({
  title,
  subtitle,
  actionLabel,
  actionHref,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <div className="mb-3 flex items-center justify-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {actionLabel && actionHref ? (
          <a
            href={actionHref}
            className="hidden text-sm font-semibold text-[var(--primary)] hover:underline sm:inline-flex"
          >
            {actionLabel}
          </a>
        ) : null}
      </div>
      {subtitle ? (
        <p className="mx-auto max-w-xl text-base text-[var(--ink-soft)] md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
