import { LEGAL_TEST_STEPS } from "@aag/engine";

// Scaffold placeholder. The start screen is built from the design brief (Decision Path §3A)
// by its own ticket.
export default function HomePage() {
  return (
    <main>
      <h1>AI Act Guard</h1>
      <p>Indicative assessment, not legal advice.</p>
      <ol aria-label="Steps of the legal test">
        {LEGAL_TEST_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </main>
  );
}
