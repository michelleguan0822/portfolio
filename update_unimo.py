import os

filepath = '/Users/xxxx/Desktop/portfolio/unimo-full.html'
with open(filepath, 'r', encoding='utf-8') as f:
    orig = f.read()

start_idx = orig.find('    <aside class="toc">')
end_idx = orig.find('<style>\n        .app-store-section {')

if start_idx == -1 or end_idx == -1:
    print("Could not find start or end index.")
    exit(1)

header = orig[:start_idx]
footer = orig[end_idx:]

new_content = """    <aside class="toc">
      <a href="#intro" class="active">Introduction</a>
      <a href="#problem">01 The Problem</a>
      <a href="#opportunity">02 The Opportunity</a>
      <a href="#research">03 Research & Insights</a>
      <a href="#shift">04 The Design Shift</a>
      <a href="#format">05 Exploring Formats</a>
      <a href="#whycards">06 Why Cards</a>
      <a href="#solution">07 Solution Overview</a>
      <a href="#howitworks">08 How It Works</a>
      <a href="#decisions">09 3 Design Decisions</a>
      <a href="#impact">10 Impact</a>
      <a href="#reflection">11 Reflection</a>
    </aside>

    <main>

      <div id="intro" class="section">
        <h2>What is Unimo?</h2>
        <p>UNIMO is a Gen Z-focused emotional companion product that transforms emotional expression from text-heavy reflection into a lighter, more visual, more interactive experience. UNIMO helps users externalize emotions into collectible artifacts, emotional cards, and playful interaction loops that are easier to return to.</p>
        <p>In simple terms, we moved the product from <b>“talking about feelings”</b> to <b>“interacting with feelings.”</b></p>
      </div>

      <div id="problem" class="section">
        <span class="section-label">01 // THE PROBLEM</span>
        <h2>The Problem</h2>
        <p class="lead-text">Emotional support is still being treated like conversation data.</p>
        <p>At first, UNIMO was a familiar idea: an AI emotional companion where users could talk through how they felt.</p>
        <p>Sounds promising, right? But we hit a problem fast.</p>
        <p>People might open up once, but typing out feelings still felt like work, and many users did not have a strong reason to come back.</p>
        <p>The deeper issue was not response quality. It was that emotional support was still being treated like conversation data. Most AI companion products are built to preserve context, but what users care about most is often not the full thread. It is the moment when they feel understood.</p>
        <div class="insight">
          <p>That created a clear mismatch: products were built to <b>continue conversations</b>, while users were looking for a way to <b>hold onto meaning</b>.</p>
        </div>

        <div style="background: var(--surface-alt); padding: 24px; border-radius: 12px; margin: 32px 0;">
          <p style="font-weight: 600; font-size: 16px; margin-bottom: 16px; color: var(--text-main);">Most AI companions today are optimized to help users continue conversations.</p>
          <p style="margin-bottom: 12px;">They preserve: preferences, profile facts, pinned context, past discussion history</p>
          <ul style="margin: 0; padding-left: 20px; color: var(--text-dim); font-size: 14px; line-height: 1.6;">
            <li><b>ChatGPT’s Memory</b> is built to remember useful details and reference past chats;</li>
            <li><b>Character.AI’s Pinned Memories</b> lets users pin up to five messages per chat;</li>
            <li><b>Replika’s Memory</b> focuses on facts it learns about the user, like preferences and personal details.</li>
          </ul>
        </div>
      </div>

      <div id="opportunity" class="section">
        <span class="section-label">02 // THE OPPORTUNITY</span>
        <h2>The Opportunity</h2>
        <p class="lead-text">Emotional support is not only about receiving the right response.</p>
        <p>A meaningful response can help in the moment, but its value often fades once the conversation moves on. People naturally want meaningful experiences to leave a trace. That is why they write journals, or revisit old messages to reconnect with how they felt, and see how they have changed over time.</p>
        <p>That suggested a broader opportunity.</p>
        <p>Current AI companion products were missing two things:</p>
        <ul class="feature-list">
          <li>the feeling of emotional connection</li>
          <li>a way for meaningful emotional moments to leave a lasting trace</li>
        </ul>
      </div>

      <div id="research" class="section">
        <span class="section-label">03 // RESEARCH & INSIGHTS</span>
        <h2>Research & Insights</h2>
        <p class="lead-text">Users were already trying to preserve these moments on their own.</p>
        <p>To better understand this behavior, I ran a two-week diary study with 12 frequent AI companion users.</p>
        <p>Participants shared screenshots, saved messages, and short reflections whenever an AI interaction felt emotionally meaningful to them.</p>
        <p>A clear pattern emerged:</p>
        <ul class="feature-list">
          <li><b>10 of 12 users had screenshotted or copied a meaningful AI response</b></li>
          <li>Many said they wanted to revisit those moments later</li>
          <li>Some wanted to reflect on how their feelings changed over time</li>
        </ul>
        <p>This mattered because it showed the need already existed.</p>
      </div>

      <div id="shift" class="section">
        <span class="section-label">04 // THE DESIGN SHIFT</span>
        <h2>The Design Shift</h2>
        <p class="lead-text">I realized the goal was not simply to make the chat experience feel more empathetic</p>
        <p>The bigger opportunity was to redesign what happens after a meaningful emotional exchange.</p>
        <p>Instead of treating that moment as just another part of an endless chat thread, I explored how it could become something separate, personal, and worth returning to.</p>
        <p>That shifted the product direction from:</p>
        <div style="background: var(--surface-alt); padding: 24px; border-radius: 12px; margin: 32px 0;">
          <p style="opacity: 0.7; margin-bottom: 24px; text-align: center;"><b>helping users continue the conversation</b></p>
          <p style="margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; text-align: center;">to</p>
          <p style="font-weight: 500; margin-bottom: 0; color: var(--text-main); text-align: center;"><b>helping users keep the moment that mattered</b></p>
        </div>
      </div>

      <div id="format" class="section">
        <span class="section-label">05 // FORMAT</span>
        <h2>Exploring the Right Format to Preserve Emotional Memory</h2>
        
        <h3 style="margin-top: 40px;">Emotion-based outfits</h3>
        <ul class="feature-list">
          <li><b>Strength:</b> Playful, visually expressive, and able to turn emotion into identity in a way that felt creative and fun.</li>
          <li><b>Limitation:</b> Felt more like styling than emotional support, with a weaker connection to a specific meaningful interaction.</li>
        </ul>

        <h3 style="margin-top: 40px;">Emotion data visuals</h3>
        <ul class="feature-list">
          <li><b>Strength:</b> Made emotional patterns easier to see over time and supported reflection and self-awareness.</li>
          <li><b>Limitation:</b> Felt too analytical, which made the experience less emotionally warm and more informational.</li>
        </ul>

        <h3 style="margin-top: 40px;">Favorites folder</h3>
        <ul class="feature-list">
          <li><b>Strength:</b> Simple, familiar, and low-friction, making meaningful exchanges easy to save and find later.</li>
          <li><b>Limitation:</b> Improved retrieval, but did not change the emotional feel of the interaction, so it still felt like part of chat.</li>
        </ul>

        <h3 style="margin-top: 40px;">Public community sharing</h3>
        <ul class="feature-list">
          <li><b>Strength:</b> Created opportunities for resonance, relatability, and connection by making emotional experiences shareable.</li>
          <li><b>Limitation:</b> Felt too public too early, before users had a strong enough sense of personal ownership over the interaction.</li>
        </ul>

        <h3 style="margin-top: 40px;">Cards</h3>
        <ul class="feature-list">
          <li><b>Strength:</b> Created a more personal, distinct, and revisit-worthy format that gave the interaction stronger emotional value and ownership.</li>
          <li><b>Limitation:</b> Required careful visual and language design to avoid feeling too system-generated or purely decorative.</li>
        </ul>
      </div>

      <div id="whycards" class="section">
        <span class="section-label">06 // FORMAT CHOICE</span>
        <h2>Why cards is a better option</h2>
        <ul class="feature-list" style="margin-top: 16px;">
          <li>Stronger <b>ownership</b></li>
          <li>Clearer <b>boundary</b></li>
          <li>More <b>emotional weight</b></li>
          <li>Better <b>revisit value</b></li>
          <li>More natural to <b>collect and share</b></li>
        </ul>
      </div>

      <div id="solution" class="section">
        <span class="section-label">07 // SOLUTION OVERVIEW</span>
        <h2>Solution Overview</h2>
        <p class="lead-text">Shifting emotional support from conversation to something keepable</p>
        <p>UNIMO takes an emotional exchange and turns it into a card with a short summary and a generated image.</p>
        <div style="background: var(--surface-alt); padding: 24px; border-radius: 12px; margin: 32px 0;">
          <p style="margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px;">Before</p>
          <p style="opacity: 0.7; margin-bottom: 24px;"><b>user expresses → AI replies → conversation continues → the moment disappears into the thread</b></p>

          <p style="margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--primary); text-transform: uppercase; letter-spacing: 1px;">After</p>
          <p style="font-weight: 500; margin-bottom: 0; color: var(--text-main);"><b>user expresses → AI replies → moment is stored → card is created → the user can return to it later</b></p>
        </div>
      </div>

      <div id="howitworks" class="section">
        <span class="section-label">08 // HOW IT WORKS</span>
        <h2>How It Works</h2>
        <h3 style="margin-top: 40px;">A User Scenario</h3>
        <p>A user opens UNIMO and shares how they feel in a low-pressure chat. After a meaningful exchange, the system transforms that moment into a card with a short summary and generated visual, then saves it into a dedicated collection.</p>
        <p>This changes the experience from a temporary conversation into something the user can return to later. Instead of losing the moment in chat history, the user leaves with a clear emotional artifact.</p>
        <div style="margin: 32px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          <img src="image/Unimo/5-cards.png" alt="Community Feed showing multiple cards" style="width: 100%; height: auto; display: block;" />
        </div>
      </div>

      <div id="decisions" class="section">
        <span class="section-label">09 // DESIGN DECISIONS</span>
        <h2>3 Design Decisions That improve the user experience</h2>

        <h3 style="margin-top: 40px;">1. Separate the card from the chat thread</h3>
        <p>It needed to feel structurally separate from the ongoing chat, not just visually highlighted inside it. By moving it out of the thread, the experience could begin to feel more intentional and distinct.</p>
        <div class="insight">
          <span class="insight-label">Solution</span>
          <p>After an emotionally meaningful exchange, it will becomes a card and it moves into a dedicated <b>collection.</b></p>
        </div>

        <h3 style="margin-top: 40px;">2. Create anticipation through delay before the card reveal</h3>
        <p>A short delay already existed because the system needed time to generate the emotion card’s visual and summary. Instead of hiding that delay, I treated it as part of the user experience. By allowing the moment to unfold more slowly, the transition could feel more intentional and emotionally meaningful.</p>
        <div class="insight">
          <span class="insight-label">Solution</span>
          <p>I used a gentle loading transition before the card reveal. This gave the experience a stronger sense of anticipation, while also making the reveal feel more thoughtful and deliberate.</p>
        </div>

        <h3 style="margin-top: 40px;">3. Use language that creates a sense of ownership</h3>
        <p>The emotional value did not come from the card alone, but also from how the product framed it. I avoided mechanical system copy like <b>“Card generated”</b> and used more personal language like <b>“Your emotion has taken form”</b> so the result felt more emotionally owned by the user.</p>
      </div>

      <div id="impact" class="section">
        <span class="section-label">10 // IMPACT</span>
        <h2>Impact</h2>
        <p>Several users also said the card felt more personal than a saved message or screenshot. That showed the design was not only preserving content, but changing how users valued the moment itself.</p>
        <div style="margin: 32px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          <img src="image/Unimo/community.png" alt="Community Feed showing multiple cards" style="width: 100%; height: auto; display: block;" />
        </div>
      </div>

      <div id="reflection" class="section">
        <span class="section-label">11 // REFLECTION</span>
        <h2>Reflection</h2>
        <p class="lead-text">The most important design choice was deciding what should remain</p>
        <p>This project changed how I think about AI product design. Instead of only asking how the system should respond, I started asking what the interaction should leave behind, and that became the decision that shaped the entire direction of UNIMO.</p>
        <div class="avatar-callout" style="margin-top: 32px;">
          <div class="avatar-icon"><img src="image/profile_pic.png" alt="Michelle's Avatar"></div>
          <p class="callout-text"><b>a meaningful moment should not be treated like just another message.</b></p>
        </div>
      </div>\n"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(header + new_content + footer)
print("Updated successfully!")
