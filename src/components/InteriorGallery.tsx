import Image from "next/image";

export type GalleryImage = { src: string; alt: string; caption?: string };
// Добавьте реальные фотографии студии или работ. До этого секция скрыта.
export const interiorImages: GalleryImage[] = [];
export function InteriorGallery({
  images = interiorImages,
}: {
  images?: GalleryImage[];
}) {
  if (!images.length) return null;
  return (
    <section id="gallery" className="container section-pad">
      <p className="eyebrow">ЗАГЛЯНИ ВНУТРЬ</p>
      <h2>
        Атмосфера <em>студии</em>
      </h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <figure key={image.src}>
            <div className="gallery-image">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 90vw, 33vw"
              />
            </div>
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
