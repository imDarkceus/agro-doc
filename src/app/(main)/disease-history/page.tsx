"use client";

import Image from 'next/image';
import { useDiseaseHistory } from '@/contexts/DiseaseHistoryContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell, PageSection } from '@/components/shared/PageShell';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, CalendarDays, Microscope, ShieldCheck, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

export default function DiseaseHistoryPage() {
  const { history, clearHistory } = useDiseaseHistory();
  const { toast } = useToast();

  const handleClearHistory = () => {
    clearHistory();
    toast({
      title: "ইতিহাস মুছে ফেলা হয়েছে",
      description: "আপনার সকল সংরক্ষিত রোগ নির্ণয়ের তথ্য মুছে ফেলা হয়েছে।",
    });
  };

  return (
    <PageShell title="রোগের ইতিহাস" description="পূর্বে স্ক্যান করা রোগ এবং তাদের নির্ণয়ের বিস্তারিত দেখুন।">
      {history.length === 0 ? (
        <PageSection>
          <div className="text-center py-10">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg text-muted-foreground">এখনও কোনো রোগের তথ্য সংরক্ষণ করা হয়নি।</p>
            <Button variant="link" className="mt-2 text-primary" asChild>
              <a href="/disease-detection">নতুন রোগ নির্ণয় করুন</a>
            </Button>
          </div>
        </PageSection>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  ইতিহাস মুছুন
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                  <AlertDialogDescription>
                    এই পদক্ষেপ আপনার সকল সংরক্ষিত রোগ নির্ণয়ের ইতিহাস স্থায়ীভাবে মুছে ফেলবে। এই তথ্য পুনরুদ্ধার করা যাবে না।
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    হ্যাঁ, মুছুন
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]"> {/* Adjust height as needed */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-1">
              {history.map((entry) => (
                <Card key={entry.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {entry.imageDataUri ? (
                       <Image 
                        src={entry.imageDataUri} 
                        alt={entry.imageName || 'রোগাক্রান্ত পাতা'} 
                        width={300} 
                        height={200} 
                        className="rounded-md object-cover aspect-video w-full" 
                        data-ai-hint="plant leaf"
                       />
                    ) : (
                      <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center" data-ai-hint="placeholder image">
                        <Microscope className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                     <CardTitle className="mt-2 text-lg text-primary truncate" title={entry.diseaseName}>{entry.diseaseName}</CardTitle>
                    <CardDescription className="text-xs flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {new Date(entry.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm flex-grow">
                    <div>
                      <h4 className="font-semibold flex items-center gap-1"><Microscope className="h-4 w-4 text-accent" /> কারণ:</h4>
                      <p className="text-muted-foreground line-clamp-2" title={entry.cause}>{entry.cause}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-accent" /> সংক্ষিপ্তসার:</h4>
                      <p className="text-muted-foreground line-clamp-3" title={entry.summary}>{entry.summary}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                     {/* Future: Button to view full details, perhaps in a dialog */}
                     {/* <Button variant="outline" size="sm">বিস্তারিত দেখুন</Button> */}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </PageShell>
  );
}
