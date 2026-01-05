import styles from "./gradient-preview.module.css";

const gradients = [
  {
    id: "option-1",
    name: "Option 1 - Night Sky / Steel",
    description: "Clean, modern, slightly luminous.",
    background:
      "radial-gradient(600px 400px at 20% 10%, #1B2A3A 0%, transparent 60%), linear-gradient(180deg, #0E1117 0%, #101720 45%, #0B0F14 100%)",
    text: "#E7EDF3",
    muted: "#B4C0CC",
    card: "#111820",
    border: "#1E2732",
  },
  {
    id: "option-2",
    name: "Option 2 - Deep Teal / Charcoal",
    description: "Calming, sophisticated, less flat.",
    background:
      "radial-gradient(520px 360px at 80% 0%, #14333A 0%, transparent 60%), linear-gradient(160deg, #0C1216 0%, #0F1C1F 45%, #0B0F12 100%)",
    text: "#E6F1F4",
    muted: "#A7B9BD",
    card: "#10181B",
    border: "#1C2A2E",
  },
  {
    id: "option-3",
    name: "Option 3 - Slate / Bronze Ember",
    description: "Warm, premium, subtle depth.",
    background:
      "radial-gradient(520px 360px at 75% 10%, #2A2118 0%, transparent 60%), linear-gradient(180deg, #101318 0%, #151A1F 50%, #0D1015 100%)",
    text: "#EDE7E1",
    muted: "#C1B6AD",
    card: "#16131A",
    border: "#2B2220",
  },
  {
    id: "option-4",
    name: "Option 4 - Midnight Indigo",
    description: "Bold, moody, tech-forward.",
    background:
      "radial-gradient(520px 360px at 15% 10%, #1E1F4A 0%, transparent 60%), linear-gradient(180deg, #0C0E18 0%, #10142A 50%, #0B0D14 100%)",
    text: "#E6E9FF",
    muted: "#B8C0E8",
    card: "#121624",
    border: "#23283A",
  },
  {
    id: "option-5",
    name: "Option 5 - Arctic Blue",
    description: "Cool, crisp, airy.",
    background:
      "radial-gradient(520px 360px at 80% 10%, #14263A 0%, transparent 60%), linear-gradient(180deg, #0B1116 0%, #0F1A24 55%, #0A0F14 100%)",
    text: "#EAF2F8",
    muted: "#B5C6D6",
    card: "#101721",
    border: "#1E2A37",
  },
  {
    id: "option-6",
    name: "Option 6 - Forest Night",
    description: "Natural, calm, understated.",
    background:
      "radial-gradient(520px 360px at 20% 0%, #1A2E24 0%, transparent 60%), linear-gradient(180deg, #0C1210 0%, #101A16 50%, #0A0F0C 100%)",
    text: "#E7EFEA",
    muted: "#B4C5BC",
    card: "#101714",
    border: "#1E2A24",
  },
  {
    id: "option-7",
    name: "Option 7 - Graphite Glow",
    description: "Neutral, minimal, high-contrast.",
    background:
      "radial-gradient(520px 360px at 70% 15%, #2A2D33 0%, transparent 60%), linear-gradient(180deg, #0F1114 0%, #14171C 50%, #0C0E12 100%)",
    text: "#ECEFF3",
    muted: "#B8C0C8",
    card: "#14171C",
    border: "#222830",
  },
  {
    id: "option-8",
    name: "Option 8 - Plum Smoke",
    description: "Creative, rich, slightly cinematic.",
    background:
      "radial-gradient(520px 360px at 80% 0%, #2C1833 0%, transparent 60%), linear-gradient(180deg, #120E16 0%, #1A1420 50%, #0D0A10 100%)",
    text: "#F0E8F4",
    muted: "#C6B2CF",
    card: "#18111D",
    border: "#2A1F2F",
  },
  {
    id: "option-9",
    name: "Option 9 - Ember Navy",
    description: "Warm accents, balanced depth.",
    background:
      "radial-gradient(520px 360px at 75% 10%, #3A1E14 0%, transparent 60%), linear-gradient(180deg, #0F1117 0%, #141826 50%, #0B0D12 100%)",
    text: "#EDE9E4",
    muted: "#C2B6AB",
    card: "#15171E",
    border: "#2A2623",
  },
  {
    id: "option-10",
    name: "Option 10 - Coastal Slate",
    description: "Fresh, professional, subtle.",
    background:
      "radial-gradient(520px 360px at 20% 10%, #1A2B33 0%, transparent 60%), linear-gradient(180deg, #0E1215 0%, #131B20 50%, #0A0E11 100%)",
    text: "#E7EEF2",
    muted: "#B5C2CB",
    card: "#11181D",
    border: "#1F2A31",
  },
];

export default function GradientPreviewPage() {
  return (
    <main className="min-h-screen">
      {gradients.map((g) => (
        <section
          key={g.id}
          className={`min-h-screen flex items-center px-6 md:px-10 py-16 ${styles.animatedGradient} ${styles.glowDrift}`}
          style={{
            color: g.text,
            "--section-bg": g.background,
          } as React.CSSProperties}
        >
          <div className="max-w-5xl w-full mx-auto relative z-10">
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: g.muted }}>
              Dark mode gradient preview
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold">
              {g.name}
            </h1>
            <p className="mt-3 text-base md:text-lg max-w-2xl" style={{ color: g.muted }}>
              {g.description} This sample shows body text, a muted paragraph,
              and a card surface to judge contrast and depth.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-4">
              <div
                className="rounded-2xl border p-5 shadow-lg"
                style={{ background: g.card, borderColor: g.border }}
              >
                <h2 className="text-lg font-semibold">Card Surface</h2>
                <p className="mt-2 text-sm" style={{ color: g.muted }}>
                  Secondary text and subtle borders should remain readable.
                </p>
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: g.border }}>
                <h2 className="text-lg font-semibold">CTA Sample</h2>
                <button
                  className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ background: g.text, color: "#0B0F14" }}
                >
                  Primary action
                </button>
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: g.border }}>
                <h2 className="text-lg font-semibold">Small Details</h2>
                <ul className="mt-2 text-sm space-y-2" style={{ color: g.muted }}>
                  <li>Muted copy</li>
                  <li>Border contrast</li>
                  <li>Accent glow</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
