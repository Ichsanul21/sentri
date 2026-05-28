import { Card } from "@/components/ui/card";

export function AgentDetail() {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Agent Details</h2>
      </div>
      <p className="text-on-dark-muted">This is a placeholder for agent details</p>
    </Card>
  );
}
