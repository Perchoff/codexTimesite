const designs = {
  polish: [
    "M48 46V22q0-5 5-5h22q5 0 5 5v24M50 26h28M55 31v11m6-11v11m6-11v11m6-11v11",
    "M51 46h26l15 12q7 6 7 15v27q0 9-9 9H38q-9 0-9-9V73q0-9 7-15l15-12Z",
    "M43 81q20-15 42 0M43 89q20-15 42 0M106 42q0 9 9 9-9 0-9 9 0-9-9-9 9 0 9-9ZM20 55v10m-5-5h10",
  ],
  tips: [
    "M23 91C22 74 29 52 43 41c7-6 16-3 18 5 4 17-6 39-21 52-7 6-16 2-17-7Z",
    "M29 63c8-2 18 3 23 10M61 71c0-19 8-42 22-54 7-6 16-3 18 6 4 19-7 43-22 56-8 6-17 1-18-8Z",
    "M68 42c8-1 18 4 23 10M96 83q0 10 10 10-10 0-10 10 0-10-10-10 10 0 10-10ZM30 22v12m-6-6h12",
  ],
  brush: [
    "M41 71 94 18c7-7 14 0 7 7L48 78l-7-7ZM38 73l-5 5 7 8 6-6M31 80c-10 2-7 15-16 21 12 0 22-6 23-13",
    "M32 111c24-19 53-22 72-13 13 6 9 15-5 15-14 0-26-7-22-15 4-8 18-13 35-13M83 53q0 8 8 8-8 0-8 8 0-8-8-8 8 0 8-8Z",
  ],
  petals: [
    "M65 62c-19-9-26-35-17-42 9-7 23 10 21 32 3-22 20-33 28-25 7 8-7 27-22 35 21-7 38 1 36 12-2 12-22 13-37 2 14 14 13 32 3 35-10 3-20-12-16-30-7 16-23 24-31 15-7-9 5-22 24-26-19 0-32-13-27-22 6-9 25-3 38 14Z",
    "M64 65a5 5 0 1 0 0 10 5 5 0 1 0 0-10ZM23 24v14m-7-7h14M103 45v8m-4-4h8",
  ],
  file: [
    "M27 91 86 24c7-8 19 2 12 10L39 101c-7 8-19-2-12-10Z",
    "m42 86 42-47M48 91l41-47M35 81l42-47M107 63q0 9 9 9-9 0-9 9 0-9-9-9 9 0 9-9ZM21 46v12m-6-6h12M67 97v10m-5-5h10",
  ],
};

type OrnamentProps = {
  motif: keyof typeof designs;
  corner: "top-left" | "top-right" | "bottom-right";
};

export function NailOrnament({ motif, corner }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`nail-ornament nail-ornament--${corner}`}
      viewBox="0 0 128 128"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {designs[motif].map((path) => (
        <path key={path} d={path} pathLength={1} />
      ))}
    </svg>
  );
}
