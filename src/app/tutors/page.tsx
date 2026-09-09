'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { tutors, Tutor } from '@/lib/data/tutors';
import { locations as locationsData } from '@/lib/data/locations';

const SUBJECT_OPTIONS = ['All Subjects','Mathematics','Physics','Chemistry','Biology','English','Hindi','Computer Science','Science','EVS','Economics','Business Studies','French','German','Sanskrit','Social Science'];
const CLASS_OPTIONS = ['All Classes','Nursery–UKG','Class 1–5','Class 6–8','Class 9–10','Class 11–12','IIT-JEE','NEET'];
const BOARD_OPTIONS = ['All Boards','CBSE','ICSE','NIOS','State Board','IB','Cambridge'];
const LOCATION_OPTIONS = ['All Locations','Delhi','Noida','Greater Noida','Gurugram','Ghaziabad','Faridabad'];
const MODE_OPTIONS = ['All Modes','Home','Online'];
const EXPERIENCE_OPTIONS = ['Any Experience','1+ Years','3+ Years','5+ Years','8+ Years','10+ Years','15+ Years'];

const CLASS_BUCKET_RANGES: Record<string,[number,number]> = {
  'Nursery–UKG':[-3,-1], 'Class 1–5':[1,5], 'Class 6–8':[6,8], 'Class 9–10':[9,10], 'Class 11–12':[11,12],
};
const CLASS_KEYWORD_TOKENS: Record<string,number> = { nursery:-3, nur:-3, lkg:-2, kg:-2, ukg:-1 };
const SUBJECT_ALIASES: Record<string,string> = { maths:'Mathematics', math:'Mathematics', bio:'Biology', phy:'Physics', physic:'Physics', chem:'Chemistry', cs:'Computer Science', comp:'Computer Science', computers:'Computer Science', eng:'English', social:'Social Science', socialscience:'Social Science', socialstudies:'Social Science', eco:'Economics', econ:'Economics', economics:'Economics', accounts:'Accountancy', accountancy:'Accountancy' };

function extractClassTokens(raw:string):number[] {
  const lower=raw.toLowerCase(); const tokens=new Set<number>();
  (lower.match(/\d+/g)||[]).forEach(n=>tokens.add(parseInt(n,10)));
  Object.keys(CLASS_KEYWORD_TOKENS).forEach(k=>{if(new RegExp(`\\b${k}\\b`).test(lower))tokens.add(CLASS_KEYWORD_TOKENS[k]);});
  return [...tokens];
}
function classMatchesBucket(classes:string[],range:[number,number]) {
  const [min,max]=range;
  return classes.some(cls=>{const t=extractClassTokens(cls); if(!t.length)return false; const a=Math.min(...t),b=Math.max(...t); return a<=max&&b>=min;});
}
function resolveClassBucket(raw:string) {
  const value=raw.trim(), lower=value.toLowerCase();
  if(CLASS_BUCKET_RANGES[value])return value;
  for(const [bucket,values] of Object.entries({
    'Nursery–UKG':['Nursery','LKG','UKG','KG','Class Nursery','Class LKG','Class UKG','Class KG'],
    'Class 1–5':['Class 1','Class 2','Class 3','Class 4','Class 5'],
    'Class 6–8':['Class 6','Class 7','Class 8'],
    'Class 9–10':['Class 9','Class 10'],
    'Class 11–12':['Class 11','Class 12'],
  })) if(values.some(v=>v.toLowerCase()===lower))return bucket;
  return 'All Classes';
}
function resolveSubject(raw:string) {
  const trimmed=raw.trim(), key=trimmed.toLowerCase().replace(/\s+/g,'');
  return SUBJECT_ALIASES[key] || SUBJECT_OPTIONS.find(o=>o.toLowerCase()===trimmed.toLowerCase()) || trimmed;
}
function normalizeAreaText(value:string){return value.toLowerCase().replace(/[.,]/g,'').replace(/\s+/g,' ').trim();}
function cityForArea(area:string):string|null {
  const normalized=normalizeAreaText(area); if(!normalized||normalized==='online')return null;
  for(const city of locationsData)if(normalized.includes(normalizeAreaText(city.name)))return city.name;
  for(const city of locationsData){
    if(city.areas.some(a=>{const n=normalizeAreaText(a);return n&&n!=='& more...'&&(n===normalized||normalized.includes(n)||n.includes(normalized));}))return city.name;
  }
  return null;
}

function VerifiedBadge(){return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0C8F81] bg-[#E6F7F5] px-2 py-0.5 rounded-full">✓ Verified</span>}
function ModePill({mode}:{mode:string}){return <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${mode==='Home'?'bg-[#FFF8E6] text-[#B07A00]':'bg-[#EBF4FF] text-[#0A6FF7]'}`}>{mode}</span>}

function TutorCard({tutor}:{tutor:Tutor}) {
  const modes:string[]=[];
  if(tutor.teachingMode.includes('home')||tutor.teachingMode.includes('both'))modes.push('Home');
  if(tutor.teachingMode.includes('online')||tutor.teachingMode.includes('both'))modes.push('Online');
  return <article className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:border-[#0A6FF7]/40 hover:shadow-[0_8px_32px_rgba(10,111,247,0.08)] transition-all duration-300 flex flex-col">
    <div className="p-5 pb-4 flex gap-4">
      <div className="flex-shrink-0"><div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB]"><img src={tutor.photo} alt={tutor.photoAlt} className="w-full h-full object-cover" /></div></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5"><h2 className="font-bold text-[#0D1118] text-[15px] leading-tight">{tutor.name}</h2>{tutor.verified&&<VerifiedBadge/>}</div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6B7280] mb-2"><span>◷ {tutor.experience}+ Years Experience</span><span>⌖ {tutor.locations[0]}</span></div>
        <div className="mb-2"><p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Qualification</p><p className="text-[12px] font-medium text-[#1F2937] leading-snug">{tutor.qualifications?.length?tutor.qualifications.join(' • '):'Qualification details available on profile'}</p></div>
        <div className="flex gap-1.5 flex-wrap">{modes.map(mode=><ModePill key={mode} mode={mode}/>)}</div>
      </div>
    </div>
    <div className="mx-5 border-t border-[#F0F2F5]"/>
    <div className="px-5 py-3"><p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Subjects</p><div className="flex flex-wrap gap-1.5">{tutor.subjects.slice(0,3).map(subject=><span key={subject} className="text-[12px] font-medium px-2.5 py-1 bg-[#F8FAFC] text-[#0D1118] rounded-lg border border-[#E5E7EB]">{subject}</span>)}{tutor.subjects.length>3&&<span className="text-[12px] font-medium px-2.5 py-1 bg-[#F8FAFC] text-[#6B7280] rounded-lg border border-[#E5E7EB]">+{tutor.subjects.length-3}</span>}</div></div>
    <div className="px-5 pb-3"><p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Classes</p><p className="text-[12px] text-[#0D1118]">{tutor.classes.slice(0,4).join(', ')}{tutor.classes.length>4?` +${tutor.classes.length-4} more`:''}</p></div>
    <div className="px-5 pb-4"><p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">About the tutor</p><p className="text-[12px] text-[#6B7280] leading-relaxed line-clamp-3">{tutor.bio}</p></div>
    <div className="flex-1"/>
    <div className="px-5 pb-5 pt-3 border-t border-[#F0F2F5] flex gap-2.5"><Link href={`/tutors/${tutor.slug}`} className="flex-1 text-center text-[13px] font-semibold text-[#0A6FF7] bg-[#EBF4FF] hover:bg-[#D6EAFF] px-4 py-2.5 rounded-xl transition-colors">View Profile</Link><Link href={`/find-a-tutor?tutor=${tutor.slug}`} className="flex-1 text-center text-[13px] font-semibold text-white bg-[#0A6FF7] hover:bg-[#0858c8] px-4 py-2.5 rounded-xl transition-colors">Request Tutor</Link></div>
  </article>;
}

interface FilterState{subject:string;classRange:string;board:string;location:string;mode:string;experience:string;}
function FilterSidebar({filters,onChange}:{filters:FilterState;onChange:(key:keyof FilterState,value:string)=>void}){
  const groups:{label:string;key:keyof FilterState;options:string[]}[]=[
    {label:'Subject',key:'subject',options:SUBJECT_OPTIONS},{label:'Class',key:'classRange',options:CLASS_OPTIONS},{label:'Board',key:'board',options:BOARD_OPTIONS},{label:'Location',key:'location',options:LOCATION_OPTIONS},{label:'Teaching Mode',key:'mode',options:MODE_OPTIONS},{label:'Experience',key:'experience',options:EXPERIENCE_OPTIONS}
  ];
  return <aside className="w-full lg:w-64 flex-shrink-0"><div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden sticky top-[84px]"><div className="px-5 py-4 border-b border-[#F0F2F5]"><h3 className="text-[13px] font-bold text-[#0D1118] uppercase tracking-wider">Filters</h3></div><div className="divide-y divide-[#F0F2F5]">{groups.map(({label,key,options})=><div key={key} className="px-5 py-4"><p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">{label}</p><div className="flex flex-col gap-1.5">{options.map(option=><button key={option} type="button" onClick={()=>onChange(key,option)} className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${filters[key]===option?'bg-[#EBF4FF] text-[#0A6FF7] font-semibold':'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0D1118]'}`}>{option}</button>)}</div></div>)}</div></div></aside>;
}

export default function TutorsPage(){
  const [searchQuery,setSearchQuery]=useState('');
  const [filters,setFilters]=useState<FilterState>({subject:'All Subjects',classRange:'All Classes',board:'All Boards',location:'All Locations',mode:'All Modes',experience:'Any Experience'});
  const [mobileFiltersOpen,setMobileFiltersOpen]=useState(false);

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const subject=params.get('subject')||params.get('subjects'), cls=params.get('class'), board=params.get('board'), location=params.get('location'), mode=params.get('mode'), experience=params.get('experience'), q=params.get('q');
    setFilters(previous=>({...previous,...(subject?{subject:subject==='All Subjects'?'All Subjects':resolveSubject(subject.split(',')[0])}:{}),...(cls?{classRange:cls==='All Classes'?'All Classes':resolveClassBucket(cls)}:{}),...(board?{board}:{}),...(location?{location}:{}),...(mode?{mode:mode.toLowerCase().includes('home')?'Home':mode.toLowerCase().includes('online')?'Online':'All Modes'}:{}),...(experience?{experience}: {})}));
    if(q)setSearchQuery(q);
  },[]);

  const filteredTutors=useMemo(()=>tutors.filter(tutor=>{
    if(searchQuery.trim()){
      const q=searchQuery.toLowerCase().trim(), alias=SUBJECT_ALIASES[q.replace(/\s+/g,'')]?.toLowerCase();
      const hay=[tutor.name,...tutor.subjects,...tutor.locations,...tutor.qualifications,tutor.bio].join(' ').toLowerCase();
      if(!hay.includes(q)&&!(alias&&hay.includes(alias)))return false;
    }
    if(filters.subject!=='All Subjects'&&!tutor.subjects.some(s=>resolveSubject(s).toLowerCase()===filters.subject.toLowerCase()))return false;
    if(filters.board!=='All Boards'&&!tutor.boards.some(b=>b.toLowerCase()===filters.board.toLowerCase()||b.toLowerCase().includes(filters.board.toLowerCase())))return false;
    if(filters.location!=='All Locations'){
      const wanted=filters.location.toLowerCase();
      const match=tutor.locations.some(area=>{const lower=area.toLowerCase();if(lower==='online')return true;if(lower.includes(wanted)||wanted.includes(lower))return true;const city=cityForArea(area);return city?city.toLowerCase()===wanted:wanted==='delhi';});
      if(!match)return false;
    }
    if(filters.mode!=='All Modes'){const wanted=filters.mode.toLowerCase();if(!tutor.teachingMode.includes(wanted as 'home'|'online'|'both')&&!tutor.teachingMode.includes('both'))return false;}
    if(filters.experience!=='Any Experience'&&tutor.experience<parseInt(filters.experience,10))return false;
    if(filters.classRange!=='All Classes'){const range=CLASS_BUCKET_RANGES[filters.classRange];if(range&&!classMatchesBucket(tutor.classes,range))return false;}
    return true;
  }),[searchQuery,filters]);

  const hasActiveFilters=Object.values(filters).some(value=>!['All Subjects','All Classes','All Boards','All Locations','All Modes','Any Experience'].includes(value))||!!searchQuery.trim();
  const clearFilters=()=>{setFilters({subject:'All Subjects',classRange:'All Classes',board:'All Boards',location:'All Locations',mode:'All Modes',experience:'Any Experience'});setSearchQuery('');window.history.replaceState({},'', '/tutors');};
  const handleFilterChange=(key:keyof FilterState,value:string)=>setFilters(previous=>({...previous,[key]:value}));

  return <><Header/><main className="pt-16 md:pt-[68px]">
    <section className="bg-white border-b border-[#E5E7EB]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-14"><nav className="flex items-center gap-1.5 text-[13px] text-[#6B7280] mb-6"><Link href="/" className="hover:text-[#0A6FF7]">Home</Link><span>/</span><span className="text-[#0D1118] font-medium">Tutors</span></nav><div className="max-w-2xl mb-8"><h1 className="text-3xl md:text-[2.5rem] font-extrabold text-[#0D1118] mb-3 leading-tight">Find a Tutor</h1><p className="text-[#6B7280] text-lg leading-relaxed">Explore verified tutors for home and online learning.</p></div><div className="relative max-w-2xl"><input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search by tutor name, subject, qualification or location…" className="w-full px-4 py-3.5 text-[15px] text-[#0D1118] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A6FF7]/20 focus:border-[#0A6FF7] transition-all"/></div></div></section>
    <section className="bg-[#F8FAFC] py-10 md:py-14 min-h-screen"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"><div className="lg:hidden mb-5 flex items-center justify-between"><p className="text-[13px] text-[#6B7280]"><span className="font-bold text-[#0D1118]">{filteredTutors.length}</span> tutors found</p><button type="button" onClick={()=>setMobileFiltersOpen(!mobileFiltersOpen)} className="text-[13px] font-semibold bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl">Filters</button></div><div className="flex gap-8 items-start"><div className={`${mobileFiltersOpen?'block':'hidden'} lg:block w-full lg:w-auto`}><FilterSidebar filters={filters} onChange={handleFilterChange}/></div><div className="flex-1 min-w-0"><div className="flex items-center justify-between mb-6"><div><h2 className="text-[17px] font-bold text-[#0D1118]">Tutors available for your learning needs</h2><p className="text-[13px] text-[#6B7280] mt-0.5">{filteredTutors.length} {filteredTutors.length===1?'tutor':'tutors'} found{hasActiveFilters?' · Filters applied':''}</p></div>{hasActiveFilters&&<button type="button" onClick={clearFilters} className="text-[13px] font-semibold text-[#0A6FF7]">Clear all</button>}</div>{filteredTutors.length>0?<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">{filteredTutors.map(tutor=><TutorCard key={tutor.id} tutor={tutor}/>)}</div>:<div className="bg-white rounded-2xl border border-[#E5E7EB] p-10 text-center"><h3 className="text-[16px] font-bold text-[#0D1118] mb-2">We couldn't find an exact match</h3><p className="text-[13px] text-[#6B7280] max-w-md mx-auto mb-6">Try broadening your search or tell us what you need and we'll help you find suitable options.</p><button type="button" onClick={clearFilters} className="text-[13px] font-semibold text-[#0A6FF7] border border-[#0A6FF7] px-5 py-2.5 rounded-xl">Browse All Tutors</button></div>}<div className="mt-10 bg-[#0D1118] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"><div><h3 className="text-[17px] font-bold text-white mb-1">Can't find the right tutor?</h3><p className="text-[13px] text-[#9CA3AF]">Share your requirement and we'll identify suitable tutor options for your child.</p></div><Link href="/find-a-tutor" className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold text-[14px] px-6 py-3 rounded-xl">Let Us Match a Tutor →</Link></div></div></div></div></section>
  </main><Footer/><WhatsAppButton/></>;
}
