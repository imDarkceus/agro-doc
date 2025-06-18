"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_AGRI_SUPPORT_CENTERS } from '@/lib/constants';
import type { AgriSupportCenter } from '@/lib/types';
import { PageShell, PageSection } from '@/components/shared/PageShell';
import { MapPin, Building, Phone, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

export default function SupportLocatorPage() {
  const [centers, setCenters] = useState<AgriSupportCenter[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Simulate loading
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);


  // Simulate fetching centers and GPS location
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate fetching user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // In a real app, you would fetch centers based on this location.
          // For now, just use mock data.
          setCenters(MOCK_AGRI_SUPPORT_CENTERS);
          setIsLoading(false);
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          setError("আপনার অবস্থান সনাক্ত করা যায়নি। ডিফল্ট তালিকা দেখানো হচ্ছে।");
          // Still show mock data if location fails
          setCenters(MOCK_AGRI_SUPPORT_CENTERS);
          setIsLoading(false);
        },
        { timeout: 5000, enableHighAccuracy: true } 
      );
    } else {
      setError("আপনার ব্রাউজারে জিওলোকেশন সমর্থিত নয়।");
      setCenters(MOCK_AGRI_SUPPORT_CENTERS);
      setIsLoading(false);
    }
    
  }, []);


  const handleFindNearby = () => {
    // This function would typically re-trigger location fetching or API call
    // For now, it's mostly symbolic as data is loaded on mount.
    // You might want to add a "refresh" functionality here.
    console.log("Finding nearby centers clicked. Current location:", userLocation);
    // You could re-trigger the useEffect logic or make a new API call here
  };


  return (
    <PageShell title="নিকটবর্তী কৃষি সহায়তা কেন্দ্র" description="আপনার এলাকার কৃষি অফিস, সার ও কীটনাশক ডিলার এবং অন্যান্য সহায়তা কেন্দ্র খুঁজুন।">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6 text-primary" /> কেন্দ্র অনুসন্ধান
            </CardTitle>
            <CardDescription>
              {userLocation 
                ? `আপনার বর্তমান অবস্থানের (${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}) আশেপাশে কেন্দ্রগুলি দেখানো হচ্ছে।`
                : "আপনার অবস্থান সনাক্ত করার চেষ্টা করা হচ্ছে..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleFindNearby} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              নিকটবর্তী কেন্দ্র পুনরায় খুঁজুন
            </Button>
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : centers.length === 0 && !error ? (
          <PageSection>
            <p className="text-center text-muted-foreground">আপনার কাছাকাছি কোনো কেন্দ্র খুঁজে পাওয়া যায়নি।</p>
          </PageSection>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {centers.map((center) => (
              <Card key={center.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{center.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    <Building className="h-4 w-4 text-accent" /> {center.type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-accent" /> 
                    <span>ঠিকানা: {center.address}</span>
                  </p>
                  {center.contact && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent" /> 
                      যোগাযোগ: <a href={`tel:${center.contact}`} className="text-primary hover:underline">{center.contact}</a>
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
