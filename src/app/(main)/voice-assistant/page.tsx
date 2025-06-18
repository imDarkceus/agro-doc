"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Mic2, MessageSquare, AlertCircle, Send } from 'lucide-react';
import { answerCropQuestion, type AnswerCropQuestionOutput } from '@/ai/flows/answer-crop-questions';
import { PageShell } from '@/components/shared/PageShell';
import { useToast } from '@/hooks/use-toast';

export default function VoiceAssistantPage() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<AnswerCropQuestionOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      setError('অনুগ্রহ করে আপনার প্রশ্ন লিখুন।');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const result = await answerCropQuestion({ question });
      setAnswer(result);
      toast({
        title: "প্রশ্নের উত্তর প্রস্তুত",
        description: "আপনার প্রশ্নের উত্তর নিচে দেখুন।",
      });
    } catch (err) {
      console.error('Error getting answer:', err);
      setError('উত্তর পেতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      toast({
        title: "ত্রুটি",
        description: "উত্তর পেতে ব্যর্থ।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageShell title="কৃষি সহকারী" description="কৃষি সংক্রান্ত যেকোনো প্রশ্ন বাংলায় জিজ্ঞাসা করুন এবং তাৎক্ষণিক উত্তর পান।">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mic2 className="h-6 w-6 text-primary" /> আপনার প্রশ্ন</CardTitle>
            <CardDescription>
              আপনার প্রশ্নটি নিচের বাক্সে বাংলায় লিখুন। যেমনঃ "ধানের জমিতে মাজরা পোকার আক্রমণ হলে কী করবো?"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="আপনার প্রশ্ন এখানে লিখুন..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="text-base"
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !question.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  লোড হচ্ছে...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  প্রশ্ন পাঠান
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>ত্রুটি</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {answer && (
          <Card className="shadow-lg animate-fadeIn">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <MessageSquare className="h-6 w-6" /> উত্তর
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line text-base">{answer.answer}</p>
            </CardContent>
          </Card>
        )}
      </form>
    </PageShell>
  );
}
