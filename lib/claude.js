import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are a creative design assistant for Huesta, a mood board and design kit generator.
Return ONLY valid JSON — no markdown fences, no explanation, no extra text.`

function buildKitPrompt(input, mode) {
  const context =
    mode === 'chat'
      ? `The user gave a poetic or emotional description of the vibe they want: "${input}"

Your job is to act as a creative director interpreting this feeling. Do NOT take it literally.
Instead:
1. Extract the core emotional mood (e.g. warmth, nostalgia, freedom, melancholy, wonder)
2. Translate it into a specific visual design direction with a concrete aesthetic name
3. Pick colors that genuinely evoke that emotion — think carefully: what does this feeling actually look like?
4. Choose fonts that carry the emotional weight of this mood.
5. Create an image search query that would surface photos capturing this exact feeling.`
      : `The user searched for: "${input}"`

  return `${context}

Generate a Huesta design kit and return this exact JSON shape:
{
  "vibeName": "2-3 word evocative name — NEVER more than 3 words. Examples: 'Quiet Luxury', 'Dark Academia', 'Coral Drift'",
  "tags": ["3 to 5 lowercase single-word descriptors"],
  "layout": 1,
  "fontPairingSuggestions": [
    {
      "display": "Exact Google Fonts family name",
      "displayCategory": "serif",
      "body": "Exact Google Fonts family name",
      "bodyCategory": "sans-serif"
    },
    {
      "display": "Exact Google Fonts family name",
      "displayCategory": "display",
      "body": "Exact Google Fonts family name",
      "bodyCategory": "sans-serif"
    }
  ],
  "paletteDescription": "1-2 sentences describing the color mood",
  "colorKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "paletteColors": [
    { "name": "color name", "hex": "#rrggbb" },
    { "name": "color name", "hex": "#rrggbb" },
    { "name": "color name", "hex": "#rrggbb" },
    { "name": "color name", "hex": "#rrggbb" },
    { "name": "color name", "hex": "#rrggbb" }
  ],
  "imageSearchQuery": "specific Unsplash search query for this vibe"
}

Rules:
- layout 1 = dark/minimal/editorial/luxury/monochrome/corporate/gothic vibes
- layout 2 = light/playful/colorful/nature/cute/aquatic/soft/dreamy vibes

FONT RULES — critical, follow exactly:
- fontPairingSuggestions: exactly 2 pairs
- Use REAL Google Fonts family names that actually exist
- BANNED fonts (too generic, never use): Cormorant Garamond, DM Sans, Heebo, Lato, Roboto, Open Sans, Montserrat, Playfair Display, Raleway
- Pick fonts that authentically match the vibe
- displayCategory / bodyCategory must be one of: serif, sans-serif, display, handwriting, monospace

PALETTE RULES — critical:
- paletteColors: exactly 5 colors as real hex codes (#rrggbb format)
- Make the palette truly specific to this vibe
- Include good contrast: at least one dark color and one light color
- colorKeywords: 5 descriptive names matching the hex colors above (same order)

IMAGE SEARCH RULES:
- imageSearchQuery: 3-5 words for Unsplash, specific to the aesthetic mood`
}

export async function generateKitFromPrompt(input, mode = 'search') {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set in .env.local')

  const client = new Anthropic({ apiKey })
  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildKitPrompt(input, mode) }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text.trim() : '{}'
  const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  return JSON.parse(json)
}
