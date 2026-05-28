export default function WebhooksDocsPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold tracking-tight text-ink-deep">Webhook Events</h1>
      <p className="mt-2 text-ink/70">
        Webhooks allow your application to receive real-time notifications about events happening
        in your Sentri workspace. Configure webhook endpoints in the Admin dashboard.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Overview</h2>
        <p className="mt-1 text-sm text-ink/70">
          When an event occurs, Sentri sends an HTTP POST request to the registered webhook URL
          with a JSON payload describing the event. Your endpoint must respond with a
          <code className="font-mono text-sm bg-surface-press-light px-1.5 py-0.5 rounded mx-1">200 OK</code>
          within 5 seconds to acknowledge receipt. Retries follow an exponential backoff schedule
          for up to 3 days.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Events</h2>

        <h3 className="mt-4 font-medium text-ink-deep">mention.created</h3>
        <p className="text-sm text-ink/70">Fired when a new mention is detected for a tracked brand.</p>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`{
  "event": "mention.created",
  "id": "evt_xxxxxxxxxxxx",
  "created_at": "2025-06-01T12:00:00Z",
  "data": {
    "mention_id": "mnt_xxxxxxxxxxxx",
    "brand_id": "brd_xxxxxxxxxxxx",
    "source": "twitter",
    "content": "…",
    "sentiment_score": 0.85,
    "url": "https://…"
  }
}`}</pre>

        <h3 className="mt-4 font-medium text-ink-deep">crisis.detected</h3>
        <p className="text-sm text-ink/70">Fired when the system detects a potential crisis event.</p>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`{
  "event": "crisis.detected",
  "id": "evt_xxxxxxxxxxxx",
  "created_at": "2025-06-01T12:00:00Z",
  "data": {
    "crisis_id": "crs_xxxxxxxxxxxx",
    "brand_id": "brd_xxxxxxxxxxxx",
    "severity": "high",
    "trigger": "sentiment_drop",
    "summary": "…"
  }
}`}</pre>

        <h3 className="mt-4 font-medium text-ink-deep">crisis.resolved</h3>
        <p className="text-sm text-ink/70">Fired when a crisis has been marked as resolved.</p>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`{
  "event": "crisis.resolved",
  "id": "evt_xxxxxxxxxxxx",
  "created_at": "2025-06-01T12:00:00Z",
  "data": {
    "crisis_id": "crs_xxxxxxxxxxxx",
    "brand_id": "brd_xxxxxxxxxxxx",
    "resolved_by": "user_xxxxxxxxxxxx",
    "resolution_notes": "…"
  }
}`}</pre>

        <h3 className="mt-4 font-medium text-ink-deep">report.generated</h3>
        <p className="text-sm text-ink/70">Fired when a scheduled or on-demand report finishes generating.</p>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`{
  "event": "report.generated",
  "id": "evt_xxxxxxxxxxxx",
  "created_at": "2025-06-01T12:00:00Z",
  "data": {
    "report_id": "rpt_xxxxxxxxxxxx",
    "brand_id": "brd_xxxxxxxxxxxx",
    "type": "weekly_summary",
    "download_url": "https://…"
  }
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Payload Format</h2>
        <p className="mt-1 text-sm text-ink/70">
          Every webhook payload follows a consistent structure with a top-level envelope and a
          <code className="font-mono text-sm bg-surface-press-light px-1.5 py-0.5 rounded mx-1">data</code>
          object containing event-specific fields.
        </p>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`{
  "event":       "string  — event type identifier",
  "id":          "string  — unique event id (evt_...)",
  "created_at":  "string  — ISO 8601 timestamp",
  "data":        "object  — event-specific payload"
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Security</h2>
        <p className="mt-1 text-sm text-ink/70">
          Each webhook request includes a signature header that you must verify to confirm the
          payload originated from Sentri.
        </p>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`X-Sentri-Signature: t=1717200000,s=hex_encoded_hmac_sha256`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Verification Steps</h3>
        <ol className="mt-2 list-decimal list-inside text-sm text-ink/70 space-y-1">
          <li>Extract the timestamp (<code className="font-mono text-xs bg-surface-press-light px-1 rounded">t</code>) and signature (<code className="font-mono text-xs bg-surface-press-light px-1 rounded">s</code>) from the header.</li>
          <li>Concatenate the timestamp, a dot, and the raw request body as a string.</li>
          <li>Compute HMAC-SHA256 of that string using your webhook secret.</li>
          <li>Compare the computed signature to the value of <code className="font-mono text-xs bg-surface-press-light px-1 rounded">s</code>.</li>
          <li>Reject timestamps older than 5 minutes to prevent replay attacks.</li>
        </ol>
        <pre className="mt-4 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`// Node.js verification example
const crypto = require("crypto");

function verifyWebhook(body, header, secret) {
  const [t, s] = header.replace("X-Sentri-Signature: ", "").split(",");
  const timestamp = t.split("=")[1];
  const signature = s.split("=")[1];
  const payload = timestamp + "." + body;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Rate Limits</h2>
        <p className="mt-1 text-sm text-ink/70">
          Webhook deliveries are rate-limited per endpoint to protect your infrastructure.
        </p>
        <div className="mt-3 overflow-hidden rounded-lg border border-hairline-cloud">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-press-light">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-ink-deep">Limit</th>
                <th className="px-4 py-2 text-left font-medium text-ink-deep">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-cloud">
              <tr>
                <td className="px-4 py-2 text-ink/70">Max deliveries per second</td>
                <td className="px-4 py-2 font-mono text-ink-deep">10</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-ink/70">Max payload size</td>
                <td className="px-4 py-2 font-mono text-ink-deep">1 MB</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-ink/70">Retry schedule</td>
                <td className="px-4 py-2 font-mono text-ink-deep">Exponential backoff (max 3 days)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-ink/70">Timeout</td>
                <td className="px-4 py-2 font-mono text-ink-deep">5 seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
