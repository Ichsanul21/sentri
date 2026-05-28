export default function ApiDocsPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold tracking-tight text-ink-deep">API Documentation</h1>
      <p className="mt-2 text-ink/70">
        The Sentri API is organized around REST. All requests should be made with a valid API key
        included in the <code className="font-mono text-sm bg-surface-press-light px-1.5 py-0.5 rounded">Authorization</code> header.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Authentication</h2>
        <p className="mt-1 text-sm text-ink/70">All API requests require authentication via Bearer token.</p>
        <pre className="mt-3 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`Authorization: Bearer <api_key>`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Headers</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`Content-Type: application/json
Authorization: Bearer sentri_live_xxxxxxxxxxxx`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Brand</h2>
        <h3 className="mt-4 font-medium text-ink-deep">List Brands</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/brands`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Get Brand Details</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/brands/:id`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Create Brand</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`POST /v1/brands
{
  "name": "string",
  "website": "string (optional)",
  "industry": "string (optional)"
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Sentiment</h2>
        <h3 className="mt-4 font-medium text-ink-deep">Analyze Text</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`POST /v1/sentiment/analyze
{
  "text": "string",
  "brand_id": "string (optional)"
}`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Get Mention Feed</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/sentiment/mentions?brand_id=:id&page=1&per_page=20`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Trend Over Time</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/sentiment/trends?brand_id=:id&range=7d`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Crisis</h2>
        <h3 className="mt-4 font-medium text-ink-deep">List Active Crises</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/crises`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Get Crisis Details</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/crises/:id`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Resolve Crisis</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`POST /v1/crises/:id/resolve
{
  "resolution_notes": "string (optional)"
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Strategy</h2>
        <h3 className="mt-4 font-medium text-ink-deep">Campaign Optimizer</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`POST /v1/strategy/optimize
{
  "brand_id": "string",
  "goals": ["string"]
}`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Tone Checker</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`POST /v1/strategy/tone-check
{
  "text": "string",
  "target_tone": "string"
}`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Persona Matcher</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`POST /v1/strategy/persona-match
{
  "brand_id": "string",
  "audience_description": "string"
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Dashboard</h2>
        <h3 className="mt-4 font-medium text-ink-deep">Executive Summary</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/dashboard/summary?brand_id=:id`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Competitor Benchmarking</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/dashboard/competitors?brand_id=:id`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Geospatial Data</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/dashboard/geospatial?brand_id=:id&range=30d`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink-deep">Admin</h2>
        <h3 className="mt-4 font-medium text-ink-deep">List Users</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET /v1/admin/users?page=1&per_page=20`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Manage API Keys</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET  /v1/admin/api-keys
POST /v1/admin/api-keys
DELETE /v1/admin/api-keys/:id`}</pre>
        <h3 className="mt-4 font-medium text-ink-deep">Billing</h3>
        <pre className="mt-2 rounded-lg bg-surface-night p-4 overflow-x-auto text-sm text-on-primary font-mono">{`GET  /v1/admin/billing/plan
POST /v1/admin/billing/plan`}</pre>
      </section>
    </article>
  );
}
