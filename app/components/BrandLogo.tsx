import Image from "next/image";

type BrandLogoProps = {
  large?: boolean;
};

export function BrandLogo({ large = false }: BrandLogoProps) {
  return (
    <span className={large ? "brand-logo brand-logo-large" : "brand-logo"} aria-hidden="true">
      <Image
        className="brand-logo-dark"
        src="/arix-logo-dark.png"
        alt="ARIX Logo"
        width={1050}
        height={360}
        priority
      />
      <Image
        className="brand-logo-light"
        src="/arix-logo.png"
        alt="ARIX Logo"
        width={1050}
        height={360}
        priority
        style={{ display: "none" }}
      />
    </span>
  );
}
