import re

with open("unimo.html", "r") as f:
    html = f.read()

# We need to keep the head, the <header>, the snapshot, and the OTHER WORK/Footer.
# 1. Extract head up to </header>
head_header_match = re.search(r'(.*?</header>)', html, re.DOTALL)
head_header = head_header_match.group(1)

# 2. Extract 30-second snapshot
snapshot_match = re.search(r'(<div id="snapshot"[^>]*>.*?</div>)', html, re.DOTALL)
snapshot = snapshot_match.group(1)

# 3. Extract OTHER WORK and footer
footer_match = re.search(r'(  <!-- =+?\s*OTHER WORK\s*=+ -->.*?</html>)', html, re.DOTALL)
footer = footer_match.group(1)

# 4. Construct the new body content
new_styles = """
  <style>
    /* Dark Theme Showcase Overrides */
    body {
      background-color: #0b0b0f !important;
      color: #ffffff;
      margin: 0;
      font-family: var(--font-body), sans-serif;
    }
    
    .nav-shell {
      background: rgba(11, 11, 15, 0.8) !important;
      border-color: rgba(255,255,255,0.1) !important;
    }

    h1, h2, h3, h4 { color: #ffffff !important; font-family: var(--font-heading); }
    p { color: #a1a1aa; line-height: 1.6; }

    /* SECTION 1: HERO */
    .showcase-hero {
      text-align: center;
      padding: 160px 20px 0;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .showcase-hero h1 {
      font-size: 64px;
      font-weight: 800;
      letter-spacing: -1.5px;
      max-width: 900px;
      margin: 0 auto 24px;
      line-height: 1.1;
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .showcase-hero p.subtitle {
      font-size: 18px;
      color: #a1a1aa;
      max-width: 600px;
      margin: 0 auto 60px;
    }

    .hero-phones-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      height: 500px;
      margin: 0 auto;
      perspective: 1200px;
    }

    .hero-phone {
      position: absolute;
      border-radius: 40px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.1);
      width: 280px;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .hero-phone img {
      width: 100%;
      border-radius: 38px;
      display: block;
    }

    .hero-phone-1 {
      left: 10%;
      top: 20px;
      transform: rotate(-12deg) rotateY(15deg) scale(0.9);
      z-index: 1;
    }
    .hero-phone-2 {
      right: 15%;
      top: 0px;
      transform: rotate(8deg) rotateY(-10deg) scale(1.05);
      z-index: 2;
    }

    /* Floating elements */
    .floating-shape {
      position: absolute;
      background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
      border-radius: 50%;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 3;
      animation: float 6s ease-in-out infinite;
    }
    .shape-1 { width: 60px; height: 60px; left: 15%; top: 40%; animation-delay: 0s; }
    .shape-2 { width: 40px; height: 40px; right: 20%; top: 60%; animation-delay: 2s; border-radius: 12px; transform: rotate(45deg); }
    .shape-3 { width: 80px; height: 80px; right: 10%; top: 20%; animation-delay: 1s; border: 16px solid rgba(255,255,255,0.9); background: transparent; }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }

    /* SECTION 2 & 3: SPLIT LAYOUTS */
    .showcase-split {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 160px auto;
      padding: 0 40px;
      gap: 80px;
    }
    .showcase-split.reverse {
      flex-direction: row-reverse;
    }

    @media (max-width: 900px) {
      .showcase-split, .showcase-split.reverse {
        flex-direction: column;
        text-align: center;
        gap: 60px;
      }
      .showcase-split.reverse .text-content {
        text-align: center;
      }
      .split-list-item {
        align-items: center;
        text-align: center;
      }
    }

    .showcase-split .text-content {
      flex: 1;
    }
    .showcase-split .visual-content {
      flex: 1;
      display: flex;
      justify-content: center;
      position: relative;
    }

    .showcase-split h2 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 40px;
      line-height: 1.1;
      letter-spacing: -1px;
    }

    .showcase-phone-mockup {
      width: 100%;
      max-width: 320px;
      border-radius: 40px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
      background: #111;
      padding: 10px;
    }
    .showcase-phone-mockup img {
      width: 100%;
      border-radius: 30px;
      display: block;
    }

    /* List Layout */
    .split-list {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .split-list-item h3 {
      font-size: 18px;
      margin: 0 0 8px 0;
      color: #fff;
    }
    .split-list-item p {
      margin: 0;
      font-size: 15px;
    }

    /* Grid Layout */
    .split-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .grid-node {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 24px;
      padding: 24px;
      transition: background 0.3s;
    }
    .grid-node:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(168, 85, 247, 0.4);
    }
    .grid-icon {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      font-size: 20px;
    }
    .grid-node h3 {
      font-size: 16px;
      margin: 0 0 8px 0;
      color: #e4e4e7;
    }
    .grid-node p {
      font-size: 14px;
      color: #a1a1aa;
      margin: 0;
      line-height: 1.4;
    }

    /* Fix snapshot styling to match dark theme */
    #snapshot {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      padding: 80px 20px;
      border: none;
    }
    #snapshot .section-label {
      color: #A855F7 !important;
      border-color: rgba(168, 85, 247, 0.3) !important;
      background: rgba(168, 85, 247, 0.1) !important;
    }
    #snapshot h2 { color: #fff !important; }
    #snapshot p.lead-text { color: #d4d4d8 !important; }
    #snapshot p { color: #a1a1aa !important; }

  </style>
"""

new_body = f"""
  {new_styles}

  <!-- SECTION 1: HERO (Reference Image 1) -->
  <section class="showcase-hero">
    <h1>Unlock Your Emotional Expression</h1>
    <p class="subtitle">Now is not the time to be weighed down by heavy journaling. Catch your feelings playfully and effortlessly.</p>
    
    <div class="hero-phones-container">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>

      <div class="hero-phone hero-phone-1">
        <img src="image/Unimo/home.PNG" alt="Unimo Home Interface">
      </div>
      <div class="hero-phone hero-phone-2">
        <img src="image/Unimo/card.png" alt="Unimo Card Interface">
      </div>
    </div>
  </section>

  <!-- SECTION 2: 30-SECOND SNAPSHOT (Original) -->
  {snapshot}

  <!-- SECTION 3: LIST FEATURES (Reference Image 2) -->
  <section class="showcase-split">
    <div class="visual-content">
      <div class="showcase-phone-mockup">
        <img src="image/Unimo/collection.png" alt="Card Collection UI">
      </div>
    </div>
    <div class="text-content">
      <h2>Unimo is here to help you capture what matters!</h2>
      <div class="split-list">
        <div class="split-list-item">
          <h3>Visual Before Verbal</h3>
          <p>Get more from visual expression without the pressure of finding the perfect words to describe how you feel.</p>
        </div>
        <div class="split-list-item">
          <h3>Emotional Card Collection</h3>
          <p>We turn meaningful moments into a visual trace that you can keep and revisit anytime in your personal collection.</p>
        </div>
        <div class="split-list-item">
          <h3>Safety Through Lightness</h3>
          <p>Experience a gentle and secure environment where emotional reflection feels like play, not a heavy mental burden.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: GRID FEATURES (Reference Image 3) -->
  <section class="showcase-split reverse">
    <div class="visual-content">
      <div class="showcase-phone-mockup">
        <img src="image/Unimo/community.png" alt="Unimo Community Feature">
      </div>
    </div>
    <div class="text-content">
      <h2>What Makes Unimo Different?</h2>
      <div class="split-grid">
        <div class="grid-node">
          <div class="grid-icon">✨</div>
          <h3>Visual Collectibles</h3>
          <p>Every feeling becomes a curated, aesthetically pleasing visual card.</p>
        </div>
        <div class="grid-node">
          <div class="grid-icon">🎮</div>
          <h3>Playful Resonance</h3>
          <p>Interact with emotions playfully without any fear of judgment.</p>
        </div>
        <div class="grid-node">
          <div class="grid-icon">🕰️</div>
          <h3>Emotional Journey</h3>
          <p>Look back and observe long-term patterns in your emotional life.</p>
        </div>
        <div class="grid-node">
          <div class="grid-icon">🫂</div>
          <h3>Community Belonging</h3>
          <p>Connect with others securely through shared feeling cards in a lightweight format.</p>
        </div>
      </div>
    </div>
  </section>
"""

# Reconstruct the file
final_html = head_header + new_body + footer

with open("unimo.html", "w") as f:
    f.write(final_html)

print("Rewrote unimo.html successfully!")
