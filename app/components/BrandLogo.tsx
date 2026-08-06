import Image from "next/image";

type BrandLogoProps = {
  large?: boolean;
};

export function BrandLogo({ large = false }: BrandLogoProps) {
  return (
    <span className={large ? "brand-logo brand-logo-large" : "brand-logo"} aria-hidden="true">
      <Image src="/arix-logo.png" alt="" width={1050} height={360} />
    </span>
  );
}
