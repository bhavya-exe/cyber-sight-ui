import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const ScanConfig = () => {
  const [target, setTarget] = useState("");
  const [tool, setTool] = useState("");
  const [activeMode, setActiveMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!target || !tool) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    toast.success("Scan initiated successfully!");
    
    // Simulate scan start
    setTimeout(() => {
      setLoading(false);
      navigate("/targets");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Configure New Scan</h1>
          <p className="text-muted-foreground">Set up a new vulnerability scan for your target</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Scan Configuration</CardTitle>
            <CardDescription>Enter target details and select scanning tools</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartScan} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="target">Target (Domain/IP)</Label>
                <Input
                  id="target"
                  placeholder="example.com or 192.168.1.1"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tool">Scanning Tool</Label>
                <Select value={tool} onValueChange={setTool}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select a scanning tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nmap">Nmap - Network Scanner</SelectItem>
                    <SelectItem value="nessus">Nessus - Vulnerability Scanner</SelectItem>
                    <SelectItem value="nikto">Nikto - Web Server Scanner</SelectItem>
                    <SelectItem value="nuclei">Nuclei - Fast Scanner</SelectItem>
                    <SelectItem value="owasp-zap">OWASP ZAP - Web App Scanner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                <div className="space-y-0.5">
                  <Label htmlFor="active-mode">Active Scan Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable intrusive testing (may affect target)
                  </p>
                </div>
                <Switch
                  id="active-mode"
                  checked={activeMode}
                  onCheckedChange={setActiveMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="text-sm font-medium mb-1">Scan Type</p>
                  <p className="text-xs text-muted-foreground">
                    {activeMode ? "Active (Intrusive)" : "Passive (Safe)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Estimated Time</p>
                  <p className="text-xs text-muted-foreground">
                    {activeMode ? "15-30 minutes" : "5-10 minutes"}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Starting Scan..." : "Start Scan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ScanConfig;
