import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI security assistant. Ask me about vulnerabilities, CVEs, or attack paths.",
    },
  ]);
  const [input, setInput] = useState("");

  const mockResponses: Record<string, string> = {
    default: "I can help you understand vulnerabilities, explain CVEs, and analyze security risks. What would you like to know?",
    cve: "CVE-2023-12345 is a critical vulnerability in Apache Struts with a CVSS score of 9.8. It allows remote code execution and should be patched immediately.",
    attack: "The attack path shows a privilege escalation from the web server to the database layer through SQL injection (CVE-2022-78901).",
    remediation: "To remediate this vulnerability: 1) Apply the latest security patches 2) Implement input validation 3) Use parameterized queries 4) Enable WAF rules",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Mock AI response
    setTimeout(() => {
      let response = mockResponses.default;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("cve")) {
        response = mockResponses.cve;
      } else if (lowerInput.includes("attack") || lowerInput.includes("path")) {
        response = mockResponses.attack;
      } else if (lowerInput.includes("fix") || lowerInput.includes("remediat")) {
        response = mockResponses.remediation;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg animate-glow-pulse z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] border-border shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border">
            <CardTitle className="text-lg">AI Security Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about vulnerabilities..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="bg-input border-border"
                />
                <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChat;
