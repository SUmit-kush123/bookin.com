import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { infoPages } from '../data/infoPages';
import { APP_NAME, IconLogo, IconXCircle } from '../constants';

interface InfoPageLayoutProps {
  pageSlug?: string;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ pageSlug: slugFromProps }) => {
  const { pageSlug: slugFromParams } = useParams<{ pageSlug: string }>();
  const pageSlug = slugFromProps || slugFromParams;

  if (!pageSlug) {
    return (
        <div className="text-center py-20">
          <IconXCircle className="w-16 h-16 text-danger mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-danger mb-2">Content Not Found</h1>
          <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">The page slug was not provided in the URL.</p>
          <Link to="/" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">Go to Homepage</Link>
        </div>
    );
  }

  const pageContent = infoPages[pageSlug];

  if (!pageContent) {
    return (
      <div className="text-center py-20">
        <IconXCircle className="w-16 h-16 text-danger mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-danger mb-2">Content Not Found</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">The page content for "{pageSlug}" could not be found.</p>
        <Link to="/" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">Go to Homepage</Link>
      </div>
    );
  }

  const { title, subtitle, icon: IconComponent, content } = pageContent;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        {IconComponent ? (
          <IconComponent className="w-16 h-16 text-primary dark:text-accent-light mx-auto mb-4" />
        ) : (
          <IconLogo className="w-16 h-16 text-primary dark:text-accent-light mx-auto mb-4" />
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </header>

      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-d-light/50 p-6 md:p-10 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-d-dark">
          {content.map((block, index) => {
            if (block.type === 'h2') {
              return <h2 key={index} className="text-2xl font-bold mt-8">{block.text}</h2>;
            }
            if (block.type === 'p') {
              return <p key={index} dangerouslySetInnerHTML={{ __html: block.text || '' }}></p>;
            }
            if (block.type === 'ul' && block.items) {
              return (
                <ul key={index}>
                  {block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoPageLayout;
