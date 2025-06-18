"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, UploadCloud, Microscope, Info, ShieldCheck, AlertCircle, FileImage } from 'lucide-react';
import { diagnoseCropDisease, type DiagnoseCropDiseaseOutput } from '@/ai/flows/diagnose-crop-disease';
import { useDiseaseHistory } from '@/contexts/DiseaseHistoryContext';
import { PageShell } from '@/components/shared/PageShell';
import { useToast } from '@/hooks/use-toast';

export default function DiseaseDetectionPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnoseCropDiseaseOutput | null>(null);
  const { addDiagnosis: addDiagnosisToHistory } = useDiseaseHistory();
  const { toast } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setDiagnosis(null);
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageFile || !imagePreview) {
      setError('অনুগ্রহ করে একটি ছবি নির্বাচন করুন।');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiagnosis(null);

    try {
      // The imagePreview is already a data URI (base64 encoded)
      const result = await diagnoseCropDisease({ photoDataUri: imagePreview });
      setDiagnosis(result);
      addDiagnosisToHistory({
        imageDataUri: imagePreview, // Store preview for history
        imageName: imageFile.name,
        diseaseName: result.diseaseName,
        cause: result.cause,
        solution: result.solution,
        summary: result.summary,
      });
      toast({
        title: "রোগ নির্ণয় সফল",
        description: `শনাক্তকৃত রোগ: ${result.diseaseName}`,
        variant: "default",
      });
    } catch (err) {
      console.error('Error diagnosing disease:', err);
      setError('রোগ নির্ণয় করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      toast({
        title: "ত্রুটি",
        description: "রোগ নির্ণয় ব্যর্থ হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageShell title="ফসলের রোগ নির্ণয়" description="আপনার ফসলের পাতার ছবি আপলোড করে রোগ শনাক্ত করুন এবং তার প্রতিকার জানুন।">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UploadCloud className="h-6 w-6 text-primary" /> ছবি আপলোড করুন</CardTitle>
            <CardDescription>রোগাক্রান্ত পাতার স্পষ্ট ছবি আপলোড করুন। ছবির রেজোলিউশন ভালো হলে রোগ নির্ণয় সহজ হবে।</CardDescription>
          </CardHeader>
          <CardContent>
            <Input type="file" accept="image/*" onChange={handleImageChange} className="text-foreground file:text-primary" disabled={isLoading} />
            {imagePreview && (
              <div className="mt-4 p-2 border rounded-lg inline-block bg-muted">
                <Image src={imagePreview} alt="Uploaded leaf" width={200} height={200} className="object-cover rounded-md shadow-sm" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !imageFile} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  শনাক্ত করা হচ্ছে...
                </>
              ) : (
                <>
                  <Microscope className="mr-2 h-4 w-4" />
                  রোগ শনাক্ত করুন
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

        {diagnosis && (
          <Card className="shadow-lg animate-fadeIn">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <FileImage className="h-6 w-6" /> রোগ নির্ণয়ের ফলাফল
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><Microscope className="h-5 w-5 text-accent" /> রোগের নাম:</h3>
                <p className="text-muted-foreground">{diagnosis.diseaseName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><Info className="h-5 w-5 text-accent" /> রোগের কারণ:</h3>
                <p className="text-muted-foreground">{diagnosis.cause}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-accent" /> প্রতিকার/সমাধান:</h3>
                <p className="text-muted-foreground whitespace-pre-line">{diagnosis.solution}</p>
              </div>
               <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-accent" /> সংক্ষিপ্তসার:</h3>
                <p className="text-muted-foreground whitespace-pre-line">{diagnosis.summary}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </PageShell>
  );
}
