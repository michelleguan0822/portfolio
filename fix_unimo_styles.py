import re

try:
    with open("unimo.html", "r") as f:
        html = f.read()

    # 1. Add Full Case study button right after the Hero Section paragraph
    old_subtitle = '<p class="subtitle">Now is not the time to be weighed down by heavy journaling. Catch your feelings playfully and effortlessly.</p>'
    if old_subtitle in html:
        new_subtitle = old_subtitle + """
        <div style="margin-top: 32px; margin-bottom: 40px; display: flex; align-items: center; justify-content: center; width: 100%;">
          <a href="unimo-full.html" class="btn" style="position: relative; z-index: 10;">
            <div class="btn-text">View Full Case Study</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <path d="M11.6801 14.62L14.2401 12.06L11.6801 9.5" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M4 12.0601H14.17" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </a>
        </div>
    """
        html = html.replace(old_subtitle, new_subtitle)
        print("Replaced subtitle and added button")
    else:
        print("Could not find subtitle to add button")

    # 2. Fix body background
    html = html.replace('background-color: #0b0b0f !important;', 'background-color: #000000 !important;')

    # 3. Fix list items to have lines (Image 2)
    old_list_item = """.split-list-item h3 {
      font-size: 18px;"""
    if old_list_item in html:
        new_list_item = """.split-list-item {
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .split-list-item:last-child {
      border-bottom: none;
    }
    .split-list-item h3 {
      font-size: 15px;"""
        html = html.replace(old_list_item, new_list_item)
        print("Replaced split list item styles")

    # 4. Fix grid layout (Image 3)
    old_grid_node = """.grid-node {
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
      border-radius: 12px;"""
    if old_grid_node in html:
        new_grid_node = """.grid-node {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
    }
    .grid-icon {
      width: 28px;
      height: 28px;
      background: rgba(255,255,255,0.05);
      border-radius: 50%;"""
        html = html.replace(old_grid_node, new_grid_node)
        print("Replaced grid node styles")

    with open("unimo.html", "w") as f:
        f.write(html)
    print("Updated unimo.html successfully")
except Exception as e:
    print("Error:", e)
