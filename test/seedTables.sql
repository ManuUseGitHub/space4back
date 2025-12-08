INSERT INTO public.sector (name, description, comment) VALUES
('Primary sector',
 'Companies that extract or exploit natural resources.',
 'Includes industries such as agriculture, fishing, forestry, mining, and quarrying.'),

('Secondary sector',
 'Companies focused on transforming raw materials into manufactured goods.',
 'Includes industries such as automotive manufacturing, construction, energy production, textiles, and food processing.'),

('Tertiary sector',
 'Sector focused on providing services and intangible goods to consumers and businesses.',
 'Includes industries such as retail, banking, insurance, education, healthcare, tourism, transportation, and public administration.'),

('Quaternary sector',
 'Extension of the tertiary sector encompassing knowledge-based and intellectual services.',
 'Includes industries such as research and development, information technology, consulting, and media.'),

('Quinary sector',
 'Sector providing services by the highest levels of social, educational, and governmental organizations.',
 'Includes professions such as senior government officials, educational leaders, and scientific directors.'),

('NACE (EU) classification',
 'European standard classification system (Nomenclature of Economic Activities in the European Community).',
 'Subdivides the economy into 21 sections, from A (Agriculture, forestry, and fishing) to U (Activities of extraterritorial organizations and bodies).');

INSERT INTO public.profession (name, description, "sectorId") VALUES
-- === Agriculture & Farming ===
('Farmer', 'Cultivates crops and/or raises livestock for food and raw materials.', 1),
('Agricultural Technician', 'Assists with farm management, soil analysis, and crop optimization.', 1),
('Livestock Breeder', 'Breeds and cares for animals for meat, dairy, or textile production.', 1),
('Horticulturist', 'Specializes in growing fruits, vegetables, flowers, and ornamental plants.', 1),
('Viticulturist', 'Manages vineyards and grape production for wine making.', 1),
('Agricultural Equipment Operator', 'Operates tractors and machinery used in planting and harvesting.', 1),

-- === Fishing & Aquaculture ===
('Fisherman', 'Catches fish and seafood from natural water sources.', 1),
('Aquaculture Specialist', 'Manages fish farms and aquatic species cultivation.', 1),
('Marine Biologist', 'Studies ocean life and ecosystems to support sustainable fishing.', 1),
('Fish Processing Worker', 'Handles, cleans, and packages fish for distribution.', 1),

-- === Forestry & Logging ===
('Forestry Technician', 'Monitors forest health and manages timber production.', 1),
('Logger', 'Fells and transports trees for timber and wood processing.', 1),
('Forest Ranger', 'Protects natural parks and monitors environmental conservation.', 1),
('Arborist', 'Specializes in tree care, pruning, and maintenance in natural or urban areas.', 1),

-- === Mining & Extraction ===
('Miner', 'Extracts minerals, ores, or coal from underground or surface mines.', 1),
('Mining / Drilling Operator', 'Operates drilling machinery for mining or oil extraction.', 1),
('Geologist', 'Analyzes rock formations and natural resources for mining operations.', 1),
('Mining Engineer', 'Plans and oversees the extraction of natural resources safely and efficiently.', 1),
('Quarry Worker', 'Extracts and processes stone, sand, or gravel from open pits.', 1),

-- === Environmental & Resource Management ===
('Environmental Technician', 'Monitors environmental conditions and resource usage.', 1),
('Soil Scientist', 'Studies soil composition to improve agricultural yield and sustainability.', 1),
('Agricultural Economist', 'Analyzes agricultural markets, pricing, and rural development policies.', 1),

-- === Manufacturing & Production ===
('Factory Worker', 'Operates machinery and performs manual tasks in manufacturing processes.', 2),
('Production Supervisor', 'Oversees manufacturing lines and ensures product quality and efficiency.', 2),
('Industrial Engineer', 'Optimizes production systems for efficiency, cost, and safety.', 2),
('Mechanical Engineer', 'Designs and develops mechanical systems, machines, and tools.', 2),
('Electrical Engineer', 'Designs and maintains electrical systems and components for production.', 2),
('Maintenance Technician', 'Maintains and repairs industrial machinery and mechanical equipment.', 2),
('Quality Assurance Inspector', 'Inspects products to ensure they meet required specifications.', 2),
('Assembly Line Operator', 'Assembles parts and components in manufacturing environments.', 2),
('Packaging Operator', 'Packages finished goods for distribution and sale.', 2),

-- === Construction & Civil Engineering ===
('Construction Worker', 'Builds and maintains structures such as buildings, roads, and bridges.', 2),
('Civil Engineer', 'Designs and supervises infrastructure projects like roads, bridges, and dams.', 2),
('Architect', 'Designs buildings and structures for function, safety, and aesthetics.', 2),
('Site Manager', 'Coordinates workers and resources at construction sites.', 2),
('Carpenter', 'Constructs and installs frameworks, furniture, and wooden structures.', 2),
('Electrician', 'Installs and maintains electrical systems in buildings or industrial settings.', 2),
('Plumber', 'Installs and repairs water and gas piping systems.', 2),
('Welder', 'Joins and repairs metal parts using various welding techniques.', 2),
('Mason', 'Builds and repairs walls and structures using stone, brick, or concrete.', 2),

-- === Energy & Utilities ===
('Power Plant Operator', 'Controls machinery that generates electric power.', 2),
('Renewable Energy Technician', 'Installs and maintains solar panels, wind turbines, and other green energy systems.', 2),
('Energy Engineer', 'Develops systems for efficient energy production and use.', 2),
('Chemical Engineer', 'Designs processes for manufacturing chemicals, fuels, and materials.', 2),
('Petroleum Engineer', 'Designs and oversees extraction of oil and gas resources.', 2),

-- === Transportation Equipment & Industrial Design ===
('Automotive Engineer', 'Designs and tests vehicles and automotive systems.', 2),
('Aircraft Technician', 'Maintains and repairs aircraft mechanical and electronic systems.', 2),
('Industrial Designer', 'Creates concepts and designs for manufactured products.', 2),
('Textile Technician', 'Develops and tests fabrics and materials for production.', 2),
('Textile Designer', 'Creates and develops fabrics and textile patterns for manufacturing.', 2),
('Food Processing Technician', 'Supervises and optimizes production in food manufacturing plants.', 2),
('Food Production Operator', 'Processes and packages food products in industrial settings.', 2),

-- === Commerce & Retail ===
('Retail Manager', 'Oversees retail store operations, manages staff, and ensures customer satisfaction.', 3),
('Sales Representative', 'Sells products or services directly to customers or businesses.', 3),
('Customer Service Agent', 'Assists customers, handles inquiries, and resolves product or service issues.', 3),
('E-commerce Specialist', 'Manages online sales platforms, listings, and digital customer experiences.', 3),

-- === Finance & Insurance ===
('Banking Advisor', 'Provides financial and investment advice to clients.', 3),
('Accountant', 'Manages financial records, ensures compliance, and prepares statements.', 3),
('Financial Analyst', 'Analyzes market trends and company data to support business decisions.', 3),
('Insurance Broker', 'Assesses client needs and recommends suitable insurance coverage.', 3),

-- === Education & Training ===
('Teacher', 'Educates students in schools or academic institutions.', 3),
('Tutor', 'Provides one-on-one or small group academic support.', 3),
('Corporate Trainer', 'Delivers training sessions to employees to improve job performance.', 3),
('School Administrator', 'Oversees educational programs and manages school operations.', 3),

-- === Healthcare & Social Services ===
('Nurse', 'Provides patient care under the supervision of physicians.', 3),
('Physician', 'Diagnoses and treats medical conditions in clinical or hospital settings.', 3),
('Pharmacist', 'Prepares and dispenses medications and advises on their safe use.', 3),
('Social Worker', 'Supports individuals and families in coping with social and emotional challenges.', 3),
('Physical Therapist', 'Helps patients recover physical function through rehabilitation exercises.', 3),

-- === Tourism, Hospitality & Transportation ===
('Travel Agent', 'Organizes travel itineraries, bookings, and vacation packages.', 3),
('Hotel Manager', 'Manages daily hotel operations, staff, and guest services.', 3),
('Tour Guide', 'Leads and educates groups during sightseeing tours and excursions.', 3),
('Flight Attendant', 'Ensures passenger safety and comfort during air travel.', 3),
('Chef', 'Prepares and designs menus for restaurants or catering businesses.', 3),
('Restaurant Manager', 'Oversees restaurant staff, operations, and customer satisfaction.', 3),
('Taxi Driver', 'Provides local transportation services for passengers.', 3),

-- === Public Administration & Services ===
('Administrative Assistant', 'Performs clerical and organizational support duties in offices.', 3),
('Public Relations Specialist', 'Manages communication between organizations and the public.', 3),
('Human Resources Specialist', 'Recruits employees and manages workplace relations.', 3),
('Government Clerk', 'Performs administrative duties in public sector institutions.', 3),
('Police Officer', 'Maintains law and order, ensures public safety, and enforces laws.', 3),
('Firefighter', 'Responds to emergencies and protects lives and property from fire and hazards.', 3),

-- === Data, Knowledge & Analysis ===
('Data Engineer / Scientist', 'Analyzes large datasets to extract insights and drive decisions.', 4),
('Software Developer', 'Designs, develops, and maintains computer applications and systems.', 4),
('Consultant', 'Provides expert advice to organizations on strategy or operations.', 4),
('Research Analyst', 'Conducts scientific or market research and analyzes findings.', 4),
('Software Developer', 'Designs, builds, and maintains software applications and systems.', 4),
('Frontend Developer', 'Specializes in user interfaces using technologies like HTML, CSS, and JavaScript frameworks.', 4),
('Backend Developer', 'Focuses on server-side logic, databases, and API development.', 4),
('Full Stack Developer', 'Works on both client and server-side components of web applications.', 4),
('DevOps Engineer', 'Automates deployment pipelines and manages cloud infrastructure.', 4),
('Data Scientist', 'Analyzes structured and unstructured data to extract insights and build predictive models.', 4),
('Machine Learning Engineer', 'Develops algorithms and models that enable computers to learn from data.', 4),
('AI Researcher', 'Conducts research in artificial intelligence and develops new machine learning techniques.', 4),
('Cybersecurity Analyst', 'Protects computer systems and networks from security breaches and attacks.', 4),
('Cloud Architect', 'Designs and manages scalable cloud-based infrastructures and services.', 4),
('IT Project Manager', 'Plans, executes, and oversees technology-related projects.', 4),
('Database Administrator', 'Manages and optimizes databases ensuring performance and data integrity.', 4),
('Systems Analyst', 'Analyzes IT systems and proposes improvements for business efficiency.', 4),
('Network Engineer', 'Designs, implements, and maintains computer networks and connectivity.', 4),
('UI/UX Designer', 'Designs user interfaces and experiences to improve usability and satisfaction.', 4),
('QA Engineer', 'Develops and runs tests to ensure software quality and reliability.', 4),
('Technical Writer', 'Creates documentation and guides for software and hardware products.', 4),
('IT Consultant', 'Advises organizations on IT strategies, implementations, and solutions.', 4),
('Game Developer', 'Designs and develops interactive digital games for various platforms.', 4),
('AR/VR Developer', 'Builds immersive applications using augmented and virtual reality technologies.', 4),
('Knowledge Manager', 'Organizes and optimizes information sharing within organizations.', 4),
('Data Visualization Specialist', 'Creates visual tools and dashboards to interpret complex datasets.', 4),
('Analyst', 'Designs the structure and flow of information within digital systems.', 4),

-- === Research & Development ===
('Research Scientist', 'Conducts scientific experiments and studies to develop new knowledge or technologies.', 4),
('Laboratory Technician', 'Performs laboratory tests and assists in experimental research activities.', 4),
('Biotechnologist', 'Applies biological systems and organisms to develop new products and solutions.', 4),
('Materials Scientist', 'Researches and develops new materials with specialized physical and chemical properties.', 4),
('Innovation Manager', 'Leads innovation programs and manages R&D portfolios within organizations.', 4),

-- === Consulting & Strategy ===
('Strategy Consultant', 'Advises businesses on long-term planning and competitive advantage.', 4),
('Business Intelligence Analyst', 'Analyzes organizational data to support strategic decision-making.', 4),
('Change Management Specialist', 'Guides organizations through digital and structural transformation processes.', 4),
('Innovation Consultant', 'Advises companies on innovation, technology transfer, and emerging trends.', 4),
('Market Intelligence Analyst', 'Monitors market trends and competitors to inform business strategy.', 4),

-- === Media, Communication & Creative ===
('Content Strategist', 'Plans and manages digital content strategies across media platforms.', 4),
('Digital Marketing Analyst', 'Uses analytics to optimize online campaigns and brand visibility.', 4),
('UX Researcher', 'Studies user behavior to inform design and usability improvements.', 4),
('Graphic Designer', 'Creates visual content and branding materials for print and digital media.', 4),
('Video Producer', 'Plans, films, and edits multimedia content for communication and education.', 4),

-- === Education & Intellectual Services ===
('Instructional Designer', 'Develops educational programs and digital learning experiences.', 4),
('Corporate Trainer', 'Delivers professional training programs within organizations.', 4),
('E-Learning Developer', 'Creates online courses and interactive training modules.', 4),
('Technical Writer', 'Produces technical documentation and knowledge base materials.', 4),
('Translator / Localization Specialist', 'Adapts written content for linguistic and cultural contexts.', 4),

-- === Government & Public Leadership ===
('Government Minister', 'Leads national departments and develops public policies and legislation.', 5),
('Mayor', 'Oversees local government administration and community development.', 5),
('Ambassador', 'Represents a country’s interests in foreign nations or international organizations.', 5),
('Policy Director', 'Supervises the creation and implementation of strategic public policies.', 5),
('Public Administration Executive', 'Directs high-level management in government institutions.', 5),

-- === Education & Research Leadership ===
('University Dean', 'Oversees faculties, academic programs, and research initiatives in higher education.', 5),
('School Superintendent', 'Leads and manages multiple schools within an educational district.', 5),
('Chief Research Officer', 'Guides institutional research priorities and resource allocation.', 5),
('Principal Scientist', 'Conducts and directs high-impact scientific research and innovation projects.', 5),
('Academic Provost', 'Manages academic affairs and faculty at a university level.', 5),

-- === Corporate & Strategic Leadership ===
('Chief Executive Officer (CEO)', 'Holds ultimate responsibility for corporate strategy and performance.', 5),
('Chief Operating Officer (COO)', 'Oversees daily company operations and ensures strategic execution.', 5),
('Chief Financial Officer (CFO)', 'Directs financial planning, risk management, and investments.', 5),
('Chief Technology Officer (CTO)', 'Leads technology strategy and innovation within an organization.', 5),
('Chief Human Resources Officer (CHRO)', 'Manages talent strategy, culture, and executive HR policy.', 5),

-- === Global & Non-Profit Organizations ===
('NGO Director', 'Leads non-profit organizations working on humanitarian or environmental missions.', 5),
('International Relations Advisor', 'Advises on diplomatic, trade, or cooperation strategies between nations.', 5),
('Think Tank Director', 'Oversees research and publications in public policy or global strategy.', 5),
('Philanthropy Executive', 'Designs and leads charitable initiatives and grantmaking programs.', 5),

-- === Science, Culture & Innovation Leadership ===
('Scientific Director', 'Supervises laboratories or institutes conducting advanced scientific research.', 5),
('Cultural Institution Director', 'Manages museums, galleries, or heritage organizations.', 5),
('Innovation Strategist', 'Shapes policies and frameworks for innovation ecosystems and R&D partnerships.', 5),
('Educational Policy Advisor', 'Designs and evaluates national education strategies and reforms.', 5),

-- === Economic Analysis & Statistics ===
('Economist', 'Analyzes economic data and trends to inform policies and business decisions.', 6),
('Statistician', 'Collects and interprets data to support research, government, and corporate planning.', 6),
('Data Analyst', 'Interprets structured and unstructured data to uncover insights and patterns.', 6),
('Market Research Analyst', 'Studies market conditions to identify potential sales opportunities and competition.', 6),
('Policy Analyst', 'Evaluates and develops recommendations for economic or social policy.', 6),
('Policy Researcher', 'Analyzes economic data for policy-making aligned with European standards.', 6),

-- === Standards & Classification ===
('Regulatory Affairs Specialist', 'Ensures compliance with national and international economic regulations.', 6),
('Standards Officer', 'Manages classification systems such as NACE or NAICS to maintain economic reporting standards.', 6),
('Compliance Analyst', 'Reviews business operations to ensure adherence to laws and classification standards.', 6),
('Economic Data Curator', 'Maintains and standardizes datasets for economic and industrial sectors.', 6),

-- === Consulting & Advisory ===
('Management Consultant', 'Advises organizations on performance improvement and strategic planning.', 6),
('Business Analyst', 'Evaluates processes and systems to recommend efficiency improvements.', 6),
('Sustainability Consultant', 'Advises on environmental, social, and governance (ESG) compliance.', 6),
('Tax Advisor', 'Provides guidance on taxation law and financial planning for businesses and individuals.', 6),
('Financial Consultant', 'Helps clients manage assets, investments, and financial strategies.', 6),

-- === International & Public Economics ===
('Trade Analyst', 'Monitors international trade flows and market access regulations.', 6),
('Development Economist', 'Researches and advises on economic development policies for emerging economies.', 6),
('Public Policy Consultant', 'Designs policy frameworks for government and international organizations.', 6),
('Labor Economist', 'Analyzes employment trends and wage structures in various industries.', 6),

-- === Research & Data Systems ===
('Data Scientist', 'Builds predictive models and algorithms for economic and business intelligence.', 6),
('Research Associate', 'Conducts empirical studies to support academic or institutional research.', 6),
('Macroeconomic Modeler', 'Develops forecasting models for national and global economic trends.', 6),
('Quantitative Analyst (Quant)', 'Applies mathematical models to finance, risk, and investment strategy.', 6);