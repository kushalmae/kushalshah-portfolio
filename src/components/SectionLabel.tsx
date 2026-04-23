interface SectionLabelProps {
  children: React.ReactNode;
}

const SectionLabel = ({ children }: SectionLabelProps) => (
  <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
    {children}
  </p>
);

export default SectionLabel;
