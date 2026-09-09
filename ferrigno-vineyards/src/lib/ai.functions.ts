import { createServerFn } from "@tanstack/react-start";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { WINES, CONTACT } from "@/data/site";

const HOUSE = `You write for Ferrigno Vineyards, a tiny family winery. Joe Ferrigno farms 40+ year old
Cabernet vines in the Willow Creek District of Paso Robles and makes the wine with veteran winemaker
Bob Dunning. A few hundred cases a year. The family is Italian-American, based in Newport Beach, California.
Voice: warm, plain-spoken, confident, never salesy, never flowery wine-critic language. Short sentences.
Never invent scores, awards, medals, vintages, or facts that are not given to you.`;

const WINE_CONTEXT = WINES.map(
  (w) =>
    `${w.name} (slug: ${w.slug}) — ${w.varietal}, ${w.appellation}. $${w.price}. ${w.status}. ${w.blurb} Notes: ${w.notes.join(", ")}. Pairings: ${w.pairings.join(", ")}.`,
).join("\n");

async function guarded<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) return fallback;
    throw error;
  }
}

/* ---------------- 1. Wine concierge ---------------- */

const RecommendInput = z.object({
  occasion: z.string().min(1).max(80),
  detail: z.string().max(400).optional(),
});

const recommendSchema = z.object({
  wineSlug: z.string(),
  headline: z.string(),
  why: z.string(),
  pairing: z.string(),
  bottles: z.number(),
  bottlesWhy: z.string(),
  serving: z.string(),
});

export const recommendWine = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RecommendInput.parse(input))
  .handler(async ({ data }) => {
    const { getModel } = await import("./ai-gateway.server");
    return guarded(
      async () => {
        const result = await generateText({
          model: getModel(),
          output: Output.object({ schema: recommendSchema }),
          system: `${HOUSE}

You are the Ferrigno wine concierge. Recommend exactly one wine from this list:
${WINE_CONTEXT}

wineSlug must be one of: ${WINES.map((w) => w.slug).join(", ")}.
headline: under 10 words, e.g. "The Cabernet, and not by a small margin."
why: two sentences, why this bottle for this occasion, in Joe's voice.
pairing: one sentence of concrete food or serving advice.
bottles: a sensible bottle count (1-12) for the situation.
bottlesWhy: under 15 words explaining the count.
serving: temperature or decanting tip, under 15 words.`,
          prompt: `Occasion: ${data.occasion}\nExtra detail from the guest: ${data.detail || "none given"}`,
        });
        return result.output;
      },
      {
        wineSlug: "cabernet",
        headline: "Start with the Cabernet.",
        why: "It is the wine the family is known for and it suits almost any table. Pour it with dinner and it makes sense immediately.",
        pairing: "Anything off the grill, or a hard aged cheese.",
        bottles: 2,
        bottlesWhy: "One for the table, one for later.",
        serving: "Serve at 62°F. Open thirty minutes ahead.",
      },
    );
  });

/* ---------------- 2. Trade / wholesale lead ---------------- */

const TradeInput = z.object({
  business: z.string().min(1).max(120),
  type: z.string().min(1).max(40),
  location: z.string().min(1).max(120),
  buyer: z.string().min(1).max(80),
  email: z.string().email().max(160),
  program: z.string().max(600).optional(),
  volume: z.string().max(60).optional(),
});

const tradeSchema = z.object({
  priority: z.string(),
  summary: z.string(),
  fitNotes: z.string(),
  suggestedWines: z.string(),
  replyDraft: z.string(),
  nextStep: z.string(),
});

export const qualifyTradeLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TradeInput.parse(input))
  .handler(async ({ data }) => {
    const { getModel } = await import("./ai-gateway.server");
    return guarded(
      async () => {
        const result = await generateText({
          model: getModel(),
          output: Output.object({ schema: tradeSchema }),
          system: `${HOUSE}

A restaurant, wine bar or retailer has asked about carrying Ferrigno. Production is a few hundred cases
a year, so allocation is genuinely limited and by-the-glass programs that burn through volume may not fit.
Current wines:
${WINE_CONTEXT}

priority: exactly one of "High", "Worth a call", or "Keep warm".
summary: one sentence Joe can read in three seconds.
fitNotes: two sentences on whether this account fits a small allocation, honestly.
suggestedWines: which bottling(s) to offer and in what format.
replyDraft: a warm, short email from Joe to the buyer, 4-6 sentences, signed "Joe Ferrigno". No subject line.
nextStep: one concrete action for Joe, under 15 words.`,
          prompt: `Business: ${data.business} (${data.type})
Location: ${data.location}
Buyer: ${data.buyer} <${data.email}>
Wine program: ${data.program || "not described"}
Estimated volume: ${data.volume || "not given"}`,
        });
        return result.output;
      },
      {
        priority: "Worth a call",
        summary: `${data.business} in ${data.location} asked about carrying Ferrigno.`,
        fitNotes:
          "Not enough detail came through to judge the fit. A short call will tell you more than another form would.",
        suggestedWines: "Lead with the Cabernet; mention Intenso only if allocation allows.",
        replyDraft: `Hi ${data.buyer},\n\nThanks for reaching out about ${data.business}. We make a few hundred cases a year in the Willow Creek District of Paso Robles, so I place the wine carefully and personally.\n\nI'd love to hear about your list. Would a short call this week work?\n\nJoe Ferrigno\nFerrigno Vineyards`,
        nextStep: "Call the buyer and ask what their list needs.",
      },
    );
  });

/* ---------------- 3. Cellar list segmentation ---------------- */

const CellarInput = z.object({
  email: z.string().email().max(160),
  name: z.string().max(80).optional(),
  interest: z.string().max(300).optional(),
});

const cellarSchema = z.object({
  segment: z.string(),
  reason: z.string(),
  welcomeNote: z.string(),
  firstSend: z.string(),
});

export const segmentCellarSignup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => CellarInput.parse(input))
  .handler(async ({ data }) => {
    const { getModel } = await import("./ai-gateway.server");
    return guarded(
      async () => {
        const result = await generateText({
          model: getModel(),
          output: Output.object({ schema: cellarSchema }),
          system: `${HOUSE}

Someone joined the Ferrigno Cellar list. Sort them so they get the right mail instead of one generic blast.
segment: exactly one of "Buyer", "Collector", "Restaurant or trade", "Gift buyer", "Local — Orange County",
"Paso visitor", "Tasting guest", or "Event contact".
reason: one short sentence, why that segment.
welcomeNote: 3-4 sentences from Joe, personal, written for that segment. Signed "Joe".
firstSend: what the first real email to this person should be about, under 20 words.`,
          prompt: `Name: ${data.name || "not given"}
Email: ${data.email}
What they told us: ${data.interest || "nothing yet"}`,
        });
        return result.output;
      },
      {
        segment: "Buyer",
        reason: "No detail given yet, so start with the general list.",
        welcomeNote: `Thanks for joining the Cellar. We make a few hundred cases a year, so this list is how people hear first when something is ready.\n\nI'll send a note when the next bottling is bottled, and not much else in between.\n\nJoe`,
        firstSend: "Next release date and how to reserve bottles.",
      },
    );
  });

/* ---------------- 4. One update, everything written ---------------- */

const ContentInput = z.object({
  update: z.string().min(5).max(600),
  photoNote: z.string().max(200).optional(),
});

const contentSchema = z.object({
  instagram: z.string(),
  hashtags: z.string(),
  emailSubject: z.string(),
  email: z.string(),
  siteStory: z.string(),
  restaurantNote: z.string(),
});

export const generateContentKit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContentInput.parse(input))
  .handler(async ({ data }) => {
    const { getModel } = await import("./ai-gateway.server");
    return guarded(
      async () => {
        const result = await generateText({
          model: getModel(),
          output: Output.object({ schema: contentSchema }),
          system: `${HOUSE}

Joe sends one short update from his phone. Turn it into everything the winery needs to publish.
Use only what Joe said — no invented dates, numbers, or events.
instagram: a caption, under 60 words, no emoji spam, at most one em dash.
hashtags: 4-6 relevant hashtags on one line.
emailSubject: under 8 words.
email: a note to the Cellar list, 4-6 sentences, signed "Joe".
siteStory: a short paragraph for the website journal, 3-4 sentences, slightly more written.
restaurantNote: 2-3 sentences Joe can text a restaurant buyer about the same news.`,
          prompt: `Joe's update: ${data.update}\nPhoto: ${data.photoNote || "not described"}`,
        });
        return result.output;
      },
      {
        instagram: data.update,
        hashtags: "#ferrignovineyards #pasorobles #willowcreekdistrict #cabernetsauvignon",
        emailSubject: "A note from the vineyard",
        email: `${data.update}\n\nJoe`,
        siteStory: data.update,
        restaurantNote: data.update,
      },
    );
  });

export const CONTACT_EMAIL = CONTACT.email;
