import Image from "next/image";

type DiscountCardProps = {
  enabled?: boolean;
  image?: string;
  discount?: string;
  terms?: string;
  validUntil?: string;
};
export function DiscountCardSection({
  enabled = false,
  image,
  discount,
  terms,
  validUntil,
}: DiscountCardProps) {
  if (!enabled || !image || !discount || !terms) return null;
  return (
    <section className="container section-pad discount-section">
      <Image
        src={image}
        alt="Визитка студии Время маникюра"
        width={480}
        height={300}
      />
      <div>
        <p className="eyebrow">ПРИЯТНЫЙ ПОВОД ВЕРНУТЬСЯ</p>
        <h2>{discount}</h2>
        <p>{terms}</p>
        {validUntil && <p>Действует до {validUntil}</p>}
      </div>
    </section>
  );
}
