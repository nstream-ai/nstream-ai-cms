type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface StructuredDataProps {
  type: 'BlogPosting' | 'WebSite' | 'Organization';
  data: {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    [key: string]: JsonValue | undefined;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 