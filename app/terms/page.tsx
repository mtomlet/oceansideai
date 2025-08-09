// app/terms/page.tsx
export const metadata = {
  title: "Terms of Service",
  description: "Oceanside AI Solutions terms of service.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-zinc-300">
      <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
      <p className="mt-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mt-8 space-y-4">
        <p>
          By using our website, demo forms, or voice agents, you agree to these terms. Demos are provided “as is”
          for evaluation only and may be recorded for quality and improvement.
        </p>
        <p>
          All software, prompts, flows, and documentation are our intellectual property unless otherwise agreed
          in a written contract. You may not copy, resell, or reverse-engineer our agents or flows.
        </p>
        <p>
          Fees, scopes, and SLAs are defined per signed proposal/order form. Missed/after-hours call coverage and
          integrations depend on third-party systems you control (e.g., phone provider, calendar, CRM).
        </p>
        <p>
          We limit liability to the amounts you paid in the prior 3 months. No indirect or consequential damages.
        </p>
        <p>
          Governing law: Virginia, USA. Contact: <a className="text-cyan-300" href="mailto:hello@oceansideaisolutions.com">hello@oceansideaisolutions.com</a>
        </p>
      </section>
    </main>
  );
}
