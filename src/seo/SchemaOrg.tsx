import { Helmet } from 'react-helmet-async';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FinancialService',
      '@id': 'https://www.broussardfinancialservices.com/#business',
      name: 'Broussard Financial Services',
      description:
        'Retirement planning, tax reduction, and wealth protection for business owners, federal employees, and high net worth individuals in San Diego.',
      url: 'https://www.broussardfinancialservices.com',
      telephone: '+16195810010',
      priceRange: 'Free initial consultation',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1420 Kettner Blvd, Suite 100',
        addressLocality: 'San Diego',
        addressRegion: 'CA',
        postalCode: '92101',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.7225,
        longitude: -117.1725,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      founder: {
        '@type': 'Person',
        name: 'Rene Broussard',
        jobTitle: 'Accredited Investment Fiduciary (AIF®)',
      },
      areaServed: {
        '@type': 'City',
        name: 'San Diego',
        containedInPlace: { '@type': 'State', name: 'California' },
      },
      serviceType: [
        'Retirement Income Planning',
        'Tax Planning',
        'Social Security Planning',
        'TSP Education',
        'Legacy Planning',
        'Long-Term Care Insurance',
        'Federal Benefits Analysis',
        'Lifetime Income Planning',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.broussardfinancialservices.com/#website',
      url: 'https://www.broussardfinancialservices.com',
      name: 'Broussard Financial Services',
      description:
        'Retirement planning and tax reduction for business owners, federal employees, and high net worth individuals in San Diego, CA.',
    },
    {
      '@type': 'Person',
      '@id': 'https://www.broussardfinancialservices.com/#rene-broussard',
      name: 'Rene Broussard',
      jobTitle: 'Accredited Investment Fiduciary® · Federal Retirement Consultant',
      image: 'https://www.broussardfinancialservices.com/images/team/rene.jpg',
      worksFor: { '@id': 'https://www.broussardfinancialservices.com/#business' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.broussardfinancialservices.com/#stony-burks',
      name: 'Stony Burks',
      jobTitle: 'Federal Retirement Consultant · Retirement Income Planning Specialist',
      image: 'https://www.broussardfinancialservices.com/images/team/stony.jpg',
      worksFor: { '@id': 'https://www.broussardfinancialservices.com/#business' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.broussardfinancialservices.com/#jerry-watkins',
      name: 'Jerry Watkins',
      jobTitle: 'Retirement Income Planning Specialist',
      image: 'https://www.broussardfinancialservices.com/images/team/jerry.jpg',
      worksFor: { '@id': 'https://www.broussardfinancialservices.com/#business' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.broussardfinancialservices.com/#anthony-garza',
      name: 'Anthony Garza',
      jobTitle: 'Client Relations Specialist',
      image: 'https://www.broussardfinancialservices.com/images/team/anthony.jpg',
      worksFor: { '@id': 'https://www.broussardfinancialservices.com/#business' },
    },
  ],
};

export default function SchemaOrg() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
