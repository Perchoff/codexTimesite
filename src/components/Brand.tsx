import Image from "next/image";
import Link from "next/link";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand${footer ? " brand-footer" : ""}`}
      aria-label="Время маникюра — на главную"
    >
      <Image
        src="/logo/brand-mark.webp"
        alt=""
        width={52}
        height={52}
        className="brand-mark"
      />
      <span className="brand-wordmark">
        Время маникюра<span>ТВОЙ ИДЕАЛЬНЫЙ МОМЕНТ</span>
      </span>
    </Link>
  );
}
