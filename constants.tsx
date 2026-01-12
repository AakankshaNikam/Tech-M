import { QuestionBank, JustificationLevel } from './types';

export const DIMENSIONS = [
  'Vision & Governance',
  'Business Process Maturity',
  'Digital & Automation',
  'Talent Management',
  'Technology & Tools',
  { name: 'Customer Centricity', label: 'Customer Centricity' },
  'Innovation & IP',
  'Ecosystem & Partnerships',
  'Risk & Compliance',
  'Sustainability',
  'Organization Agility',
].map(d => typeof d === 'string' ? d : d.name);

export const VERTICALS = [
  'Manufacturing',
  'BFSI',
  'Healthcare & Life Sciences',
  'Retail & Consumer',
  'TMT',
  'Energy & Utilities',
];

export const DEFAULT_DIMENSION_WEIGHTS: Record<string, number> = {
  'Vision & Governance': 80,
  'Business Process Maturity': 80,
  'Digital & Automation': 80,
  'Talent Management': 60,
  'Technology & Tools': 60,
  'Customer Centricity': 60,
  'Innovation & IP': 60,
  'Ecosystem & Partnerships': 60,
  'Risk & Compliance': 80,
  'Sustainability': 60,
  'Organization Agility': 60,
};

export const VERTICAL_OVERRIDES: Record<string, Record<string, number>> = {
  BFSI: { 'Vision & Governance': 100, 'Risk & Compliance': 100 },
  'Healthcare & Life Sciences': { 'Vision & Governance': 100, 'Risk & Compliance': 100, 'Sustainability': 80 },
  'Energy & Utilities': { 'Vision & Governance': 100, 'Sustainability': 100 },
};

export const VG_JUSTIFICATIONS: JustificationLevel[] = [
  { level: 1, title: 'LEVEL 1 – Ad-hoc, Undefined' },
  { level: 2, title: 'LEVEL 2 – Basic, Partially Formed' },
  { level: 3, title: 'LEVEL 3 – Defined and Documented' },
  { level: 4, title: 'LEVEL 4 – Standardized and Managed' },
  { level: 5, title: 'LEVEL 5 – Strategic, Optimized' }
];

const SHARED_VG_CORE = (verticalKey: string, industryName: string) => [
  { id: `vg-${verticalKey}-core-1`, text: 'How clearly has the GCC defined its long-term strategic vision and role within the enterprise?', weight: 5 },
  { id: `vg-${verticalKey}-core-2`, text: `Does the GCC have a defined governance framework aligned to global ${industryName} strategy and enterprise goals?`, weight: 5 },
  { id: `vg-${verticalKey}-core-3`, text: 'To what extent are business objectives cascaded and tracked down to the GCC and delivery teams?', weight: 4 },
  { id: `vg-${verticalKey}-core-4`, text: 'How frequently does leadership review strategy and performance using defined KPIs?', weight: 4 },
  { id: `vg-${verticalKey}-core-5`, text: 'Is there a formal mechanism to integrate enterprise strategy into GCC roadmaps and investments?', weight: 5 },
  { id: `vg-${verticalKey}-core-6`, text: 'How empowered is the GCC to make decisions / reallocate resources to meet business goals?', weight: 5 },
  { id: `vg-${verticalKey}-core-7`, text: 'Are risk and compliance responsibilities clearly defined across HQ and GCC?', weight: 4 },
  { id: `vg-${verticalKey}-core-8`, text: 'Are stakeholder communications transparent (reports, scorecards, townhalls)?', weight: 3 },
  { id: `vg-${verticalKey}-core-9`, text: 'Does the governance model promote cross-functional collaboration (business, IT, COE)?', weight: 4 },
  { id: `vg-${verticalKey}-core-10`, text: 'Is there a business-driven value framework to prioritize GCC investments?', weight: 4 },
  { id: `vg-${verticalKey}-core-11`, text: 'Does the GCC maintain a succession and leadership continuity plan to sustain strategic alignment?', weight: 4 },
];

const SHARED_BPM_CORE = (prefix: string, industryProcessText: string) => [
  { id: `bpm-${prefix}-core-1`, text: 'What percentage of end-to-end processes are documented and standardized?', weight: 5 },
  { id: `bpm-${prefix}-core-2`, text: 'How well defined are process handoffs and SLA/OLA agreements with business stakeholders?', weight: 5 },
  { id: `bpm-${prefix}-core-3`, text: 'Are process owners and KPIs established for core GCC services?', weight: 4 },
  { id: `bpm-${prefix}-core-4`, text: 'How frequently are processes reviewed and optimized (e.g., continuous improvement cadences)?', weight: 4 },
  { id: `bpm-${prefix}-core-5`, text: 'To what extent are industry-specific process standards applied (e.g., manufacturing SOPs, clinical SOPs, financial controls)?', weight: 4 },
  { id: `bpm-${prefix}-core-6`, text: 'Is there evidence of process redesign (Lean/Six Sigma) being applied to improve outcomes?', weight: 5 },
  { id: `bpm-${prefix}-core-7`, text: 'How mature is exception handling and escalation across processes?', weight: 4 },
  { id: `bpm-${prefix}-core-8`, text: 'Are there documented process metrics and dashboards (operational & business)?', weight: 3 },
  { id: `bpm-${prefix}-core-9`, text: industryProcessText, weight: 5 },
  { id: `bpm-${prefix}-core-10`, text: 'Is there a COE or capability for process improvement and automation?', weight: 4 },
  { id: `bpm-${prefix}-core-11`, text: 'How effectively does the GCC leverage process mining or BPM tools to identify and address inefficiencies?', weight: 4 },
  { id: `bpm-${prefix}-core-12`, text: 'Does the GCC have cross-functional teams to drive process harmonization and transformation initiatives?', weight: 5 },
];

const SHARED_DA_CORE = (prefix: string) => [
  { id: `da-${prefix}-core-1`, text: 'What percentage of repetitive operations such as order processing, quality checks, or reporting are automated through RPA or AI or digital tools?', weight: 5 },
  { id: `da-${prefix}-core-2`, text: 'How integrated are automation tools with enterprise systems (ERP, CRM, etc.)?', weight: 5 },
  { id: `da-${prefix}-core-3`, text: 'Does the GCC have a clear digital transformation roadmap aligned to business priorities?', weight: 5 },
  { id: `da-${prefix}-core-4`, text: 'Are there ongoing pilots for emerging technologies (AI/ML/GenAI/analytics)?', weight: 4 },
  { id: `da-${prefix}-core-5`, text: 'How is data used to drive process & decision automation?', weight: 4 },
  { id: `da-${prefix}-core-6`, text: 'How mature is the CI/CD and DevOps practice supporting automation deployments?', weight: 5 },
  { id: `da-${prefix}-core-7`, text: 'Are digital platforms unified (APIs, platforms, integration layer)?', weight: 4 },
  { id: `da-${prefix}-core-8`, text: 'Does the GCC measure ROI from digital investments and automation pilots?', weight: 3 },
  { id: `da-${prefix}-core-9`, text: 'Are digital/automation standards and secure coding practices enforced?', weight: 4 },
  { id: `da-${prefix}-core-10`, text: 'Is there a plan for scaling successful automation pilots into production?', weight: 4 },
  { id: `da-${prefix}-core-11`, text: 'How well does the GCC collaborate with enterprise digital teams to co-create and scale digital solutions?', weight: 5 },
  { id: `da-${prefix}-core-12`, text: 'Does the GCC use digital twins, predictive analytics, or IoT to optimize operations?', weight: 5 },
];

const SHARED_TM_GENERIC = (prefix: string) => [
  { id: `tm-${prefix}-gen-1`, text: 'What is the current skill mix — % junior, mid, senior and domain experts?', weight: 5 },
  { id: `tm-${prefix}-gen-2`, text: 'Are competency-building programs & reskilling initiatives in place?', weight: 5 },
  { id: `tm-${prefix}-gen-3`, text: 'How effective is the GCC at retaining critical talent (attrition, bench strength)?', weight: 5 },
  { id: `tm-${prefix}-gen-4`, text: 'Are domain experts (manufacturing engineers, clinicians, financial controllers) embedded in GCC teams?', weight: 4 },
  { id: `tm-${prefix}-gen-5`, text: 'Is there a leadership development program for GCC managers?', weight: 4 },
  { id: `tm-${prefix}-gen-6`, text: 'Does the GCC use flexible staffing models (gig, contractor, centers of excellence)?', weight: 4 },
  { id: `tm-${prefix}-gen-7`, text: 'Are performance reviews & rewards aligned to business outcomes?', weight: 4 },
  { id: `tm-${prefix}-gen-8`, text: 'Are hiring pipelines and partnerships with universities present for critical roles?', weight: 4 },
  { id: `tm-${prefix}-gen-9`, text: 'Is collaboration across global talent pools and remote work enabled?', weight: 4 },
  { id: `tm-${prefix}-gen-10`, text: 'Does the GCC have a clear plan to develop future leaders capable of driving innovation and transformation?', weight: 5 },
  { id: `tm-${prefix}-gen-11`, text: 'How is talent retention linked to skill-based rewards, recognition, and learning opportunities?', weight: 4 },
];

const SHARED_TT_GENERIC = (prefix: string, industryCoreText: string) => [
  { id: `tt-${prefix}-gen-1`, text: 'How modern and scalable is the GCC\'s technology stack (cloud, infra)?', weight: 5 },
  { id: `tt-${prefix}-gen-2`, text: industryCoreText, weight: 5 },
  { id: `tt-${prefix}-gen-3`, text: 'Are integration architectures (APIs, ESB, event streams) standardized?', weight: 4 },
  { id: `tt-${prefix}-gen-4`, text: 'Are modern dev tools, test automation, and environment provisioning used?', weight: 4 },
  { id: `tt-${prefix}-gen-5`, text: 'Does the GCC employ cloud-native approaches (containers, microservices)?', weight: 4 },
  { id: `tt-${prefix}-gen-6`, text: 'Is there an enterprise data platform enabling analytics & ML?', weight: 4 },
  { id: `tt-${prefix}-gen-7`, text: 'Are OT (operational tech) systems segregated and integrated safely with IT?', weight: 5 },
  { id: `tt-${prefix}-gen-8`, text: 'How advanced is the GCC\'s tool optimization (license rationalization, consolidation)?', weight: 3 },
  { id: `tt-${prefix}-gen-9`, text: 'Are platform & tool SLAs defined and measured?', weight: 3 },
  { id: `tt-${prefix}-gen-10`, text: 'Is there a technology roadmap linked to business and digital priorities?', weight: 4 },
  { id: `tt-${prefix}-gen-11`, text: 'Does the GCC maintain a structured framework for technology obsolescence management and modernization?', weight: 5 },
  { id: `tt-${prefix}-gen-12`, text: 'How effectively are IT service management (ITSM) processes integrated with global enterprise systems?', weight: 4 },
];

const SHARED_CC_GENERIC = (prefix: string) => [
  { id: `cc-${prefix}-gen-1`, text: 'How well does the GCC understand end-customer journeys (B2B/B2C)?', weight: 4 },
  { id: `cc-${prefix}-gen-2`, text: 'Are CX metrics (CSAT, NPS) formalized and used for continuous improvement?', weight: 5 },
  { id: `cc-${prefix}-gen-3`, text: 'Is there a mechanism to capture business feedback and close the loop?', weight: 4 },
  { id: `cc-${prefix}-gen-4`, text: 'Does the GCC actively contribute to improving customer experience through better product support, logistics visibility, or digital connectivity?', weight: 5 },
  { id: `cc-${prefix}-gen-5`, text: 'Are service design and journey mapping integrated into solution development?', weight: 4 },
  { id: `cc-${prefix}-gen-6`, text: 'Does the GCC have service level SLAs aligned to customer expectations?', weight: 4 },
  { id: `cc-${prefix}-gen-7`, text: 'Are there mechanisms for product/service feedback to the R&D/BI teams?', weight: 4 },
  { id: `cc-${prefix}-gen-8`, text: 'How effectively does the GCC support omni-channel customer interactions?', weight: 4 },
  { id: `cc-${prefix}-gen-9`, text: 'Is customer experience tested and validated in pilots before rollout?', weight: 4 },
  { id: `cc-${prefix}-gen-10`, text: 'Are customer KPIs part of GCC performance targets?', weight: 4 },
  { id: `cc-${prefix}-gen-11`, text: 'How effectively does the GCC embed design thinking or customer journey mapping into its solution design?', weight: 5 },
  { id: `cc-${prefix}-gen-12`, text: 'Does the GCC align its KPIs to measurable customer outcomes such as NPS or CSAT?', weight: 5 },
];

const SHARED_RC_GENERIC = (prefix: string, industryNormsText: string, extra10: string, extra11: string) => [
  { id: `rc-${prefix}-gen-1`, text: industryNormsText, weight: 5 },
  { id: `rc-${prefix}-gen-2`, text: 'Are data protection and privacy regulations (GDPR/local) implemented?', weight: 5 },
  { id: `rc-${prefix}-gen-3`, text: 'Is there automated compliance monitoring and reporting?', weight: 4 },
  { id: `rc-${prefix}-gen-4`, text: 'Are business continuity and disaster recovery plans validated?', weight: 4 },
  { id: `rc-${prefix}-gen-5`, text: 'How are third-party and vendor risks assessed & managed?', weight: 4 },
  { id: `rc-${prefix}-gen-6`, text: 'Is access control and privileged access management enforced?', weight: 4 },
  { id: `rc-${prefix}-gen-7`, text: 'Are compliance KPIs integrated into GCC performance dashboards?', weight: 4 },
  { id: `rc-${prefix}-gen-8`, text: 'Are change-management controls and audit trails in place for critical systems?', weight: 4 },
  { id: `rc-${prefix}-gen-9`, text: 'Is there regulatory liaison capability to work with external regulators?', weight: 4 },
  { id: `rc-${prefix}-gen-10`, text: extra10, weight: 5 },
  { id: `rc-${prefix}-gen-11`, text: extra11, weight: 5 },
];

const HEALTHCARE_RC_GENERIC = (prefix: string) => [
  { id: `rc-${prefix}-gen-h-1`, text: 'How does the GCC ensure adherence to global standards such as GCP, GLP, GMP, and 21 CFR Part 11?', weight: 5 },
  { id: `rc-${prefix}-gen-h-2`, text: 'Does the GCC ensure compliance with data privacy, cybersecurity, and patient healthcare regulatory frameworks (HIPAA, HITRUST)?', weight: 5 },
  { id: `rc-${prefix}-gen-h-3`, text: 'Are data protection and privacy regulations (GDPR/local) implemented?', weight: 5 },
  { id: `rc-${prefix}-gen-h-4`, text: 'Is there automated compliance monitoring and reporting?', weight: 4 },
  { id: `rc-${prefix}-gen-h-5`, text: 'Are business continuity and disaster recovery plans validated?', weight: 4 },
  { id: `rc-${prefix}-gen-h-6`, text: 'How are third-party and vendor risks assessed & managed?', weight: 4 },
  { id: `rc-${prefix}-gen-h-7`, text: 'Is access control and privileged access management enforced?', weight: 4 },
  { id: `rc-${prefix}-gen-h-8`, text: 'Are compliance KPIs integrated into GCC performance dashboards?', weight: 4 },
  { id: `rc-${prefix}-gen-h-9`, text: 'Are change-management controls and audit trails in place for critical systems?', weight: 4 },
  { id: `rc-${prefix}-gen-h-10`, text: 'Is there regulatory liaison capability to work with external regulators?', weight: 4 },
  { id: `rc-${prefix}-gen-h-11`, text: 'How effectively does the GCC manage risks related to clinical trials, drug safety, and data integrity?', weight: 5 },
  { id: `rc-${prefix}-gen-h-12`, text: 'Does the GCC have structured mechanisms for ethical compliance and patient data governance?', weight: 5 },
];

const SHARED_S_GENERIC = (prefix: string, vSpecificESG: string, extraCollaboration: string) => [
  { id: `s-${prefix}-gen-1`, text: 'Is sustainability integrated into vendor selection and procurement?', weight: 4 },
  { id: `s-${prefix}-gen-2`, text: 'Are sustainability goals part of the GCC\'s targets and scorecards?', weight: 4 },
  { id: `s-${prefix}-gen-3`, text: 'Does the GCC run green IT initiatives (cloud optimization, DC efficiency)?', weight: 5 },
  { id: `s-${prefix}-gen-4`, text: vSpecificESG, weight: 5 },
  { id: `s-${prefix}-gen-5`, text: 'Are there programs to reduce travel, improve remote collaboration for lower emissions?', weight: 4 },
  { id: `s-${prefix}-gen-6`, text: 'Are sustainability risks considered in supply chain and operations?', weight: 4 },
  { id: `s-${prefix}-gen-7`, text: 'Is the GCC contributing to circular economy or waste reduction programs?', weight: 4 },
  { id: `s-${prefix}-gen-8`, text: 'Are training and awareness programs on sustainability run for staff?', weight: 4 },
  { id: `s-${prefix}-gen-9`, text: 'Are sustainability initiatives tied to cost savings and innovation opportunities?', weight: 4 },
  { id: `s-${prefix}-gen-10`, text: extraCollaboration, weight: 5 },
];

const SHARED_OA_GENERIC = (prefix: string, vDecisionAuthorityText: string, vPivotingAbilityText: string) => [
  { id: `oa-${prefix}-gen-1`, text: 'Is the GCC organized into cross-functional teams (pods) for faster delivery?', weight: 4 },
  { id: `oa-${prefix}-gen-2`, text: vDecisionAuthorityText, weight: 5 },
  { id: `oa-${prefix}-gen-3`, text: vPivotingAbilityText, weight: 5 },
  { id: `oa-${prefix}-gen-4`, text: 'Are agile practices (scrum/kanban) broadly applied and mature?', weight: 4 },
  { id: `oa-${prefix}-gen-5`, text: 'Are project delivery cycles short and iterative?', weight: 4 },
  { id: `oa-${prefix}-gen-6`, text: 'Does the GCC encourage experimentation and learning from failure?', weight: 4 },
  { id: `oa-${prefix}-gen-7`, text: 'Are structures flat or hierarchical in decision flows?', weight: 4 },
  { id: `oa-${prefix}-gen-8`, text: 'Is workflow deployment dynamic based on skills and demand?', weight: 4 },
  { id: `oa-${prefix}-gen-9`, text: 'How quickly can the GCC scale or pivot to new business models or geographies?', weight: 5 },
  { id: `oa-${prefix}-gen-10`, text: 'Is agility embedded as a cultural value and measured through relevant KPIs?', weight: 4 },
];

export const INITIAL_QUESTION_BANK: QuestionBank = {
  'Vision & Governance': {
    Manufacturing: {
      top3: SHARED_VG_CORE('m', 'manufacturing'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'vg-m-ad-1', text: "Does the GCC's governance model align with enterprise product-development and platform-engineering strategies?", weight: 5 },
          { id: 'vg-m-ad-2', text: 'How clearly are plant-level KPIs and product-line objectives integrated into the GCC performance dashboard?', weight: 5 },
          { id: 'vg-m-ad-3', text: 'Is the GCC empowered to influence global manufacturing sourcing and production planning?', weight: 4 },
          { id: 'vg-m-ad-4', text: 'Are governance routines established to synchronize engineering, supply-chain, and after-sales functions?', weight: 4 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'vg-m-pc-1', text: 'Is the GCC alignment to regulated E&P, R&D, clinical, and regulatory roadmaps?', weight: 5 },
          { id: 'vg-m-pc-2', text: 'How does the GCC ensure visibility of global trials, submissions, and compliance metrics?', weight: 5 },
          { id: 'vg-m-pc-3', text: 'Are decision-rights clearly defined between HQ and GCC for drug-development milestones?', weight: 5 },
          { id: 'vg-m-pc-4', text: 'How does the GCC ensure global standardization of quality and EHS governance processes?', weight: 4 },
          { id: 'vg-m-pc-5', text: 'Does the GCC have defined escalation paths for plant incidents and compliance breaches?', weight: 4 },
          { id: 'vg-m-pc-6', text: 'How frequently are global process councils or steering committees convened with GCC representation?', weight: 4 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'vg-m-ie-1', text: 'How effectively does the GCC manage interfaces between design centers, manufacturing units, and service hubs?', weight: 5 },
          { id: 'vg-m-ie-2', text: 'Does the GCC governance incorporate lifecycle costing and asset-management accountability?', weight: 4 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_VG_CORE('b', 'financial services'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'vg-b-rc-1', text: 'Does the GCC align with enterprise risk appetite and compliance frameworks?', weight: 5 },
          { id: 'vg-b-rc-2', text: 'Are product-specific steering committees represented by GCC leaders?', weight: 4 },
          { id: 'vg-b-rc-3', text: 'How frequently does the GCC leadership review alignment between cost optimization and customer-experience outcomes?', weight: 4 },
          { id: 'vg-b-rc-4', text: 'Does the GCC have a governance model aligned to enterprise risk, compliance, and customer trust objectives of the parent?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'vg-b-cm-1', text: 'Is there a governance forum integrating technology, compliance, and trading operations led by the GCC?', weight: 5 },
          { id: 'vg-b-cm-2', text: 'How are confidentiality and data-segregation policies governed within GCC operations?', weight: 5 },
          { id: 'vg-b-cm-3', text: 'Does the GCC authority to propose innovation in trading platforms or analytics tools?', weight: 4 },
        ],
        'Insurance / InsurTech': [
          { id: 'vg-b-ii-1', text: 'Are underwriting and claims governance processes standardized across GCC locations?', weight: 5 },
          { id: 'vg-b-ii-2', text: 'How clearly are risk and actuarial functions represented in GCC governance?', weight: 5 },
          { id: 'vg-b-ii-3', text: 'Does the GCC lead governance reviews on policy administration, protection, and turnaround times?', weight: 4 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_VG_CORE('h', 'healthcare'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'vg-h-p-1', text: 'Is the GCC alignment to regulated E&P, R&D, clinical, and regulatory roadmaps?', weight: 5 },
          { id: 'vg-h-p-2', text: 'How does the GCC ensure visibility of global trials, submissions, and compliance metrics?', weight: 5 },
          { id: 'vg-h-p-3', text: 'Are decision-rights clearly defined between HQ and GCC for drug-development milestones?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 'vg-h-m-1', text: "Is the GCC's governance structure aligned with regulatory and patient-centric goals of the enterprise?", weight: 5 },
          { id: 'vg-h-m-2', text: 'Does the GCC participate in global product-lifecycle governance (design controls, post-market surveillance)?', weight: 5 },
          { id: 'vg-h-m-3', text: 'How integrated is the GCC in ensuring regulatory documentation consistency across regions?', weight: 5 },
          { id: 'vg-h-m-4', text: 'Is the GCC empowered to initiate design or manufacturing process changes?', weight: 4 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'vg-h-pp-1', text: "Is the GCC's governance structure aligned with regulatory and patient-centric goals of the enterprise?", weight: 5 },
          { id: 'vg-h-pp-2', text: 'Does the GCC governance support patient-data protection and clinical-quality objectives?', weight: 5 },
          { id: 'vg-h-pp-3', text: 'Are governance models established for shared-service excellence in remote-care or telemedicine strategy?', weight: 4 },
          { id: 'vg-h-pp-4', text: 'How does the GCC ensure alignment between cost efficiency and patient-care outcomes?', weight: 4 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_VG_CORE('r', 'retail'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'vg-r-eo-1', text: 'Is the GCC governance aligned to customer-experience, marketing, and fulfillment KPIs?', weight: 5 },
          { id: 'vg-r-eo-2', text: 'How frequently does GCC leadership review performance by channel (online/offline)?', weight: 4 },
          { id: 'vg-r-eo-3', text: 'Does the GCC have authority to recommend CX-enhancing technology investments?', weight: 4 },
        ],
        'FMCG / CPG': [
          { id: 'vg-r-fc-1', text: 'How aligned are brand, sales, and supply-chain governance structures between GCC and business HQ?', weight: 5 },
          { id: 'vg-r-fc-2', text: 'Does the GCC track governance metrics on new-product introduction timelines and trade-promotion efficiency?', weight: 5 },
          { id: 'vg-r-fc-3', text: 'Is the GCC governance framework integrated with global demand planning, and marketing?', weight: 4 },
        ],
        'Luxury / Specialty': [
          { id: 'vg-r-ls-1', text: 'Does the GCC governance include representation from global merchandising and customer-insight teams?', weight: 5 },
          { id: 'vg-r-ls-2', text: 'Are global brand-protection and pricing policies governed centrally through the GCC?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_VG_CORE('t', 'technology/media/telecom'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'vg-t-si-1', text: 'Does the GCC have a product or platform governance model tied to release cycles and quality metrics?', weight: 5 },
          { id: 'vg-t-si-2', text: 'How frequently is GCC leadership represented in global architecture and platform-level planning?', weight: 5 },
          { id: 'vg-t-si-3', text: 'Are technology-risk and cybersecurity councils inclusive of GCC representation?', weight: 4 },
          { id: 'vg-t-si-4', text: 'Is the GCC governance framework integrated with global product innovation and digital strategy initiatives?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'vg-t-me-1', text: 'Does the GCC governance framework address content-rights, IP protection, and digital-distribution compliance?', weight: 5 },
          { id: 'vg-t-me-2', text: 'Are global editorial, production, and analytics teams coordinated through a defined GCC governance model?', weight: 5 },
          { id: 'vg-t-me-3', text: 'How frequently does leadership review GCC’s contribution to audience-engagement KPIs?', weight: 4 },
        ],
        'Telecom / Network Services': [
          { id: 'vg-t-tn-1', text: 'Does the GCC governance structure align with enterprise network-operation and service-quality goals?', weight: 5 },
          { id: 'vg-t-tn-2', text: 'How clearly are outage-management and service-assurance responsibilities defined between HQ and GCC?', weight: 5 },
          { id: 'vg-t-tn-3', text: 'Is the GCC empowered to propose 5G or infrastructure optimization initiatives?', weight: 4 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_VG_CORE('e', 'energy/utilities'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'vg-e-og-1', text: 'Does the GCC governance align with asset integrity, safety, and compliance objectives across the value chain?', weight: 5 },
          { id: 'vg-e-og-2', text: 'How does the GCC ensure operational visibility and reporting across exploration, refining, and retail divisions?', weight: 5 },
          { id: 'vg-e-og-3', text: 'Are sustainability and carbon-reduction targets part of GCC performance reviews?', weight: 4 },
        ],
        'Power & Utilities': [
          { id: 'vg-e-pu-1', text: 'Does the GCC governance support regulatory reporting and service-reliability KPIs?', weight: 5 },
          { id: 'vg-e-pu-2', text: 'How frequently are risk and compliance reviews conducted jointly with grid-operations leadership?', weight: 5 },
          { id: 'vg-e-pu-3', text: 'Is the GCC empowered to make operational recommendations for outage prevention or efficiency improvement?', weight: 4 },
        ],
        'Renewable / CleanTech': [
          { id: 'vg-e-rc-1', text: 'How does the GCC governance enable portfolio optimization across solar, wind, and hydro projects?', weight: 5 },
          { id: 'vg-e-rc-2', text: 'Are real-time performance and grid-integration metrics included in GCC governance dashboards?', weight: 5 },
          { id: 'vg-e-rc-3', text: 'Does the GCC participate in sustainability councils or national-energy policy forums?', weight: 4 },
        ],
      },
    },
  },

  'Business Process Maturity': {
    Manufacturing: {
      top3: SHARED_BPM_CORE('m', 'Are manufacturing operations standardized across plants and regions supported by the GCC?'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'bpm-m-ad-1', text: 'How standardized and synchronized are BOM (Bill of Materials), routing, and production scheduling processes across units?', weight: 5 },
          { id: 'bpm-m-ad-2', text: 'To what extent are PPAP (Production Part Approval Process), APQP (Advanced Product Quality Planning), and defect tracking processes digitized?', weight: 5 },
          { id: 'bpm-m-ad-3', text: 'How effectively are engineering change management (ECM/ECO) processes managed?', weight: 4 },
          { id: 'bpm-m-ad-4', text: 'How effectively are recalls, warranty claims, and field-return processes integrated into manufacturing improvement loops?', weight: 4 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'bpm-m-pc-1', text: 'How mature are batch record management and cGMP (current Good Manufacturing Practice) deviation processes?', weight: 5 },
          { id: 'bpm-m-pc-2', text: 'To what extent are GxP (Good Practice) regulatory workflows embedded into operations?', weight: 5 },
          { id: 'bpm-m-pc-3', text: 'How standardized are formulation, recipe, and yield-optimization processes across production lines?', weight: 4 },
          { id: 'bpm-m-pc-4', text: 'How effectively are quality events and CAPA (Corrective and Preventive Action) cycles used for improvement?', weight: 5 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'bpm-m-ie-1', text: 'How mature are ETO/CTO/MTO (Engineer-to-Order / Configure-to-Order / Make-to-Order) workflows across units?', weight: 5 },
          { id: 'bpm-m-ie-2', text: 'How consistently are project-based manufacturing processes executed across sites?', weight: 5 },
          { id: 'bpm-m-ie-3', text: 'To what degree are maintenance and after-sales processes integrated with manufacturing workflows?', weight: 4 },
          { id: 'bpm-m-ie-4', text: 'How effectively are supplier coordination and logistics processes standardized for complex builds?', weight: 4 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_BPM_CORE('b', 'Are core banking or insurance processes standardized and optimized across regions supported by the GCC?'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'bpm-b-rc-1', text: 'How standardized are KYC (Know Your Customer), AML (Anti-Money Laundering), and risk-scoring workflows?', weight: 5 },
          { id: 'bpm-b-rc-2', text: 'How mature are credit underwriting and loan processing cycles in terms of automation?', weight: 5 },
          { id: 'bpm-b-rc-3', text: 'To what extent are branch, digital, and back-office workflows harmonized?', weight: 4 },
          { id: 'bpm-b-rc-4', text: 'How effectively are fraud management and dispute resolution workflows governed?', weight: 4 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'bpm-b-cm-1', text: 'How standardized are trade lifecycle processes such as confirmation, clearing, and settlement?', weight: 5 },
          { id: 'bpm-b-cm-2', text: 'To what extent are regulatory reporting workflows such as MiFID, EMIR, and Dodd-Frank automated?', weight: 5 },
          { id: 'bpm-b-cm-3', text: 'How mature are client onboarding and KYC processes across geographies?', weight: 5 },
          { id: 'bpm-b-cm-4', text: 'How effectively are pricing, risk, and limit-monitoring workflows integrated across trading desks?', weight: 4 },
        ],
        'Insurance / InsurTech': [
          { id: 'bpm-b-ii-1', text: 'How mature are underwriting workflows including risk scoring and policy issuance?', weight: 5 },
          { id: 'bpm-b-ii-2', text: 'To what extent are claims assessment and adjudication workflows automated?', weight: 5 },
          { id: 'bpm-b-ii-3', text: 'How consistent are policy servicing and renewal workflows across channels?', weight: 4 },
          { id: 'bpm-b-ii-4', text: 'How effectively are fraud detection and risk inspection workflows integrated across operations?', weight: 4 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_BPM_CORE('h', 'Are R&D, clinical, and supply chain processes standardized and digitally supported by the GCC?'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'bpm-h-p-1', text: 'To what extent are deviations and CAPA (Corrective and Preventive Action) processes standardized?', weight: 5 },
          { id: 'bpm-h-p-2', text: 'How effectively are regulatory submissions such as NDA and ANDA managed?', weight: 5 },
          { id: 'bpm-h-p-3', text: 'How standardized are pharmacovigilance workflows such as AE (Adverse Event) processing?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 'bpm-h-m-1', text: 'How mature are design-control workflows including verification and validation?', weight: 5 },
          { id: 'bpm-h-m-2', text: 'To what extent are product sterilization and environmental-control processes standardized?', weight: 5 },
          { id: 'bpm-h-m-3', text: 'How consistent are UDI (Unique Device Identification), labeling, and traceability workflows?', weight: 5 },
          { id: 'bpm-h-m-4', text: 'How effectively are post-market surveillance and audit workflows integrated?', weight: 4 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'bpm-h-pp-1', text: 'How mature are patient onboarding and referral workflows across facilities?', weight: 5 },
          { id: 'bpm-h-pp-2', text: 'How standardized are claims adjudication and reimbursement workflows?', weight: 5 },
          { id: 'bpm-h-pp-3', text: 'How consistently are ICD (International Classification of Diseases) coding and billing processes governed?', weight: 5 },
          { id: 'bpm-h-pp-4', text: 'How effectively are prior-authorization and appeals workflows managed?', weight: 4 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_BPM_CORE('r', 'Are merchandising, logistics, and customer operations processes standardized across global markets through GCC support?'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'bpm-r-eo-1', text: 'How standardized are order-management and fulfillment workflows across channels?', weight: 5 },
          { id: 'bpm-r-eo-2', text: 'How mature are order-to-fulfillment processes including last-mile delivery?', weight: 5 },
          { id: 'bpm-r-eo-3', text: 'To what extent are reverse logistics workflows automated?', weight: 5 },
          { id: 'bpm-r-eo-4', text: 'How effectively are customer support workflows integrated across touchpoints?', weight: 4 },
        ],
        'FMCG / CPG': [
          { id: 'bpm-r-fc-1', text: 'How standardized are trade promotion and distributor management processes?', weight: 5 },
          { id: 'bpm-r-fc-2', text: 'How effectively are NPI (New Product Introduction) workflows coordinated?', weight: 5 },
          { id: 'bpm-r-fc-3', text: 'How consistent are batch tracking and quality compliance workflows?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 'bpm-r-ls-1', text: 'How standardized are boutique operations and clienteling workflows?', weight: 5 },
          { id: 'bpm-r-ls-2', text: 'How mature are authentication and high-value inventory processes?', weight: 5 },
          { id: 'bpm-r-ls-3', text: 'To what extent are craftsmanship and bespoke-service workflows harmonized?', weight: 5 },
          { id: 'bpm-r-ls-4', text: 'How effectively are personalized service workflows governed?', weight: 4 },
        ],
      },
    },
    TMT: {
      top3: SHARED_BPM_CORE('t', 'Are software development and service delivery processes standardized with enterprise-level process controls?'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'bpm-t-si-1', text: 'How mature are SDLC (Software Development Life Cycle) workflows such as planning and testing?', weight: 5 },
          { id: 'bpm-t-si-2', text: 'How standardized are incident, problem, and change management workflows?', weight: 5 },
          { id: 'bpm-t-si-3', text: 'How consistently are documentation and handover processes followed?', weight: 5 },
          { id: 'bpm-t-si-4', text: 'How effectively are DevOps and CI/CD (Continuous Integration / Continuous Deployment) practices implemented?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'bpm-t-me-1', text: 'How standardized are content production and distribution workflows?', weight: 5 },
          { id: 'bpm-t-me-2', text: 'How mature is content rights management and royalty processes?', weight: 5 },
          { id: 'bpm-t-me-3', text: 'How effectively are advertising operations workflows automated?', weight: 5 },
          { id: 'bpm-t-me-4', text: 'How consistent are metadata management and compliance workflows?', weight: 5 },
        ],
        'Telecom / Network Services': [
          { id: 'bpm-t-tn-1', text: 'How mature are service provisioning and activation workflows?', weight: 5 },
          { id: 'bpm-t-tn-2', text: 'To what extent are network maintenance and field-service processes automated?', weight: 5 },
          { id: 'bpm-t-tn-3', text: 'How effectively are billing and revenue workflows governed?', weight: 5 },
          { id: 'bpm-t-tn-4', text: 'How consistent are customer onboarding and migration workflows?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_BPM_CORE('e', 'Are generation, distribution, and field operations processes standardized and monitored through the GCC?'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'bpm-e-og-1', text: 'How mature are upstream workflows such as exploration and drilling?', weight: 5 },
          { id: 'bpm-e-og-2', text: 'To what extent are HSE (Health, Safety, Environment) processes standardized?', weight: 5 },
          { id: 'bpm-e-og-3', text: 'How effectively are asset maintenance and pipeline integrity workflows governed?', weight: 5 },
          { id: 'bpm-e-og-4', text: 'How consistent are production planning and yield optimization processes?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 'bpm-e-pu-1', text: 'How mature are generation and distribution scheduling workflows?', weight: 5 },
          { id: 'bpm-e-pu-2', text: 'To what extent are outage management workflows standardized?', weight: 5 },
          { id: 'bpm-e-pu-3', text: 'How effectively are metering, billing, and revenue assurance workflows governed?', weight: 5 },
          { id: 'bpm-e-pu-4', text: 'How consistent are field dispatch and maintenance workflows?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 'bpm-e-rc-1', text: 'How standardized are asset monitoring and predictive maintenance workflows?', weight: 5 },
          { id: 'bpm-e-rc-2', text: 'To what extent is the renewable energy grid-integration process automated?', weight: 5 },
          { id: 'bpm-e-rc-3', text: 'How mature are sustainability reporting and compliance workflows?', weight: 5 },
          { id: 'bpm-e-rc-4', text: 'How effectively are remote-operations and partner-service workflows governed?', weight: 5 },
        ],
      },
    },
  },

  'Digital & Automation': {
    Manufacturing: {
      top3: SHARED_DA_CORE('m'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'da-m-ad-1', text: 'How effectively are digital quality systems integrated with shop-floor IoT sensors to detect defects in real-time?', weight: 5 },
          { id: 'da-m-ad-2', text: 'To what extent are AI models used to predict and adjust production schedules based on demand variability in model mixes?', weight: 5 },
          { id: 'da-m-ad-3', text: 'How mature is the use of digital twins for simulating vehicle assembly sequences and optimizing layout?', weight: 5 },
          { id: 'da-m-ad-4', text: 'How extensively are machine learning algorithms used for predictive warranty and recall analysis?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'da-m-pc-1', text: 'How automated are batch release and batch record review processes using digital QMS or eBR systems?', weight: 5 },
          { id: 'da-m-pc-2', text: 'To what extent is real-time process data used for predictive yield optimization?', weight: 5 },
          { id: 'da-m-pc-3', text: 'How effectively are digital tools used for environmental monitoring in controlled manufacturing zones?', weight: 5 },
          { id: 'da-m-pc-4', text: 'Are AI-driven vision systems used for analytics for deviation detection in continuous manufacturing?', weight: 5 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'da-m-ie-1', text: 'How effectively are digital collaboration platforms used to coordinate engineering changes across global design teams?', weight: 5 },
          { id: 'da-m-ie-2', text: 'To what extent are automated configurators used for ETO/CTO/MTO product design?', weight: 5 },
          { id: 'da-m-ie-3', text: 'How mature is the use of digital twins for monitoring heavy equipment performance across its lifecycle?', weight: 5 },
          { id: 'da-m-ie-4', text: 'How automated are maintenance planning and spare-part prediction workflows?', weight: 5 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_DA_CORE('b'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'da-b-rc-1', text: 'How extensively are AI models used for automated loan underwriting and credit decisioning?', weight: 5 },
          { id: 'da-b-rc-2', text: 'How automated are customer onboarding and KYC (Know Your Customer) workflows for accounts and settlements?', weight: 5 },
          { id: 'da-b-rc-3', text: 'To what extent are fraud detection models automated with continuous learning capabilities?', weight: 5 },
          { id: 'da-b-rc-4', text: 'How effectively are customer interactions analyzed using NLP to automate service workflows?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'da-b-cm-1', text: 'How automated is the end-to-end trade surveillance workflow using AI-based anomaly detection?', weight: 5 },
          { id: 'da-b-cm-2', text: 'To what extent are algorithmic trading systems integrated with predictive market analytics?', weight: 5 },
          { id: 'da-b-cm-3', text: 'How effectively are AI models used for automated regulatory report generation?', weight: 5 },
          { id: 'da-b-cm-4', text: 'How mature is the use of ML models for automated risk scoring and exposure prediction?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 'da-b-ii-1', text: 'How automated is the underwriting process using AI-based risk profiling and document intelligence?', weight: 5 },
          { id: 'da-b-ii-2', text: 'To what extent are straight-through-processing (STP) capabilities implemented in claims workflows?', weight: 5 },
          { id: 'da-b-ii-3', text: 'How effectively does the insurer use automation to detect fraud in claims submissions?', weight: 5 },
          { id: 'da-b-ii-4', text: 'How mature is the use of AI-based recommendation engines for personalized product offerings?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_DA_CORE('h'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'da-h-p-1', text: 'To what extent are AI-enabled tools used for molecule discovery and target identification?', weight: 5 },
          { id: 'da-h-p-2', text: 'How mature are digital platforms for automating regulatory submission compilation and validation?', weight: 5 },
          { id: 'da-h-p-3', text: 'How extensively is RPA used for pharmacovigilance case intake and literature monitoring?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 'da-h-m-1', text: 'How mature is the use of automated testing and validation platforms in device engineering?', weight: 5 },
          { id: 'da-h-m-2', text: 'How extensively are AI models used for predictive maintenance and remote device service automation?', weight: 5 },
          { id: 'da-h-m-3', text: 'How automated is the post-market surveillance workflow using AI for incident categorization?', weight: 5 },
          { id: 'da-h-m-4', text: 'How effectively do digital configuration tools support device customization and lot traceability?', weight: 5 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'da-h-pp-1', text: 'How effectively are AI-powered triage and digital front-door tools used for patient intake?', weight: 5 },
          { id: 'da-h-pp-2', text: 'To what extent are automated coding assistance tools used for clinical documentation?', weight: 5 },
          { id: 'da-h-pp-3', text: 'How mature are automated claim adjudication systems with real-time rules engines?', weight: 5 },
          { id: 'da-h-pp-4', text: 'How automated is the patient referral management and clinical pathway orchestration?', weight: 5 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_DA_CORE('r'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'da-r-eo-1', text: 'How extensively are personalization engines automated through real-time user behavior analytics?', weight: 5 },
          { id: 'da-r-eo-2', text: 'To what extent are automated inventory optimization tools integrated with omnichannel demand signals?', weight: 5 },
          { id: 'da-r-eo-3', text: 'How mature are AI-based chatbots in resolving end-to-end customer queries without agent intervention?', weight: 5 },
          { id: 'da-r-eo-4', text: 'How automated is the dynamic pricing workflow using ML-driven elasticity models?', weight: 5 },
        ],
        'FMCG / CPG': [
          { id: 'da-r-fc-1', text: 'How mature are automated demand-sensing tools using POS, distributor, and market data?', weight: 5 },
          { id: 'da-r-fc-2', text: 'To what extent are AI-based models used for predictive replenishment and inventory allocation?', weight: 5 },
          { id: 'da-r-fc-3', text: 'How effectively does the GCC use automation for product lifecycle and artwork approvals?', weight: 5 },
          { id: 'da-r-fc-4', text: 'How extensively are digital tools used to automate supplier onboarding and quality audits?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 'da-r-ls-1', text: 'How automated are clienteling and personalized product recommendation engines?', weight: 5 },
          { id: 'da-r-ls-2', text: 'How effectively are repair workflow updates digitized and automated for customer transparency?', weight: 5 },
          { id: 'da-r-ls-3', text: 'To what extent are digital authentication technologies used to verify product provenance?', weight: 5 },
          { id: 'da-r-ls-4', text: 'How effectively are AI-driven supply chain models used for boutique-level allocation across boutiques?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_DA_CORE('t'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'da-t-si-1', text: 'How automated are code quality checks using static analysis and AI-supported tools?', weight: 5 },
          { id: 'da-t-si-2', text: 'To what extent is infrastructure provisioning automated through IaC (Infrastructure as Code)?', weight: 5 },
          { id: 'da-t-si-3', text: 'How mature is the use of automated observability platforms for incident prediction?', weight: 5 },
          { id: 'da-t-si-4', text: 'How extensively are AI copilots used to accelerate development cycles?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'da-t-me-1', text: 'How mature are AI-driven content recommendation engines across platforms?', weight: 5 },
          { id: 'da-t-me-2', text: 'How automated are ad tracking, pricing, and reconciliation workflows?', weight: 5 },
          { id: 'da-t-me-3', text: 'How effectively does the GCC use automation to detect copyright violations or pirated content?', weight: 5 },
        ],
        'Telecom / Network Services': [
          { id: 'da-t-tn-1', text: 'How mature is the automation of network provisioning and activation workflows?', weight: 5 },
          { id: 'da-t-tn-2', text: 'To what extent are self-healing network capabilities implemented for incident resolution?', weight: 5 },
          { id: 'da-t-tn-3', text: 'How automated is policy management for network slicing and QoS optimization?', weight: 5 },
          { id: 'da-t-tn-4', text: 'How extensively is RPA used for customer lifecycle operations (activation, migration, billing adjustments)?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_DA_CORE('e'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'da-e-og-1', text: 'How mature is automation in drilling operations using real-time well monitoring?', weight: 5 },
          { id: 'da-e-og-2', text: 'To what extent are digital twins and predictive models used for asset integrity management?', weight: 5 },
          { id: 'da-e-og-3', text: 'How automated are HSE (Health, Safety, Environment) compliance reporting workflows?', weight: 5 },
          { id: 'da-e-og-4', text: 'How effectively are AI models used for automated seismic data processing and interpretation?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 'da-e-pu-1', text: 'To what extent is the GCC supporting automated load forecasting and grid-balancing operations?', weight: 5 },
          { id: 'da-e-pu-2', text: 'To what extent are smart meter data streams used for automated billing and exception handling?', weight: 5 },
          { id: 'da-e-pu-3', text: 'How automated are outage prediction and crew dispatch workflows?', weight: 5 },
          { id: 'da-e-pu-4', text: 'How effectively does the utility use digital tools for predictive maintenance of critical assets?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 'da-e-rc-1', text: 'How extensively are AI-based forecasting tools used to predict solar/wind generation patterns?', weight: 5 },
          { id: 'da-e-rc-2', text: 'To what extent are automated drones used for inspection of renewable assets?', weight: 5 },
          { id: 'da-e-rc-3', text: 'How mature are digital tools for automating carbon footprint and sustainability reporting?', weight: 5 },
          { id: 'da-e-rc-4', text: 'How effectively are AI models used for automated grid integration of distributed energy resources?', weight: 5 },
        ],
      },
    },
  },

  'Talent Management': {
    Manufacturing: {
      top3: SHARED_TM_GENERIC('m'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'tm-m-ad-1', text: 'How effectively does the GCC source manufacturing engineers and shop-floor digital skills from external talent pools?', weight: 5 },
          { id: 'tm-m-ad-2', text: 'Are there structured rotation programs between GCC and plants for engineers and operators?', weight: 4 },
          { id: 'tm-m-ad-3', text: 'To what extent are domain certifications (e.g., Six Sigma, PLC programming) required and tracked for critical roles?', weight: 4 },
          { id: 'tm-m-ad-4', text: 'How effectively does the GCC rotate talent across engineering, quality, and production planning to build multi-skilled teams?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'tm-m-pc-1', text: 'How mature are specialized training programs for cGMP, regulatory compliance, and laboratory skills?', weight: 5 },
          { id: 'tm-m-pc-2', text: 'How effectively does the GCC retain critical R&D and process experts through career paths and incentives?', weight: 5 },
          { id: 'tm-m-pc-3', text: 'To what extent are competency matrices used to certify operators and technicians for specific processes?', weight: 4 },
          { id: 'tm-m-pc-4', text: 'Are there dedicated talent-scouting programs for niche process engineering talent pipelines?', weight: 4 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'tm-m-ie-1', text: 'How effectively does the GCC attract senior project engineers and systems integrators?', weight: 5 },
          { id: 'tm-m-ie-2', text: 'How mature are mentorship and knowledge-transfer programs for long-cycle engineering projects?', weight: 4 },
          { id: 'tm-m-ie-3', text: 'To what extent are skill sets for complex assembly, welding, and testing certified and maintained?', weight: 5 },
          { id: 'tm-m-ie-4', text: 'How effectively does the GCC manage contingent talent pools for peak project phases?', weight: 4 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_TM_GENERIC('b'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'tm-b-rc-1', text: 'How effective are training programs for regulatory compliance, credit assessment, and digital banking tools?', weight: 5 },
          { id: 'tm-b-rc-2', text: 'Does the GCC attract and retain talent in niche areas like fintech, payments, and reconciliation specialists?', weight: 5 },
          { id: 'tm-b-rc-3', text: 'How mature are role-based certification and career-path frameworks for relationship managers and operations staff?', weight: 4 },
          { id: 'tm-b-rc-4', text: 'How effectively does the GCC use internal mobility to fill specialist roles (e.g., AML analysts)?', weight: 4 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'tm-b-cm-1', text: 'How well does the GCC attract quantitative analysts and regulatory-reporting specialists?', weight: 5 },
          { id: 'tm-b-cm-2', text: 'How mature are training programs for trade lifecycle operations and market risk management?', weight: 5 },
          { id: 'tm-b-cm-3', text: 'Are there defined career paths for specialized roles like quant modeling, compliance, or algorithm trading?', weight: 4 },
          { id: 'tm-b-cm-4', text: 'How effectively does the GCC onboard experienced hires for time-sensitive trading and settlement functions?', weight: 4 },
        ],
        'Insurance / InsurTech': [
          { id: 'tm-b-ii-1', text: 'How mature are actuarial and claims-specialist talent pipelines within the GCC?', weight: 5 },
          { id: 'tm-b-ii-2', text: 'To what extent are digital claims, telematics, and insurtech skills fostered through targeted training?', weight: 5 },
          { id: 'tm-b-ii-3', text: 'How effective are reskilling programs for underwriters to work with AI-based risk models?', weight: 4 },
          { id: 'tm-b-ii-4', text: 'How well does the GCC retain niche skills such as catastrophe modeling and reinsurance expertise?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_TM_GENERIC('h'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'tm-h-p-1', text: 'How mature are specialized training programs for pharmacovigilance, clinical monitoring, and GxP compliance?', weight: 5 },
          { id: 'tm-h-p-2', text: 'To what extent are talent pipelines built for biostatistics and medical writing roles?', weight: 5 },
          { id: 'tm-h-p-3', text: 'How well does the GCC enable cross-functional rotations between R&D, manufacturing, and regulatory teams?', weight: 4 },
        ],
        'Medical Devices': [
          { id: 'tm-h-m-1', text: 'How effective are certification programs for device engineers, test labs, and validation specialists?', weight: 5 },
          { id: 'tm-h-m-2', text: 'How mature are specialized training programs trained on IoT-enabled device servicing?', weight: 5 },
          { id: 'tm-h-m-3', text: 'How mature are processes to hire clinical specialists for validation and usability testing?', weight: 4 },
          { id: 'tm-h-m-4', text: 'How effectively does the GCC retain regulatory submission and quality assurance expertise?', weight: 5 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'tm-h-pp-1', text: 'How mature are training programs for clinical coding, care-coordination, and telehealth operations?', weight: 5 },
          { id: 'tm-h-pp-2', text: 'To what extent are nurse/clinician upskilling and digital health competency programs implemented?', weight: 5 },
          { id: 'tm-h-pp-3', text: 'How effective are hiring partnerships with medical schools and training institutes for pipeline roles?', weight: 4 },
          { id: 'tm-h-pp-4', text: 'How effectively does the GCC manage credentialing and certification requirements for clinical staff?', weight: 4 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_TM_GENERIC('r'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'tm-r-eo-1', text: 'How mature are digital marketing and e-commerce specialist training programs (SEO, SEM, analytics)?', weight: 5 },
          { id: 'tm-r-eo-2', text: 'To what extent are fulfillment and last-mile operations specialists skilled through simulation and on-the-job training?', weight: 5 },
          { id: 'tm-r-eo-3', text: 'How effective are customer-experience (CX) training programs for omnichannel support teams?', weight: 4 },
          { id: 'tm-r-eo-4', text: 'How well does the GCC build analytics and personalization talent for merchandising and CRM?', weight: 4 },
        ],
        'FMCG / CPG': [
          { id: 'tm-r-fc-1', text: 'Are there specialized sourcing and supply-chain training programs within the GCC?', weight: 5 },
          { id: 'tm-r-fc-2', text: 'To what extent are food-safety and quality-assurance certifications provided to operations staff?', weight: 5 },
          { id: 'tm-r-fc-3', text: 'How effective are NPI (New Product Introduction) readiness programs for cross-functional teams?', weight: 4 },
          { id: 'tm-r-fc-4', text: 'How well does the GCC retain category-management and shopper-marketing talent?', weight: 4 },
        ],
        'Luxury / Specialty': [
          { id: 'tm-r-ls-1', text: 'How effective are boutique-sales and high-touch service training programs?', weight: 5 },
          { id: 'tm-r-ls-2', text: 'To what extent are heritage-brand and product-knowledge certifications provided to staff?', weight: 5 },
          { id: 'tm-r-ls-3', text: 'Are there dedicated career paths for high-end retail and VIP customer specialists?', weight: 4 },
          { id: 'tm-r-ls-4', text: 'How well does the GCC recruit and retain boutique managers with strong clienteling skills?', weight: 4 },
        ],
      },
    },
    TMT: {
      top3: SHARED_TM_GENERIC('t'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'tm-t-si-1', text: 'How mature are continuous learning programs for cloud, security, and platform engineering skills?', weight: 5 },
          { id: 'tm-t-si-2', text: 'To what extent are certification pathways (e.g., cloud certs) tied to career progression?', weight: 5 },
          { id: 'tm-t-si-3', text: 'How effective are internal \'guilds\' or SMEs (subject matter experts) in fostering skill communities?', weight: 4 },
          { id: 'tm-t-si-4', text: 'How well does the GCC attract senior architects and product leaders to scale digital offerings?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'tm-t-me-1', text: 'To what extent are rights-management and metadata training programs provided to staff?', weight: 5 },
          { id: 'tm-t-me-2', text: 'How effective are data-analytics training programs for audience insights and performance marketing?', weight: 5 },
          { id: 'tm-t-me-3', text: 'How well does the GCC retain specialized talent such as producers, editors, and rights managers?', weight: 4 },
        ],
        'Telecom / Network Services': [
          { id: 'tm-t-tn-1', text: 'How effective are training programs for network automation, 5G, and cloud-native network functions?', weight: 5 },
          { id: 'tm-t-tn-2', text: 'To what extent are skill sets for field operations and maintenance for tower and fiber technicians provided?', weight: 5 },
          { id: 'tm-t-tn-3', text: 'How mature are programs to develop OSS/BSS and network security expertise?', weight: 4 },
          { id: 'tm-t-tn-4', text: 'How well does the GCC leverage vendor partnerships to upskill teams on new network technologies?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_TM_GENERIC('e'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'tm-e-og-1', text: 'How mature are competency programs for drilling, reservoir, and production engineering roles?', weight: 5 },
          { id: 'tm-e-og-2', text: 'To what extent are HSE (Health, Safety, Environment) certifications and training mandated and tracked?', weight: 5 },
          { id: 'tm-e-og-3', text: 'How effective are technical training programs for midstream and terminal operations staff?', weight: 4 },
          { id: 'tm-e-og-4', text: 'How mature are specialized training programs for subsea, pipeline, and inspection teams?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 'tm-e-pu-1', text: 'How mature are grid-operations and SCADA training programs for control-room staff?', weight: 5 },
          { id: 'tm-e-pu-2', text: 'To what extent are certifications for protection relays, switchgear, and safety provided?', weight: 5 },
          { id: 'tm-e-pu-3', text: 'How effective are training programs for meter reading, smart grid analytics, and DER (Distributed Energy Resources)?', weight: 4 },
          { id: 'tm-e-pu-4', text: 'How well does the GCC attract and retain engineers for generation, transmission, and distribution planning?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 'tm-e-rc-1', text: 'How effective are technical training programs for solar/wind asset management and storage asset operation?', weight: 5 },
          { id: 'tm-e-rc-2', text: 'To what extent are sustainability reporting, carbon accounting, and ESG training programs implemented?', weight: 5 },
          { id: 'tm-e-rc-3', text: 'How mature are upskilling programs for battery management and inverter technologies?', weight: 4 },
          { id: 'tm-e-rc-4', text: 'How well does the GCC develop field-service talent for remote asset servicing and commissioning?', weight: 5 },
        ],
      },
    },
  },

  'Technology & Tools': {
    Manufacturing: {
      top3: SHARED_TT_GENERIC('m', 'How well are plant systems, ERP, MES, and supply chain tools integrated with enterprise platforms?'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'tt-m-ad-1', text: 'How effectively are PLM (Product Lifecycle Management) tools integrated with CAD, MES, and quality platforms?', weight: 5 },
          { id: 'tt-m-ad-2', text: 'Is there evidence of predictive maintenance for CNC and machine diagnostics on the shop floor?', weight: 5 },
          { id: 'tt-m-ad-3', text: 'How mature is the use of predictive maintenance tools connected to vehicle assembly lines and robotics?', weight: 5 },
          { id: 'tt-m-ad-4', text: 'How efficiently are digital calibration, torque monitoring, and sensor-based tooling systems implemented across production?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'tt-m-pc-1', text: 'How well do digital batch execution systems integrate with LIMS (Laboratory Information Management Systems)?', weight: 5 },
          { id: 'tt-m-pc-2', text: 'To what extent are PAT (Process Analytical Technology) tools used for real-time control of chemical or pharma processes?', weight: 5 },
          { id: 'tt-m-pc-3', text: 'How advanced are data historians in capturing and analyzing continuous manufacturing signals?', weight: 5 },
          { id: 'tt-m-pc-4', text: 'How effectively are electronic logbooks and digital validation systems used to manage compliance?', weight: 5 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'tt-m-ie-1', text: 'How integrated are simulation and modeling tools with ERP and project management systems?', weight: 5 },
          { id: 'tt-m-ie-2', text: 'To what extent are IoT platforms used for monitoring equipment performance during production and field use?', weight: 5 },
          { id: 'tt-m-ie-3', text: 'How mature is the toolchain supporting complex assembly planning, routing, and material sequencing?', weight: 5 },
          { id: 'tt-m-ie-4', text: 'How effectively does the GCC manage engineering system interoperability across multi-vendor ecosystems?', weight: 5 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_TT_GENERIC('b', 'How effectively are core banking, risk management, and CRM platforms integrated within the GCC ecosystem?'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'tt-b-rc-1', text: 'How effectively does the GCC manage integration between core banking systems and digital lending platforms?', weight: 5 },
          { id: 'tt-b-rc-2', text: 'To what extent are core banking APIs and microservices frameworks standardized across products?', weight: 5 },
          { id: 'tt-b-rc-3', text: 'How mature are fraud-detection and transaction-monitoring tools in terms of automation and real-time scoring?', weight: 5 },
          { id: 'tt-b-rc-4', text: 'How efficiently does the GCC deploy secure mobile banking frameworks and SDKs for rapid feature rollout?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'tt-b-cm-1', text: 'How advanced are electronic trading and OMS/EMS integration tools managed by the GCC?', weight: 5 },
          { id: 'tt-b-cm-2', text: 'To what extent are market-data feeds standardized and optimized for latency-sensitive operations?', weight: 5 },
          { id: 'tt-b-cm-3', text: 'How effectively does the GCC maintain high-performance computing systems for risk and valuation tools?', weight: 5 },
          { id: 'tt-b-cm-4', text: 'How mature is the use of automated reconciliation tools supporting clearing, settlement, and reporting workflows?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 'tt-b-ii-1', text: 'How effectively are policy administration platforms integrated with claims, billing, and underwriting tools?', weight: 5 },
          { id: 'tt-b-ii-2', text: 'To what extent are telematics and IoT platforms used to power connected insurance products?', weight: 5 },
          { id: 'tt-b-ii-3', text: 'How mature are AI-driven document processing tools for high-volume claims ingestion?', weight: 5 },
          { id: 'tt-b-ii-4', text: 'How efficiently does the GCC maintain rating engines and digital distribution platforms?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_TT_GENERIC('h', 'How effectively are clinical data management, R&D, and compliance systems integrated across the GCC and enterprise?'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'tt-h-p-1', text: 'How advanced are Clinical Trial Management Systems (CTMS) and their integration with EDC platforms?', weight: 5 },
          { id: 'tt-h-p-2', text: 'How mature are pharma-specific data lakes supporting molecule development and safety analytics?', weight: 5 },
          { id: 'tt-h-p-3', text: 'To what extent are digital lab-automation tools deployed for sample management and analytics?', weight: 5 },
          { id: 'tt-h-p-4', text: 'How effectively does the GCC ensure interoperability between regulatory, research, and pharmacovigilance systems?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 'tt-h-m-1', text: 'How integrated are device engineering platforms with compliance and risk-management tools (ISO 13485)?', weight: 5 },
          { id: 'tt-h-m-2', text: 'To what extent are simulation and digital twin tools used in device development?', weight: 5 },
          { id: 'tt-h-m-3', text: 'How mature is the GCC\'s tooling for post-market surveillance and device telemetry collection?', weight: 5 },
          { id: 'tt-h-m-4', text: 'How effectively are product-testing automation tools used for verification and validation cycles?', weight: 5 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'tt-h-pp-1', text: 'How effectively does the GCC manage interoperability between EHR, billing, and care-coordination platforms?', weight: 5 },
          { id: 'tt-h-pp-2', text: 'To what extent are telemedicine platforms optimized for scalability, security, and multi-channel integration?', weight: 5 },
          { id: 'tt-h-pp-3', text: 'How mature are coding-audit and claims-editing tools in enabling accuracy and speed?', weight: 5 },
          { id: 'tt-h-pp-4', text: 'How efficiently does the GCC support patient-engagement tools for health and predictive-care?', weight: 5 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_TT_GENERIC('r', 'How seamlessly are POS, inventory, and CRM systems connected across markets through the GCC?'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'tt-r-eo-1', text: 'How advanced are personalization and recommendation engines managed by the GCC?', weight: 5 },
          { id: 'tt-r-eo-2', text: 'To what extent are order-management and fulfillment platforms integrated in real-time?', weight: 5 },
          { id: 'tt-r-eo-3', text: 'How effectively does the GCC oversee marketplace platform tools, seller portals, and catalog engines?', weight: 5 },
          { id: 'tt-r-eo-4', text: 'How mature are A/B testing, experimentation, and feature-flag tools used for digital commerce?', weight: 5 },
        ],
        'FMCG / CPG': [
          { id: 'tt-r-fc-1', text: 'How effectively does the GCC maintain demand-sensing and demand-planning tools integrated across markets?', weight: 5 },
          { id: 'tt-r-fc-2', text: 'To what extent are R&D and Product Lifecycle Management (PLM) tools connected with formulation and packaging systems?', weight: 5 },
          { id: 'tt-r-fc-3', text: 'How mature are trade-promotion and retail-execution platforms in supporting end-to-end campaigns?', weight: 5 },
          { id: 'tt-r-fc-4', text: 'How efficiently does the GCC operate global supply-chain visibility platforms?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 'tt-r-ls-1', text: 'How effectively does the GCC manage clienteling platforms and CRM tools for premium customers?', weight: 5 },
          { id: 'tt-r-ls-2', text: 'To what extent are product authentication and digital provenance tools used for luxury goods?', weight: 5 },
          { id: 'tt-r-ls-3', text: 'How mature are boutique inventory tracking systems for high-value and repair-sales management?', weight: 5 },
          { id: 'tt-r-ls-4', text: 'How integrated are omnichannel retail systems for curated product drops and VIP customer journeys?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_TT_GENERIC('t', 'How well does the GCC leverage DevOps, cloud-native, and API-driven architectures to enhance agility?'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'tt-t-si-1', text: 'How effectively does the GCC manage CI/CD pipelines, artifact repositories, and automated build systems?', weight: 5 },
          { id: 'tt-t-si-2', text: 'To what extent are cloud-native developer platforms (PaaS, serverless) standardized?', weight: 5 },
          { id: 'tt-t-si-3', text: 'How mature are observability, monitoring, and log-analytics tools across environments?', weight: 5 },
          { id: 'tt-t-si-4', text: 'How efficiently does the GCC manage multi-cloud IaC toolchains (Terraform, Ansible, Pulumi)?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'tt-t-me-1', text: 'To what extent are metadata enrichment tools automated using AI and ML?', weight: 5 },
          { id: 'tt-t-me-2', text: 'How mature are streaming-platform monitoring tools for performance, latency, and audience insights?', weight: 5 },
          { id: 'tt-t-me-3', text: 'How efficiently does the GCC manage rights-management and royalty-calculation systems?', weight: 5 },
          { id: 'tt-t-me-4', text: 'To what extent are cloud-based content editing, transcoding tools, and asset-management systems used?', weight: 5 },
        ],
        'Telecom / Network Services': [
          { id: 'tt-t-tn-1', text: 'How effectively does the GCC maintain OSS/BSS platforms and ensure integration with network functions?', weight: 5 },
          { id: 'tt-t-tn-2', text: 'To what extent are software-defined network (SDN) and virtualization tools deployed (SDN, NFV)?', weight: 5 },
          { id: 'tt-t-tn-3', text: 'How mature are network monitoring, fault-management, and NOC tools across global operations?', weight: 5 },
          { id: 'tt-t-tn-4', text: 'How efficiently does the GCC manage provisioning tools for fiber, mobility, and broadband services?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_TT_GENERIC('e', 'How integrated are operational control systems, smart grid platforms, and asset management tools across the GCC?'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'tt-e-og-1', text: 'How effectively does the GCC maintain SCADA, DCS, and historian systems across upstream and downstream operations?', weight: 5 },
          { id: 'tt-e-og-2', text: 'To what extent are digital oilfield tools deployed for real-time reservoir and production management?', weight: 5 },
          { id: 'tt-e-og-3', text: 'How mature are pipeline integrity and inspection-analysis tools supported by the GCC?', weight: 5 },
          { id: 'tt-e-og-4', text: 'How efficiently are EHS and environmental monitoring platforms managed?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 'tt-e-pu-1', text: 'How effectively does the GCC operate ADMS/OMS platforms (distribution & outage management)?', weight: 5 },
          { id: 'tt-e-pu-2', text: 'To what extent are grid-analytics and DER-management tools integrated with enterprise systems?', weight: 5 },
          { id: 'tt-e-pu-3', text: 'How mature are smart-meter data platforms supporting billing, exception handling, and analytics?', weight: 5 },
          { id: 'tt-e-pu-4', text: 'How effectively does the GCC maintain generation-planning and forecasting tools?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 'tt-e-rc-1', text: 'How effectively does the GCC support grid monitoring and SCADA for solar, wind, and hybrid plants?', weight: 5 },
          { id: 'tt-e-rc-2', text: 'To what extent are renewable-asset management tools integrated with IoT and edge platforms?', weight: 5 },
          { id: 'tt-e-rc-3', text: 'How mature are carbon-tracking, ESG, and sustainability-reporting systems?', weight: 5 },
          { id: 'tt-e-rc-4', text: 'How efficiently does the GCC manage forecasting and grid-balancing tools for intermittent energy sources?', weight: 5 },
        ],
      },
    },
  },

  'Customer Centricity': {
    Manufacturing: {
      top3: SHARED_CC_GENERIC('m'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'cc-m-ad-1', text: 'How effectively does the GCC capture end-customer feedback from dealerships and service centers to influence product design?', weight: 5 },
          { id: 'cc-m-ad-2', text: 'To what extent does the GCC track and report on product-related issues (e.g., delays, defects) and communicate them to end-customers?', weight: 4 },
          { id: 'cc-m-ad-3', text: 'How mature are processes for integrating warranty and field-service data into product and service improvements?', weight: 5 },
          { id: 'cc-m-ad-4', text: 'How well does the GCC enable dealer and after-sales portals for transparent service scheduling and status updates?', weight: 4 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'cc-m-pc-1', text: 'How effectively does the GCC track customer complaints related to product safety, quality, and regulatory concerns?', weight: 5 },
          { id: 'cc-m-pc-2', text: 'To what extent does the GCC provide customers with transparent batch/lot traceability and recall notification mechanisms?', weight: 5 },
          { id: 'cc-m-pc-3', text: 'How mature are service-level commitments for supply continuity and how are transport issues communicated to customers?', weight: 4 },
          { id: 'cc-m-pc-4', text: 'Does the GCC leverage end-customer feedback on formulation, packaging, and delivery preferences?', weight: 4 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'cc-m-ie-1', text: 'How well does the GCC support customers with remote monitoring dashboards and SLA-based alerts for equipment performance?', weight: 5 },
          { id: 'cc-m-ie-2', text: 'To what extent does the GCC enable customer-specific configuration and documentation portals for project handling?', weight: 4 },
          { id: 'cc-m-ie-3', text: 'How mature are processes for logging and escalating field-service issues to minimize customer downtime?', weight: 4 },
          { id: 'cc-m-ie-4', text: 'How effectively does the GCC manage customer training programs and technical documentation for equipment operation?', weight: 4 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_CC_GENERIC('b'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'cc-b-rc-1', text: 'How effectively does the GCC consolidate customer interactions from branches, digital channels, and call centers to drive a 360-degree view?', weight: 5 },
          { id: 'cc-b-rc-2', text: 'To what extent does the GCC enable data-driven personalized customer journeys (e.g., tailored product offers) based on segmentation analytics?', weight: 5 },
          { id: 'cc-b-rc-3', text: 'How mature are dispute handling and resolution times from a customer-experience perspective?', weight: 4 },
          { id: 'cc-b-rc-4', text: 'How well does the GCC enable customers to track issue resolution status through self-service portals?', weight: 4 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'cc-b-cm-1', text: 'How effectively does the GCC provide client reporting and portfolio insights tailored to institutional client needs?', weight: 5 },
          { id: 'cc-b-cm-2', text: 'To what extent does the GCC ensure SLA-driven responsiveness for trade exceptions and client inquiries?', weight: 5 },
          { id: 'cc-b-cm-3', text: 'How mature are the GCC processes for client onboarding, performance and advisor interactions?', weight: 4 },
          { id: 'cc-b-cm-4', text: 'How well does the GCC enable transparent dispute reconciliation and client-facing audit trails?', weight: 4 },
        ],
        'Insurance / InsurTech': [
          { id: 'cc-b-ii-1', text: 'How effectively does the GCC support fast, empathetic claims communication to customers during high-stress events?', weight: 5 },
          { id: 'cc-b-ii-2', text: 'To what extent does the GCC enable personalized policy servicing and proactive renewal reminders?', weight: 5 },
          { id: 'cc-b-ii-3', text: 'How mature are customer-facing damage-assessment and settlement timelines managed by the GCC?', weight: 4 },
          { id: 'cc-b-ii-4', text: 'How well does the GCC integrate telematics or IoT-driven insights into customer communication and premium adjustments?', weight: 4 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_CC_GENERIC('h'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'cc-h-p-1', text: 'How effectively does the GCC manage patient and caregiver feedback to adjust drug availability and safety information?', weight: 5 },
          { id: 'cc-h-p-2', text: 'To what extent does the GCC manage customer-facing adverse event acknowledgment and follow-up processes?', weight: 5 },
          { id: 'cc-h-p-3', text: 'How mature are patient support program operations (enrollment, adherence reminders) administered by the GCC?', weight: 4 },
          { id: 'cc-h-p-4', text: 'How well does the GCC provide transparent order and shipment tracking for clinical supplies and commercial products?', weight: 4 },
        ],
        'Medical Devices': [
          { id: 'cc-h-m-1', text: 'How effectively does the GCC provide real-time support to clinicians for device setup, usage, and troubleshooting?', weight: 5 },
          { id: 'cc-h-m-2', text: 'To what extent does the GCC enable customer portals for device usability and field incidents?', weight: 4 },
          { id: 'cc-h-m-3', text: 'How mature are spare-part fulfillment and emergency device replacement workflows from a CX standpoint?', weight: 5 },
          { id: 'cc-h-m-4', text: 'How well does the GCC support training and certification tracking for clinical users of devices?', weight: 4 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'cc-h-pp-1', text: 'How effectively does the GCC support patient scheduling, appointment reminders, and follow-up communications?', weight: 5 },
          { id: 'cc-h-pp-2', text: 'To what extent does the GCC enable secure, patient-centric portals for records access and care coordination?', weight: 5 },
          { id: 'cc-h-pp-3', text: 'How mature are billing transparency and patient-estimate workflows handled by the GCC?', weight: 4 },
          { id: 'cc-h-pp-4', text: 'How well does the GCC enable patient-outreach programs for preventive care and chronic-disease management?', weight: 4 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_CC_GENERIC('r'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'cc-r-eo-1', text: 'How effectively does the GCC manage post-purchase communications (tracking, returns, refunds) to preserve customer trust?', weight: 5 },
          { id: 'cc-r-eo-2', text: 'To what extent does the GCC enable real-time inventory visibility for customers across channels?', weight: 4 },
          { id: 'cc-r-eo-3', text: 'How mature are personalization and recommendation feedback loops based on customer behavior that the GCC manages?', weight: 5 },
          { id: 'cc-r-eo-4', text: 'How well does the GCC orchestrate unified loyalty experiences and cross-channel redemption?', weight: 4 },
        ],
        'FMCG / CPG': [
          { id: 'cc-r-fc-1', text: 'How effectively does the GCC manage trade and consumer-promotion feedback to adjust consumer messaging?', weight: 5 },
          { id: 'cc-r-fc-2', text: 'To what extent does the GCC manage order-tracking transparency from retail partners to influence assortment and merchandising?', weight: 4 },
          { id: 'cc-r-fc-3', text: 'How mature are service recovery and refund processes that affect consumer perception?', weight: 5 },
          { id: 'cc-r-fc-4', text: 'How well does the GCC support customer-centric packaging, labeling, and convenience features based on feedback?', weight: 4 },
        ],
        'Luxury / Specialty': [
          { id: 'cc-r-ls-1', text: 'How effectively does the GCC support personalized VIP communication and bespoke service workflows?', weight: 5 },
          { id: 'cc-r-ls-2', text: 'To what extent does the GCC ensure white-glove delivery and concierge tracking for premium customers?', weight: 5 },
          { id: 'cc-r-ls-3', text: 'How mature are brand-loyalty and customer-engagement models tailored to premium experience across regions?', weight: 4 },
          { id: 'cc-r-ls-4', text: 'How well does the GCC curate clienteling data to provide tailored experiences across regions?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_CC_GENERIC('t'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'cc-t-si-1', text: 'How effectively does the GCC collect and act on end-user feedback for SaaS product usability improvements?', weight: 5 },
          { id: 'cc-t-si-2', text: 'To what extent does the GCC enable in-app support, feature-feedback collection, and product telemetry-driven CX?', weight: 5 },
          { id: 'cc-t-si-3', text: 'How mature are escalation and patch-release workflows that directly impact customer SLAs?', weight: 4 },
          { id: 'cc-t-si-4', text: 'How well does the GCC operate customer success processes to drive adoption and reduce churn?', weight: 4 },
        ],
        'Media & Entertainment': [
          { id: 'cc-t-me-1', text: 'How effectively does the GCC manage viewer feedback loops for content discovery and recommendation guidance?', weight: 5 },
          { id: 'cc-t-me-2', text: 'To what extent does the GCC support content discoverability and personalized experience tuning?', weight: 5 },
          { id: 'cc-t-me-3', text: 'How mature are customer-help flows for subscription, billing, and content access issues?', weight: 4 },
          { id: 'cc-t-me-4', text: 'How well does the GCC manage community-moderation and user-safety workflows impacting customer trust?', weight: 4 },
        ],
        'Telecom / Network Services': [
          { id: 'cc-t-tn-1', text: 'How effectively does the GCC provide proactive outage notifications and status updates to customers?', weight: 5 },
          { id: 'cc-t-tn-2', text: 'To what extent does the GCC provide customer self-service portals for plan changes and automated remediation guidance?', weight: 5 },
          { id: 'cc-t-tn-3', text: 'How mature are migration and plan-change support processes to minimize customer friction?', weight: 4 },
          { id: 'cc-t-tn-4', text: 'How well does the GCC manage customer-centric care for enterprise accounts and SLAs?', weight: 4 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_CC_GENERIC('e'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'cc-e-og-1', text: 'How effectively does the GCC communicate production or shipment disruptions to B2B customers and partners?', weight: 5 },
          { id: 'cc-e-og-2', text: 'To what extent does the GCC provide customers with performance dashboards for delivered volumes and quality?', weight: 5 },
          { id: 'cc-e-og-3', text: 'How mature are emergency-response customer communication protocols during incidents?', weight: 4 },
          { id: 'cc-e-og-4', text: 'How well does the GCC support customer communication portals to manage contractual SLAs and penalties?', weight: 4 },
        ],
        'Power & Utilities': [
          { id: 'cc-e-pu-1', text: 'How effectively does the GCC provide customers with outage ETAs, restoration updates, and compensation workflows?', weight: 5 },
          { id: 'cc-e-pu-2', text: 'To what extent does the GCC enable customer self-service for billing queries, payment plans, and meter data access?', weight: 5 },
          { id: 'cc-e-pu-3', text: 'How mature are targeted communication programs for vulnerable customers and demand-response events?', weight: 4 },
          { id: 'cc-e-pu-4', text: 'How well does the GCC manage multi-channel emergency response and field-service coordination to minimize customer impact?', weight: 4 },
        ],
        'Renewable / CleanTech': [
          { id: 'cc-e-rc-1', text: 'How effectively does the GCC provide home and business customers with generation forecasts and maintenance alerts?', weight: 5 },
          { id: 'cc-e-rc-2', text: 'To what extent does the GCC provide performance dashboards that customers can access for asset health and yield?', weight: 5 },
          { id: 'cc-e-rc-3', text: 'How mature are customer onboarding and commissioning communication workflows for distributed assets?', weight: 4 },
          { id: 'cc-e-rc-4', text: 'How well does the GCC support customer financing, subsidy, and rebate processing to simplify adoption?', weight: 4 },
        ],
      },
    },
  },

  'Innovation & IP': {
    Manufacturing: {
      top3: [
        { id: 'ii-m-core-1', text: 'Is there a formal mandate for innovation and problem discovery?', weight: 5 },
        { id: 'ii-m-core-2', text: 'Are there dedicated incubation/innovation teams or labs?', weight: 4 },
        { id: 'ii-m-core-3', text: 'Does the GCC drive continuous improvement or process innovation leveraging Industry 4.0, IoT, and data analytics?', weight: 5 },
        { id: 'ii-m-core-4', text: 'Does the GCC own or co-develop IP related to product design, manufacturing optimization, or predictive maintenance?', weight: 5 },
        { id: 'ii-m-core-5', text: 'How many proof-of-concepts progressed to production in last 12 months?', weight: 4 },
        { id: 'ii-m-core-6', text: 'Are partnerships with startups/universities used to accelerate innovation?', weight: 4 },
        { id: 'ii-m-core-7', text: 'Is there a process to capture and protect IP created by the GCC?', weight: 5 },
        { id: 'ii-m-core-8', text: 'Does the GCC participate in industry consortia or standard bodies?', weight: 3 },
        { id: 'ii-m-core-9', text: 'Are innovation metrics (time-to-market, adoption rates) tracked?', weight: 4 },
        { id: 'ii-m-core-10', text: 'Are there commercialization pilots that generate revenue or cost savings?', weight: 4 },
        { id: 'ii-m-core-11', text: 'How effectively does the GCC collaborate with R&D teams to accelerate prototyping and digital twin innovation?', weight: 4 },
      ],
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'ii-m-ad-1', text: 'Does the GCC drive innovation in product design, smart manufacturing, and connected vehicle technologies?', weight: 5 },
          { id: 'ii-m-ad-2', text: 'Are engineering teams encouraged to co-develop new digital twin or simulation-based solutions?', weight: 5 },
          { id: 'ii-m-ad-3', text: 'How effectively does the GCC partner with suppliers and R&D teams to pilot new materials or production methods?', weight: 4 },
          { id: 'ii-m-ad-4', text: 'Are GCC innovation projects focused on future mobility, electric platforms, or EV innovations?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'ii-m-pc-1', text: 'Does the GCC participate in process-innovation initiatives around yield improvement, safety, or sustainability?', weight: 5 },
          { id: 'ii-m-pc-2', text: 'How effectively does the GCC use data analytics and AI to optimize chemical formulations or process design?', weight: 5 },
          { id: 'ii-m-pc-3', text: 'Are innovation programs in place to reduce raw material waste or production variability?', weight: 4 },
          { id: 'ii-m-pc-4', text: 'Does the GCC collaborate with global labs or universities on industrial chemistry or process automation research?', weight: 4 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'ii-m-ie-1', text: 'Are innovation metrics tied to operational efficiency or maintenance cost reduction?', weight: 5 },
          { id: 'ii-m-ie-2', text: 'How effectively does the GCC protect and commercialize IP from design automation or predictive maintenance solutions?', weight: 5 },
        ],
      },
    },
    BFSI: {
      top3: [
        { id: 'ii-b-core-1', text: 'Is there a formal mandate for innovation and problem discovery?', weight: 5 },
        { id: 'ii-b-core-2', text: 'Are there dedicated incubation/innovation teams or labs?', weight: 4 },
        { id: 'ii-b-core-3', text: 'Does the GCC contribute to innovation in digital banking, fintech partnerships, or customer-centric service models?', weight: 5 },
        { id: 'ii-b-core-4', text: 'Is the GCC involved in developing or piloting IP assets such as fraud detection algorithms or data-driven risk models?', weight: 5 },
        { id: 'ii-b-core-5', text: 'How many proof-of-concepts progressed to production in last 12 months?', weight: 4 },
        { id: 'ii-b-core-6', text: 'Are partnerships with startups/universities used to accelerate innovation?', weight: 4 },
        { id: 'ii-b-core-7', text: 'Is there a process to capture and protect IP created by the GCC?', weight: 5 },
        { id: 'ii-b-core-8', text: 'Does the GCC participate in industry consortia or standard bodies?', weight: 3 },
        { id: 'ii-b-core-9', text: 'Are innovation metrics (time-to-market, adoption rates) tracked?', weight: 4 },
        { id: 'ii-b-core-10', text: 'Are there commercialization pilots that generate revenue or cost savings?', weight: 4 },
        { id: 'ii-b-core-11', text: 'How effectively does the GCC collaborate with startups or insurtechs to co-create new financial solutions?', weight: 4 },
      ],
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'ii-b-rc-1', text: 'Does the GCC lead innovation in digital banking platforms, customer personalization, or process automation?', weight: 5 },
          { id: 'ii-b-rc-2', text: 'Are CoEs established to pilot emerging tech like Gen AI, blockchain, or contactless payments?', weight: 5 },
          { id: 'ii-b-rc-3', text: 'How effectively are fintech partnerships leveraged for ideation and experimentation?', weight: 4 },
          { id: 'ii-b-rc-4', text: 'Are innovation KPIs linked to customer growth, reduced turnaround time, or operational resilience?', weight: 4 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'ii-b-cm-1', text: 'Are GCC teams involved in developing proprietary algorithmic trading or market-risk innovation?', weight: 5 },
          { id: 'ii-b-cm-2', text: 'How effectively does the GCC collaborate with fintech startups to co-create new financial solutions?', weight: 4 },
          { id: 'ii-b-cm-3', text: 'How frequently does the GCC collaborate with academia or fintech startups for new trading innovations?', weight: 4 },
          { id: 'ii-b-cm-4', text: 'Does the GCC own IP or patents in data science or AI-based financial models?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 'ii-b-ii-1', text: 'Does the GCC support innovation in claims automation, risk modeling, or customer engagement tools?', weight: 5 },
          { id: 'ii-b-ii-2', text: 'Are CoEs working on AI-based underwriting and fraud detection solutions?', weight: 5 },
          { id: 'ii-b-ii-3', text: 'Does the GCC manage or co-develop IP around actuarial analytics or telematics-driven insurance models?', weight: 5 },
          { id: 'ii-b-ii-4', text: 'Are innovation outcomes linked to cost efficiency and customer satisfaction improvements?', weight: 4 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: [
        { id: 'ii-h-core-1', text: 'Is there a formal mandate for innovation and problem discovery?', weight: 5 },
        { id: 'ii-h-core-2', text: 'Are there dedicated incubation/innovation teams or labs?', weight: 4 },
        { id: 'ii-h-core-3', text: 'Does the GCC drive innovation in clinical data analytics, remote patient monitoring, or digital therapeutics?', weight: 5 },
        { id: 'ii-h-core-4', text: 'Does the GCC manage IP or data assets generated through clinical research or pharmaceutical R&D?', weight: 5 },
        { id: 'ii-h-core-5', text: 'How many proof-of-concepts progressed to production in last 12 months?', weight: 4 },
        { id: 'ii-h-core-6', text: 'Are partnerships with startups/universities used to accelerate innovation?', weight: 4 },
        { id: 'ii-h-core-7', text: 'Is there a process to capture and protect IP created by the GCC?', weight: 5 },
        { id: 'ii-h-core-8', text: 'Does the GCC participate in industry consortia or standard bodies?', weight: 3 },
        { id: 'ii-h-core-9', text: 'Are innovation metrics (time-to-market, adoption rates) tracked?', weight: 4 },
        { id: 'ii-h-core-10', text: 'Are there commercialization pilots that generate revenue or cost savings?', weight: 4 },
        { id: 'ii-h-core-11', text: 'How effectively does the GCC support innovation through collaborations with medical institutions and biotech partners?', weight: 4 },
      ],
      subVerticals: {
        Pharmaceuticals: [
          { id: 'ii-h-p-1', text: 'How effectively does the GCC drive innovation in clinical trial analytics, molecular modeling, or drug discovery?', weight: 5 },
          { id: 'ii-h-p-2', text: 'Are partnerships in place with universities or research consortia to co-develop new molecules or computational biology tools?', weight: 5 },
          { id: 'ii-h-p-3', text: 'How does the GCC track IP generated through research data or analytics solutions?', weight: 4 },
          { id: 'ii-h-p-4', text: 'Are innovation KPIs tied to faster R&D cycles or regulatory approvals?', weight: 4 },
        ],
        'Medical Devices': [
          { id: 'ii-h-m-1', text: 'Does the GCC contribute to innovation in product design, testing automation, or regulatory documentation?', weight: 5 },
          { id: 'ii-h-m-2', text: 'How effectively does the GCC leverage simulation and digital engineering for device innovation?', weight: 5 },
          { id: 'ii-h-m-3', text: 'Does the GCC co-own patents or IP for device software, sensors, or embedded systems?', weight: 5 },
          { id: 'ii-h-m-4', text: 'Are GCC innovation programs linked to product safety and compliance enhancements?', weight: 4 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'ii-h-pp-1', text: 'Does the GCC lead innovation in digital health platforms, telemedicine, or remote monitoring solutions?', weight: 5 },
          { id: 'ii-h-pp-2', text: 'How effectively does the GCC use patient-data analytics for population health management innovation?', weight: 5 },
          { id: 'ii-h-pp-3', text: 'How effectively does the GCC collaborate with hospitals or startups on AI diagnostics or wearable device solutions?', weight: 5 },
          { id: 'ii-h-pp-4', text: 'Are innovation outcomes measured in clinical efficiency, patient engagement, or reduced care costs?', weight: 4 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: [
        { id: 'ii-r-core-1', text: 'Is there a formal mandate for innovation and problem discovery?', weight: 5 },
        { id: 'ii-r-core-2', text: 'Are there dedicated incubation/innovation teams or labs?', weight: 4 },
        { id: 'ii-r-core-3', text: 'Does the GCC enable innovation in omnichannel experience, personalization, or demand forecasting models?', weight: 5 },
        { id: 'ii-r-core-4', text: 'Does the GCC own or co-create digital IP such as recommendation engines or retail analytics frameworks?', weight: 5 },
        { id: 'ii-r-core-5', text: 'How many proof-of-concepts progressed to production in last 12 months?', weight: 4 },
        { id: 'ii-r-core-6', text: 'Are partnerships with startups/universities used to accelerate innovation?', weight: 4 },
        { id: 'ii-r-core-7', text: 'Is there a process to capture and protect IP created by the GCC?', weight: 5 },
        { id: 'ii-r-core-8', text: 'Does the GCC participate in industry consortia or standard bodies?', weight: 3 },
        { id: 'ii-r-core-9', text: 'Are innovation metrics (time-to-market, adoption rates) tracked?', weight: 4 },
        { id: 'ii-r-core-10', text: 'Are there commercialization pilots that generate revenue or cost savings?', weight: 4 },
        { id: 'ii-r-core-11', text: 'How actively does the GCC pilot new technologies like AR/VR or generative AI to enhance customer engagement?', weight: 5 },
      ],
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'ii-r-eo-1', text: 'Does the GCC drive innovation in personalization, recommendation engines, or dynamic pricing algorithms?', weight: 5 },
          { id: 'ii-r-eo-2', text: 'How effectively does the GCC co-develop digital experiences like AR-based try-ons or virtual shopping assistants?', weight: 5 },
          { id: 'ii-r-eo-3', text: 'Are innovation metrics linked to conversion, retention, or customer satisfaction rates?', weight: 4 },
          { id: 'ii-r-eo-4', text: 'Does the GCC support rapid experimentation in digital storefronts, UX improvements, or marketing campaign analytics?', weight: 4 },
        ],
        'FMCG / CPG': [
          { id: 'ii-r-fc-1', text: 'Does the GCC lead innovation in demand forecasting, supply-chain optimization, or packaging sustainability?', weight: 5 },
          { id: 'ii-r-fc-2', text: 'Are CoEs established for R&D digitization or product life-cycle management?', weight: 4 },
          { id: 'ii-r-fc-3', text: 'How effectively are consumer insights leveraged for rapid prototyping of product innovation pilots?', weight: 4 },
          { id: 'ii-r-fc-4', text: 'Does the GCC manage IP around new formulations, manufacturing processes, or brand analytics?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 'ii-r-ls-1', text: 'Does the GCC support brand-led innovation in customer engagement, store experience, or digital merchandising?', weight: 5 },
          { id: 'ii-r-ls-2', text: 'How effectively is innovation applied to anti-counterfeiting or premium customer experience?', weight: 5 },
          { id: 'ii-r-ls-3', text: 'How does the GCC ensure protection and management of brand IP?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: [
        { id: 'ii-t-core-1', text: 'Is there a formal mandate for innovation and problem discovery?', weight: 5 },
        { id: 'ii-t-core-2', text: 'Are there dedicated incubation/innovation teams or labs?', weight: 4 },
        { id: 'ii-t-core-3', text: 'Does the GCC play a key role in developing new products, platforms, or IP for technology services or digital media?', weight: 5 },
        { id: 'ii-t-core-4', text: 'Is the GCC involved in patent creation, open-source contributions, or internal innovation challenges?', weight: 5 },
        { id: 'ii-t-core-5', text: 'How many proof-of-concepts progressed to production in last 12 months?', weight: 4 },
        { id: 'ii-t-core-6', text: 'Are partnerships with startups/universities used to accelerate innovation?', weight: 4 },
        { id: 'ii-t-core-7', text: 'Is there a process to capture and protect IP created by the GCC?', weight: 5 },
        { id: 'ii-t-core-8', text: 'Does the GCC participate in industry consortia or standard bodies?', weight: 3 },
        { id: 'ii-t-core-9', text: 'Are innovation metrics (time-to-market, adoption rates) tracked?', weight: 4 },
        { id: 'ii-t-core-10', text: 'Are there commercialization pilots that generate revenue or cost savings?', weight: 4 },
        { id: 'ii-t-core-11', text: 'How effectively does the GCC contribute to scaling emerging technologies like 5G, edge, or cloud solutions?', weight: 5 },
      ],
      subVerticals: {
        'Software & IT Services': [
          { id: 'ii-t-si-1', text: 'Does the GCC drive platform innovation through automation, cloud-native development, or product modernization?', weight: 5 },
          { id: 'ii-t-si-2', text: 'How effectively does the GCC manage patent filing and IP protection for software assets?', weight: 5 },
          { id: 'ii-t-si-3', text: 'Are CoEs established to pilot emerging tech like edge computing or advanced AI/ML adoption?', weight: 5 },
          { id: 'ii-t-si-4', text: 'Does the GCC participate in open-source communities or tech incubators to foster innovation?', weight: 4 },
        ],
        'Media & Entertainment': [
          { id: 'ii-t-me-1', text: 'How effectively does the GCC manage IP related to digital assets and digital rights management?', weight: 5 },
          { id: 'ii-t-me-2', text: 'How frequently does the GCC experiment with new content formats (AR/VR, interactive media)?', weight: 4 },
          { id: 'ii-t-me-3', text: 'Are innovation outcomes tracked in engagement, revenue per viewer, or content virality?', weight: 4 },
        ],
        'Telecom / Network Services': [
          { id: 'vg-t-tn-1', text: 'Does the GCC drive innovation in 5G, network automation, and edge computing platforms?', weight: 5 },
          { id: 'vg-t-tn-2', text: 'Are CoEs established for IoT innovation or next-gen service orchestration?', weight: 4 },
          { id: 'vg-t-tn-3', text: 'How does the GCC manage IPs related to network optimization or AI-driven customer service?', weight: 5 },
          { id: 'vg-t-tn-4', text: 'How effectively does the GCC collaborate with hyperscalers or vendors on new service models?', weight: 4 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: [
        { id: 'ii-e-core-1', text: 'Is there a formal mandate for innovation and problem discovery?', weight: 5 },
        { id: 'ii-e-core-2', text: 'Are there dedicated incubation/innovation teams or labs?', weight: 4 },
        { id: 'ii-e-core-3', text: 'Does the GCC drive process or operational innovation in energy management, grid automation, or sustainability analytics?', weight: 5 },
        { id: 'ii-e-core-4', text: 'Does the GCC manage or co-develop IP in clean energy, renewable optimization, or predictive asset maintenance?', weight: 5 },
        { id: 'ii-e-core-5', text: 'How many proof-of-concepts progressed to production in last 12 months?', weight: 4 },
        { id: 'ii-e-core-6', text: 'Are partnerships with startups/universities used to accelerate innovation?', weight: 4 },
        { id: 'ii-e-core-7', text: 'Is there a process to capture and protect IP created by the GCC?', weight: 5 },
        { id: 'ii-e-core-8', text: 'Does the GCC participate in industry consortia or standard bodies?', weight: 3 },
        { id: 'ii-e-core-9', text: 'Are innovation metrics (time-to-market, adoption rates) tracked?', weight: 4 },
        { id: 'ii-e-core-10', text: 'Are there commercialization pilots that generate revenue or cost savings?', weight: 4 },
        { id: 'ii-e-core-11', text: 'How effectively does the GCC collaborate with technology partners and universities on green innovation?', weight: 4 },
      ],
      subVerticals: {
        'Oil & Gas': [
          { id: 'ii-e-og-1', text: 'Does the GCC drive innovation in exploration analytics, predictive maintenance, or emissions reduction?', weight: 5 },
          { id: 'ii-e-og-2', text: 'Are innovation KPIs tied to asset performance or production efficiency?', weight: 5 },
          { id: 'ii-e-og-3', text: 'Does the GCC co-own IPs in drilling automation or energy simulation technologies?', weight: 5 },
          { id: 'ii-e-og-4', text: 'How effectively does the GCC collaborate with equipment manufacturers for field innovation?', weight: 4 },
        ],
        'Power & Utilities': [
          { id: 'ii-e-pu-1', text: 'Does the GCC lead innovation in grid automation, smart metering, or predictive outage management?', weight: 5 },
          { id: 'ii-e-pu-2', text: 'How actively does the GCC collaborate with technology partners for grid resilience solutions?', weight: 4 },
          { id: 'ii-e-pu-3', text: 'Are GCC track patents or IP generated through renewable integration projects?', weight: 5 },
          { id: 'ii-e-pu-4', text: 'Are innovation metrics linked to service reliability and energy efficiency?', weight: 4 },
        ],
        'Renewable / CleanTech': [
          { id: 'ii-e-rc-1', text: 'Does the GCC participate in innovation programs focused on renewable energy storage and optimization?', weight: 5 },
          { id: 'ii-e-rc-2', text: 'How does the GCC manage IP for clean-energy analytics or carbon management systems?', weight: 5 },
          { id: 'ii-e-rc-3', text: 'Are innovation outcomes linked to emission reduction or energy transition goals?', weight: 5 },
          { id: 'ii-e-rc-4', text: 'Does the GCC collaborate with universities or sustainability consortia for research and pilots?', weight: 4 },
        ],
      },
    },
  },

  'Ecosystem & Partnerships': {
    Manufacturing: {
      top3: [
        { id: 'ep-m-core-1', text: 'Are partner roles defined (co-delivery, advisory, capability build)?', weight: 5 },
        { id: 'ep-m-core-2', text: 'Is there a supplier performance management process?', weight: 4 },
        { id: 'ep-m-core-3', text: 'How effectively does the GCC leverage supplier and logistics partnerships to enhance supply-chain agility?', weight: 5 },
        { id: 'ep-m-core-4', text: 'Are commercial models (risk/reward, outcome-based) used with partners?', weight: 4 },
        { id: 'ep-m-core-5', text: 'How integrated is the partner ecosystem into delivery pipelines (APIs, co-dev)?', weight: 4 },
        { id: 'ep-m-core-6', text: 'Are partner capabilities mapped to GCC strategic needs?', weight: 4 },
        { id: 'ep-m-core-7', text: 'Is there shared governance with strategic partners?', weight: 3 },
        { id: 'ep-m-core-8', text: 'Are technology alliance certifications leveraged (cloud, ISV)?', weight: 4 },
        { id: 'ep-m-core-9', text: 'Does the GCC participate in joint go-to-market or product strategies with partners?', weight: 4 },
        { id: 'ep-m-core-10', text: 'Does the GCC engage with industry consortiums or standards bodies to influence manufacturing best practices?', weight: 4 },
      ],
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'ep-m-ad-1', text: 'Does the GCC collaborate with OEMs, tier-1 suppliers, and engineering partners for joint digital initiatives?', weight: 5 },
          { id: 'ep-m-ad-2', text: 'How effectively does the GCC coordinate with manufacturing automation vendors to scale smart-factory solutions?', weight: 4 },
          { id: 'ep-m-ad-3', text: 'Does the GCC participate in co-innovation programs with local academic or automotive tech labs?', weight: 4 },
          { id: 'ep-m-ad-4', text: 'Are partners evaluated based on the maturity of their contribution to product quality and cost optimization?', weight: 4 },
          { id: 'ep-m-ad-5', text: 'Does the GCC leverage partnerships to accelerate EV, autonomous, or connected-vehicle programs?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'ep-m-pc-1', text: 'How effectively does the GCC collaborate with environmental and safety partners to meet regulatory standards?', weight: 5 },
          { id: 'ep-m-pc-2', text: 'Are partnerships used to introduce advanced analytics, simulation tools, or sustainable manufacturing solutions?', weight: 4 },
          { id: 'ep-m-pc-3', text: 'Does the GCC participate in global industry associations for safety and regulatory topics?', weight: 4 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'ep-m-ie-1', text: 'Does the GCC collaborate with industrial automation providers for product-engineering or asset-management innovation?', weight: 5 },
          { id: 'ep-m-ie-2', text: 'Are engineering service partners engaged for rapid prototyping or digital-twin development?', weight: 4 },
        ],
      },
    },
    BFSI: {
      top3: [
        { id: 'ep-b-core-1', text: 'Are partner roles defined (co-delivery, advisory, capability build)?', weight: 5 },
        { id: 'ep-b-core-2', text: 'Is there a supplier performance management process?', weight: 4 },
        { id: 'ep-b-core-3', text: 'How well does the GCC coordinate with ecosystem partners to deliver integrated financial services platforms?', weight: 5 },
        { id: 'ep-b-core-4', text: 'Are commercial models (risk/reward, outcome-based) used with partners?', weight: 4 },
      ],
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'ep-b-rc-1', text: 'Does the GCC engage with fintechs for AI-driven onboarding, payments, or credit assessment pilots?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'ep-b-cm-1', text: 'Does the GCC collaborate with market-data providers, trading-platform vendors, or quant-research firms?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 'tm-b-ii-1', text: 'How mature are actuarial and claims-specialist talent pipelines within the GCC?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: [
        { id: 'ep-h-core-1', text: 'Are partner roles defined (co-delivery, advisory, capability build)?', weight: 5 },
      ],
      subVerticals: {
        Pharmaceuticals: [
          { id: 'ep-h-p-1', text: 'Does the GCC collaborate with CROs, academic or research institutions, or clinical technology vendors?', weight: 5 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: [
        { id: 'ep-r-core-1', text: 'Are partner roles defined (co-delivery, advisory, capability build)?', weight: 5 },
      ],
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'ep-r-eo-1', text: 'Does the GCC partner with digital-experience vendors to enhance personalization and customer engagement?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: [
        { id: 'ep-t-core-1', text: 'Are partner roles defined (co-delivery, advisory, capability build)?', weight: 5 },
      ],
      subVerticals: {
        'Software & IT Services': [
          { id: 'ep-t-si-1', text: 'Does the GCC collaborate with hyperscalers, SaaS providers, or open-source communities for platform innovation?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: [
        { id: 'ep-e-core-1', text: 'Are partner roles defined (co-delivery, advisory, capability build)?', weight: 5 },
      ],
      subVerticals: {
        'Oil & Gas': [
          { id: 'ep-e-og-1', text: 'Does the GCC collaborate with drilling technology providers, seismic analytics firms, or EPC partners?', weight: 5 },
        ],
      },
    },
  },

  'Risk & Compliance': {
    Manufacturing: {
      top3: SHARED_RC_GENERIC('m', 'Does the GCC ensure compliance with manufacturing standards (ISO, OSHA, environmental norms) and internal policies?', 'How effectively does the GCC identify and manage risks related to plant safety, supply chain disruption, and equipment failure?', 'Does the GCC have a framework to monitor cybersecurity and IP protection across connected factory environments?'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'rc-m-ad-1', text: 'Does the GCC ensure compliance with product safety standards, homologation requirements, and global recall protocols?', weight: 5 },
          { id: 'rc-m-ad-2', text: 'Are cybersecurity and privacy risks managed for connected products and manufacturing systems?', weight: 5 },
          { id: 'rc-m-ad-3', text: 'Are supplier and tier-1/tier-2 risks regularly monitored for quality, delivery, and compliance failures?', weight: 5 },
          { id: 'rc-m-ad-4', text: 'Does the GCC support compliance with environmental standards, including emissions and sustainability audits?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'rc-m-pc-1', text: 'Does the GCC ensure compliance with GMP, GxP, and global chemical handling standards?', weight: 5 },
          { id: 'rc-m-pc-2', text: 'How effectively are regulatory submission risks managed across regions such as FDA, EMA, and REACH?', weight: 5 },
          { id: 'rc-m-pc-3', text: 'Is there a structured framework for managing clinical trial risks and automated EHS frameworks?', weight: 5 },
          { id: 'rc-m-pc-4', text: 'Are laboratory systems and process automation tools audited regularly for data integrity and compliance?', weight: 5 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'rc-m-ie-1', text: 'Are field-service, equipment reliability, and warranty risks regularly assessed?', weight: 5 },
          { id: 'rc-m-ie-2', text: 'How effectively are engineering vendors and testing partners monitored for compliance adherence?', weight: 5 },
          { id: 'rc-m-ie-3', text: 'Does the GCC manage cyber and operational risks associated with industrial control systems?', weight: 5 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_BFSI_RC_GENERIC('b'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'rc-b-rc-1', text: 'Does the GCC ensure compliance with KYC/AML, transaction monitoring, and customer data-protection standards?', weight: 5 },
          { id: 'rc-b-rc-2', text: 'How effectively are fraud, cyberattack, and operational risk incidents identified and escalated?', weight: 5 },
          { id: 'rc-b-rc-3', text: 'Are regulatory changes (Basel, FATF, PCI DSS) actively tracked and applied across GCC processes?', weight: 5 },
          { id: 'rc-b-rc-4', text: 'Does the GCC conduct regular controls testing across credit, operational, and liquidity risk areas?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'rc-b-cm-1', text: 'Does the GCC maintain strong controls for market abuse, insider trading, and trade-surveillance risks?', weight: 5 },
          { id: 'rc-b-cm-2', text: 'How effectively does the GCC manage model risk and algorithmic trading compliance?', weight: 5 },
          { id: 'rc-b-cm-3', text: 'Are client assets and data protection risks managed through structured quality checks?', weight: 5 },
          { id: 'rc-b-cm-4', text: 'Does the GCC maintain compliance frameworks aligned with SEC, MiFID II, FINRA, and similar mandates?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 'rc-b-ii-1', text: 'Does the GCC ensure compliance with underwriting, claims, and actuarial risk guidelines?', weight: 5 },
          { id: 'rc-b-ii-2', text: 'How effectively are fraudulent claims detected and reported using automated tools?', weight: 5 },
          { id: 'rc-b-ii-3', text: 'Are policyholder data-protection risks monitored according to regulatory expectations?', weight: 5 },
          { id: 'rc-b-ii-4', text: 'Does the GCC ensure compliance with region-specific insurance regulations and product filing requirements?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: HEALTHCARE_RC_GENERIC('h'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'rc-h-p-1', text: 'Does the GCC ensure adherence to regulatory norms like KYC, AML, and data privacy across global operations?', weight: 5 },
          { id: 'rc-h-p-2', text: 'Does the GCC support compliance with clinical trial regulations and pharmacovigilance reporting?', weight: 5 },
          { id: 'rc-h-p-3', text: 'How effectively does the GCC manage risks related to research data integrity and laboratory systems?', weight: 5 },
          { id: 'rc-h-p-4', text: 'Are compliance risks for global regulatory submissions monitored through structured governance routines?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 'rc-h-m-1', text: 'Does the GCC maintain compliance with device regulations such as ISO 13485, FDA QSR, and CE marking?', weight: 5 },
          { id: 'rc-h-m-2', text: 'Are device-quality and post-market surveillance risks tracked effectively?', weight: 5 },
          { id: 'rc-h-m-3', text: 'Are product-design documentation and testing procedures regularly reviewed for compliance?', weight: 5 },
          { id: 'rc-h-m-4', text: 'Does the GCC manage cyber and operational risks for connected and smart medical devices?', weight: 5 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'rc-h-pp-1', text: 'Does the GCC ensure compliance with healthcare data-privacy standards such as HIPAA, HITRUST, and GDPR?', weight: 5 },
          { id: 'rc-h-pp-2', text: 'How effectively are patient-safety risks and clinical-quality stability risks monitored?', weight: 5 },
          { id: 'rc-h-pp-3', text: 'Are fraud, billing, and claims-compliance risks assessed regularly?', weight: 5 },
          { id: 'rc-h-pp-4', text: 'Does the GCC maintain security and compliance controls for telehealth and remote-care platforms?', weight: 5 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_RC_GENERIC('r', 'How does the GCC ensure adherence to consumer data protection, product quality, and local retail compliance norms?', 'How effectively does the GCC manage risks around consumer trust, product recalls, and digital payment security?', 'Does the GCC monitor reputational risks and regulatory changes affecting cross-border retail operations?'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'rc-r-eo-1', text: 'How effectively does the GCC manage fraud and payment-security risks across digital channels?', weight: 5 },
          { id: 'rc-r-eo-2', text: 'Are marketplace, fulfillment, and logistics partners audited for compliance on a regular basis?', weight: 5 },
          { id: 'rc-r-eo-3', text: 'Are risks related to marketing compliance, consumer consent, and targeted advertising monitored?', weight: 5 },
          { id: 'rc-r-eo-4', text: 'How does the GCC ensure adherence to consumer data protection, product quality, and local retail compliance norms?', weight: 5 },
        ],
        'FMCG / CPG': [
          { id: 'rc-r-fc-1', text: 'Does the GCC ensure compliance with product labeling, safety, and consumer-protection standards?', weight: 5 },
          { id: 'rc-r-fc-2', text: 'How effectively are sourcing, supplier-quality, and supply-chain risks monitored?', weight: 5 },
          { id: 'rc-r-fc-3', text: 'Are sustainability, packaging compliance, and environmental reporting risks regularly assessed?', weight: 5 },
          { id: 'rc-r-fc-4', text: 'Does the GCC track risks arising from promotions, pricing, and marketing claims?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 'rc-r-ls-1', text: 'Does the GCC manage brand-protection risks, including counterfeit prevention and IP safeguarding?', weight: 5 },
          { id: 'rc-r-ls-2', text: 'How effectively are privacy and security risks for loyalty and VIP customer programs managed?', weight: 5 },
          { id: 'rc-r-ls-3', text: 'How does the GCC identify and manage risks related to brand and quality standards?', weight: 5 },
          { id: 'rc-r-ls-4', text: 'Does the GCC track compliance risks related to international trade and movement of high-value goods?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_RC_GENERIC('t', 'How does the GCC ensure compliance with data privacy, cybersecurity, and global content distribution laws?', 'How effectively does the GCC identify and mitigate technology, IP, and operational continuity risks?', 'Does the GCC have an enterprise-wide governance framework for managing data sovereignty and AI ethics?'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'rc-t-si-1', text: 'Does the GCC ensure secure development practices and compliance with SDLC/DevSecOps standards?', weight: 5 },
          { id: 'rc-t-si-2', text: 'How effectively are software-licensing and open-source compliance monitored consistently?', weight: 5 },
          { id: 'rc-t-si-3', text: 'Are cloud-security, infrastructure, and access-management risks assessed regularly?', weight: 5 },
          { id: 'rc-t-si-4', text: 'Does the GCC maintain certifications such as ISO 27001 or SOC 2 to strengthen compliance posture?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'rc-t-me-1', text: 'Does the GCC ensure compliance with copyright laws, licensing rules, and digital content regulations?', weight: 5 },
          { id: 'rc-t-me-2', text: 'How effectively are viewer-data privacy and content-distribution risks managed?', weight: 5 },
          { id: 'rc-t-me-3', text: 'Are content moderation and broadcast-compliance risks monitored consistently?', weight: 5 },
          { id: 'rc-t-me-4', text: 'Does the GCC assess third-party risks associated with streaming, AdTech, or distribution platforms?', weight: 5 },
        ],
        'Telecom / Network Services': [
          { id: 'rc-t-tn-1', text: 'Does the GCC maintain compliance with telecom regulatory requirements and network operation standards?', weight: 5 },
          { id: 'rc-t-tn-2', text: 'How effectively are network-security, outage, and service-continuity risks monitored?', weight: 5 },
          { id: 'rc-t-tn-3', text: 'Are vendor and equipment-provider risks evaluated for security and regulatory adherence?', weight: 5 },
          { id: 'rc-t-tn-4', text: 'Are spectrum-usage and international-service compliance risks monitored across different regions?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_RC_GENERIC('e', 'How does the GCC ensure compliance with energy sector regulations, safety protocols, and environmental standards?', 'How effectively does the GCC assess and mitigate risks related to plant reliability, grid security, and regulatory changes?', 'Does the GCC collaborate with government bodies and regulators to ensure proactive risk management and policy alignment?'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'rc-e-og-1', text: 'Does the GCC ensure compliance with EHS regulations across upstream, midstream, and downstream operations?', weight: 5 },
          { id: 'rc-e-og-2', text: 'How effectively are risks related to exploration, refining, and pipeline operations monitored?', weight: 5 },
          { id: 'rc-e-og-3', text: 'Are ICS/SCADA cyber-risks assessed and escalated appropriately?', weight: 5 },
          { id: 'rc-e-og-4', text: 'Does the GCC conduct structured compliance assessments for contractors and field partners?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 'rc-e-pu-1', text: 'How effectively does the GCC identify and manage risks related to power generation and grid stability?', weight: 5 },
          { id: 'rc-e-pu-2', text: 'How effectively are outage, load-management, and reliability risks monitored?', weight: 5 },
          { id: 'rc-e-pu-3', text: 'Are aging infrastructure and asset-management risks documented and escalated?', weight: 5 },
          { id: 'rc-e-pu-4', text: 'Are vendor risks for metering, automation, and energy storage systems evaluated regularly?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 'rc-e-rc-1', text: 'Does the GCC ensure compliance with renewable energy policies, permits, and regulatory frameworks?', weight: 5 },
          { id: 'rc-e-rc-2', text: 'How effectively are risks monitored for grid integration, intermittency, and energy storage performance?', weight: 5 },
          { id: 'rc-e-rc-3', text: 'Are sustainability reporting, emissions compliance, and climate-related risks tracked regularly?', weight: 5 },
          { id: 'rc-e-rc-4', text: 'Does the GCC manage health and safety risks for remote asset sites and battery systems?', weight: 5 },
        ],
      },
    },
  },

  'Sustainability': {
    Manufacturing: {
      top3: SHARED_S_GENERIC('m', 'How does the GCC drive ESG initiatives through process optimization, green manufacturing, and responsible sourcing?', 'Does the GCC collaborate with vendors and partners to achieve sustainability targets across the value chain?'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 's-m-ad-1', text: 'Does the GCC evaluate sustainability risks associated with global suppliers of metals, plastics, batteries, and electronics?', weight: 5 },
          { id: 's-m-ad-2', text: 'How effectively does the GCC integrate sustainability insights into product lifecycle management (PLM) workflows?', weight: 5 },
          { id: 's-m-ad-3', text: 'Does the GCC track environmental impact related to test labs, prototyping, and product validation activities?', weight: 5 },
          { id: 's-m-ad-4', text: 'How well does the GCC support digital-twin-based sustainability programs such as smart factory or Industry 4.0?', weight: 5 },
          { id: 's-m-ad-5', text: 'Does the GCC track and report on sustainability metrics such as energy efficiency, waste reduction, and carbon emissions?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 's-m-pc-1', text: 'Does the GCC support sustainability controls for chemical inventory management and hazardous material tracking?', weight: 5 },
          { id: 's-m-pc-2', text: 'How effectively are emissions, wastewater, and effluent risks integrated into compliance dashboards?', weight: 5 },
          { id: 's-m-pc-3', text: 'Are there sustainability scorecard requirements for procurement of solvents, reagents, and raw materials?', weight: 5 },
          { id: 's-m-pc-4', text: 'Does the GCC support audits related to environmental permits, REACH compliance, or toxic substance handling?', weight: 5 },
          { id: 's-m-pc-5', text: 'Does the GCC track and report on sustainability metrics such as energy efficiency, waste reduction, and carbon emissions?', weight: 5 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 's-m-ie-1', text: 'Does the GCC evaluate the environmental footprint of large-scale machinery logistics, transport, and field service?', weight: 5 },
          { id: 's-m-ie-2', text: 'How effectively does the GCC track and minimize scope 1 and scope 2 emissions from test benches, labs, or heavy prototyping?', weight: 5 },
          { id: 's-m-ie-3', text: 'Are circularity and recycling standards integrated into engineering BOMs and component sourcing decisions?', weight: 5 },
          { id: 's-m-ie-4', text: 'Does the GCC maintain sustainability checklists for equipment upgrades, retrofits, and modernization programs?', weight: 5 },
          { id: 's-m-ie-5', text: 'Does the GCC track and report on sustainability metrics such as energy efficiency, waste reduction, and carbon emissions?', weight: 5 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_S_GENERIC('b', 'Does the GCC monitor and report ESG performance across financial operations and vendor networks?', 'Does the GCC have mechanisms to ensure ethical and responsible AI in financial decision-making?'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 's-b-rc-1', text: 'Does the GCC monitor sustainability adherence for outsourced operations such as contact centers or KPO teams?', weight: 5 },
          { id: 's-b-rc-2', text: 'How effectively are sustainability principles embedded in process re-engineering initiatives (paper elimination, automation)?', weight: 5 },
          { id: 's-b-rc-3', text: 'Does the GCC support ESG data collection and reporting for the parent bank\'s lending and investment portfolios?', weight: 5 },
          { id: 's-b-rc-4', text: 'Are cloud workloads, compute usage, and digital infrastructure monitored for sustainability improvements?', weight: 5 },
          { id: 's-b-rc-5', text: 'Does the GCC monitor and report ESG performance across financial operations and vendor networks?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 's-b-cm-1', text: 'Does the GCC help validate ESG scoring methodologies used by analysts, traders, or portfolio managers?', weight: 5 },
          { id: 's-b-cm-2', text: 'How effectively is sustainability data integrated into risk modeling, pricing decisions, and valuation tools?', weight: 5 },
          { id: 's-b-cm-3', text: 'Does the GCC track environmental impact associated with high-performance compute (HPC) workloads for trading?', weight: 5 },
          { id: 's-b-cm-4', text: 'Are GCC teams involved in sustainability-aligned regulatory reporting such as TCFD, SFDR, or ISSB?', weight: 5 },
          { id: 's-b-cm-5', text: 'Does the GCC monitor and report ESG performance across financial operations and vendor networks?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 's-b-ii-1', text: 'Does the GCC monitor sustainability adherence for third-party TPAs, surveyors, and claims partners?', weight: 5 },
          { id: 's-b-ii-2', text: 'How effectively does the GCC track climate-related factors in catastrophe modeling and exposure analytics?', weight: 5 },
          { id: 's-b-ii-3', text: 'Are sustainability risk assessments for third-party TPAs, surveyors, and claims partners?', weight: 5 },
          { id: 's-b-ii-4', text: 'Does the GCC support reporting for sustainability-linked insurance products or climate-resilient offerings?', weight: 5 },
          { id: 's-b-ii-5', text: 'Does the GCC monitor and report ESG performance across financial operations and vendor networks?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_S_GENERIC('h', 'How does the GCC contribute to sustainable healthcare delivery and ethical research practices?', 'Does the GCC have mechanisms to ensure ethical and responsible AI in clinical trials and clinical research practices?'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 's-h-p-1', text: 'Does the GCC support sustainability tracking for cold-chain logistics, temperature-controlled distribution, and packaging?', weight: 5 },
          { id: 's-h-p-2', text: 'Does the GCC conduct sustainability assessments and scorecard evaluation for CROs and manufacturing partners?', weight: 5 },
          { id: 's-h-p-3', text: 'Are research, toxicity, and lab-generated waste monitored using structured sustainability frameworks?', weight: 5 },
          { id: 's-h-p-4', text: 'Does the GCC maintain compliance dashboards for drug sustainability claims, eco-packaging, or green chemistry?', weight: 5 },
          { id: 's-h-p-5', text: 'Does the GCC measure sustainability through energy-efficient lab operations and responsible clinical waste management?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 's-h-m-1', text: 'Does the GCC track and publish data on environmental footprint and compliance with global sustainability standards?', weight: 5 },
          { id: 's-h-m-2', text: 'Does the GCC support optimization of delivery routes, packaging choices, and logistics networks to reduce emissions?', weight: 5 },
          { id: 's-h-m-3', text: 'How effectively does the GCC track sustainability compliance for marketplace sellers and drop-ship partners?', weight: 5 },
          { id: 's-h-m-4', text: 'Are sustainability targets integrated into quality management systems (QMS) and device documentation?', weight: 5 },
          { id: 's-h-m-5', text: 'Are suppliers evaluated for responsible sourcing of rare earth metals, plastics, or specialized components?', weight: 5 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 's-h-pp-1', text: 'Does the GCC track and publish data on environmental footprint and compliance with global sustainability standards?', weight: 5 },
          { id: 's-h-pp-2', text: 'Are sustainability and carbon metrics tied to hospital operations, medical equipment usage, or telehealth scalability?', weight: 5 },
          { id: 's-h-pp-3', text: 'How effectively are sustainability-related risks (energy use, waste handling, facility emissions) embedded in operational audits?', weight: 5 },
          { id: 's-h-pp-4', text: 'Does the GCC evaluate sustainability compliance for medical supplies, pharma partners, and healthcare service vendors?', weight: 5 },
          { id: 's-h-pp-5', text: 'Are digital health platforms assessed for sustainable compute usage, hosting efficiency, and carbon footprint?', weight: 5 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_S_GENERIC('r', 'How does the GCC embed sustainability into customer experience, supplier management, and digital commerce?', 'Does the GCC lead initiatives for circular economy and responsible consumption?'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 's-r-eo-1', text: 'Does the GCC track and publish data on environmental footprint and compliance with global sustainability standards?', weight: 5 },
          { id: 's-r-eo-2', text: 'Does the GCC support optimization of delivery routes, packaging choices, and logistics networks to reduce emissions?', weight: 5 },
          { id: 's-h-m-3', text: 'How effectively does the GCC track sustainability compliance for marketplace sellers and drop-ship partners?', weight: 5 },
          { id: 's-r-eo-4', text: 'Are sustainability metrics integrated into demand forecasting, warehouse operations, and fulfillment planning?', weight: 5 },
          { id: 's-r-eo-5', text: 'Does the GCC enable circular economy features like returns optimization, resale channels, and refurbishment models?', weight: 5 },
        ],
        'FMCG / CPG': [
          { id: 's-r-fc-1', text: 'Does the GCC track sustainability impact across promotional activities, product launches, or supply-chain campaigns?', weight: 5 },
          { id: 's-r-fc-2', text: 'How effectively are sustainability standards built into new product development and formula-change workflows?', weight: 5 },
          { id: 's-r-fc-3', text: 'Are agricultural, commodity, or packaging suppliers evaluated for environmental and social impact?', weight: 5 },
          { id: 's-r-fc-4', text: 'Does the GCC support plastic footprint measurement, recycling initiatives, or zero-waste program tracking?', weight: 5 },
          { id: 's-r-fc-5', text: 'Does the GCC lead initiatives for circular economy and responsible consumption?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 's-r-ls-1', text: 'Does the GCC monitor sustainability risks across global artisanal supply chains, precious metals, and ethical sourcing?', weight: 5 },
          { id: 's-r-ls-2', text: 'How effectively are sustainability standards embedded into brand heritage programs and craftsmanship guidelines?', weight: 5 },
          { id: 's-r-ls-3', text: 'Are vendors audited for sustainable labor, ethical production, and eco-friendly packaging?', weight: 5 },
          { id: 's-r-ls-4', text: 'Does the GCC support ESG transparency for traceability of luxury goods across regions?', weight: 5 },
          { id: 's-r-ls-5', text: 'Does the GCC lead initiatives for circular economy and responsible consumption?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_S_GENERIC('t', 'How does the GCC drive digital sustainability by optimizing infrastructure and reducing energy footprint?', 'Does the GCC collaborate with technology partners to build sustainable innovation practices?'),
      subVerticals: {
        'Software & IT Services': [
          { id: 's-t-si-1', text: 'Does the GCC evaluate the sustainability performance of cloud regions, compute clusters, and data-center choices?', weight: 5 },
          { id: 's-t-si-2', text: 'How effectively are sustainability parameters embedded into DevOps pipelines (power-efficient code, computing optimization)?', weight: 5 },
          { id: 's-t-si-3', text: 'Are enterprise tools assessed for renewable energy sourcing, green certifications, and sustainability commitments?', weight: 5 },
          { id: 's-t-si-4', text: 'Does the GCC measure carbon impact from data retention, model training, and AI/ML workloads?', weight: 5 },
          { id: 's-t-si-5', text: 'Does the GCC monitor sustainability KPIs such as data center energy consumption, e-waste management, and carbon?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 's-t-me-1', text: 'Does the GCC track sustainability metrics across production studios, post-production teams, and streaming operations?', weight: 5 },
          { id: 's-t-me-2', text: 'How effectively does the GCC collaborate with content partners to adopt low-energy production or eco-friendly sets?', weight: 5 },
          { id: 's-t-me-3', text: 'Are CDNs evaluated for energy efficiency, renewable usage, and sustainability certifications?', weight: 5 },
          { id: 's-t-me-4', text: 'Does the GCC track emissions associated with high-bandwidth streaming and global distribution workloads?', weight: 5 },
          { id: 's-t-me-5', text: 'Does the GCC monitor sustainability KPIs such as data center energy consumption, e-waste management, and carbon?', weight: 5 },
        ],
        'Telecom / Network Services': [
          { id: 's-t-tn-1', text: 'Does the GCC assess sustainability performance of network rollout programs like fiber, 5G, and small-cell installations?', weight: 5 },
          { id: 's-t-tn-2', text: 'How effectively are power-heavy network nodes monitored for energy efficiency and renewable usage?', weight: 5 },
          { id: 's-t-tn-3', text: 'Are telecom vendors and equipment providers evaluated for sustainability compliance across manufacturing and tower operations?', weight: 5 },
          { id: 's-t-tn-4', text: 'Does the GCC track sustainability metrics for field service mobility, repairs, and equipment lifecycle programs?', weight: 5 },
          { id: 's-t-tn-5', text: 'Does the GCC monitor sustainability KPIs such as data center energy consumption, e-waste management, and carbon?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_S_GENERIC('e', 'How does the GCC drive enterprise ESG strategy through renewable energy projects and carbon-neutral operations?', 'Does the GCC participate in national or international sustainability reporting programs?'),
      subVerticals: {
        'Oil & Gas': [
          { id: 's-e-og-1', text: 'Does the GCC track sustainability factors tied to exploration data, seismic operations, or drilling schedules?', weight: 5 },
          { id: 's-e-og-2', text: 'How effectively are sustainability-related deviations escalated from field operations to global leadership?', weight: 5 },
          { id: 's-e-og-3', text: 'Does the GCC evaluate ESG risks related to contractor safety, hazardous logistics, and environmental impacts?', weight: 5 },
          { id: 's-e-og-4', text: 'Are carbon intensity measures integrated into production reporting and compliance dashboards?', weight: 5 },
          { id: 's-e-og-5', text: 'Does the GCC measure and track sustainability metrics such as emissions reduction, renewable energy share, and resource use?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 's-e-pu-1', text: 'Does the GCC track sustainability KPIs related to grid resilience, renewable mix, and power-loss reduction?', weight: 5 },
          { id: 's-e-pu-2', text: 'How effectively are partners evaluated for sustainability compliance in metering, cabling, and infrastructure upgrades?', weight: 5 },
          { id: 's-e-pu-3', text: 'Are carbon reduction initiatives integrated into demand-response and grid-stabilization programs?', weight: 5 },
          { id: 's-e-pu-4', text: 'Does the GCC support reporting for regulatory audits related to sustainability and energy efficiency?', weight: 5 },
          { id: 's-e-pu-5', text: 'Does the GCC measure and track sustainability metrics such as emissions reduction, renewable energy share, and resource use?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 's-e-rc-1', text: 'Does the GCC monitor sustainability metrics for solar farms, wind farms, hydrogen systems, and storage units?', weight: 5 },
          { id: 's-e-rc-2', text: 'How effectively does the GCC track supply-chain sustainability across turbine, panel, and battery manufacturers?', weight: 5 },
          { id: 's-e-rc-3', text: 'Are ESG risks assessed for renewable project partners, EPC contractors, and O&M vendors?', weight: 5 },
          { id: 's-e-rc-4', text: 'Does the GCC integrate sustainability considerations into renewable asset forecasting, monitoring, and optimization?', weight: 5 },
          { id: 's-e-rc-5', text: 'Does the GCC measure and track sustainability metrics such as emissions reduction, renewable energy share, and resource use?', weight: 5 },
        ],
      },
    },
  },

  'Organization Agility': {
    Manufacturing: {
      top3: SHARED_OA_GENERIC('m', 'Does the GCC use agile or lean governance models to support cross-functional decision-making between operations, R&D, and manufacturing?', 'How quickly can the GCC respond to production shifts, supply chain disruptions, or new product introductions?'),
      subVerticals: {
        'Automotive / Discrete': [
          { id: 'oa-m-ad-1', text: 'How quickly can the GCC adjust engineering or software workflows to support rapid design changes or product refreshes?', weight: 5 },
          { id: 'oa-m-ad-2', text: 'Are GCC teams able to re-align priorities when supply-chain or vendor disruptions occur?', weight: 5 },
          { id: 'oa-m-ad-3', text: 'How effectively does the GCC collaborate with plant, R&D, and sourcing teams to accelerate cross-functional decisions?', weight: 5 },
          { id: 'oa-m-ad-4', text: 'Are digital manufacturing or PLM tools leveraged to adapt quickly to new compliance, safety, or platform requirements?', weight: 5 },
        ],
        'Process / Chemical / Pharma': [
          { id: 'oa-m-pc-1', text: 'How effectively can teams pivot when regulatory changes impact manufacturing, quality, or documentation processes?', weight: 5 },
          { id: 'oa-m-pc-2', text: 'Are cross-functional lab, quality, and compliance teams enabled to coordinate quickly for audit readiness?', weight: 5 },
          { id: 'oa-m-pc-3', text: 'How mature is the GCC\'s rapid-response capability for product recalls, regulatory queries, or safety events?', weight: 5 },
          { id: 'oa-m-pc-4', text: 'Are agile practices embedded into documentation-heavy environments like GxP and validation workflows?', weight: 5 },
        ],
        'Industrial Equipment / Heavy Engineering': [
          { id: 'oa-m-ie-1', text: 'How quickly can engineering and field-service support teams respond to design updates, equipment failures, or customer requests?', weight: 5 },
          { id: 'oa-m-ie-2', text: 'Are GCC teams empowered to collaborate efficiently across engineering, procurement, and installation support?', weight: 5 },
          { id: 'oa-m-ie-3', text: 'Does the GCC regularly re-align engineering priorities based on production schedules or global maintenance priorities?', weight: 5 },
          { id: 'oa-m-ie-4', text: 'Are agile project structures used in large, multi-year engineering programs to maintain delivery flexibility?', weight: 5 },
        ],
      },
    },
    BFSI: {
      top3: SHARED_OA_GENERIC('b', 'Does the GCC operate with agile pods or cross-functional squads to accelerate delivery of digital banking and customer services?', 'How quickly can the GCC adapt to regulatory changes, digital adoption trends, and new product launches across markets?'),
      subVerticals: {
        'Retail & Corporate Banking': [
          { id: 'oa-b-rc-1', text: 'How effectively does the GCC enable digital workflows to enhance plant-level responsiveness and reduce downtime?', weight: 5 },
          { id: 'oa-b-rc-2', text: 'Does the GCC rapidly adapt operations and analytics to updated KYC, AML, or regulatory mandates?', weight: 5 },
          { id: 'oa-b-rc-3', text: 'How quickly can GCC fraud-analytics or customer-support teams coordinate during fraud spikes or market changes?', weight: 5 },
          { id: 'oa-b-rc-4', text: 'Are agile squads used for rolling out new digital banking features at speed?', weight: 5 },
          { id: 'oa-b-rc-5', text: 'Does the GCC dynamically reassign capacity to priority processes (e.g., onboarding, lending, dispute resolution)?', weight: 5 },
        ],
        'Capital Markets / Investment Banking': [
          { id: 'oa-b-cm-1', text: 'How effectively does the GCC foster a culture of agility through rapid experimentation and iterative service delivery?', weight: 5 },
          { id: 'oa-b-cm-2', text: 'How effectively do cross-functional teams (trading support, risk, compliance) collaborate during market volatility?', weight: 5 },
          { id: 'oa-b-cm-3', text: 'Are agile frameworks adopted for building financial models, data pipelines, and regulatory reporting tools?', weight: 5 },
          { id: 'oa-b-cm-4', text: 'Can the GCC quickly mobilize talent for new asset classes, regulations, or trading workflows?', weight: 5 },
        ],
        'Insurance / InsurTech': [
          { id: 'oa-b-ii-1', text: 'How effectively does the GCC foster a culture of agility through rapid experimentation and iterative service delivery?', weight: 5 },
          { id: 'oa-b-ii-2', text: 'How quickly can underwriting, product-development, and claims teams re-align operations after policy or pricing changes?', weight: 5 },
          { id: 'oa-b-ii-3', text: 'Are cross-functional squads leveraged to accelerate deployment of new insurance products or digital features?', weight: 5 },
          { id: 'oa-b-ii-4', text: 'Does the GCC rapidly scale fraud detection or claims automation workflows during high-volume periods?', weight: 5 },
          { id: 'oa-b-ii-5', text: 'Are agile structures embedded into product filing, regulatory submissions, and customer servicing processes?', weight: 5 },
        ],
      },
    },
    'Healthcare & Life Sciences': {
      top3: SHARED_OA_GENERIC('h', 'Does the GCC leverage agile processes to support faster clinical data analysis, trials, and product go-to-market?', 'How quickly can the GCC adapt to new regulatory requirements, product approvals, or market access changes?'),
      subVerticals: {
        Pharmaceuticals: [
          { id: 'oa-h-p-1', text: 'How effectively does the GCC foster a culture of agility through rapid experimentation and iterative service delivery?', weight: 5 },
          { id: 'oa-h-p-2', text: 'How fast can GCC teams adjust clinical, regulatory, or safety workflows when protocols or reporting needs change?', weight: 5 },
          { id: 'oa-h-p-3', text: 'Are cross-functional teams structured to accelerate coordination between R&D, quality, and regulatory operations?', weight: 5 },
          { id: 'oa-h-p-4', text: 'Can the GCC quickly scale resources for submissions, PV case surges, or trial expansions?', weight: 5 },
          { id: 'oa-h-p-5', text: 'Are agile methods adapted to heavily regulated processes without compromising compliance?', weight: 5 },
        ],
        'Medical Devices': [
          { id: 'oa-h-m-1', text: 'How effectively does the GCC enable cross-functional collaboration between R&D, compliance, and supply chain teams?', weight: 5 },
          { id: 'oa-h-m-2', text: 'How quickly can design, documentation, and testing teams respond to new regulatory or product requirements?', weight: 5 },
          { id: 'oa-h-m-3', text: 'Are collaboration workflows agile across R&D, quality, and field-service support teams?', weight: 5 },
          { id: 'oa-h-m-4', text: 'Does the GCC effectively reprioritize work during product recalls, design updates, or post-market surveillance needs?', weight: 5 },
          { id: 'oa-h-m-5', text: 'Are processes designed to support iterative product enhancements and rapid prototyping cycles?', weight: 5 },
        ],
        'Providers / Payers / HealthTech': [
          { id: 'oa-h-pp-1', text: 'How effectively does the GCC enable cross-functional collaboration between R&D, compliance, and supply chain teams?', weight: 5 },
          { id: 'oa-h-pp-2', text: 'How quickly can operations adjust to regulatory or payer policy changes affecting claims, coding, or reimbursement?', weight: 5 },
          { id: 'oa-h-pp-3', text: 'Are cross-functional teams able to align rapidly during spikes in patient volumes or care coordination demands?', weight: 5 },
          { id: 'oa-h-pp-4', text: 'Does the GCC enable fast deployment of digital health features, telemedicine workflows, or EHR enhancements?', weight: 5 },
          { id: 'oa-h-pp-5', text: 'Are agile methods used to iterate on patient experience, provider support, or population-health analytics?', weight: 5 },
        ],
      },
    },
    'Retail & Consumer': {
      top3: SHARED_OA_GENERIC('r', 'Does the GCC apply agile and data-driven operating models to rapidly adjust pricing, promotions, and inventory?', 'How quickly can the GCC respond to consumer demand changes, seasonal peaks, or omnichannel expansion needs?'),
      subVerticals: {
        'E-commerce / Omnichannel': [
          { id: 'oa-r-eo-1', text: 'How effectively does the GCC enable cross-functional collaboration between R&D, compliance, and supply chain teams?', weight: 5 },
          { id: 'oa-r-eo-2', text: 'How fast can GCC teams adapt to pricing, promotion, or assortment changes based on real-time customer behavior?', weight: 5 },
          { id: 'oa-r-eo-3', text: 'Are supply-chain, customer support, and digital product teams aligned through agile ceremonies?', weight: 5 },
          { id: 'oa-r-eo-4', text: 'Can operations scale quickly during peak periods such as holiday seasons or sale events?', weight: 5 },
          { id: 'oa-r-eo-5', text: 'Does the GCC support rapid experimentation across digital storefronts, UX improvements, and marketing campaigns?', weight: 5 },
        ],
        'FMCG / CPG': [
          { id: 'oa-r-fc-1', text: 'How effectively does the GCC promote agility through digital platforms and real-time analytics for customer engagement?', weight: 5 },
          { id: 'oa-r-fc-2', text: 'How quickly can demand-planning and supply-chain teams respond to market shifts or stock fluctuations?', weight: 5 },
          { id: 'oa-r-fc-3', text: 'Are agile cross-functional pods used for rapid product launches, packaging updates, or brand campaigns?', weight: 5 },
          { id: 'oa-r-fc-4', text: 'Does the GCC mobilize resources swiftly during quality issues, recalls, or supplier disruptions?', weight: 5 },
          { id: 'oa-r-fc-5', text: 'Are new product development and innovation cycles supported through iterative and adaptive workflows?', weight: 5 },
        ],
        'Luxury / Specialty': [
          { id: 'oa-r-ls-1', text: 'How effectively does the GCC promote agility through digital platforms and real-time analytics for customer engagement?', weight: 5 },
          { id: 'oa-r-ls-2', text: 'How quickly can GCC teams respond to emerging trends in luxury buying, customer experience, or personalization?', weight: 5 },
          { id: 'oa-r-ls-3', text: 'Are agile processes in place to accelerate brand content creation, digital launches, or market-entry initiatives?', weight: 5 },
          { id: 'oa-r-ls-4', text: 'Can the GCC adapt operational workflows when exclusive product drops or VIP events require rapid coordination?', weight: 5 },
          { id: 'oa-r-ls-5', text: 'Are cross-functional squads between marketing, digital, and boutique operations structured for fast decision flows?', weight: 5 },
        ],
      },
    },
    TMT: {
      top3: SHARED_OA_GENERIC('t', 'Does the GCC operate using DevOps and agile delivery frameworks to enhance responsiveness and innovation?', 'How quickly can the GCC pivot to new technologies, market shifts, or customer requirements in digital and media ecosystems?'),
      subVerticals: {
        'Software & IT Services': [
          { id: 'oa-t-si-1', text: 'How effectively does the GCC promote agility through digital platforms and real-time analytics for customer engagement?', weight: 5 },
          { id: 'oa-t-si-2', text: 'Does the GCC shift priorities rapidly based on product roadmap changes, sprint reprioritization, or incident escalations?', weight: 5 },
          { id: 'oa-t-si-3', text: 'Are cross-functional engineering squads empowered to make rapid decisions on architecture or deployment?', weight: 5 },
          { id: 'oa-t-si-4', text: 'Can infrastructure teams scale up or down quickly based on cloud workloads or customer demand?', weight: 5 },
          { id: 'oa-t-si-5', text: 'How mature are the DevOps practices measured continuously across teams?', weight: 5 },
        ],
        'Media & Entertainment': [
          { id: 'oa-t-me-1', text: 'How effectively does the GCC promote agility through digital platforms and real-time analytics for customer engagement?', weight: 5 },
          { id: 'oa-t-me-2', text: 'How effectively does the GCC manage change across distributed teams while maintaining innovation velocity?', weight: 5 },
          { id: 'oa-t-me-3', text: 'Can GCC teams rapidly adjust to changes in content schedules, platform updates, or production constraints?', weight: 5 },
          { id: 'oa-t-me-4', text: 'Are creative, technical, and analytics teams structured to collaborate in fast iterative cycles?', weight: 5 },
          { id: 'oa-t-me-5', text: 'Does the GCC support quick experimentation with new content formats, audience targeting, and streaming features?', weight: 5 },
          { id: 'oa-t-me-6', text: 'Are agile governance models and lean systems enabled to provide real-time decision authority?', weight: 5 },
        ],
        'Telecom / Network Services': [
          { id: 'oa-t-tn-1', text: 'How effectively does the GCC manage change across distributed teams while maintaining innovation velocity?', weight: 5 },
          { id: 'oa-t-tn-2', text: 'How quickly can GCC teams adapt to network changes, outages, or large-scale rollout plans?', weight: 5 },
          { id: 'oa-t-tn-3', text: 'Are NOC, engineering, and customer experience teams tightly integrated for rapid resolutions?', weight: 5 },
          { id: 'oa-t-tn-4', text: 'Can the GCC dynamically deploy field resources or support new service models on short notice?', weight: 5 },
          { id: 'oa-t-tn-5', text: 'How effectively are network-ops priorities re-aligned during network modernization programs?', weight: 5 },
        ],
      },
    },
    'Energy & Utilities': {
      top3: SHARED_OA_GENERIC('e', 'Does the GCC operate using DevOps and agile delivery frameworks to enhance responsiveness and innovation?', 'How quickly can the GCC pivot to new technologies, market shifts, or customer requirements in digital and media ecosystems?'),
      subVerticals: {
        'Oil & Gas': [
          { id: 'oa-e-og-1', text: 'How effectively does the GCC manage change across distributed teams while maintaining innovation velocity?', weight: 5 },
          { id: 'oa-e-og-2', text: 'How quickly can GCC teams coordinate during drilling schedule changes, safety events, or equipment failures?', weight: 5 },
          { id: 'oa-e-og-3', text: 'Are cross-functional workflows agile across exploration, production, and logistics support teams?', weight: 5 },
          { id: 'oa-e-og-4', text: 'Can the GCC rapidly re-allocate technical resources during regulatory inspections, environmental incidents, or production fluctuations?', weight: 5 },
          { id: 'oa-e-og-5', text: 'Are agile principles embedded into digital oilfield, asset monitoring, and field-service support programs?', weight: 5 },
        ],
        'Power & Utilities': [
          { id: 'oa-e-pu-1', text: 'How effectively does the GCC manage change across distributed teams while maintaining innovation velocity?', weight: 5 },
          { id: 'oa-e-pu-2', text: 'How fast can GCC teams respond to outage events, grid-load fluctuations, or emergency maintenance needs?', weight: 5 },
          { id: 'oa-e-pu-3', text: 'Are cross-functional teams structured to coordinate grid operations, customer support, and field services?', weight: 5 },
          { id: 'oa-e-pu-4', text: 'Does the GCC adapt quickly to regulatory changes impacting billing, metering, or energy efficiency initiatives?', weight: 5 },
          { id: 'oa-e-pu-5', text: 'How mature are agile workflows for integrating distributed energy resources, smart grid, or renewable integration?', weight: 5 },
        ],
        'Renewable / CleanTech': [
          { id: 'oa-e-rc-1', text: 'How effectively does the GCC manage change across distributed teams while maintaining innovation velocity?', weight: 5 },
          { id: 'oa-e-rc-2', text: 'How quickly can teams adjust operations based on real-time asset performance (wind, solar, battery)?', weight: 5 },
          { id: 'oa-e-rc-3', text: 'Are cross-functional pods used for rapid deployment of new renewable projects or technology upgrades?', weight: 5 },
          { id: 'oa-e-rc-4', text: 'Does the GCC support fast iteration in forecasting, grid integration, and energy optimization models?', weight: 5 },
          { id: 'oa-e-rc-5', text: 'How effectively are project priorities re-aligned when incentives, policies, or regulatory requirements change at speed?', weight: 5 },
        ],
      },
    },
  },
};

// Helper for BFSI shared generic which has 11 questions in the image
function SHARED_BFSI_RC_GENERIC(prefix: string) {
  return [
    { id: `rc-${prefix}-gen-b-1`, text: 'How does the GCC ensure adherence to regulatory norms like KYC, AML, and data privacy across global operations?', weight: 5 },
    { id: `rc-${prefix}-gen-b-2`, text: 'Are data protection and privacy regulations (GDPR/local) implemented?', weight: 5 },
    { id: `rc-${prefix}-gen-b-3`, text: 'Is there automated compliance monitoring and reporting?', weight: 4 },
    { id: `rc-${prefix}-gen-b-4`, text: 'Are business continuity and disaster recovery plans validated?', weight: 4 },
    { id: `rc-${prefix}-gen-b-5`, text: 'How are third-party and vendor risks assessed & managed?', weight: 4 },
    { id: `rc-${prefix}-gen-b-6`, text: 'Is access control and privileged access management enforced?', weight: 4 },
    { id: `rc-${prefix}-gen-b-7`, text: 'Are compliance KPIs integrated into GCC performance dashboards?', weight: 4 },
    { id: `rc-${prefix}-gen-b-8`, text: 'Are change-management controls and audit trails in place for critical systems?', weight: 4 },
    { id: `rc-${prefix}-gen-b-9`, text: 'Is there regulatory liaison capability to work with external regulators?', weight: 4 },
    { id: `rc-${prefix}-gen-b-10`, text: 'How effectively does the GCC manage operational and cybersecurity risks in shared service environments?', weight: 5 },
    { id: `rc-${prefix}-gen-b-11`, text: 'Does the GCC participate in regulatory audits and proactively manage compliance reporting requirements?', weight: 5 },
  ];
}

export const DIMENSION_RECOMMENDATIONS: Record<string, { low: string; medium: string; high: string }> = {
  'Vision & Governance': {
    low: 'Define a clear GCC mandate and set up a formal governance forum.',
    medium: 'Tighten governance cadence and clarify decision rights.',
    high: 'Evolve to governance around product value streams using portfolio dashboards.'
  },
  'Sustainability': {
    low: 'Start measuring core ESG metrics (energy, waste) and create awareness.',
    medium: 'Integrate sustainability into sourcing and process design.',
    high: 'Use analytics to drive enterprise-wide ESG reporting and innovation.'
  },
  'Organization Agility': {
    low: 'Introduce cross-functional teams and basic agile ceremonies.',
    medium: 'Scale agile ways of working and empower teams with decision rights.',
    high: 'Run a product-centric operating model with clear outcome-based metrics.'
  },
  'Business Process Maturity': {
    low: 'Baseline and document processes and define basic SLAs.',
    medium: 'Standardize processes and embed continuous improvement.',
    high: 'Use process mining to identify bottlenecks and institutionalize excellence.'
  },
  'Digital & Automation': {
    low: 'Identify manual processes and run 2–3 automation pilots.',
    medium: 'Scale successful automations and expand AI use cases.',
    high: 'Move toward hyper-automation with AI-driven decisioning.'
  },
  'Talent Management': {
    low: 'Define skill maps and focused learning paths.',
    medium: 'Strengthen internal mobility and leadership accountability.',
    high: 'Invest in future skills and a dynamic talent marketplace.'
  },
  'Technology & Tools': {
    low: 'Rationalize legacy tools and move to standard platforms.',
    medium: 'Modernize architecture and standardize stacks.',
    high: 'Adopt platform thinking and self-service portals.'
  },
  'Customer Centricity': {
    low: 'Map key journeys and define simple CX metrics.',
    medium: 'Use analytics to redesign journeys with feedback loops.',
    high: 'Move to proactive service models that anticipate needs.'
  },
  'Innovation & IP': {
    low: 'Set up basic idea channels and experimentation cycles.',
    medium: 'Run structured innovation programs co-innovation with BUs.',
    high: 'Institutionalize IP creation with measurable revenue contribution.'
  },
  'Ecosystem & Partnerships': {
    low: 'Identify priority partners and engagement models.',
    medium: 'Create co-innovation programs with shared KPIs.',
    high: 'Run a mature ecosystem play with joint GTM strategies.'
  },
  'Risk & Compliance': {
    low: 'Baseline key risks and implement minimum controls.',
    medium: 'Embed risk into process design and automate monitoring.',
    high: 'Move toward predictive risk analytics and continuous monitoring.'
  }
};
