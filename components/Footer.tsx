
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, IconLogo, IconFacebook, IconInstagram, IconYoutube, IconTiktok, IconWhatsapp } from '../constants';
import { bookingCategoriesData } from '../data/mockData';

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode; }) => (
  <li>
    <Link to={to} className="text-sm text-neutral-light/70 hover:text-accent transition-colors duration-150">
      {children}
    </Link>
  </li>
);

interface SocialIconLinkProps {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const SocialIconLink = ({ href, icon: Icon, label }: SocialIconLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={`Follow ${APP_NAME} on ${label}`}
    className="text-neutral-light/60 hover:text-accent transition-colors duration-150"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-neutral-light/80 pt-16 pb-8 mt-12 md:mt-16 border-t border-neutral-light/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          
          {/* Column 1: Discover */}
          <div className="col-span-1">
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">Discover</h5>
            <ul className="space-y-2">
              <FooterLink to="/info/partner-offers">Partners offers</FooterLink>
              <FooterLink to="/info/travel-articles">Guides</FooterLink>
              <FooterLink to="/listings/hotels?stayType=monthly">Discover monthly stays</FooterLink>
              <FooterLink to="/listings/hotels?isUniqueStay=true">Unique places to stay</FooterLink>
            </ul>
          </div>
          
          {/* Column 2: Accommodations */}
          <div className="col-span-1">
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">Accommodations</h5>
            <ul className="space-y-2">
              <FooterLink to="/listings/hotels">Hotels</FooterLink>
              <FooterLink to="/listings/hotels?propertyType=resort">Resorts</FooterLink>
              <FooterLink to="/listings/hotels?propertyType=villa">Villas</FooterLink>
              <FooterLink to="/listings/hotels?propertyType=apartment">Apartments</FooterLink>
              <FooterLink to="/listings/hotels?propertyType=b&b">B&Bs</FooterLink>
              <FooterLink to="/listings/hotels?propertyType=guesthouse">Guest houses</FooterLink>
            </ul>
          </div>
          
          {/* Column 3: Explore */}
          <div className="col-span-1">
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">Explore</h5>
            <ul className="space-y-2">
              {bookingCategoriesData.map(cat => (
                <FooterLink key={cat.slug} to={`/listings/${cat.slug}`}>{cat.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 4: For Partners */}
          <div className="col-span-1">
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">For Partners</h5>
            <ul className="space-y-2">
              <FooterLink to="/login">Extranet login</FooterLink>
              <FooterLink to="/info/partner-help">Partner help</FooterLink>
              <FooterLink to="/support">Become an affiliate</FooterLink>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="col-span-1">
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">Company</h5>
            <ul className="space-y-2">
              <FooterLink to="/info/about">About {APP_NAME}</FooterLink>
              <FooterLink to="/info/careers">Careers</FooterLink>
              <FooterLink to="/info/sustainability">Sustainability</FooterLink>
              <FooterLink to="/info/press-centre">Press centre</FooterLink>
              <FooterLink to="/info/investor-relations">Investor relations</FooterLink>
            </ul>
          </div>

          {/* Column 6: Support */}
          <div className="col-span-1">
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">Support</h5>
            <ul className="space-y-2">
              <FooterLink to="/support">Contact Customer Service</FooterLink>
              <FooterLink to="/info/feedback">Feedback</FooterLink>
              <FooterLink to="/history">Search History</FooterLink>
              <FooterLink to="/info/privacy">Privacy & cookies</FooterLink>
              <FooterLink to="/info/terms">Terms & conditions</FooterLink>
              <FooterLink to="/info/security">Security & Trust</FooterLink>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-neutral-light/20 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <IconLogo className="w-6 h-6 text-accent" />
                <span className="text-xl font-bold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-xs text-neutral-light/60">&copy; 2025 bookin.com. All rights reserved. Developed by Sumit Kushwaha, Maintained by: Sumit Kushwaha</p>
          </div>
          <div className="flex justify-center space-x-5">
            <SocialIconLink href="#" icon={IconYoutube} label="YouTube" />
            <SocialIconLink href="#" icon={IconTiktok} label="TikTok" />
            <SocialIconLink href="#" icon={IconInstagram} label="Instagram" />
            <SocialIconLink href="#" icon={IconFacebook} label="Facebook" />
            <SocialIconLink href="#" icon={IconWhatsapp} label="WhatsApp" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
