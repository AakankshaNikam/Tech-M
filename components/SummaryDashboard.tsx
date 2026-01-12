
import React, { useMemo } from 'react';
import { DimensionScores } from '../types';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/** 
 * TECH MAHINDRA STRATEGIC ADVISORY KNOWLEDGE BASE
 * Comprehensive 9-Month Transformation Roadmap per Dimension
 */
const STRATEGIC_TIMELINES: Record<string, {
  p1_initial: string[]; // 0-3 Months: Stabilization & Foundation
  p2_mid: string[];     // 3-6 Months: Capability Scaling & Optimization
  p3_long: string[];    // 6-9 Months: Strategic Excellence & Innovation
}> = {
  'Vision & Governance': {
    p1_initial: [
      'Conduct a formal "Strategic Mandate Reset" workshop with global stakeholders to redefine the GCC’s role in the 2025-2027 enterprise roadmap.',
      'Establish a cross-functional Steering Committee with clear meeting cadences and documented decision-rights for operational expenditure.',
      'Audit existing SLA/OLA frameworks to identify misalignments between local delivery metrics and global business outcomes.'
    ],
    p2_mid: [
      'Deploy a "Value Realization Office" (VRO) to track and report on the end-to-end business value generated beyond simple cost-arbitrage.',
      'Implement a decentralized Decision Rights Matrix that empowers pod leaders to make localized resource allocation decisions without HQ bottlenecks.',
      'Formalize a quarterly "Strategy Sync" cycle where GCC leadership contributes to the global corporate strategic planning process.'
    ],
    p3_long: [
      'Transition to a "Self-Governance" model where the GCC owns regional P&L and operates as an integrated global business unit.',
      'Institutionalize "Strategic Symmetry" by ensuring the GCC Head has a permanent seat on the Global Executive Council.',
      'Automate the Governance Dashboard with real-time API integrations into enterprise performance tracking systems.'
    ]
  },
  'Business Process Maturity': {
    p1_initial: [
      'Execute a comprehensive "End-to-End Process Inventory" to identify shadow processes and manual workarounds causing operational friction.',
      'Standardize the Top-20 High-Volume processes using unified global templates and formalize Standard Operating Procedures (SOPs).',
      'Deploy basic operational dashboards to baseline process cycle times and identify initial performance bottlenecks.'
    ],
    p2_mid: [
      'Launch a "Process Excellence Center of Excellence (CoE)" to drive Lean/Six Sigma transformation across all delivery pods.',
      'Implement a unified Business Process Management (BPM) orchestration layer to automate cross-functional handoffs between departments.',
      'Execute a "Kaizen Drive" to capture and implement continuous improvement ideas from the floor to reduce process variability.'
    ],
    p3_long: [
      'Deploy "Process Mining" technology to gain real-time visibility into process deviations and identify automation opportunities autonomously.',
      'Transition to "Predictive Operations" where AI-driven analytics anticipate volume surges and automatically adjust resource allocation.',
      'Institutionalize "Process-as-a-Service" where the GCC manages and optimizes processes for other global regional hubs.'
    ]
  },
  'Digital & Automation': {
    p1_initial: [
      'Perform a deep "Technical Debt Audit" on all legacy scripts and fragmented automations to create a clean remediation backlog.',
      'Establish a formal "Automation Governance Framework" to ensure all new digital assets are secure, scalable, and documented.',
      'Launch a "GenAI Sandbox" for controlled experimentation with Large Model technologies to identify high-impact productivity use cases.'
    ],
    p2_mid: [
      'Scale Robotic Process Automation (RPA) across all high-volume transactional workflows with a target of 30% reduction in manual effort.',
      'Integrate the automation hub with core enterprise systems (ERP/CRM) using standardized APIs to enable straight-through processing.',
      'Deploy an "Intelligent Orchestration" layer that manages the collaboration between human agents and digital bots seamlessly.'
    ],
    p3_long: [
      'Achieve "Hyper-Automation" by connecting disparate automated pods into a single, cohesive, AI-managed digital value chain.',
      'Embed "AI Copilots" into every delivery FTE’s workflow to augment decision-making and double the speed of complex task completion.',
      'Mature into a "Digital Innovation Factory" that builds and exports proprietary software assets back to the parent organization.'
    ]
  },
  'Talent Management': {
    p1_initial: [
      'Conduct a comprehensive "Skills Gap Diagnostic" mapping current talent competencies against the next 24 months of business demand.',
      'Establish a formal "High-Potential (HiPo) Fast-Track" program to identify and nurture the next generation of GCC leaders.',
      'Baseline current employee engagement and attrition drivers to implement immediate retention interventions for critical roles.'
    ],
    p2_mid: [
      'Launch an internal "Skill Marketplace" that allows for dynamic talent allocation based on project demand rather than rigid hierarchies.',
      'Establish the "GCC Digital Academy" to provide continuous upskilling in niche domains like AI, Cloud-native architecture, and CX design.',
      'Formalize "Succession Planning" for all critical delivery pods and leadership layers to ensure business continuity.'
    ],
    p3_long: [
      'Evolve into a "Global Talent Exporter" where the GCC becomes a primary source of leadership talent for the parent organization’s HQ.',
      'Achieve "Top-Tier Employer Branding" in the regional geography by participating in research-led industry leadership and university partnerships.',
      'Deploy AI-driven "Career Pathing" tools that recommend personalized learning journeys for every employee based on performance data.'
    ]
  },
  'Technology & Tools': {
    p1_initial: [
      'Execute a "Toolstack Rationalization" program to sunset redundant or low-value software licenses and consolidate enterprise tools.',
      'Perform a "Cyber-Resilience Stress Test" on all local hybrid infrastructure and harden security protocols for remote access.',
      'Baseline the "Developer Velocity Index" to identify and remove infrastructure-related friction points in the delivery pipeline.'
    ],
    p2_mid: [
      'Migrate >60% of core delivery workloads to a Cloud-Native architecture to improve scalability, reliability, and cost-efficiency.',
      'Deploy an "Internal Developer Portal" (IDP) to enable self-service infrastructure provisioning and reduce lead times for dev teams.',
      'Standardize on a "Unified Collaboration Suite" to bridge the communication gap between global business units and the GCC delivery pods.'
    ],
    p3_long: [
      'Achieve "API-First Interoperability" across the entire GCC ecosystem, allowing for seamless data flow between all operational tools.',
      'Deploy "AIOps" (AI for IT Operations) to implement self-healing infrastructure that predicts and resolves incidents before they impact service.',
      'Become a "Global Beta-Lab" where the enterprise tests and iterates on new technology stacks before global rollout.'
    ]
  },
  'Customer Centricity': {
    p1_initial: [
      'Execute "Global Customer Journey Mapping" workshops to align GCC delivery teams with the end-customer’s actual experience and pain points.',
      'Audit existing SLAs to transition from "Service Accuracy" metrics to "Customer Outcome" metrics like NPS and Effort Score.',
      'Identify the Top 3 "Customer Friction Points" that can be resolved through immediate process or policy tweaks at the GCC level.'
    ],
    p2_mid: [
      'Integrate "Live Customer Feedback" feeds directly into pod-level operational dashboards to create real-time awareness of customer sentiment.',
      'Establish "Customer-Segment Pods" that are organized around specific customer archetypes rather than traditional functional silos.',
      'Launch a "CX-First Reskilling" program to train middle-office and technical staff on empathy-driven service design and journey orchestration.'
    ],
    p3_long: [
      'Mature into a "CX Innovation Hub" that proactively proposes product and user-experience improvements back to the global R&D teams.',
      'Achieve "Symmetry of Experience" where employee experience (EX) and customer experience (CX) are tracked and managed as a single ecosystem.',
      'Monetize GCC customer insights by developing a "Data-as-a-Product" stream that informs global marketing and product strategy.'
    ]
  },
  'Innovation & IP': {
    p1_initial: [
      'Secure a "Seed Innovation Fund" (allocated 1-2% of OpEx) specifically dedicated to local experimentation and pilot projects.',
      'Launch a formal "Idea Management Portal" with a structured rewards and recognition program to incentivize grassroots innovation.',
      'Inventory existing local "Macros, Scripts, and Frameworks" that have potential for being harvested and matured into enterprise-wide IP.'
    ],
    p2_mid: [
      'Formalize the "IP Harvest and Patenting" process in collaboration with global legal teams to protect and capitalize on local innovations.',
      'Setup an "Innovation Sandbox" with ring-fenced technology and talent resources dedicated to rapid prototyping and MVP development.',
      'Create a "Co-Innovation Bridge" with global business units to solve their most pressing bottlenecks through GCC-led tech solutions.'
    ],
    p3_long: [
      'Successfully commercialize or globalize at least one local GCC digital asset into an enterprise-wide product or core capability.',
      'Achieve measurable revenue contribution or massive cost avoidance (target >10%) directly attributable to local GCC innovations.',
      'Mature into a "Global Incubation Hub" that identifies and invests in external startups relevant to the parent organization’s future.'
    ]
  },
  'Ecosystem & Partnerships': {
    p1_initial: [
      'Map the "Local Tech Ecosystem" including niche startups, universities, and specialized service providers within the GCC’s geography.',
      'Audit existing vendor SLAs to transition from "Time and Material" contracts to "Capability-based" or "Outcome-based" engagements.',
      'Establish "Low-Friction Partnership Guidelines" to enable rapid onboarding of niche tech startups for short-term pilot projects.'
    ],
    p2_mid: [
      'Launch a "GCC Startup Accelerator" program to co-develop solutions for operational challenges within the center’s delivery environment.',
      'Setup a "University Bridge" program for collaborative research in specialized domains such as AI, Cybersecurity, or Sustainability.',
      'Establish a "Partner Orchestration PMO" to manage a multi-vendor ecosystem and ensure seamless integration of diverse tech capabilities.'
    ],
    p3_long: [
      'Mature into an "Ecosystem Orchestrator" where the GCC leads global firm-wide partnerships with disruptive technology providers.',
      'Develop "Co-Branded Offerings" with key ecosystem partners that can be taken to market by the parent organization.',
      'Achieve >30% "Innovation Leverage" from ecosystem partners, reducing internal R&D burden while increasing output velocity.'
    ]
  },
  'Risk & Compliance': {
    p1_initial: [
      'Conduct a comprehensive "Cyber-Resilience Scan" and risk-assessment of all cross-border data flows and local storage environments.',
      'Baseline "Data Privacy Compliance" (GDPR/Local mandates) across all delivery workflows to ensure zero-breach operational standards.',
      'Audit the "Business Continuity Plan" (BCP) with localized stress tests that simulate hybrid-work failures or regional infrastructure downtime.'
    ],
    p2_mid: [
      'Deploy "AI-based Compliance Monitoring" tools that autonomously flag deviations from standard operating procedures in real-time.',
      'Implement "Automated Control Testing" (ACT) to replace legacy manual audit cycles with continuous, data-driven security assurance.',
      'Formalize a "Security-by-Design" culture where risk assessments are baked into every new process transition or technology rollout.'
    ],
    p3_long: [
      'Achieve a "Zero-Trust Architecture" across the global-local interface to eliminate unauthorized access and lateral movement risks.',
      'Mature into a "Proactive Risk Hub" that uses predictive analytics to anticipate global regulatory shifts and adjusts local ops ahead of time.',
      'Institutionalize "Regulatory-as-Code" (RaC) where compliance rules are directly embedded into the automated execution of workflows.'
    ]
  },
  'Sustainability': {
    p1_initial: [
      'Establish a formal "Carbon Footprint Baseline" for all GCC local operations, including facilities energy use and IT hardware consumption.',
      'Audit "Sourcing Policies" to integrate minimum ESG requirements for all local vendors and service providers.',
      'Identify 2 "Sustainability Quick Wins" in digital energy optimization (e.g., cloud storage cleanup or idle server shutdowns).'
    ],
    p2_mid: [
      'Deploy an "ESG Data Dashboard" that tracks diversity metrics, energy efficiency, and waste reduction in real-time for executive review.',
      'Integrate "Sustainability Business Cases" into all major investment proposals, ensuring ESG impact is considered alongside ROI.',
      'Launch a "Diversity and Inclusion Council" with specific measurable hiring and promotion targets for the next 24 months.'
    ],
    p3_long: [
      'Achieve "Net-Zero Operational Status" for the local GCC facility and key local supply lines through green energy and carbon offsets.',
      'Mature into the "Global ESG Reporting Center" for the entire enterprise, managing global sustainability data from the local hub.',
      'Pioneer "Sustainable Coding Standards" and energy-efficient AI model training protocols for all local digital projects.'
    ]
  },
  'Organization Agility': {
    p1_initial: [
      'Reorganize at least one core workstream into a "Cross-Functional Autonomous Pod" with a dedicated product owner and end-to-end authority.',
      'Perform a "Decision-Rights Friction Audit" to identify layers of hierarchy that slow down speed-to-staffing or project approvals.',
      'Baseline the "Agility Index" (Time-to-Piviot) by measuring how long it currently takes the GCC to absorb a new service request from HQ.'
    ],
    p2_mid: [
      'Scale the "Autonomous Pod" model across >50% of the GCC operations, eliminating traditional functional silos and handoff delays.',
      'Implement "Objectives and Key Results" (OKRs) for all pod leads to align individual performance with rapid-delivery business goals.',
      'Deploy a "Dynamic Resource Allocation" tool that allows for real-time talent movement between pods based on shifting BU demand.'
    ],
    p3_long: [
      'Achieve a "Fully Liquid Workforce" where talent is assigned based on competency and immediate business need rather than fixed job roles.',
      'Institutionalize "Flat Governance" where decision authority for operational changes sits entirely with the pod-level leadership.',
      'Lead the "Global Agile Transformation" strategy for the parent organization, using the GCC as the blueprint for enterprise-wide agility.'
    ]
  }
};

const MaturityLandscapeGraph: React.FC<{ scoredData: any[] }> = ({ scoredData }) => {
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-6 border-b border-slate-100 pb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Maturity Landscape</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dimension-wise Capability Benchmark</p>
        </div>
        <div className="flex flex-wrap gap-6">
           {[
             { label: 'Foundational', color: 'bg-red-500', range: '(0.0 - 2.5)' },
             { label: 'Established', color: 'bg-amber-500', range: '(2.5 - 4.0)' },
             { label: 'Leading Edge', color: 'bg-emerald-500', range: '(4.0 - 5.0)' }
           ].map(l => (
             <div key={l.label} className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full ${l.color} shadow-sm`}></div>
               <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-slate-900 tracking-tight leading-none">{l.label}</span>
                  <span className="text-[8px] font-bold text-slate-400 mt-1">{l.range}</span>
               </div>
             </div>
           ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {scoredData.map((d) => {
          const score = d.score || 0;
          const percentage = (score / 5) * 100;
          const colorClass = d.isInitial ? "bg-slate-200" : (score >= 4 ? "bg-emerald-500" : score >= 2.5 ? "bg-amber-500" : "bg-red-500");
          const textColorClass = d.isInitial ? "text-slate-300" : (score >= 4 ? "text-emerald-600" : score >= 2.5 ? "text-amber-600" : "text-red-600");
          return (
            <div key={d.dim} className="group flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <p className={`text-[10px] font-black uppercase tracking-tight transition-colors duration-300 ${d.isInitial ? 'text-slate-300' : 'text-slate-700'}`}>
                  {d.dim}
                </p>
                <span className={`text-[12px] font-black tracking-tighter ${textColorClass}`}>
                  {d.isInitial ? "PENDING" : score.toFixed(1)}
                </span>
              </div>
              <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden relative border border-slate-100/50">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${colorClass} shadow-sm`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SummaryDashboardProps {
  dimensions: string[];
  vertical: string;
  dimensionScores: DimensionScores;
  customWeights: Record<string, number>;
  clientInfo: { userName: string; companyName: string };
  onWeightChange: (dim: string, weight: number) => void;
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ 
  dimensions, 
  vertical, 
  dimensionScores, 
  customWeights, 
  clientInfo,
  onWeightChange 
}) => {
  const scoredData = useMemo(() => dimensions.map(dim => ({
    dim,
    score: dimensionScores[dim] ?? 0,
    weight: customWeights[dim] ?? 10,
    isInitial: dimensionScores[dim] === undefined
  })), [dimensions, dimensionScores, customWeights]);

  const overallScore = useMemo(() => {
    const assessed = scoredData.filter(d => !d.isInitial);
    if (assessed.length === 0) return 0;
    let totalWeighted = 0;
    let totalWeight = 0;
    assessed.forEach(d => {
      totalWeighted += d.score * d.weight;
      totalWeight += d.weight;
    });
    return totalWeighted / totalWeight;
  }, [scoredData]);

  const roadmapData = useMemo(() => {
    const assessed = scoredData.filter(d => !d.isInitial);
    return {
      p1: assessed.map(d => ({ dim: d.dim, pointers: STRATEGIC_TIMELINES[d.dim]?.p1_initial || [] })),
      p2: assessed.map(d => ({ dim: d.dim, pointers: STRATEGIC_TIMELINES[d.dim]?.p2_mid || [] })),
      p3: assessed.map(d => ({ dim: d.dim, pointers: STRATEGIC_TIMELINES[d.dim]?.p3_long || [] }))
    };
  }, [scoredData]);

  const downloadPdfReport = () => {
    const doc = new jsPDF();
    const primaryColor = [220, 38, 38]; // TechM Red
    const darkColor = [15, 23, 42]; // Slate 900
    const grayColor = [100, 116, 139]; // Slate 500

    // COVER PAGE
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Decorative Red Strip
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 60, 210, 15, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text("TECH MAHINDRA", 105, 100, { align: 'center' });
    doc.setFontSize(32);
    doc.text("STRATEGIC ADVISORY", 105, 115, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'normal');
    doc.text("GCC MATURITY ASSESSMENT", 105, 130, { align: 'center' });
    
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.line(80, 145, 130, 145);

    doc.setFontSize(14);
    doc.text(`ORGANIZATION: ${clientInfo.companyName.toUpperCase()}`, 105, 175, { align: 'center' });
    doc.text(`PREPARED BY: ${clientInfo.userName.toUpperCase()}`, 105, 185, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(180, 180, 180);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 105, 195, { align: 'center' });
    
    // PAGE 2: SUMMARY & SCORECARD
    doc.addPage();
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("1. Executive Summary", 20, 30);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const maturityLabel = overallScore >= 4 ? "Leading Edge" : overallScore >= 2.5 ? "Established Capability" : "Foundational Maturity";
    const summaryText = `The maturity assessment for ${clientInfo.companyName} indicates a weighted overall maturity score of ${overallScore.toFixed(2)}/5.00, placing the center in the "${maturityLabel}" bracket. This report provides a detailed diagnostic of the 11 key strategic dimensions and offers a prioritized 9-month transformation roadmap.`;
    
    doc.text(doc.splitTextToSize(summaryText, 170), 20, 45);

    // Scoring Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Maturity Scorecard", 20, 85);
    autoTable(doc, {
        startY: 95,
        head: [['Strategic Track', 'Maturity Score', 'Capability Status', 'Strategic Weight']],
        body: scoredData.filter(d => !d.isInitial).map(d => [
          d.dim, 
          d.score.toFixed(2), 
          d.score >= 4 ? 'Leading Edge' : d.score >= 2.5 ? 'Established' : 'Foundational',
          d.weight + '%'
        ]),
        headStyles: { fillColor: primaryColor, fontStyle: 'bold' },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    // PAGE 3+: DETAILED ROADMAP
    doc.addPage();
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("2. 9-Month Remediation Roadmap", 20, 30);
    
    let yPos = 45;

    const renderPhase = (title: string, data: any[]) => {
      if (data.length === 0) return;
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title, 20, yPos);
      yPos += 12;
      doc.setTextColor(0, 0, 0);

      data.forEach(d => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`[${d.dim}]`, 20, yPos);
        yPos += 7;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        d.pointers.forEach((p: string) => {
          const splitP = doc.splitTextToSize(`• ${p}`, 170);
          doc.text(splitP, 25, yPos);
          yPos += (splitP.length * 4) + 2;
          if (yPos > 275) { doc.addPage(); yPos = 20; }
        });
        
        yPos += 4;
        if (yPos > 275) { doc.addPage(); yPos = 20; }
      });
      yPos += 10;
      if (yPos > 275) { doc.addPage(); yPos = 20; }
    };

    renderPhase("PHASE 1: STABILIZE & FOUNDATION (0-3 Months)", roadmapData.p1);
    renderPhase("PHASE 2: SCALE & ACCELERATE (3-6 Months)", roadmapData.p2);
    renderPhase("PHASE 3: STRATEGIC EXCELLENCE (6-9 Months)", roadmapData.p3);

    doc.save(`TechM_Strategic_Roadmap_${clientInfo.companyName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-40">
      {/* Executive Overview Header */}
      <section className="bg-slate-900 rounded-[48px] p-16 text-white shadow-premium-lg flex flex-col xl:flex-row justify-between items-center gap-16 border border-slate-800 relative overflow-hidden">
        {/* Branding Elements */}
        <div className="absolute top-0 right-0 p-12 text-[11px] font-black uppercase tracking-[0.4em] opacity-20 pointer-events-none">
          TECH MAHINDRA ADVISORY
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>

        <div className="space-y-12 relative z-10 w-full xl:w-2/3">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Executive Capability Scorecard</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-end gap-16">
            <div className="space-y-3">
              <h2 className="text-[120px] font-black tracking-tighter leading-none flex items-baseline">
                <span className="text-red-500 drop-shadow-2xl">{overallScore.toFixed(2)}</span>
                <span className="text-4xl font-normal text-slate-500 ml-6 tracking-normal">/ 5.00</span>
              </h2>
              <div className="flex flex-col">
                <p className="text-2xl text-slate-200 font-bold tracking-tight">Aggregate Maturity Rating</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Based on {dimensions.length} Weighted Tracks</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full xl:w-1/3 flex flex-col gap-5">
          <button 
            onClick={downloadPdfReport} 
            className="w-full bg-red-600 text-white px-10 py-6 rounded-[28px] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-red-500 transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.98] group"
          >
            <i className="fa-solid fa-file-pdf text-lg"></i> 
            Generate Strategic Roadmap
            <i className="fa-solid fa-arrow-right opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
          </button>
          <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Format: Executive Multi-Page PDF</p>
        </div>
      </section>

      {/* Maturity Insights Visualization */}
      <section className="bg-white rounded-[48px] p-16 border border-slate-100 shadow-premium group hover:shadow-premium-hover transition-all duration-500">
         <MaturityLandscapeGraph scoredData={scoredData} />
      </section>

      {/* DETAILED TIME-BOUND TRANSFORMATION ROADMAP */}
      <div className="space-y-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
             <div className="h-0.5 w-12 bg-red-500 rounded-full"></div>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">9-Month Remediation Strategy</h3>
          </div>
          <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-16">Time-serialized execution milestones for enterprise-wide scaling</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {/* Phase 1: 0-3 Months */}
          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-premium relative flex flex-col h-full hover:border-red-100 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
            
            <div className="flex items-center gap-5 mb-12 relative z-10">
              <div className="w-16 h-16 rounded-[24px] bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-100">
                <span className="font-black text-sm tracking-tighter">0-3M</span>
              </div>
              <div>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-slate-900">PHASE 01</h4>
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Foundational Stability</p>
              </div>
            </div>

            <div className="space-y-10 flex-grow relative z-10">
              {roadmapData.p1.map(d => (
                <div key={d.dim} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-red-500 pb-1">{d.dim}</span>
                  </div>
                  <ul className="space-y-4">
                    {d.pointers.map((p, i) => (
                      <li key={i} className="text-[12px] font-bold text-slate-600 leading-relaxed flex items-start gap-4 group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-200 mt-2 shrink-0 group-hover/item:bg-red-500 transition-colors"></span> 
                        <span className="group-hover/item:text-slate-900 transition-colors">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {roadmapData.p1.length === 0 && (
                <div className="py-24 text-center">
                   <i className="fa-solid fa-circle-check text-slate-100 text-6xl mb-6"></i>
                   <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Analysis Pending Initiation</p>
                </div>
              )}
            </div>
          </div>

          {/* Phase 2: 3-6 Months */}
          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-premium relative flex flex-col h-full hover:border-amber-100 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
            
            <div className="flex items-center gap-5 mb-12 relative z-10">
              <div className="w-16 h-16 rounded-[24px] bg-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-100">
                <span className="font-black text-sm tracking-tighter">3-6M</span>
              </div>
              <div>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-slate-900">PHASE 02</h4>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1">Accelerate & Scale</p>
              </div>
            </div>

            <div className="space-y-10 flex-grow relative z-10">
              {roadmapData.p2.map(d => (
                <div key={d.dim} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-amber-500 pb-1">{d.dim}</span>
                  </div>
                  <ul className="space-y-4">
                    {d.pointers.map((p, i) => (
                      <li key={i} className="text-[12px] font-bold text-slate-600 leading-relaxed flex items-start gap-4 group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-200 mt-2 shrink-0 group-hover/item:bg-amber-500 transition-colors"></span> 
                        <span className="group-hover/item:text-slate-900 transition-colors">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3: 6-9 Months */}
          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-premium relative flex flex-col h-full hover:border-emerald-100 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
            
            <div className="flex items-center gap-5 mb-12 relative z-10">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-100">
                <span className="font-black text-sm tracking-tighter">6-9M</span>
              </div>
              <div>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-slate-900">PHASE 03</h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Strategic Leadership</p>
              </div>
            </div>

            <div className="space-y-10 flex-grow relative z-10">
              {roadmapData.p3.map(d => (
                <div key={d.dim} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-emerald-500 pb-1">{d.dim}</span>
                  </div>
                  <ul className="space-y-4">
                    {d.pointers.map((p, i) => (
                      <li key={i} className="text-[12px] font-bold text-slate-600 leading-relaxed flex items-start gap-4 group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 mt-2 shrink-0 group-hover/item:bg-emerald-500 transition-colors"></span> 
                        <span className="group-hover/item:text-slate-900 transition-colors">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED SCORECARD TABLE */}
      <div className="bg-white rounded-[48px] shadow-premium border border-slate-100 overflow-hidden">
        <div className="px-12 py-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
             <i className="fa-solid fa-list-check text-red-500"></i>
             <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Diagnostic Assessment Matrix</h3>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dimension Performance & Weighting</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">
              <th className="px-12 py-8">Advisory Track</th>
              <th className="px-12 py-8 text-center">Current Score</th>
              <th className="px-12 py-8 text-right">Strategic Weight (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dimensions.map(dim => {
              const d = scoredData.find(s => s.dim === dim);
              const score = d?.score ?? 0;
              return (
                <tr key={dim} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-12 py-8">
                    <span className="text-sm font-extrabold text-slate-800 uppercase tracking-tight group-hover:text-red-600 transition-colors">{dim}</span>
                  </td>
                  <td className="px-12 py-8 text-center">
                    <span className={`text-[11px] font-black px-6 py-2.5 rounded-2xl border-2 shadow-sm ${score >= 4 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : score >= 2.5 ? 'bg-amber-50 border-amber-100 text-amber-600' : score > 0 ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                      {d?.isInitial ? 'PENDING' : score.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <div className="flex items-center justify-end gap-6">
                      <input 
                        type="range" min="10" max="100" step="10" 
                        value={d?.weight ?? 10} 
                        onChange={(e) => onWeightChange(dim, parseInt(e.target.value, 10))} 
                        className="w-40 accent-slate-900" 
                      />
                      <span className="text-[13px] font-black text-slate-900 w-10">{d?.weight}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryDashboard;
