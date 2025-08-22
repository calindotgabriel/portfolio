export const projects = [
	{
		id: 'immobile-search',
		title: 'Property Search Engine',
		shortDescription:
			'Scalable real estate search platform with geolocation filtering',
		fullDescription: `
        Developed a comprehensive real estate search platform featuring advanced geolocation filtering 
        and multi-tenant authentication. Built with modern React architecture and AWS infrastructure 
        for optimal performance and scalability.
      `,
		tech: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
		status: 'LIVE',
		github: 'https://github.com/calindotgabriel/immobile-search',
		results: [
			'Multi-tenant architecture',
			'Role-based dashboards',
			'20% higher user engagement',
		],
		images: ['/projects/immobile-1.jpg', '/projects/immobile-2.jpg'],
		features: [
			'Advanced geolocation search',
			'Multi-role authentication (agents, buyers, landlords)',
			'Real-time property updates',
			'Interactive map integration',
			'Mobile-responsive design',
		],
	},
	{
		id: 'rwe-energy',
		title: 'RWE Energy Platform',
		shortDescription:
			'Migrated legacy Java monolith to Node.js microservices',
		fullDescription: `
        Led the migration of a legacy Java monolith to modern Node.js microservices 
        for Germany's largest energy company. Implemented high-performance data 
        filtering with parallel processing capabilities.
      `,
		tech: ['NestJS', 'MongoDB', 'Docker', 'Microservices'],
		status: 'ENTERPRISE',
		github: 'https://github.com/calindotgabriel/energy-reporter',
		results: [
			'65% faster APIs',
			'45min → 12min exports',
			'15,000+ daily queries',
		],
	},
];
