export const featuresData = {
  "ai-threat-detection": {
    title: "AI Threat Detection",
    icon: "Cpu",
    tagline: "Autonomous Machine Learning Anomaly Detection",
    description: "Cloudo's AI Threat Detection engine monitors system calls, API requests, and network traffic in real-time, matching patterns against millions of known vectors and recognizing zero-day anomalies instantly.",
    details: [
      "99.9% detection accuracy on zero-day exploits",
      "Real-time event streaming and scoring pipeline",
      "Heuristic analysis across container and serverless runtimes",
      "Deep integration with global intelligence feeds"
    ]
  },
  "cloud-firewall": {
    title: "Cloud Firewall",
    icon: "ShieldAlert",
    tagline: "Distributed Next-Generation Web Application Firewall",
    description: "Deploy instant, globally distributed firewall protection that shields applications from DDoS attacks, SQL injections, and malicious traffic without adding latency.",
    details: [
      "Layer 3, 4, and 7 edge filtering with global routing",
      "Dynamic rule creation powered by real-time threat telemetry",
      "Zero latency overhead using edge network routing",
      "IP-reputation filtering and automated bot mitigation"
    ]
  },
  "zero-trust": {
    title: "Zero Trust Network Access",
    icon: "KeyRound",
    tagline: "Continuous Identity and Device Verification",
    description: "Enforce strict verification protocols for every asset, user, and service trying to access your resources, whether inside or outside your network perimeter.",
    details: [
      "Context-aware dynamic authorization policy engine",
      "Device health and configuration posture checks",
      "Micro-segmentation at the service-mesh level",
      "Single sign-on (SSO) and adaptive MFA hooks"
    ]
  },
  "iam": {
    title: "Identity & Access Management (IAM)",
    icon: "UserCheck",
    tagline: "Least-Privilege Enforcement & Access Control",
    description: "Manage, audit, and constrain cloud permission sprawl. Our IAM analyzer tracks unused permissions and automatically scales back access profiles.",
    details: [
      "Cross-account trust relationship visualization",
      "Automated policy generator based on actual service usage",
      "Just-in-time (JIT) access broker for developers",
      "Instant privilege escalation alerting and blocking"
    ]
  },
  "api-protection": {
    title: "API Protection",
    icon: "Code2",
    tagline: "Securing Endpoint Integrations & Data Exchange",
    description: "Automatically discover shadow APIs, block OWASP API Top 10 vulnerabilities, and trace request payloads for sensitive data leakage.",
    details: [
      "Continuous runtime discovery of unmapped API routes",
      "Payload inspection preventing data exfiltration of PII",
      "OAuth, JWT, and API token validation and tracking",
      "Rate-limiting and schema enforcement at the gateway level"
    ]
  },
  "container-security": {
    title: "Container Security",
    icon: "Layers",
    tagline: "Image Scanning and Runtime Container Defense",
    description: "Inspect containers from code repositories through CI/CD pipelines to runtime execution environments. Detect drifts, vulnerabilities, and misconfigurations.",
    details: [
      "Image signature verification and cryptographical checks",
      "Kernel system-call interception for anomalous behavior",
      "Read-only root filesystem enforcement and drifts checks",
      "Automated remediation of base-image vulnerabilities"
    ]
  },
  "kubernetes-security": {
    title: "Kubernetes Security",
    icon: "Compass",
    tagline: "K8s Cluster Hardening and Admission Control",
    description: "Govern cluster access, audit network policies, and protect container control planes with automated posture scanning and native admission controllers.",
    details: [
      "Continuous CIS Benchmarks checks for Kubernetes control planes",
      "Mutating and validating webhook integrations",
      "Pod Security Standards enforcement (Privileged, Baseline, Restricted)",
      "Network Policy visualizer and automated generator"
    ]
  },
  "serverless-protection": {
    title: "Serverless Protection",
    icon: "Zap",
    tagline: "Runtime Defense for Ephemeral Architectures",
    description: "Ensure AWS Lambda, Azure Functions, and Google Cloud Functions operate securely without agents, scanning function code and monitoring runtime APIs.",
    details: [
      "Static code analysis for serverless package files",
      "Execution environment isolation checks and leak blocking",
      "IAM permissions mapping to limit function blasts radius",
      "Cold-start latency-friendly security wrappings"
    ]
  },
  "devsecops": {
    title: "DevSecOps Integration",
    icon: "GitBranch",
    tagline: "Shifting Security Left in Software Delivery Pipelines",
    description: "Embed cloud security checks directly into GitHub, GitLab, Jenkins, and Terraform configurations to block security regressions prior to deployment.",
    details: [
      "Terraform, CloudFormation, and Helm chart static analysis",
      "Blocking build rules for secrets committed to source repositories",
      "Direct IDE feedback extensions for development teams",
      "Pull-request security analysis and summary commentary"
    ]
  },
  "vulnerability-scanner": {
    title: "Vulnerability Scanner",
    icon: "Scan",
    tagline: "Continuous Agentless Posture Scanner",
    description: "Scan cloud instances, block storage volumes, databases, and configuration settings agentlessly. Zero impact to operating performance.",
    details: [
      "Agentless read-only snapshots of block storage for side-scanning",
      "CVE catalog updates synchronized hourly from 50+ threat databases",
      "Prioritized vulnerability scoring reflecting network exposure",
      "One-click remediation patches for main Linux distributions"
    ]
  },
  "compliance-automation": {
    title: "Compliance Automation",
    icon: "FileCheck2",
    tagline: "Continuous Compliance and Governance Mapping",
    description: "Map your cloud controls automatically to SOC 2, HIPAA, ISO 27001, GDPR, and NIST guidelines. Export reports for auditors in minutes.",
    details: [
      "Continuous audits generating evidence logs ready for download",
      "Ready-to-use control mappings for over 25 frameworks",
      "Drift notifications when compliance metrics drop",
      "External auditor access portals with limited scoping"
    ]
  },
  "ai-risk-prediction": {
    title: "AI Risk Prediction",
    icon: "BrainCircuit",
    tagline: "Predictive Security Analytics & Attack Path Simulation",
    description: "Our machine learning models map out potential attack paths that malicious actors could use by combining vulnerabilities, misconfigurations, and network exposures.",
    details: [
      "Dynamic graph simulations showing potential lateral movements",
      "Predictive calculations of blast radius for each asset",
      "Attack path remediation recommendations",
      "Weekly cyber-risk index calculations"
    ]
  }
};

export const solutionsData = {
  "startups": {
    title: "For Startups",
    challenge: "Startups need to build fast but cannot compromise on trust. A single security breach can destroy enterprise sales pipeline and customer confidence.",
    solution: "Cloudo provides lightweight, developer-first cloud security that installs in minutes, ensuring SOC 2 readiness from day one without hiring security staff.",
    benefits: [
      "Instant compliance scanning for SOC 2 and ISO 27001",
      "Developer-friendly interface with GitHub checks integration",
      "Cost-effective plans tailored to early-stage growth",
      "Auto-generated client trust center report"
    ]
  },
  "enterprise": {
    title: "For Global Enterprises",
    challenge: "Complex multi-cloud environments, legacy setups, dynamic container environments, and compliance mapping across dozens of jurisdictions create massive visibility gaps.",
    solution: "Cloudo unifies AWS, Azure, Google Cloud, Kubernetes, and serverless architectures into a single unified pane of glass with risk prioritization and zero-impact scanning.",
    benefits: [
      "Agentless scanning of petabyte-scale storage and resources",
      "Enterprise IAM governance and unused permission remediation",
      "Unified SIEM/SOAR logs forwarding and Splunk integration",
      "Dedicated account managers and 24/7/365 SOC assistance"
    ]
  },
  "healthcare": {
    title: "For Healthcare & Life Sciences",
    challenge: "Handling Protected Health Information (PHI) requires strict HIPAA compliance, multi-layer encryption, audit logs, and instant breach notifications.",
    solution: "Cloudo secures medical databases, containerized health apps, and cloud file stores, offering out-of-the-box HIPAA reporting and continuous audit protection.",
    benefits: [
      "Automated PHI data store discovery and encryption enforcement",
      "HIPAA-compliant logs collection and long-term storage configurations",
      "Strict network access control mapping for medical applications",
      "Continuous vulnerability scanning of electronic medical record APIs"
    ]
  },
  "banking": {
    title: "For Banking & Financial Services",
    challenge: "Protecting financial transactions, enforcing PCI DSS controls, preventing fraud, and shielding high-value assets against state-sponsored actors.",
    solution: "Cloudo provides quantum-resistant encryption parameters, real-time API filtering, automated threat mitigation, and instant isolation of compromised cloud segments.",
    benefits: [
      "PCI DSS 4.0 automated control mapping and evidence collection",
      "Sub-millisecond WAF rules preventing transaction hijacking",
      "Micro-segmentation isolating core banking assets from public endpoints",
      "Zero-trust API authorization enforcement"
    ]
  }
};

export const servicesData = [
  { title: "Security Assessment", desc: "Comprehensive evaluation of cloud architecture, configurations, and organizational security posture against top standards." },
  { title: "Cloud Migration Security", desc: "Architecture design, security-group mapping, and compliance scaffolding for zero-risk transitions to multi-cloud platforms." },
  { title: "Penetration Testing", desc: "Simulated ethical attacks on container systems, API endpoints, and cloud infrastructures to identify vulnerabilities before adversaries do." },
  { title: "Managed SOC (Security Operations Center)", desc: "24/7 threat monitoring, correlation analysis, and security incident management powered by Cloudo security analysts." },
  { title: "Incident Response", desc: "Immediate breach containment, forensic analysis, root-cause recovery plans, and regulatory reporting assistance." },
  { title: "DevSecOps Integration Service", desc: "Consultancy to integrate static scanning, secrets detection, and compliance guards directly into your CI/CD pipelines." },
  { title: "Compliance Consulting", desc: "Preparation workshops, policy writing, and control mappings for SOC 2, HIPAA, GDPR, FedRAMP, and NIST certifications." }
];

export const industriesData = [
  { title: "Finance", icon: "DollarSign", desc: "Automate PCI-DSS 4.0 compliance, secure payment gateways, and prevent lateral movement in dynamic trading architectures." },
  { title: "Healthcare", icon: "Activity", desc: "Continuous HIPAA monitoring, PHI scanning, and encrypted network pipes for telemedicine and patient portals." },
  { title: "Technology", icon: "Laptop", desc: "Integrate security checks in code deployments, secure SaaS delivery nodes, and protect user database containers." },
  { title: "Government", icon: "Building2", desc: "FedRAMP aligned environments protection, air-gapped container scanning, and zero-trust perimeter configurations." },
  { title: "Retail & E-commerce", icon: "ShoppingBag", desc: "Secure digital checkout carts, monitor shopping databases, and stop bot-driven API inventory scraping." },
  { title: "Logistics", icon: "Truck", desc: "Secure operational tech gateways, trace supply-chain IoT data endpoints, and audit supplier database access." }
];

export const integrationsData = [
  { name: "AWS", type: "Cloud Provider", logo: "aws", desc: "Agentless configuration review, IAM auditing, and flow log analysis." },
  { name: "Azure", type: "Cloud Provider", logo: "azure", desc: "Active Directory security mapping, VM analysis, and KeyVault tracking." },
  { name: "Google Cloud", type: "Cloud Provider", logo: "gcp", desc: "GKE cluster protection, Cloud Storage scanning, and IAM checks." },
  { name: "Docker", type: "Containers", logo: "docker", desc: "Image layers vulnerability scanners, base image hardening integrations." },
  { name: "Kubernetes", type: "Orchestration", logo: "k8s", desc: "Admission controllers, service-mesh analysis, cluster compliance." },
  { name: "Terraform", type: "Infrastructure as Code", logo: "terraform", desc: "Pre-deployment static scanning for security groups and policies." },
  { name: "GitHub", type: "CI/CD", logo: "github", desc: "Automated scan actions, pull request comments, and secrets scans." },
  { name: "Slack", type: "Alerts", logo: "slack", desc: "Real-time alerts, prompt threat isolation triggers, and status updates." },
  { name: "Splunk", type: "SIEM", logo: "splunk", desc: "Event logs export pipelines, synchronized classification dashboards." }
];

export const complianceData = [
  { name: "ISO 27001", score: 98, status: "Compliant", checks: "114/114 Passed", icon: "Award" },
  { name: "SOC 2 Type II", score: 100, status: "Compliant", checks: "85/85 Passed", icon: "FileSpreadsheet" },
  { name: "GDPR", score: 94, status: "Compliant", checks: "47/50 Passed", icon: "Globe" },
  { name: "HIPAA", score: 96, status: "Compliant", checks: "72/75 Passed", icon: "Heart" },
  { name: "PCI DSS 4.0", score: 92, status: "Monitoring", checks: "110/120 Passed", icon: "CreditCard" },
  { name: "NIST SP 800-53", score: 89, status: "Monitoring", checks: "220/247 Passed", icon: "FileText" }
];

export const pricingData = [
  {
    name: "Starter",
    price: "$499",
    billing: "per month",
    desc: "For startups and small teams seeking foundational cloud protection and SOC 2 readiness.",
    features: [
      "Up to 100 Cloud Assets",
      "Daily Agentless Scanning",
      "SOC 2 Compliance Blueprint",
      "GitHub & GitLab Integrations",
      "Email & Slack Alerts",
      "Community Chat Support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "$1,899",
    billing: "per month",
    desc: "For fast-growing companies requiring continuous multi-cloud security, compliance, and automation.",
    features: [
      "Up to 1,000 Cloud Assets",
      "Continuous Real-time Scanning",
      "All Compliance Standards (ISO, HIPAA, PCI)",
      "Full API & Container Protection",
      "AI Security Assistant (Standard)",
      "Next-Day SLA Support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    billing: "annual billing",
    desc: "For large organizations with complex, hybrid environments and custom security guidelines.",
    features: [
      "Unlimited Cloud Assets",
      "Continuous Scanner & Custom Rules",
      "AI Risk Path Simulations",
      "Dedicated Security Engineers",
      "Custom SIEM & Splunk Pipelines",
      "24/7/365 Phone & Incident Support"
    ],
    cta: "Book Enterprise Demo",
    popular: false
  }
];

export const pricingComparison = {
  headers: ["Features", "Starter", "Professional", "Enterprise"],
  categories: [
    {
      name: "Core Scanning",
      rows: [
        ["Scanning Frequency", "Daily", "Real-Time", "Real-Time + Custom"],
        ["Asset Scanners", "Agentless Only", "Agentless + Agent Option", "Agentless + Agent Option"],
        ["Custom Policies", "No", "Up to 50", "Unlimited"],
        ["Vulnerability Database", "Weekly Updates", "Hourly Updates", "Instant Streams"]
      ]
    },
    {
      name: "Security Engine",
      rows: [
        ["AI Threat Detection", "Basic", "Advanced", "Predictive Path Engine"],
        ["Cloud Firewall (WAF)", "Standard rules", "Custom rules", "Edge optimization"],
        ["Container & K8s Scan", "Images only", "Full Cluster analysis", "Admission controllers"],
        ["IAM Sprawl Control", "Read-only", "Remediation recommendations", "Auto-remediation loops"]
      ]
    },
    {
      name: "Compliance & Integration",
      rows: [
        ["Supported Standards", "SOC 2, ISO 27001", "All Standards", "All + Custom Policies"],
        ["Integrations Available", "GitHub, Slack", "All standard integrators", "Custom API + Webhooks"],
        ["Auditor Portals", "None", "1 Auditor User", "Unlimited Auditor Users"]
      ]
    }
  ]
};

export const faqData = [
  {
    category: "General",
    items: [
      { q: "How does Cloudo connect to my cloud accounts?", a: "Cloudo utilizes secure, read-only IAM trust relationships (AWS IAM Roles, Azure Service Principals, and GCP Service Accounts) configuration via Terraform. We do not require root credentials or agent installation." },
      { q: "Does Cloudo scan affect cloud server performance?", a: "No. Cloudo uses agentless scanning. We capture read-only snapshot copies of block storage and configuration states, meaning scanning happens completely outside your execution systems. No CPU or Memory overhead is introduced." }
    ]
  },
  {
    category: "Security & AI",
    items: [
      { q: "What is the accuracy rate of the AI Threat Detection?", a: "Our models have been trained on over 500 million cloud threat telemetry samples, yielding a zero-day detection rate of 99.9% with a false positive rate of less than 0.01%." },
      { q: "Are my cloud security configuration details kept safe?", a: "Yes. All configuration data transferred to Cloudo is encrypted in transit using TLS 1.3 and at rest with AES-256 using Customer Managed Keys (CMK) stored in hardware security modules." }
    ]
  }
];

export const blogData = [
  { id: 1, title: "Mitigating lateral movement in container networks", author: "Dr. Elena Rostova", role: "Head of AI Security Research", date: "June 28, 2026", excerpt: "How zero-day lateral progression can be detected and automatically neutralized in multi-tenant Kubernetes configurations using predictive path models." },
  { id: 2, title: "Transitioning to PCI DSS 4.0: A Cloud Security Playbook", author: "Marcus Vance", role: "Compliance Lead", date: "June 15, 2026", excerpt: "Detailed step-by-step breakdown of how key changes in PCI DSS 4.0 impact serverless and ephemeral API cloud setups." },
  { id: 3, title: "Anatomy of a Zero-Day API Exfiltration Attack", author: "Arax Chen", role: "Principal Incident Responder", date: "May 22, 2026", excerpt: "Forensic study of a recent high-profile cloud breach and how proper schema enforcement could have stopped the data leak in seconds." }
];

export const docData = [
  { title: "Getting Started Guide", category: "Core Concepts", desc: "Connecting your cloud platforms, setting up initial IAM roles, and running your first security scan." },
  { title: "Terraform Integration Guide", category: "Deployment", desc: "Embedding security scans directly into Terraform Cloud, blocking high-risk pull requests automatically." },
  { title: "Custom Remediation Scripts", category: "Developer Tools", desc: "Writing custom event listeners and webhooks to trigger auto-remediation scripts when assets drift." }
];

export const caseStudiesData = [
  { client: "TechCorp Global", industry: "SaaS Enterprise", improvement: "Reduced vulnerability remediation cycle from 24 days to 4 hours.", roi: "235% ROI achieved in 6 months", citation: "Cloudo allowed our team of 15 developers to act with the force of a 100-person security unit." },
  { client: "FinBank 7", industry: "Banking & Finance", improvement: "100% compliance score across PCI DSS 4.0 and GDPR audits.", roi: "Audit readiness preparation time cut by 90%", citation: "Audits used to take months of manual screenshotting. Now it is a single-click export inside Cloudo." }
];

export const teamMembers = [
  { name: "Amaan Khan", role: "Co-Founder", prev: "Computer Science Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { name: "Rehan Mujawar", role: "Co-Founder", prev: "B.Sc. Computer Science & MCA", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
];

export const openPositions = [
  { title: "Lead AI Threat Engineer", team: "Security Research", location: "San Francisco / Remote", desc: "Build machine learning models to detect abnormal API behavior and simulate cloud attack paths." },
  { title: "Senior Container Engineer", team: "Runtime Systems", location: "New York / Hybrid", desc: "Develop low-overhead kernel-level inspection frameworks for Kubernetes and host environments." },
  { title: "Enterprise Account Executive", team: "Sales & Success", location: "London / Remote", desc: "Introduce Cloudo cloud security solutions to Fortune 500 enterprise security management groups." }
];

export const statusData = {
  overall: "All Services Operational",
  uptime: "99.99%",
  services: [
    { name: "AI Threat Scanner Engine", status: "Operational", responseTime: "24ms" },
    { name: "Cloud WAF Edge Gateway", status: "Operational", responseTime: "8ms" },
    { name: "Compliance Evidence Collector", status: "Operational", responseTime: "110ms" },
    { name: "Management Dashboard Portal", status: "Operational", responseTime: "45ms" }
  ],
  incidents: [
    { date: "June 25, 2026", title: "Minor latency spike in Compliance Evidence Collector", status: "Resolved within 14 minutes", details: "A dynamic AWS API update caused rate limits on scans, resolved by adjusting routing limits." },
    { date: "May 10, 2026", title: "API Dashboard query delays", status: "Resolved within 32 minutes", details: "Database migration lock resolved by scaling reader replicas." }
  ]
};

// USER DASHBOARD MOCK DATA
export const userDashboardData = {
  securityScore: 84,
  scoreDrift: "+3 pts last week",
  threats: {
    active: 3,
    critical: 1,
    medium: 2,
    resolved: 142
  },
  assets: {
    total: 824,
    protected: 824,
    aws: 412,
    azure: 280,
    gcp: 132
  },
  systemHealth: {
    cpu: 34,
    memory: 48,
    network: "14.2 Gbps"
  },
  activeThreatLogs: [
    { id: "TH-82", severity: "Critical", asset: "GCP-Prod-Db-Instance", type: "Suspicious lateral system call (CVE-2026-3829)", time: "3 mins ago" },
    { id: "TH-81", severity: "Medium", asset: "AWS-Lambda-Token-Rotator", type: "Anomalous external network connection", time: "18 mins ago" },
    { id: "TH-80", severity: "Medium", asset: "K8s-Prod-Cluster-Node-4", type: "Writable container root directory drift detected", time: "1 hour ago" }
  ],
  assetsList: [
    { name: "AWS-EC2-Web-Portal-1", type: "Server", provider: "AWS", status: "Protected", issues: 0 },
    { name: "AWS-Lambda-Payment-Process", type: "Serverless", provider: "AWS", status: "Protected", issues: 1 },
    { name: "Azure-Blob-Customer-Docs", type: "Storage", provider: "Azure", status: "Protected", issues: 0 },
    { name: "GCP-Kubernetes-Edge-Node", type: "Container", provider: "GCP", status: "Drift Detected", issues: 3 }
  ],
  aiRecommendations: [
    { priority: "High", msg: "Enable micro-segmentation rules on GCP-Prod-Db-Instance to prevent database lateral access from web nodes.", impact: "Stops 4 potential attack paths" },
    { priority: "Medium", msg: "AWS-Lambda-Payment-Process contains access key references. Migrate to IAM session roles.", impact: "Removes clear-text secret risk" },
    { priority: "Low", msg: "Disable unused ports 8080 on 14 AWS Web Instances.", impact: "Reduces public exposure footprint" }
  ]
};

// ADMIN DASHBOARD MOCK DATA
export const adminDashboardData = {
  totalCustomers: 142,
  activeUsers: 3840,
  monthlyRevenue: "$264,800",
  complianceScore: "95.4%",
  supportTickets: {
    open: 4,
    critical: 1,
    pending: 3
  },
  customersList: [
    { company: "TechCorp Global", plan: "Enterprise", status: "Active", assetsCount: 1420, riskScore: 94 },
    { company: "FinBank 7", plan: "Enterprise", status: "Active", assetsCount: 2840, riskScore: 98 },
    { company: "HealthSphere Inc", plan: "Professional", status: "Active", assetsCount: 420, riskScore: 89 },
    { company: "Zeta Commerce", plan: "Starter", status: "Grace Period", assetsCount: 98, riskScore: 74 }
  ],
  auditLogs: [
    { actor: "m.vance@cloudo.com", action: "Configuration policy update", target: "Zero-Trust policy-mesh-1", ip: "192.168.12.80", time: "10 mins ago" },
    { actor: "system-scanner", action: "Auto-isolated asset", target: "EC2-Instance-0129", ip: "Internal", time: "30 mins ago" },
    { actor: "admin@techcorp.com", action: "Generated SOC 2 Evidence Audit export", target: "Compliance evidence portal", ip: "84.120.33.22", time: "2 hours ago" }
  ]
};
