type BrandLogoProps = {
  large?: boolean;
};

export function BrandLogo({ large = false }: BrandLogoProps) {
  return (
    <span className={large ? "brand-logo brand-logo-large" : "brand-logo"} aria-hidden="true">
      <img src="/arix-logo.png" alt="" />
    </span>
  );
}
