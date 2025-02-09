
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWebhookTest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Enviando para webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Necessário para webhooks externos
        body: JSON.stringify({
          message: message || "Teste de webhook",
          timestamp: new Date().toISOString(),
          source: "lovable-bot",
        }),
      });

      toast({
        title: "Requisição Enviada",
        description: "A mensagem foi enviada para o webhook. Verifique o histórico da sua automação.",
      });
    } catch (error) {
      console.error("Erro ao enviar webhook:", error);
      toast({
        title: "Erro",
        description: "Falha ao enviar a mensagem. Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuração de Webhook</CardTitle>
            <CardDescription>
              Configure a URL do webhook do seu n8n ou Make para começar a integração
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWebhookTest} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="webhook" className="text-sm font-medium">
                  URL do Webhook
                </label>
                <Input
                  id="webhook"
                  placeholder="https://your-webhook-url.com"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem de Teste
                </label>
                <Textarea
                  id="message"
                  placeholder="Digite uma mensagem para testar o webhook"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Testar Webhook"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Dica: Use esta interface para testar suas integrações com n8n ou Make
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Como Usar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Para n8n:</h3>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Crie um novo workflow no n8n</li>
                <li>Adicione um nó "Webhook"</li>
                <li>Copie a URL do webhook</li>
                <li>Cole a URL acima e teste a conexão</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium mb-2">Para Make (Integromat):</h3>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Crie um novo cenário no Make</li>
                <li>Comece com um módulo "Webhook"</li>
                <li>Copie a URL do webhook fornecida</li>
                <li>Cole a URL acima e teste a conexão</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
