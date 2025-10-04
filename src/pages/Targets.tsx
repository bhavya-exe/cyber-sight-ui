import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockTargets } from "@/data/mockData";
import { Search } from "lucide-react";

const Targets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTargets = mockTargets.filter((target) => {
    const matchesSearch = target.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || target.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-low text-white";
      case "Running":
        return "bg-info text-white";
      case "Pending":
        return "bg-medium text-white";
      case "Failed":
        return "bg-high text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Targets & Scans</h1>
          <p className="text-muted-foreground">Manage and monitor all your security scans</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>All Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search targets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-input border-border">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Running">Running</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Target</TableHead>
                    <TableHead>Tool</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="text-right">Vulnerabilities</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTargets.map((target) => (
                    <TableRow key={target.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono">{target.target}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/30">
                          {target.tool}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(target.status)}>
                          {target.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{target.started_at}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {target.vulnerabilities || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Targets;
