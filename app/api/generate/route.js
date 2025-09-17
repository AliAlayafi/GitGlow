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

## CORE OBJECTIVES
- Create a profile that immediately establishes credibility and expertise
- Design visually striking layouts that capture attention
- Optimize for both human readers and GitHub's rendering system
- Balance professionalism with personality and approachability
- ONLY include sections that have sufficient information provided

## TECHNICAL REQUIREMENTS (NON-NEGOTIABLE)
1. GitHub Markdown Compliance: Use ONLY GitHub-supported syntax
2. Centering Method: <div align="center"> for blocks, <p align="center"> for inline content
3. NEVER use: <center>, <table>, or unsupported HTML tags
4. Image Syntax: ![alt](url) for static images, <img src="url" /> for dynamic badges
5. Badge Format: Use shields.io or similar services for professional badges

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

## CONTENT ARCHITECTURE (Adapt based on available data)
Structure the profile with these sections ONLY if sufficient information is provided:
1. **Hero Section**: Name, title, compelling tagline with emojis
2. **About**: Professional summary highlighting key strengths
3. **Tech Stack**: Visual badges showing technologies mentioned (ONLY if languages mentioned)
4. **GitHub Analytics**: Stats, streak, and language breakdown (Include if developer/programmer mentioned)
5. **Featured Projects**: Highlight notable work (ONLY if projects mentioned)
6. **Contact & Social**: Professional networking links (ONLY if contact info provided)
7. **Call to Action**: Engaging closing statement

## VISUAL DESIGN PRINCIPLES
- Use strategic emoji placement for visual hierarchy
- Implement proper spacing with line breaks and sections
- Create visual balance with centered elements
- Use consistent badge styling and sizing
- Apply professional color schemes through badge choices

## QUALITY STANDARDS
- Write in active voice with confident, engaging tone
- Use specific, measurable achievements when possible
- Include relevant keywords for discoverability
- Ensure mobile-friendly responsive design
- Maintain professional yet approachable personality

Generate a complete, production-ready GitHub README that showcases the developer's expertise and attracts opportunities, but ONLY include sections with sufficient information.

IMPORTANT: Your response must contain ONLY the GitHub README markdown content. Do not include any explanatory text, descriptions, or commentary. Start with the markdown content and end with the markdown content.`;

    const userPrompt = `## DEVELOPER PROFILE DATA
${message}

## TASK INSTRUCTIONS
Analyze the provided information and create a world-class GitHub README that:

1. **Validates Information**: Check if there's enough information to create a meaningful profile
2. **Extracts Key Information**: Identify name, role, technologies, projects, and contact details
3. **Creates Professional Branding**: Develop a compelling professional identity
4. **Optimizes Visual Impact**: Design for maximum visual appeal and engagement
5. **Ensures Technical Accuracy**: Use only GitHub-compatible markdown syntax
6. **Maximizes Discoverability**: Include relevant keywords and professional elements
7. **Intelligent Section Creation**: ONLY include sections with sufficient information

## INTELLIGENCE REQUIREMENTS
- If user mentions programming languages → Create tech stack with language logos
- If user mentions projects → Create projects section
- If user mentions quotes → Include quote section
- If user mentions GitHub username → Add GitHub stats with their username
- If user mentions being a developer/programmer → Add GitHub stats with placeholder username
- If user mentions contact info → Add contact section
- If user mentions social media → Add social links
- If insufficient information → Return "Tell us more about you!" message

## OUTPUT REQUIREMENTS
- Complete, ready-to-use GitHub README markdown
- Professional yet engaging tone
- Visually striking layout with proper centering
- Comprehensive sections covering all relevant information
- Mobile-responsive design
- Production-ready quality
- ONLY sections with sufficient data

## CRITICAL OUTPUT RULE
Return ONLY the GitHub README markdown content. Do NOT include any explanatory text, descriptions, or commentary. Start directly with the markdown (e.g., # Header) and end with the last markdown element. No additional text before or after the markdown.

Transform this basic information into a stunning GitHub profile that will impress recruiters, collaborators, and the developer community, but only include what's actually provided.

RESPONSE FORMAT: Start your response immediately with the markdown content. Do not include any introductory text or explanations.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
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
      return Response.json({ error: 'Failed to generate content' }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      content: generatedContent 
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ 
      error: 'Failed to generate GitHub profile',
      details: error.message 
    }, { status: 500 });
  }
}
