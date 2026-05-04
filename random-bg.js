document.addEventListener("DOMContentLoaded", () => {
  const gradients = [
    "linear-gradient(135deg, #ffe6ea, #fdf6e3, #e6f7ff, #ffe6ea)", // pink-yellow-blue
    "linear-gradient(135deg, #e0f7fa, #e8eaf6, #f3e5f5, #e0f7fa)", // cyan-purple-pink
    "linear-gradient(135deg, #f1f8e9, #fff8e1, #fff3e0, #f1f8e9)", // light green-orange
    "linear-gradient(135deg, #fff0f5, #e6e6fa, #f0f8ff, #fff0f5)", // lavender-aliceblue
    "linear-gradient(135deg, #fff5e6, #ffe4e1, #fff0f5, #fff5e6)", // peach-pink
    "linear-gradient(135deg, #f0ffff, #e0ffff, #e6e6fa, #f0ffff)", // azure-cyan
    "linear-gradient(135deg, #ffffe0, #fffacd, #fafad2, #ffffe0)", // light yellow
    "linear-gradient(135deg, #f5fffa, #e0ffff, #f0f8ff, #f5fffa)"  // mint-cream
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  document.body.style.background = randomGradient;
  document.body.style.backgroundSize = "400% 400%";
});
