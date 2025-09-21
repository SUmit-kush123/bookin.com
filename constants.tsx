import React from 'react';
import { BookingCategorySlug } from './types'; 

export const APP_NAME = "BookIn";

// SVG Icons
export const IconHomeModern: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1M3 7.5l3 1.5M3 7.5v-6A2.25 2.25 0 015.25 0h13.5A2.25 2.25 0 0121 2.25v6" />
    </svg>
);
export const IconBuildingOffice: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 21V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25V21M8.25 21v-4.875M12 21v-4.875M15.75 21v-4.875M8.25 9h7.5M8.25 12h7.5M8.25 15h7.5" />
    </svg>
);
export const IconKey: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);
// App Logo - NEW DESIGN
export const IconLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
        <linearGradient id="newGradBlue" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#21D4FD" />
            <stop offset="100%" stop-color="#2152FF" />
        </linearGradient>
        <linearGradient id="newGradGreen" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#98e08a" />
            <stop offset="100%" stop-color="#55c57a" />
        </linearGradient>
        <filter id="newDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
            <feOffset dx="2" dy="4" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    <g filter="url(#newDropShadow)">
        <path d="M78.4,113.8c-1.3,0-2.6-0.1-3.9-0.4c-11.8-2.6-21-13.6-21-26.3V82.3c6.8,4.2,14.6,6.6,22.9,6.6 c20.1,0,36.5-16.3,36.5-36.4c0-20.1-16.3-36.4-36.5-36.4c-8.7,0-16.8,3-23.4,8.2V24.8c0-12.2,8.9-22.6,20.5-25.6 c1.6-0.4,3.2-0.6,4.8-0.6c20.1,0,36.4,16.3,36.4,36.4C114.8,97.5,98.5,113.8,78.4,113.8z" fill="#0052D4"/>
        <path d="M96.7,35.2c-15.8-12.7-38.5-9-49.8,7.9c-4.9,7.3-6.6,16.2-5,24.6c1.3,7,4.8,13.2,9.9,17.7 c-2.4-1.2-4.6-2.6-6.6-4.3c-11.4-9.3-15.1-25.5-8.1-38.9C43.9,29.9,59,22,74.5,24.8C86.7,27,96.6,35.8,99.6,47.7 c0.9,3.6,1,7.3,0.3,10.9c-0.1,0.5-0.2,0.9-0.4,1.4c-2.3-19.1-12.8-32.3-25.8-38.3C70.6,19.9,67,19,63.3,19 c-1.3,0-2.6,0.1-3.8,0.4c1.6-0.2,3.3-0.4,4.9-0.4c8.7,0,16.8,3,23.4,8.2c2.1,1.7,4,3.6,5.6,5.8C95,34.2,95.9,34.7,96.7,35.2z" fill="url(#newGradBlue)"/>
        <path d="M30.6,87.1c2.1,1.7,4.3,3.1,6.6,4.3c-5.1,4.5-8.5,10.7-9.9,17.7c-1.6,8.4,0.2,17.3,5,24.6 c11.3,16.8,34,20.6,49.8,7.9c3.9-3.2,7-7,9.2-11.3c0.1-0.3,0.3-0.6,0.4-0.9c-3-11.9-12.9-20.7-25.1-22.9 c-11.6-2.1-23,2.6-29.8,11.3c-2.2,2.7-3.9,5.8-5,9.1C31.5,119.5,30.6,103.3,42,94c3.1-2.5,6.6-4.5,10.3-5.8 c-7.7-2-15.8-0.8-22.1,3.3C26.1,93.9,24,98.6,24,103.8c0,1.3,0.1,2.6,0.4,3.9c0.2-2.1,0.6-4.1,1.2-6.1 C26.7,97.2,28.3,91.8,30.6,87.1z" fill="url(#newGradGreen)"/>
        <path d="M54.5,76.5l14.8-11.3l14.8,11.3l-14.8,11.3L54.5,76.5z" fill="#003973"/>
    </g>
  </svg>
);

export const IconBuilding: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 21V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25V21M8.25 21V11.25M12 21V11.25M15.75 21V11.25M8.25 6.75h.008v.008H8.25V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3 0h.008v.008H11.625V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3 0h.008v.008H14.625V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const IconPlane: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export const IconMountain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 17.25h16.5M3.75 13.5L7.5 7.5l3.75 6 3.75-4.5 3.75 7.5" />
  </svg>
);

export const IconHome: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const IconCar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375c-.621 0-1.125-.504-1.125-1.125V11.25c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v6.375c0 .621-.504 1.125-1.125-1.125H18.75m-9 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h.008v.008H12v-.008zM12 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-6 0a1.5 1.5 0 013 0m-3 0a1.5 1.5 0 003 0m-3 0H9m12-9v6.375c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125V9.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125zM12 14.25a.75.75 0 01-.75-.75V6.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H12z" />
  </svg>
);

export const IconBuildingStorefront: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h1.5M4.5 3h1.5M6 3h1.5M7.5 3h1.5M9 3h1.5m-3 18v-4.5m3 4.5v-4.5m3 4.5v-4.5m3 4.5h.75a2.25 2.25 0 002.25-2.25V13.5a2.25 2.25 0 00-2.25-2.25H16.5m-3 4.5v-4.5m0-3A2.25 2.25 0 0011.25 8.25H6.75A2.25 2.25 0 004.5 10.5v1.5m12-3V10.5A2.25 2.25 0 0014.25 8.25H13.5M16.5 3.75v.75m0 0H15m1.5 0H18" />
  </svg>
);

export const IconBuildingRestaurant: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-1.333a3 3 0 00-1.5-2.667m1.5 2.667v-1.333a3 3 0 011.5-2.667M12 18h.008v.008H12v-.008zm-2.25 1.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm4.5 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM3 10.5v5.25a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25V10.5M3 10.5V6.75a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v3.75M3 10.5h18" />
    </svg>
);

export const IconStethoscope: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75L18 18M3 12h.75M12 3v.75m-8.25 8.25L4.5 12.75M3 21l2.25-2.25" />
  </svg>
);

export const IconHeart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const IconHeartFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);


export const IconLayoutDashboard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const IconCoupon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6zM15 12h-5" />
  </svg>
);

export const IconClock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconMapPin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const IconMap: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-11.622a2.25 2.25 0 01-1.87-2.001l-.001-.002A2.25 2.25 0 0013.5 2.25H9A2.25 2.25 0 006.75 4.5v15A2.25 2.25 0 009 21.75h6a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H15M12 18.75h.008v.008H12v-.008z" />
    </svg>
);


export const IconMapDot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="6"/>
    </svg>
);

export const IconUsers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

export const IconCalendar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008z" />
  </svg>
);

export const IconCalendarOff: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008zM3 3l18 18" />
  </svg>
);


export const IconTicket: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-3m2.25-4.5h5.25m-5.25 0h3m-3 0h-3M15 6.75a3 3 0 00-3-3H6a3 3 0 00-3 3v9a3 3 0 003 3h6a3 3 0 003-3V6.75z" />
    </svg>
);

export const IconPriceTag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);

export const IconChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const IconChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const IconChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const IconSearch: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const IconStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.385a.563.563 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.882a.563.563 0 00-.652 0l-4.725 3.882a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.385a.563.563 0 00.475-.321L11.48 3.5z" />
  </svg>
);

export const GENIUS_ICON: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.618 2.585c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);


export const IconCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const IconBed: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.001A2.25 2.25 0 005.25 8.25h13.5A2.25 2.25 0 0020.25 6v0" />
    </svg>
);
export const IconGlobe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0-.778.099 1.533.284-2.253m0 0A11.978 11.978 0 0012 7.5c2.998 0 5.74 1.1 7.843 2.918" />
    </svg>
);

export const IconSparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.7-1.7L12 9l2.188-1.25a2.25 2.25 0 001.7-1.7L17 3.75l1.25 2.188a2.25 2.25 0 001.7 1.7L22.25 9l-2.188 1.25a2.25 2.25 0 00-1.7 1.7z" />
    </svg>
);

export const IconBriefcase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.098m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v-2.25A2.25 2.25 0 0018 9.75h-1.5A2.25 2.25 0 0014.25 12v2.25m1.5-4.5V7.875c0-.621-.504-1.125-1.125-1.125H6.875c-.621 0-1.125.504-1.125 1.125v4.5m13.5 0H3.375m13.5 0h1.875c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-2.25c0-.621.504-1.125 1.125-1.125h1.875" />
    </svg>
);
export const IconDollarSign: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const IconXCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconLogin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

export const IconLogout: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M9 12l3 3m0 0l3-3m-3 3V3" />
  </svg>
);


export const IconUserPlus: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

export const IconPlus: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);


export const IconBell: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const IconPlayCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);

export const IconPhoto: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const IconMessageCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.861 8.25-8.625 8.25S3.75 16.556 3.75 12 7.611 3.75 12.375 3.75 21 7.444 21 12z" />
    </svg>
);

export const IconMessageDots: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25h.008v.008H12V8.25zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008z" />
  </svg>
);

export const IconPhone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
  </svg>
);

export const IconUsersGroup: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-1.5a3 3 0 00-3.741 1.5M1.5 18.72a9.094 9.094 0 013.741-.479 3 3 0 01-3.741-1.5a3 3 0 013.741 1.5M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-1.5a3 3 0 00-3.741 1.5m0 0a9.094 9.094 0 003.741-.479m0 0a9.094 9.094 0 013.741-.479m0 0a9.094 9.094 0 01-3.741-.479M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 4.5a.75.75 0 000-1.5H12a.75.75 0 000 1.5zm-3-1.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75zm.75.75a.75.75 0 00-.75.75h.008a.75.75 0 00.75-.75zm5.25.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75zm.75.75a.75.75 0 00-.75.75h.008a.75.75 0 00.75-.75z" />
  </svg>
);

export const IconCog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.045-4.122L2.25 7.878m19.5 0l-2.25 2.25m0-10.5l-2.25 2.25m2.25-2.25l2.25 2.25M12 4.5v1.5m0 15V12m0 0a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

export const IconBulb: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 00-3-3m3 3a3 3 0 003-3m-3 3V11.25m2.25 4.5A3.375 3.375 0 0112 15a3.375 3.375 0 01-2.25-3M15 11.25a3 3 0 01-6 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconGoogle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.254-3.138C18.189 1.186 15.479 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.824 0 11.808-4.735 11.808-11.956 0-.818-.073-1.415-.195-1.999H12.24z"/>
  </svg>
);
export const IconFacebook: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
export const IconInstagram: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.094.268 2.827.564.761.309 1.369.701 1.981 1.312.612.612 1.004 1.22 1.313 1.982.296.732.508 1.568.564 2.826.058 1.267.07 1.647.07 4.851s-.012 3.583-.07 4.85c-.056 1.258-.268 2.094-.564 2.827-.309.761-.701 1.369-1.313 1.981-.612.612-1.22 1.004-1.982 1.313-.732-.296-1.568.508-2.826.564-1.267.058-1.647.07-4.851.07s-3.583-.012-4.85-.07c-1.258-.056-2.094-.268-2.827-.564-.761-.309-1.369-.701-1.981-1.313-.612-.612-1.004-1.22-1.313-1.982-.296-.732-.508-1.568-.564-2.826-.058-1.267-.07-1.647-.07-4.851s.012-3.583.07-4.85c.056-1.258.268-2.094.564-2.827.309.761.701-1.369 1.313-1.981.612-.612 1.22-1.004 1.982-1.313.732-.296 1.568.508 2.826.564C8.417 2.175 8.796 2.163 12 2.163zm0 1.623c-3.141 0-3.499.011-4.717.067-1.15.053-1.85.244-2.48.497-.655.263-1.11.597-1.612 1.1-.504.503-.837.957-1.1 1.612-.252.63-.444 1.33-.497 2.48C2.535 8.501 2.524 8.86 2.524 12s.011 3.499.067 4.717c.053 1.15.244 1.85.497 2.48.263.655.597 1.11.913 1.426.316.316.67.65 1.1 1.612.63.252 1.33.444 2.48.497 1.218.056 1.576.067 4.717.067 3.141 0 3.499-.011 4.717-.067 1.15-.053 1.85-.244 2.48-.497.655-.263 1.11-.597 1.612-1.1.504-.503.837-.957 1.1-1.612.252-.63-.444-1.33.497-2.48.056-1.218.067-1.576.067-4.717s-.011-3.499-.067-4.717c-.053-1.15-.244-1.85-.497-2.48-.263-.655-.597-1.11-1.1-1.612-.503-.504-.957-.837-1.612-1.1-.63-.252-1.33-.444-2.48-.497C15.499 3.797 15.141 3.786 12 3.786zm0 2.88c-2.884 0-5.208 2.324-5.208 5.208s2.324 5.208 5.208 5.208 5.208-2.324 5.208-5.208S14.884 6.666 12 6.666zm0 8.791c-1.979 0-3.583-1.604-3.583-3.583S10.021 8.292 12 8.292s3.583 1.604 3.583 3.583-1.604 3.583-3.583 3.583zm4.908-8.913a1.208 1.208 0 11-2.416 0 1.208 1.208 0 012.416 0z" />
  </svg>
);

export const IconYoutube: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

export const IconTiktok: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 0 .14.02.2.04.07.02.13.05.19.09.12.08.21.21.26.34.05.14.06.29.06.44v6.86c0 .1-.01.2-.04.28-.03.09-.07.17-.12.24-.1.12-.22.21-.36.26-.14.05-.29.06-.44.06-1.31.02-2.61.01-3.91.02-.23 0-.44-.08-.62-.22-.17-.14-.26-.33-.26-.54V.56c0-.11.02-.21.05-.3.04-.09.1-.17.18-.23.16-.13.36-.2.57-.2zM12.21 15.11c-1.3.01-2.6.02-3.9.01-.15 0-.29-.02-.43-.06-.13-.04-.26-.11-.37-.19-.12-.09-.22-.2-.29-.32-.07-.13-.1-.26-.1-.4v-4.62c0-.1.01-.2.03-.3.02-.09.06-.18.1-.25.09-.13.2-.24.33-.31.13-.07.27-.1.41-.1.38.01.76.01 1.15.01.11 0 .22.02.31.06.1.04.18.1.25.18s.13.18.17.28c.04.1.06.21.06.32v1.9c.09-.09.18-.18.27-.27.99-1.01 2.24-1.55 3.65-1.51 1.39.04 2.65.55 3.57 1.49.92.94 1.43 2.2 1.4 3.58.03 1.39-.48 2.65-1.42 3.58-.93.94-2.19 1.45-3.57 1.42-1.41-.03-2.66-.58-3.65-1.59-.09-.09-.18-.18-.27-.27v1.89c0 .11-.02.21-.05.3-.04.09-.1.17-.18.24-.16.13-.36.2-.57.2h-.59z"/>
    </svg>
);
export const IconWhatsapp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2.01C6.58 2.01 2.13 6.46 2.13 11.92c0 1.77.46 3.48 1.34 4.94l-1.44 5.25 5.36-1.42c1.4.78 2.96 1.21 4.59 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zM17.17 14.8c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.89 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.24-1.38-1.06-.94-1.78-2.1-2-2.46-.22-.36-.01-.55.12-.68.12-.12.28-.32.41-.48.14-.16.19-.28.28-.47.1-.19.05-.36-.02-.5-  .07-.14-.64-1.53-.87-2.1-.23-.57-.47-.49-.64-.49-.17 0-.36-.02-.55-.02-.19 0-.49.07-.74.35-.25.28-.97.95-.97 2.31 0 1.36 1 2.68 1.14 2.87.14.19 1.97 3.01 4.79 4.22 2.82 1.2 2.82.8 3.34.76.52-.04 1.66-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z"/>
    </svg>
);

export const IconShare: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.05.588.08a2.25 2.25 0 011.834 1.834c.03.198.055.393.08.588m0 0a2.25 2.25 0 102.186 0m-2.186 0A2.25 2.25 0 005.625 12a2.25 2.25 0 00-2.186-2.186m0 0a2.25 2.25 0 100-2.186m0 2.186c-.195-.025-.39-.05-.588-.08a2.25 2.25 0 01-1.834-1.834c-.03-.198-.055-.393-.08-.588m0 0a2.25 2.25 0 10-2.186 0m2.186 0A2.25 2.25 0 007.875 12a2.25 2.25 0 002.186 2.186m0 0a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.05.588.08a2.25 2.25 0 011.834 1.834c.03.198.055.393.08.588m0 0a2.25 2.25 0 102.186 0m-2.186 0A2.25 2.25 0 005.625 12a2.25 2.25 0 00-2.186-2.186" />
  </svg>
);


export const IconCompass: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M3.75 12H6m12 0h-2.25M5.636 5.636l1.768 1.768m9.9 9.9l1.767 1.768m0-13.434l-1.768 1.768m-9.9 9.9l-1.767 1.768" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-3-6 3-1.5 3 1.5-3 6z" />
  </svg>
);

export const IconCityOutline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 21V8.25A2.25 2.25 0 016.75 6h2.5a2.25 2.25 0 012.25 2.25V21M9 21V12.75A2.25 2.25 0 0111.25 10.5h1.5A2.25 2.25 0 0115 12.75V21M15.75 21V5.25A2.25 2.25 0 0118 3h.75a2.25 2.25 0 012.25 2.25V21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75h.008v.008H7.5v-.008zm4.5 0h.008v.008h-.008v-.008zm3-4.5h.008v.008h-.008V8.25zm0 9h.008v.008h-.008v-.008zM18.75 9h.008v.008h-.008V9z"/>
  </svg>
);

export const IconEnvelope: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const IconLockClosed: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const IconQuestionMarkCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const IconExclamationTriangle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconCreditCard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" />
  </svg>
);

export const IconSun: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const IconMoon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const IconLanguage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.122 7.5 15 7.5h6M9 5.25c-1.12 0-2.233-.038-3.334-.114M6 5.25V3m3.334 2.364C8.82 7.061 7.878 7.5 7 7.5H3m9 12l-3-3m0 0l-3 3m3-3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const IconTrash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const IconPrinter: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.061A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.279A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
);

export const IconShieldCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.75c-2.156 0-4.24.6-5.942 1.656z" />
  </svg>
);

export const IconFilter: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

export const IconSortAscending: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
  </svg>
);

export const IconBike: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
    </svg>
);
export const IconScooter: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 6h6.9l-3.9-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm12 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    </svg>
);

export const IconGPay = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 51.9 20.2" fill="currentColor"><path d="M4.6 15.6c0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4v-5.2H5.6v-2h6.1v7.2c0 2.4-1.9 4.4-4.4 4.4s-4.4-2-4.4-4.4v-1.8h2.3v1.8z" /><path d="M16 11.9h-2.3V9.6h2.3c1.3 0 2.3 1.1 2.3 2.3s-1 2.4-2.3 2.4zM16 7.6h-2.3V5.3h2.3c2.4 0 4.3 2 4.3 4.4s-1.9 4.3-4.3 4.3h-2.3v-2.3H16c1.3 0 2.3-1 2.3-2.3s-1.1-2.2-2.3-2.2z" /><path d="M33.8 11.2V9h-3.3v8h2.3v-4.1h1c1.3 0 2.4-1.1 2.4-2.4.1-1.3-1-2.3-2.4-2.3zM25.6 9h3.8v2.3h-3.8z" /><path d="M48.2 9.1h-4.3l-2.4 8.7h2.4l.4-1.7h3.1l.2 1.7h2.3l-2.4-8.7zm-2.1 5.3l.9-3.3.9 3.3h-1.8z" /><path d="M38.8 9.1v8.8h2.3V9.1z" /></svg>
);
export const IconKhalti = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 200 64" fill="currentColor"><path d="M165.7 32.7l-4.5-5V49h-3.9v-8.4l-4.5 5v-3.7l4.5-5-4.5-5V28h3.9v8.4l4.5-5v3.7l-4.5 5 4.5 5zM128.5 28.1v20.9h-3.9V28.1zM111.9 38.6c.1-4.7 3.3-8 8.1-8s8.1 3.3 8.1 8-3.4 8.1-8.1 8.1-8-3.4-8.1-8.1zm4.1 0c0 2.6 1.4 4.3 4.1 4.3s4.1-1.8 4.1-4.3-1.5-4.3-4.1-4.3-4.1 1.7-4.1 4.3zM92.2 49h-3.9V28.1h3.9v9.6l6.8-9.6h4.5l-6.8 9.6 7.4 11.3h-4.6zM82.8 38.6c0 4.8-3.4 8.1-8.1 8.1-4.8 0-8-3.3-8-8.1s3.2-8 8-8c4.8.1 8.1 3.3 8.1 8zm-4.1 0c0-2.6-1.5-4.3-4.1-4.3-2.5 0-4 1.7-4 4.3s1.5 4.3 4 4.3c2.6 0 4.1-1.7 4.1-4.3zM46.7 46.7h11.9v-3.7H50.5V28.1h-3.9v18.6zM32.8 49V28.1h10v3.7h-6.1v4.3h5.5v3.7h-5.5v5.5h6.3V49zM16.9 38.6c0 4.8-3.4 8.1-8.1 8.1-4.8 0-8-3.3-8-8.1s3.2-8 8-8c4.8.1 8.1 3.3 8.1 8zm-4.1 0c0-2.6-1.5-4.3-4.1-4.3-2.5 0-4 1.7-4 4.3s1.5 4.3 4 4.3c2.6 0 4.1-1.7 4.1-4.3zM181.9 28.1h3.9v17.2h6.8v3.7h-10.7z" /></svg>
);
export const IconEsewa = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 30" fill="currentColor"><path d="M83.4 20.4l-2-2.3v5.8h-1.8v-3.8l-2 2.3v-1.7l2-2.3-2-2.3V17h1.8v3.8l2-2.3v1.7l-2 2.3 2 2.3zM57.6 12.8v9.4h-1.8v-9.4zM42.1 17.2c.1-2.1 1.5-3.6 3.6-3.6s3.6 1.5 3.6 3.6-1.5 3.6-3.6 3.6-3.6-1.5-3.6-3.6zm1.8 0c0 1.2.6 1.9 1.8 1.9s1.8-.8 1.8-1.9-.7-1.9-1.8-1.9-1.8.8-1.8 1.9zM25.1 22.2h-1.8V12.8h1.8v4.3l3-4.3h2l-3 4.3 3.3 5h-2.1zM17.3 17.2c0 2.1-1.5 3.6-3.6 3.6s-3.6-1.5-3.6-3.6 1.5-3.6 3.6-3.6 3.6 1.5 3.6 3.6zm-1.8 0c0-1.2-.7-1.9-1.8-1.9s-1.8.8-1.8 1.9.7 1.9 1.8 1.9 1.8-.8 1.8-1.9z" /></svg>
);
export const IconVisa = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 48 16" fill="currentColor"><path d="M38.8.2L34.3 15.8h-5.2l4.5-15.6zM28.1.2L21.4 11l-1.1-7.1c-.2-1.3-1.1-2.7-2.7-2.7H9c-1.8 0-2.8 1-3.2 2.1L.2 15.8h5.4l2.1-5.7h3.8l-1.3 5.7h5.2l8-15.6z" /><path d="M48 9.3c0-.9-.2-1.6-.5-2.2-.4-.6-1-1.1-1.9-1.5-.9-.3-2.1-.5-3.6-.5-1.9 0-3.3.4-4.3 1.1-.9.7-1.4 1.7-1.4 2.9 0 1 .3 1.9.9 2.5.6.6 1.7 1 3.2 1.3l.3.1c.9.2 1.5.4 1.8.6.3.2.4.5.4.8 0 .6-.4 1-1.3 1-.8 0-1.4-.2-1.7-.3l-.3-.2-.5 2.7c.4.2 1.2.4 2.2.4 2.1 0 3.4-.9 3.4-2.8 0-.9-.3-1.6-.8-2.1-.5-.5-1.4-.9-2.7-1.2l-.6-.2c-.6-.2-1-.4-1.1-.6-.2-.2-.3-.5-.3-.8 0-.4.3-.7.9-.7.5 0 .9.1 1.1.2l.2.1.4-2.4z" /></svg>
);
export const IconMastercard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 48 30" fill="currentColor"><path fill="#FF5F00" d="M18.8 30c8.3 0 15-6.7 15-15S27.1 0 18.8 0 3.8 6.7 3.8 15s6.7 15 15 15z" /><path fill="#EB001B" d="M34.3 15c0-8.3-6.7-15-15-15-1.4 0-2.8.2-4.1.6 5.8 1.4 10.3 6.2 11.2 11.8.8 5.6-1.5 10.9-5.5 14.2 1.7.5 3.6.8 5.5.8 8.3-.1 15-6.8 15-15.1z" /></svg>
);
export const IconQrcode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15.375a1.125 1.125 0 011.125-1.125h4.5a1.125 1.125 0 011.125 1.125v4.5a1.125 1.125 0 01-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
    </svg>
);
export const IconMicrophone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V18.75m0 0H9.75m2.25 0h2.25M12 12.75a3 3 0 01-3-3V6a3 3 0 016 0v3.75a3 3 0 01-3 3z" />
    </svg>
);

export const IconWandSparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l1.25-2.188-2.188-1.25a2.25 2.25 0 00-1.7-1.7L13.313 3.75 12 5.25l1.313 2.25a2.25 2.25 0 001.7 1.7L17.5 12l-2.188 1.25a2.25 2.25 0 00-1.7 1.7L12 18.75l1.313-2.25a2.25 2.25 0 001.7-1.7L17.5 12z" />
  </svg>
);

export const IconChatBubbleOvalLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.184a1.125 1.125 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
);
export const IconClipboardList: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


// Mapping from BookingCategorySlug to Icon Component
export const CATEGORY_ICONS: { [key in BookingCategorySlug]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  [BookingCategorySlug.Hotels]: IconBed,
  [BookingCategorySlug.Flights]: IconPlane,
  [BookingCategorySlug.Adventures]: IconMountain,
  [BookingCategorySlug.RealEstate]: IconHome,
  [BookingCategorySlug.RidesAndRentals]: IconCar,
  [BookingCategorySlug.EventSpaces]: IconBuildingStorefront,
  [BookingCategorySlug.Hospitals]: IconStethoscope,
  [BookingCategorySlug.WeddingsEvents]: IconHeart,
  [BookingCategorySlug.Restaurants]: IconBuildingRestaurant,
};

export const PROPERTY_TYPE_ICONS: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  apartment: IconHomeModern,
  resort: IconSun,
  villa: IconBuildingOffice,
  guesthouse: IconKey,
  hotel: IconBed,
  'b&b': IconHome,
};