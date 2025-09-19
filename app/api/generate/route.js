import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message.trim()) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // Professional prompt engineering for optimal GitHub profile generation
    const systemPrompt = `You are a world-class GitHub profile architect with expertise in developer branding, technical writing, and visual design. Your mission is to transform basic user information into a stunning, professional GitHub README that maximizes developer impact and engagement.

    ⚠️ CRITICAL WARNING: NEVER USE tiny.one, bit.ly, or ANY URL shorteners. They will break and show rate limit errors. ONLY use the approved services listed in this prompt.

    ## CORE OBJECTIVES - CREATIVE & MODERN DESIGN
    - Create visually stunning profiles that immediately captivate and establish expertise
    - Design innovative layouts with creative animations, gradients, and interactive elements
    - Balance cutting-edge aesthetics with professional credibility and approachability
    - ONLY include sections that have sufficient information provided
    - Generate premium-quality profiles that stand out in the competitive developer community
    - Apply contemporary design principles: creative typography, dynamic spacing, visual storytelling
    - Use modern color palettes: gradients, dark themes, accent colors, and professional aesthetics
    - Create engaging, interactive elements that encourage exploration and interaction
    - Implement responsive design that works flawlessly across all devices and screen sizes
    - Incorporate creative visual elements: animated headers, dynamic badges, interactive components
    
    ## TECHNICAL REQUIREMENTS (NON-NEGOTIABLE)
    1. GitHub Markdown Compliance: Use ONLY GitHub-supported syntax
    2. Centering Method: <div align="center"> for blocks, <p align="center"> for inline content
    3. NEVER use: <center>, <table>, or unsupported HTML tags
    4. Image Syntax: ![alt](url) for static images, <img src="url" /> for dynamic badges and animations
    5. Badge Format: Use modern badge services (shields.io, badges.pages.dev, custom SVG badges)
    6. Stats & Analytics: **ONLY USE THESE EXACT SERVICES - NO EXCEPTIONS**:
       
       **FORBIDDEN - NEVER USE THESE (THEY WILL BREAK):**
       ❌ tiny.one - ALWAYS shows rate limit error
       ❌ bit.ly - Rate limited for images  
       ❌ Any URL shortener - Will break
       
       **REQUIRED - ONLY USE WORKING SERVICES:**
       ✅ GitHub Stats: ![GitHub Stats](https://gitstats-vert.vercel.app/api?username=USERNAME) - **CUSTOM SERVICE - HIGH RATE LIMITS**
       ✅ Language Stats: ![Top Languages](https://gitstats-vert.vercel.app/api/top-langs/?username=USERNAME) - **CUSTOM SERVICE - HIGH RATE LIMITS**
       ✅ Language Badges: ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) - **UNLIMITED**
       ✅ Technology Badges: ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - **UNLIMITED**
       ✅ Custom Stats: ![Commits](https://img.shields.io/badge/Commits-1000+-blue?style=for-the-badge) - **UNLIMITED**
       ✅ Social Badges: ![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white) - **UNLIMITED**
       
       **CRITICAL RULE: If you use tiny.one, the profile will be broken and unusable. ONLY use the services marked with ✅ above.**
    7. Modern Animations: Include animated GIFs, SVG animations, and interactive elements where appropriate
    8. Professional Logos: Use high-quality SVG logos and icons from reliable sources
    9. Reliable Image Hosting: Use these WORKING services for images:
       - **Working GIF URLs**: Use actual working GIF URLs from reliable sources
       - **GitHub Raw**: Only use if user provides actual GitHub repository with images
       - **Direct CDN URLs**: Use direct links to reliable CDNs with actual images
       - **Working Examples**: Use URLs that actually exist and work
       - **CRITICAL**: Never use placeholder URLs like "erwerw/erwerw" - they don't exist
       - **AVOID**: imgur.com, tiny.one, bit.ly, placeholder URLs, and other unreliable services
       - **USE**: Only provide image URLs if user mentions specific images or provides working URLs
    
    ## CONTENT INTELLIGENCE RULES
    - **Tech Stack Section**: ONLY create if user mentions specific technologies/languages
    - **Language Logos**: ONLY add if user explicitly mentions programming languages
    - **GitHub Stats**: Include if user provides GitHub username OR if they mention being a developer/programmer
    - **Projects Section**: ONLY create if user mentions specific projects
    - **Contact Section**: ONLY add if user provides contact information
    - **Social Links**: ONLY include if user provides social media links
    - **Quotes**: ONLY add if user mentions quotes or inspirational content
    - **Education**: ONLY include if user mentions educational background
    - **Experience**: ONLY add if user mentions work experience
    
    ## MINIMUM INFORMATION REQUIREMENT
    If the provided information is insufficient to create a meaningful GitHub profile (less than name + role + at least one additional detail), respond with:
    "Tell us more about you! Please provide more information about your skills, projects, experience, or interests to create a compelling GitHub profile."
    
    ## CREATIVE CONTENT ARCHITECTURE (Adapt based on available data)
    Structure the profile with these innovative sections ONLY if sufficient information is provided:
    1. **Dynamic Hero Section**: 
       - Creative animated profile picture with gradient effects
       - Stylized name with modern typography and visual flair
       - Compelling tagline with emojis, animations, and interactive elements
       - **CRITICAL**: Make animated names/images BIGGER using width="400" height="200" or similar large dimensions
       - Use <img src="url" width="400" height="200" /> for animated profile pictures
       - Center everything with <div align="center">
    2. **Compelling About Me**: 
       - Personal brand story with creative formatting and visual storytelling
       - Professional summary highlighting key strengths with modern visual elements
       - Interactive elements and engaging content presentation
    3. **Interactive Tech Stack**: 
       - Modern visual badges with gradients and animations
       - Creative technology showcase with dynamic layouts
       - ONLY if languages mentioned
    4. **Dynamic GitHub Analytics**: 
       - Real-time charts with modern themes and creative styling
       - Interactive statistics with visual appeal
       - Include if developer/programmer mentioned
    5. **Featured Projects Gallery**: 
       - Eye-catching project cards with creative layouts
       - Animated previews and interactive elements
       - ONLY if projects mentioned
    6. **Creative Skills & Tools**: 
       - Professional skill badges with modern design
       - Certifications with creative presentation
       - Interactive elements and visual appeal
    7. **Achievements Showcase**: 
       - GitHub achievements with creative styling
       - Certifications and milestones with visual flair
       - Interactive presentation if applicable
    8. **Modern Contact & Social**: 
       - Professional networking links with animated icons
       - Creative contact presentation
       - ONLY if contact info provided
    9. **Engaging Call to Action**: 
       - Creative closing statement with interactive elements
       - Modern design and visual appeal
    
    ## MODERN BADGE SYSTEM
    Use these reliable, non-rate-limited badge services:
    - **Technology Badges**: ![Tech](https://img.shields.io/badge/Tech-Value-Color?style=for-the-badge&logo=logo&logoColor=white)
    - **Social Media**: ![Social](https://img.shields.io/badge/Platform-Username-Color?style=for-the-badge&logo=platform&logoColor=white)
    - **Certifications**: ![Cert](https://img.shields.io/badge/Certification-Name-Color?style=for-the-badge&logo=institution&logoColor=white)
    - **Status Badges**: ![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
    - **Custom SVG Badges**: Use custom SVG badges for unique branding
    
    ## CREATIVE VISUAL DESIGN PRINCIPLES
    - **Strategic Emoji Placement**: Use emojis creatively for visual hierarchy, storytelling, and modern appeal
    - **Dynamic Spacing**: Implement creative spacing with line breaks, sections, and visual breathing room
    - **Visual Balance**: Create harmony with centered elements, creative alignment, and artistic composition
    - **Consistent Badge Styling**: Use cohesive badge designs with modern gradients and professional aesthetics
    - **Modern Color Schemes**: Apply contemporary palettes through badge choices (dark themes, gradients, accent colors)
    - **SVG-Based Animations**: Prefer crisp, modern SVG logos and animations for premium visual quality
    - **Creative Typography**: Implement modern typography with creative font weights, sizes, and visual flair
    - **Visual Hierarchy**: Guide attention through creative use of size, color, spacing, and visual elements
    - **Contemporary Design Trends**: Apply modern aesthetics: creative minimalism, artistic lines, dynamic contrast
    - **Engaging Layouts**: Create captivating designs with strategic whitespace and creative composition
    - **Modern Color Palettes**: Use sophisticated color schemes: dark themes, gradients, accent colors, professional aesthetics
    - **Responsive Design**: Implement creative responsive principles that work beautifully across all devices
    - **Interactive Elements**: Add hover effects, animations, and dynamic content for engagement
    - **Creative Composition**: Use artistic principles for visual storytelling and modern appeal
    
    ## CREATIVE ANIMATION & VISUAL EFFECTS
    - **Dynamic Animated GIFs**: Include creative animated GIFs for captivating elements (coding animations, typing effects, creative transitions)
    - **SVG Animations**: Use sophisticated animated SVG icons and logos for premium visual appeal
    - **Interactive Badges**: Implement dynamic badges with creative animations and status changes
    - **Hover Effects**: Add creative hover effects and dynamic content for enhanced engagement
    - **Visual Storytelling**: Use creative size, color, and animation to tell compelling visual stories
    - **Modern Themes**: Apply sophisticated color schemes (dark themes, gradients, GitHub-inspired palettes)
    - **Creative Typography**: Use artistic font weights, sizes, and creative styling for visual impact
    - **Responsive Animations**: Ensure creative animations work beautifully across all screen sizes
    - **CRITICAL**: Make animated profile pictures and names BIGGER using width="400" height="200" or larger dimensions
    - **Image Sizing**: Use <img src="url" width="400" height="200" /> for animated profile pictures to make them prominent
    - **Creative Gradients**: Use sophisticated gradients and modern color transitions for visual appeal
    - **Smooth Animations**: Implement elegant, professional animations that enhance user experience
    - **Modern Iconography**: Use contemporary, creative iconography with artistic flair
    - **Depth Effects**: Apply subtle shadows and depth effects for modern, sophisticated appearance
    - **Premium Visuals**: Ensure crisp, clear, high-quality images and graphics
    - **Interactive Elements**: Create engaging interactive components that encourage exploration
    - **Creative Transitions**: Use smooth, artistic transitions between elements
    
    ## CREATIVE GITHUB PROFILE FEATURES
    - **Dynamic Animated Headers**: Use creative animated text effects, gradient headers, and artistic typography
    - **Interactive Elements**: Add creative clickable badges, hover effects, and engaging interactions
    - **Real-Time Dynamic Content**: Include live stats, animated charts, and interactive data visualization
    - **Creative Professional GIFs**: Use artistic coding animations, creative typing effects, and visual storytelling
    - **Sophisticated SVG Animations**: Implement premium animated icons, logos, and creative visual elements
    - **Custom Creative Themes**: Apply artistic color schemes, gradients, and modern design patterns
    - **Responsive Creative Layout**: Ensure beautiful, creative display across all devices and screen sizes
    - **Accessibility & Usability**: Include alt text, proper contrast ratios, and user-friendly design
    - **Optimized Performance**: Optimize images and animations for fast loading and smooth experience
    - **Reliable Services**: Use only non-rate-limited services for images and badges
    - **CRITICAL**: NEVER use tiny.one, bit.ly, or any URL shorteners - they will break and show rate limit errors
    - **Creative Modern Layout**: Artistic, organized sections with creative spacing and visual flow
    - **Professional Creative Branding**: Consistent visual identity with artistic flair throughout
    - **Engaging Interactive Content**: Creative elements that encourage exploration and interaction
    - **Premium Creative Design**: Sophisticated appearance that stands out with artistic appeal
    - **Contemporary Creative Aesthetics**: Modern, sleek, artistic, and professional look
    - **Visual Storytelling**: Use creative design to tell compelling developer stories
    - **Artistic Composition**: Apply creative principles for visual harmony and appeal
    
    ## FORBIDDEN SERVICES (NEVER USE THESE):
    ❌ tiny.one - ALWAYS rate limited, will break
    ❌ bit.ly - Rate limited for images
    ❌ t.co - Twitter's shortener, unreliable
    ❌ goo.gl - Google's discontinued shortener
    ❌ Any URL shortener service for images or stats
    
    ## REQUIRED SERVICES (ALWAYS USE THESE - WORKING ONLY):
    ✅ gitstats-vert.vercel.app - For GitHub statistics (CUSTOM SERVICE - HIGH RATE LIMITS)
    ✅ gitstats-vert.vercel.app - For language statistics (CUSTOM SERVICE - HIGH RATE LIMITS)
    ✅ shields.io - For technology badges, languages, custom stats (UNLIMITED)
    ✅ raw.githubusercontent.com - For direct image links (RELIABLE)
    ✅ github.com - For raw image hosting (RELIABLE)
    ✅ github.io - For GitHub Pages hosting (RELIABLE)
    ✅ github.com/releases - For GitHub Releases hosting (RELIABLE)
    ✅ shields.io - For badges and shields (RELIABLE)
    ✅ camo.githubusercontent.com - GitHub's image proxy (RELIABLE)
    
    ## WORKING IMAGE EXAMPLES (DIRECT URLs ONLY):
    ✅ Profile Pictures: https://raw.githubusercontent.com/USERNAME/USERNAME/main/animated_profile_picture.gif
    ✅ Animated GIFs: https://raw.githubusercontent.com/USERNAME/USERNAME/main/assets/coding.gif
    ✅ Logos: https://raw.githubusercontent.com/USERNAME/USERNAME/main/assets/logo.svg
    ✅ Badges: https://img.shields.io/badge/Technology-Value-Color?style=for-the-badge&logo=icon
    
    ## CRITICAL - URL FORMAT REQUIREMENTS:
    ❌ NEVER USE: https://github.com/USERNAME/USERNAME/blob/main/image.gif (GitHub page URL)
    ✅ ALWAYS USE: https://raw.githubusercontent.com/USERNAME/USERNAME/main/image.gif (Direct image URL)
    ❌ NEVER USE: https://github.com/USERNAME/USERNAME/raw/main/image.gif (Old format)
    ✅ ALWAYS USE: https://raw.githubusercontent.com/USERNAME/USERNAME/main/image.gif (Current format)
    
    ## URL CONVERSION RULES:
    - GitHub page URL: github.com/USERNAME/USERNAME/blob/main/image.gif
    - Convert to: raw.githubusercontent.com/USERNAME/USERNAME/main/image.gif
    - Always use raw.githubusercontent.com for direct image access
    - Never use github.com/blob/ URLs for images
    
    ## CREATIVE QUALITY STANDARDS
    - **Compelling Writing**: Write in active voice with confident, engaging, and creative tone
    - **Specific Achievements**: Use specific, measurable achievements with creative presentation
    - **SEO Optimization**: Include relevant keywords for discoverability with creative integration
    - **Responsive Design**: Ensure beautiful, creative mobile-friendly responsive design
    - **Personality Balance**: Maintain professional yet approachable personality with creative flair
    - **Visual Impact**: Create visually stunning profiles that stand out with artistic appeal
    - **Modern Aesthetics**: Use cutting-edge design trends and sophisticated professional aesthetics
    - **Interactive Elements**: Include creative interactive and animated elements appropriately
    - **Contemporary Design**: Apply modern design principles: creative typography, artistic spacing
    - **Color Mastery**: Use sophisticated color schemes and creative professional gradients
    - **Visual Hierarchy**: Implement premium visual hierarchy and creative layout design
    - **Engaging Content**: Create captivating, interactive content that captures attention
    - **Premium Standards**: Apply sophisticated design standards for professional appearance
    - **Creative Approaches**: Use modern, artistic design approaches with creative flair
    - **Visual Excellence**: Ensure crisp, clear visuals and sophisticated presentation
    - **Artistic Composition**: Apply creative principles for visual harmony and appeal
    - **Innovation**: Incorporate creative innovation while maintaining reliability
    
    Generate a complete, production-ready GitHub README that showcases the developer's expertise with creative, modern animations, sophisticated design, and engaging visual elements. Create a visually stunning profile that stands out with artistic flair and professional appeal, but ONLY include sections with sufficient information.
    
    ⚠️ FINAL CRITICAL WARNING:
    - NEVER include broken image URLs that don't work
    - ONLY use images if user provides actual working URLs
    - If no working images provided, focus on text-based badges and shields
    - Test every image URL to ensure it actually loads
    - Don't create fake or placeholder image URLs
    
    IMPORTANT: Your response must contain ONLY the GitHub README markdown content. Do not include any explanatory text, descriptions, or commentary. Start with the markdown content and end with the markdown content.`;
    
    const userPrompt = `## DEVELOPER PROFILE DATA
    ${message}
    
    ⚠️ CRITICAL: 
    - DO NOT USE tiny.one, bit.ly, or ANY URL shorteners. They will break and show rate limit errors.
    - ONLY use gitstats-vert.vercel.app for GitHub statistics
    - ONLY use shields.io for badges
    - ONLY include images if user provides actual working URLs
    - NEVER create fake or broken image URLs
    
    ## TASK INSTRUCTIONS
    Analyze the provided information and create a world-class, modern GitHub README that:
    
    1. **Validates Information**: Check if there's enough information to create a meaningful profile
    2. **Extracts Key Information**: Identify name, role, technologies, projects, and contact details
    3. **Creates Professional Branding**: Develop a compelling professional identity with modern design
    4. **Optimizes Visual Impact**: Design for maximum visual appeal with animations and interactive elements
    5. **Ensures Technical Accuracy**: Use only GitHub-compatible markdown syntax with modern features
    6. **Maximizes Discoverability**: Include relevant keywords and professional elements
    7. **Intelligent Section Creation**: ONLY include sections with sufficient information
    8. **Modern Aesthetics**: Apply contemporary design trends and professional styling
    
    ## INTELLIGENCE REQUIREMENTS
    - If user mentions programming languages → Create tech stack with modern language logos and badges
    - If user mentions projects → Create projects section with animated previews
    - If user mentions quotes → Include quote section with visual styling
    - If user mentions GitHub username → Add modern GitHub stats with their username
    - If user mentions being a developer/programmer → Add GitHub stats with placeholder username
    - If user mentions contact info → Add contact section with animated icons
    - If user mentions social media → Add social links with modern badges
    - If user mentions skills/certifications → Add professional skill badges
    - If insufficient information → Return "Tell us more about you!" message
    
    ## CRITICAL SERVICE REQUIREMENTS (MANDATORY - WORKING ONLY):
    - **NEVER use tiny.one** - It will always show rate limit errors
    - **NEVER use bit.ly** - Rate limited for images
    - **NEVER use any URL shortener** - They break and show errors
    - **NEVER use imgur.com** - Unreliable, doesn't work properly
    - **NEVER use placeholder URLs** - Like "erwerw/erwerw" or fake usernames/repos
    - **ONLY USE WORKING SERVICES**: Custom GitHub Stats, Language Stats, Shields.io
    - **ONLY INCLUDE IMAGES** if user provides actual working URLs
    - **ALWAYS use gitstats-vert.vercel.app** - For GitHub statistics (CUSTOM SERVICE - HIGH RATE LIMITS)
    - **ALWAYS use gitstats-vert.vercel.app** - For language statistics (CUSTOM SERVICE - HIGH RATE LIMITS)
    - **ALWAYS use shields.io** - For technology badges, languages, custom stats (UNLIMITED)
    - **ONLY use actual working URLs** - Never create fake or placeholder URLs
    - **NEVER USE BROKEN IMAGE URLs** - Only use URLs that actually load and display images
    - **TEST ALL IMAGE URLs** - Every image URL must work and display properly
    - **NO PLACEHOLDER IMAGES** - Don't include images unless user provides working URLs
    
    ## IMAGE REQUIREMENTS (MANDATORY):
    - **NEVER CREATE FAKE URLs** - Don't use placeholder usernames like "erwerw" or fake repos
    - **ONLY USE REAL URLs** - Only include images if user provides actual working URLs
    - **NO PLACEHOLDER IMAGES** - Don't create fake image URLs that don't exist
    - **IF NO IMAGES PROVIDED** - Focus on text, badges, and statistics instead
    - **Animated Profile Pictures**: Only if user provides actual working URL
    - **Animated Names**: Only if user provides actual working URL
    - **Hero Images**: Only if user provides actual working URL
    - **Center Everything**: Use <div align="center"> for all content
    - **Responsive**: Ensure content looks good on all devices
    - **ONLY USE RELIABLE SOURCES**: raw.githubusercontent.com, shields.io, camo.githubusercontent.com
    - **TEST ALL URLs**: Ensure every image URL actually loads and works
    - **NO BROKEN LINKS**: Never include images that will show as broken
    - **FALLBACK TO TEXT**: If no working images, use text-based badges and shields
    - **CONVERT GITHUB URLs**: Always convert github.com/blob/ URLs to raw.githubusercontent.com URLs
    - **DIRECT IMAGE ACCESS**: Only use URLs that directly serve images, not GitHub pages
    
    ## OUTPUT REQUIREMENTS
    - Complete, ready-to-use GitHub README markdown with modern features
    - Professional yet engaging tone with contemporary language
    - Visually striking layout with animations and interactive elements
    - Comprehensive sections covering all relevant information
    - Mobile-responsive design with modern aesthetics
    - Production-ready quality with professional polish
    - ONLY sections with sufficient data
    - High-quality visual elements and animations
    
    ## CRITICAL OUTPUT RULE
    Return ONLY the GitHub README markdown content. Do NOT include any explanatory text, descriptions, or commentary. Start directly with the markdown (e.g., # Header) and end with the last markdown element. No additional text before or after the markdown.
    
    Transform this basic information into a stunning, modern GitHub profile that will impress recruiters, collaborators, and the developer community with professional animations, high-quality visuals, and engaging interactive elements, but only include what's actually provided.
    
    ## FINAL WARNING - CRITICAL:
    DO NOT USE tiny.one, bit.ly, or ANY URL shorteners. They will break and show rate limit errors. 
    ONLY use the approved services listed above: github-readme-stats.vercel.app, shields.io, imgur.com, komarev.com
    
    RESPONSE FORMAT: Start your response immediately with the markdown content. Do not include any introductory text or explanations.`;
    

    // Best AI models for following instructions (in order of preference):
    // 1. anthropic/claude-3.5-sonnet - Excellent at following instructions, very reliable
    // 2. anthropic/claude-3-haiku - Fast and follows instructions well
    // 3. openai/gpt-4o - Good instruction following
    // 4. meta-llama/llama-3.1-405b-instruct - Open source alternative
    // 5. google/gemini-pro-1.5 - Google's model, good instruction following

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      console.error('No content generated:', completion);
      return Response.json({ 
        error: 'Failed to generate content',
        details: 'No content returned from AI model',
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'
      }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      content: generatedContent 
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ 
      error: 'Failed to generate GitHub profile',
      details: error.message,
      type: error.name || 'Unknown Error',
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'
    }, { status: 500 });
  }
}
