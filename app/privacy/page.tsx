// app/privacy/page.tsx
export const metadata = {
  title: "Privacy Policy",
  description: "How Oceanside AI Solutions handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-zinc-300">
      <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mt-8 space-y-4">
        <p>
          We collect the information you submit (name, email, phone, company, and any notes) to provide demos,
          schedule calls, and deliver services. We may also store call logs and transcripts when you test our
          voice agents.
        </p>
        <p>
          We use trusted processors (e.g., Retell/VAPI/Twilio, Make.com, Google Sheets/Workspace, Calendly) to
          run the demo and manage operations. These providers only process data on our behalf.
        </p>
        <p>
          We do not sell your data. We retain it only as long as needed to provide services, comply with law, or
          maintain business records. You can request access or deletion at any time.
        </p>
        <p>
          Security matters: access is limited to authorized staff; we practice data minimization and auditing.
        </p>
        <p>
          Contact: <a className="text-cyan-300" href="mailto:hello@oceansideaisolutions.com">hello@oceansideaisolutions.com</a>
        </p>
      </section>
    </main>
  );
}
