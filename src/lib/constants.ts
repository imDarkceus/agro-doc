
import type { NavigationItem, CropCalendarEntry, AgriSupportCenter, CropGuide } from '@/lib/types';
import { LayoutDashboard, Bot, Mic2, CalendarDays, MapPin, History, SprayCan, Tractor, Thermometer, Droplets, Wind, Leaf, Info } from 'lucide-react';

export const APP_NAME = "কৃষি রক্ষক";
export const APP_DESCRIPTION = "আপনার ফসলের ব্যক্তিগত ডাক্তার";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'ড্যাশবোর্ড', href: '/', icon: LayoutDashboard },
  { name: 'রোগ নির্ণয়', href: '/disease-detection', icon: Bot },
  { name: 'কৃষি সহকারী', href: '/voice-assistant', icon: Mic2 },
  { name: 'ফসল ক্যালেন্ডার', href: '/crop-calendar', icon: CalendarDays },
  { name: 'সহায়তা কেন্দ্র', href: '/support-locator', icon: MapPin },
  { name: 'রোগের ইতিহাস', href: '/disease-history', icon: History },
  { name: 'আমাদের সম্পর্কে', href: '/about', icon: Info },
];

export const MOCK_CROP_CALENDAR: CropCalendarEntry[] = [
  {
    month: 'জানুয়ারি',
    activities: [
      { crop: 'আলু', task: 'ফসল সংগ্রহ ও সংরক্ষণ', details: 'পরিপক্ক আলু তুলে ফেলুন এবং ঠান্ডা ও শুকনো জায়গায় সংরক্ষণ করুন।' },
      { crop: 'সরিষা', task: 'ফসল সংগ্রহ', details: 'সরিষার শুঁটি হলুদ হলে কেটে নিন।' },
      { crop: 'গম', task: 'সেচ ও সার প্রয়োগ', details: 'প্রয়োজন অনুযায়ী সেচ দিন এবং দ্বিতীয় কিস্তির ইউরিয়া সার প্রয়োগ করুন।' },
    ],
  },
  {
    month: 'ফেব্রুয়ারি',
    activities: [
      { crop: 'বোরো ধান', task: 'চারা রোপণ', details: 'ফেব্রুয়ারির প্রথম ১৫ দিনের মধ্যে বোরো ধানের চারা রোপণ সম্পন্ন করুন।' },
      { crop: 'শাকসবজি (টমেটো, বেগুন)', task: 'পরিচর্যা ও ফসল সংগ্রহ', details: 'আগাছা দমন করুন এবং পরিপক্ক সবজি সংগ্রহ করুন।' },
      { crop: 'ভুট্টা', task: 'সেচ ও সার প্রয়োগ', details: 'জমিতে রসের অভাব হলে সেচ দিন।' },
    ],
  },
  {
    month: 'মার্চ',
    activities: [
      { crop: 'বোরো ধান', task: 'আগাছা দমন ও সেচ', details: 'জমিতে আগাছা পরিষ্কার রাখুন এবং প্রয়োজন মতো সেচ দিন।' },
      { crop: 'পাট', task: 'বীজ বপন', details: 'তোষা পাটের বীজ বপনের উপযুক্ত সময়।' },
      { crop: ' গ্রীষ্মকালীন সবজি', task: 'বীজতলা তৈরি ও বীজ বপন', details: 'ঝিঙা, চিচিঙ্গা, করলা ইত্যাদি সবজির বীজ বপন করুন।' },
    ],
  },
  // Add more months as needed
];

export const MOCK_AGRI_SUPPORT_CENTERS: AgriSupportCenter[] = [
  { id: '1', name: 'উপজেলা কৃষি অফিস, সদর', type: 'কৃষি অফিস', address: 'ঢাকা রোড, কুমিল্লা', contact: '01700000000' },
  { id: '2', name: 'রহমান ট্রেডার্স', type: 'সার ও কীটনাশক ডিলার', address: 'বাজার রোড, বগুড়া', contact: '01800000000' },
  { id: '3', name: 'কৃষক সমবায় সমিতি', type: 'সমবায় সমিতি', address: 'গ্রামঃ रामपुर, উপজেলাঃ ফরিদপুর', contact: '01900000000' },
  { id: '4', name: 'বিএডিসি বীজ বিক্রয় কেন্দ্র', type: 'বীজ ডিলার', address: 'স্টেশন রোড, ময়মনসিংহ', contact: '01600000000' },
];

export const MOCK_CROP_GUIDES: CropGuide[] = [
  {
    id: 'fert-1',
    title: 'ধানের জমিতে সুষম সার ব্যবস্থাপনা',
    category: 'fertilizers',
    content: 'ধান চাষে ভালো ফলন পেতে সুষম সার প্রয়োগ অপরিহার্য। মাটির উর্বরতা ও ধানের জাতের ওপর নির্ভর করে সারের মাত্রা নির্ধারণ করতে হবে। সাধারণত ইউরিয়া, টিএসপি, এমওপি, জিপসাম ও জিংক সালফেট পরিমাণমতো ব্যবহার করা হয়। ইউরিয়া সার তিন কিস্তিতে প্রয়োগ করলে ভালো ফল পাওয়া যায়।',
    icon: Leaf,
  },
  {
    id: 'irri-1',
    title: 'আলু চাষে সেচ পদ্ধতি',
    category: 'irrigation',
    content: 'আলু গাছ লাগানোর পর থেকে শুরু করে কয়েকবার সেচ দেওয়ার প্রয়োজন হয়। প্রথম সেচ সাধারণত লাগানোর ২০-২৫ দিন পর দেওয়া হয়। এরপর মাটির অবস্থা ও আবহাওয়া বিবেচনা করে ১০-১৫ দিন পরপর সেচ দিতে হবে। খেয়াল রাখতে হবে যেন জমিতে পানি জমে না থাকে।',
    icon: Droplets,
  },
  {
    id: 'pest-1',
    title: 'টমেটোর সাধারণ পোকামাকড় ও দমন',
    category: 'pest-control',
    content: 'টমেটো গাছে জাবপোকা, সাদা মাছি ও ফল ছিদ্রকারী পোকার আক্রমণ দেখা যায়। জাবপোকা ও সাদা মাছির জন্য জৈব কীটনাশক যেমন নিম তেল ব্যবহার করা যেতে পারে। ফল ছিদ্রকারী পোকা দমনে ফেরোমন ফাঁদ ব্যবহার করা কার্যকর। আক্রমণের মাত্রা বেশি হলে অনুমোদিত রাসায়নিক কীটনাশক ব্যবহার করতে হবে।',
    icon: SprayCan,
  },
  {
    id: 'fert-2',
    title: 'পাট চাষে সার প্রয়োগ',
    category: 'fertilizers',
    content: 'পাট চাষের জন্য জমি তৈরির সময় অর্ধেক ইউরিয়া এবং সম্পূর্ণ টিএসপি, এমওপি ও জিপসাম সার প্রয়োগ করতে হবে। বাকি অর্ধেক ইউরিয়া বীজ বপনের ৩০-৪০ দিন পর প্রয়োগ করতে হবে। এতে পাটের বৃদ্ধি ভালো হয় ও আঁশের মান উন্নত হয়।',
    icon: Leaf,
  },
];

export const MOCK_WEATHER_DATA = {
  current: {
    location: 'ঢাকা',
    temperature: 30, // Celsius
    description: 'আংশিক মেঘলা',
    humidity: 75, // Percent
    windSpeed: 10, // km/h
    icon: Thermometer, // Example, can be dynamic
  },
  forecast: [
    { day: 'আজ', tempMax: 32, tempMin: 26, description: 'বিক্ষিপ্ত বৃষ্টি', icon: Droplets },
    { day: 'আগামীকাল', tempMax: 31, tempMin: 25, description: 'বজ্রসহ বৃষ্টি', icon: Wind },
    { day: 'পরশু', tempMax: 33, tempMin: 27, description: 'রৌদ্রোজ্জ্বল', icon: Thermometer },
  ],
  advice: 'আগামী ২৪ ঘন্টায় হালকা বৃষ্টির সম্ভাবনা থাকায় কীটনাশক স্প্রে করার জন্য উপযুক্ত সময় নয়। সেচের প্রয়োজন হলে পরশু দিন বিবেচনা করতে পারেন।',
};
