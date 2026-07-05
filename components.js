// Interactive Canvas 3D Globe Component
export function initGlobe(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  const points = [];
  const count = 180;
  const radius = Math.min(width, height) * 0.4;
  let rotationY = 0;
  let rotationX = 0;
  let targetRotationY = 0.003;
  let targetRotationX = 0.001;

  // Generate points on a sphere using Fibonacci spiral
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    points.push({
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    });
  }

  // Draw threat vectors (connections)
  const links = [];
  for (let i = 0; i < 12; i++) {
    links.push({
      p1: Math.floor(Math.random() * count),
      p2: Math.floor(Math.random() * count),
      glow: Math.random(),
      speed: 0.01 + Math.random() * 0.02,
      progress: Math.random()
    });
  }

  let mouseX = 0, mouseY = 0;
  let isHovered = false;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left - width / 2;
    mouseY = e.clientY - rect.top - height / 2;
    targetRotationY = mouseX * 0.00005;
    targetRotationX = mouseY * 0.00005;
    isHovered = true;
  });

  canvas.addEventListener('mouseleave', () => {
    targetRotationY = 0.003;
    targetRotationX = 0.001;
    isHovered = false;
  });

  window.addEventListener('resize', () => {
    if (!canvas) return;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Dynamic rotation decay/easing
    rotationY += (targetRotationY - rotationY) * 0.05;
    rotationX += (targetRotationX - rotationX) * 0.05;

    // Adjust fallback rotation if user is idle
    if (!isHovered) {
      rotationY += 0.002;
    }

    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);

    // Projected points
    const projected = [];

    points.forEach((p) => {
      // Rotate around Y axis
      let x1 = p.x * cosY - p.z * sinY;
      let z1 = p.x * sinY + p.z * cosY;

      // Rotate around X axis
      let y2 = p.y * cosX - z1 * sinX;
      let z2 = p.y * sinX + z1 * cosX;

      // Perspective projection
      const perspective = 400;
      const scale = perspective / (perspective + z2);
      const projX = x1 * scale + width / 2;
      const projY = y2 * scale + height / 2;

      projected.push({ x: projX, y: projY, z: z2, scale: scale });

      // Draw point
      if (z2 > -radius) {
        const opacity = Math.max(0.1, (radius - z2) / (radius * 2));
        ctx.fillStyle = `rgba(0, 240, 255, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(1, 1.8 * scale), 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle neon glow to foreground points
        if (z2 < -radius * 0.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f0ff';
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(projX, projY, 1 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    });

    // Draw active link vectors
    links.forEach((l) => {
      const p1 = projected[l.p1];
      const p2 = projected[l.p2];

      if (p1 && p2 && p1.z < 0 && p2.z < 0) {
        l.progress += l.speed;
        if (l.progress > 1) {
          l.progress = 0;
          l.p1 = Math.floor(Math.random() * count);
          l.p2 = Math.floor(Math.random() * count);
        }

        ctx.strokeStyle = `rgba(171, 32, 253, ${0.1 + (1 - p1.z / radius) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Draw laser threat node traveling along the link
        const currentX = p1.x + (p2.x - p1.x) * l.progress;
        const currentY = p1.y + (p2.y - p1.y) * l.progress;
        ctx.fillStyle = '#ff007f';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff007f';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Live cyberattack map rendering using flat grid mapping
export function initAttackMap(canvasId, attackLogId) {
  const canvas = document.getElementById(canvasId);
  const logContainer = document.getElementById(attackLogId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  const cities = [
    { name: "San Francisco", x: 0.15, y: 0.35, ip: "198.102.33.14" },
    { name: "New York", x: 0.28, y: 0.32, ip: "64.22.100.8" },
    { name: "London", x: 0.48, y: 0.25, ip: "82.16.200.41" },
    { name: "Frankfurt", x: 0.52, y: 0.26, ip: "91.80.34.110" },
    { name: "Tokyo", x: 0.85, y: 0.38, ip: "210.140.10.88" },
    { name: "Singapore", x: 0.78, y: 0.58, ip: "118.200.99.19" },
    { name: "Sydney", x: 0.88, y: 0.82, ip: "103.4.220.5" },
    { name: "São Paulo", x: 0.35, y: 0.72, ip: "200.18.90.1" },
    { name: "Cape Town", x: 0.54, y: 0.78, ip: "196.25.10.6" }
  ];

  const activeAttacks = [];
  const ripples = [];
  const logs = [];

  function spawnAttack() {
    const fromIdx = Math.floor(Math.random() * cities.length);
    let toIdx = Math.floor(Math.random() * cities.length);
    while (toIdx === fromIdx) {
      toIdx = Math.floor(Math.random() * cities.length);
    }
    const from = cities[fromIdx];
    const to = cities[toIdx];
    const threatTypes = [
      "SQLi Probe", "Zero-Day Exploit", "Kubernetes Drift", 
      "IAM Escalation", "API Exfiltration", "DDoS Flood"
    ];
    const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];

    const attack = {
      from,
      to,
      threat,
      progress: 0,
      speed: 0.008 + Math.random() * 0.008
    };

    activeAttacks.push(attack);

    // Push to scrolling log
    const logItem = `
      <div class="p-2 border-b border-[rgba(255,255,255,0.05)] text-xs flex justify-between items-center animate-pulse-glow">
        <span class="text-[#ff007f] font-mono">[BLOCKED]</span>
        <span class="text-slate-300 font-semibold">${threat}</span>
        <span class="text-slate-400 text-[10px]">${from.name} &rarr; ${to.name}</span>
      </div>`;
    
    if (logContainer) {
      logContainer.innerHTML = logItem + logContainer.innerHTML;
      if (logContainer.children.length > 25) {
        logContainer.removeChild(logContainer.lastChild);
      }
    }
  }

  // Initial logs
  for (let i = 0; i < 5; i++) {
    spawnAttack();
  }

  // Periodically spawn attacks
  const interval = setInterval(spawnAttack, 2000);

  window.addEventListener('resize', () => {
    if (!canvas) return;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  });

  function drawBezierArc(x1, y1, x2, y2, progress, color) {
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 40; // curve offset

    ctx.strokeStyle = 'rgba(255, 0, 127, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();

    // Traveling pulse
    const t = progress;
    const currentX = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
    const currentY = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;

    ctx.fillStyle = color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid map background skeleton
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        ctx.fillRect(i, j, 2, 2);
      }
    }

    // Draw active connection lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        ctx.beginPath();
        ctx.moveTo(cities[i].x * width, cities[i].y * height);
        ctx.lineTo(cities[j].x * width, cities[j].y * height);
        ctx.stroke();
      }
    }

    // Draw city nodes
    cities.forEach(c => {
      ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(c.x * width, c.y * height, 4, 0, Math.PI * 2);
      ctx.fill();

      // label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '9px Space Grotesk';
      ctx.fillText(c.name, c.x * width + 8, c.y * height + 3);
    });

    // Animate attacks
    for (let i = activeAttacks.length - 1; i >= 0; i--) {
      const a = activeAttacks[i];
      a.progress += a.speed;

      const x1 = a.from.x * width;
      const y1 = a.from.y * height;
      const x2 = a.to.x * width;
      const y2 = a.to.y * height;

      drawBezierArc(x1, y1, x2, y2, a.progress, '#ff007f');

      if (a.progress >= 1) {
        // Spawn ripple on destination
        ripples.push({
          x: x2,
          y: y2,
          radius: 1,
          maxRadius: 30,
          opacity: 1
        });
        activeAttacks.splice(i, 1);
      }
    }

    // Draw landing ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += 1;
      r.opacity -= 0.035;

      ctx.strokeStyle = `rgba(255, 0, 127, ${r.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();

      if (r.opacity <= 0) {
        ripples.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  render();

  // Return clean-up handler
  return () => {
    clearInterval(interval);
  };
}

// Custom SVG Chart Engines to avoid charting library load errors
export function renderRadialScore(containerId, score) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const radius = 50;
  const stroke = 8;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  container.innerHTML = `
    <div class="relative flex items-center justify-center" style="width: 130px; height: 130px; margin: 0 auto;">
      <svg width="120" height="120" style="transform: rotate(-90deg);">
        <circle cx="60" cy="60" r="${radius}" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" stroke-width="${stroke}"></circle>
        <circle cx="60" cy="60" r="${radius}" fill="transparent" stroke="url(#scoreGlow)" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-width="${stroke}" stroke-linecap="round" style="transition: stroke-dashoffset 1s ease-out;"></circle>
        <defs>
          <linearGradient id="scoreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00f0ff" />
            <stop offset="100%" stop-color="#ab20fd" />
          </linearGradient>
        </defs>
      </svg>
      <div class="absolute text-center">
        <div class="text-3xl font-bold tracking-tight font-cyber" style="color: var(--neon-cyan);">${score}</div>
        <div class="text-[9px] text-slate-400 font-cyber">SECURITY RATE</div>
      </div>
    </div>`;
}

export function renderTimelineChart(containerId, dataPoints) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = 450;
  const height = 180;
  const padding = 30;

  const maxVal = Math.max(...dataPoints.map(d => d.val), 5) * 1.2;
  const pointsCount = dataPoints.length;

  let pathD = "";
  let areaD = "";
  
  const mappedPoints = dataPoints.map((d, idx) => {
    const x = padding + (idx / (pointsCount - 1)) * (width - padding * 2);
    const y = height - padding - (d.val / maxVal) * (height - padding * 2);
    return { x, y, label: d.label };
  });

  mappedPoints.forEach((p, idx) => {
    if (idx === 0) {
      pathD += `M ${p.x} ${p.y}`;
      areaD += `M ${p.x} ${height - padding} L ${p.x} ${p.y}`;
    } else {
      pathD += ` L ${p.x} ${p.y}`;
      areaD += ` L ${p.x} ${p.y}`;
    }
    if (idx === mappedPoints.length - 1) {
      areaD += ` L ${p.x} ${height - padding} Z`;
    }
  });

  let xLabels = "";
  mappedPoints.forEach((p, idx) => {
    if (idx % 2 === 0 || idx === mappedPoints.length - 1) {
      xLabels += `<text x="${p.x}" y="${height - 10}" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="Space Grotesk">${p.label}</text>`;
    }
  });

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="w-full h-full">
      <defs>
        <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#00f0ff" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <!-- Grid Lines -->
      <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      <line x1="${padding}" y1="${(height - padding * 2) / 2 + padding}" x2="${width - padding}" y2="${(height - padding * 2) / 2 + padding}" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      
      <!-- Area Fill -->
      <path d="${areaD}" fill="url(#areaGlow)"></path>
      
      <!-- Path Stroke -->
      <path d="${pathD}" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round"></path>
      
      <!-- Data Nodes -->
      ${mappedPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#ffffff" stroke="#ab20fd" stroke-width="1.5"></circle>`).join('')}
      
      <!-- X axis labels -->
      ${xLabels}
    </svg>`;
}

// AI Security Assistant Chatbot Controller
export function setupChatbot(containerId, inputId, sendBtnId) {
  const container = document.getElementById(containerId);
  const input = document.getElementById(inputId);
  const sendBtn = document.getElementById(sendBtnId);
  if (!container || !input) return;

  const responses = {
    "scan": "Initiating agentless Kubernetes & multi-cloud asset scanner... Active hosts checked: 824. Drifts detected: 1. Outdated libraries found in GKE worker nodes.",
    "threats": "Found 3 active security incidents: \n- GCP-Prod-Db-Instance: Suspicious container system call (CVE-2026-3829) [Critical]\n- AWS-Lambda-Token-Rotator: Anomalous connection attempt [Medium]\nRecommend micro-segmentation blocks.",
    "compliance": "Compliance breakdown:\n- SOC 2: 100% compliant\n- ISO 27001: 98% compliant\n- GDPR: 94% compliant\nNext automated evidence audit scheduled in 4 hours.",
    "isolation": "Command execution successful. Isolated GCP-Prod-Db-Instance from web routing segment at virtual firewalls layer.",
    "hello": "Hello. I am the Cloudo AI Cyber Core. Query me regarding network anomalies, active CVE scans, compliance statuses, or security drift resolutions.",
    "help": "Valid queries: 'scan', 'threats', 'compliance', 'isolation', or details regarding AWS/Azure configuration profiles."
  };

  function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('chat-message', sender);
    msg.innerText = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function handleSend() {
    const text = input.value.trim().toLowerCase();
    if (!text) return;

    addMessage('user', input.value);
    input.value = "";

    // Simulated parsing delay
    const loading = document.createElement('div');
    loading.classList.add('chat-message', 'bot', 'animate-pulse');
    loading.innerText = "Analyzing telemetry...";
    container.appendChild(loading);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      container.removeChild(loading);
      let reply = responses.help;
      for (const k in responses) {
        if (text.includes(k)) {
          reply = responses[k];
          break;
        }
      }
      addMessage('bot', reply);
    }, 800);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

  // Welcome message
  addMessage('bot', "Cloudo AI Cyber Core online. Telemetry feeds locked. Ask me anything.");
}

// Drag & Drop Widget Simulator
export function initDragAndDrop(gridContainerId) {
  const container = document.getElementById(gridContainerId);
  if (!container) return;

  const widgets = container.querySelectorAll('.draggable-widget');
  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('border-dashed', 'border-[var(--neon-cyan)]');
  }

  function handleDragLeave(e) {
    this.classList.remove('border-dashed', 'border-[var(--neon-cyan)]');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    widgets.forEach((w) => {
      w.classList.remove('border-dashed', 'border-[var(--neon-cyan)]');
    });
  }

  widgets.forEach((w) => {
    w.addEventListener('dragstart', handleDragStart, false);
    w.addEventListener('dragenter', handleDragEnter, false);
    w.addEventListener('dragover', handleDragOver, false);
    w.addEventListener('dragleave', handleDragLeave, false);
    w.addEventListener('drop', handleDrop, false);
    w.addEventListener('dragend', handleDragEnd, false);
  });
}
