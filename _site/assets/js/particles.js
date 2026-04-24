(function () {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var particles = [];
  var particleCount = 50;
  var mouse = { x: null, y: null };
  var breathPhase = 0;
  var speed = window.innerWidth > 768 ? 0.5 : 1;
  var isTouch = false;

  var colors = [
    { r: 123, g: 91, b: 166 },   // #7B5BA6
    { r: 155, g: 123, b: 198 },  // #9B7BC6
    { r: 184, g: 160, b: 212 },  // #B8A0D4
    { r: 212, g: 197, b: 232 },  // #D4C5E8
    { r: 93, g: 78, b: 140 }     // #5D4E8C
  ];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    var color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseRadius: Math.random() * 20 + 8,
      radius: 0,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      color: color,
      breathOffset: Math.random() * Math.PI * 2,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.0005 + 0.0003
    };
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    breathPhase += 0.003;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Breathing pulse
      var breathScale = 1 + Math.sin(breathPhase + p.breathOffset) * 0.15;
      p.radius = p.baseRadius * breathScale;

      // Gentle drift
      p.driftAngle += p.driftSpeed * speed;
      p.vx += Math.cos(p.driftAngle) * 0.002 * speed;
      p.vy += Math.sin(p.driftAngle) * 0.002 * speed;

      // Cursor gravity
      if (mouse.x !== null && mouse.y !== null) {
        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && dist > 1) {
          var force = (isTouch ? 0.25 : 0.04 * speed) / dist;
          p.vx += dx * force;
          p.vy += dy * force;
        }
      }

      // Damping
      p.vx *= 0.995;
      p.vy *= 0.995;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -p.radius) p.x = canvas.width + p.radius;
      if (p.x > canvas.width + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = canvas.height + p.radius;
      if (p.y > canvas.height + p.radius) p.y = -p.radius;

      // Draw with radial gradient for soft glow
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + p.opacity + ')');
      gradient.addColorStop(1, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', function (e) {
    isTouch = false;
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  canvas.addEventListener('touchstart', function (e) {
    isTouch = true;
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('touchmove', function (e) {
    isTouch = true;
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('touchend', function () {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', function () {
    resize();
  });

  init();
  animate();
})();
