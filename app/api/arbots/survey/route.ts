import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

const allowed = {
  profile: ["School student", "University student", "Working professional", "Business owner", "Parent", "Other"],
  price: ["Below PKR 5,000", "PKR 5,000–7,499", "PKR 7,500–9,999", "PKR 10,000–14,999", "PKR 15,000–19,999", "PKR 20,000 or above", "I would not buy it"],
  languages: ["English", "Urdu", "Urdu-English mixed conversation", "Punjabi", "Pashto", "Other"],
  features: ["Voice-to-voice conversation", "“Hey Chotu” wake word", "Personal memory", "Reminders and alarms", "Animated face and expressions", "Customizable outer shells", "Study help", "Offline operation", "Local/private AI processing", "Phone application", "Head movement", "Smart-home control"],
  powerPreference: ["Plug-in only at a lower price", "Rechargeable battery at a higher price", "Both options should be available", "No preference"],
  subscriptionImpact: ["Much more likely", "Slightly more likely", "No difference", "Not sure"],
  premiumPrice: ["Nothing", "Below PKR 250", "PKR 250–499", "PKR 500–999", "PKR 1,000 or above"],
  purchaseFor: ["Myself", "A student", "A child", "A parent or elderly relative", "A friend or partner", "As a gift", "I would not purchase it"],
  concerns: ["Price", "Privacy", "Voice-recognition accuracy", "Slow AI responses", "Needing a computer or phone nearby", "Battery life", "Internet dependency", "Audio quality", "Durability", "Product becoming boring after some time"],
};

type Payload = Record<string, unknown>;

function one(payload: Payload, key: keyof typeof allowed) {
  const value = payload[key];
  return typeof value === "string" && allowed[key].includes(value) ? value : null;
}

function many(payload: Payload, key: "languages" | "features" | "concerns", max = Infinity) {
  const value = payload[key];
  if (!Array.isArray(value) || value.length < 1 || value.length > max) return null;
  return value.every(item => typeof item === "string" && allowed[key].includes(item)) ? value as string[] : null;
}

function optionalText(value: unknown, maxLength = 120) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: Payload;
  try { payload = await request.json(); } catch { return NextResponse.json({ error: "Invalid survey submission." }, { status: 400 }); }

  if (payload.website) return NextResponse.json({ ok: true });

  const profile = one(payload, "profile");
  const price = one(payload, "price");
  const languages = many(payload, "languages");
  const features = many(payload, "features", 3);
  const powerPreference = one(payload, "powerPreference");
  const subscriptionImpact = one(payload, "subscriptionImpact");
  const premiumPrice = one(payload, "premiumPrice");
  const purchaseFor = one(payload, "purchaseFor");
  const concerns = many(payload, "concerns");
  const interest = Number(payload.interest);
  const profileOther = optionalText(payload.profileOther);
  const languageOther = optionalText(payload.languageOther);

  if (!profile || !price || !languages || !features || !powerPreference || !subscriptionImpact || !premiumPrice || !purchaseFor || !concerns || !Number.isInteger(interest) || interest < 1 || interest > 5 || (profile === "Other" && !profileOther) || (languages.includes("Other") && !languageOther)) {
    return NextResponse.json({ error: "Please complete every question using the available options." }, { status: 422 });
  }

  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) return NextResponse.json({ error: "The survey database is being connected. Please try again shortly." }, { status: 503 });

  try {
    const sql = neon(databaseUrl);
    await sql`CREATE TABLE IF NOT EXISTS arbots_survey_responses (
      id UUID PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      profile TEXT NOT NULL,
      profile_other TEXT,
      interest SMALLINT NOT NULL CHECK (interest BETWEEN 1 AND 5),
      price TEXT NOT NULL,
      languages JSONB NOT NULL,
      language_other TEXT,
      features JSONB NOT NULL,
      power_preference TEXT NOT NULL,
      subscription_impact TEXT NOT NULL,
      premium_price TEXT NOT NULL,
      purchase_for TEXT NOT NULL,
      concerns JSONB NOT NULL
    )`;
    const id = crypto.randomUUID();
    await sql`INSERT INTO arbots_survey_responses (
      id, profile, profile_other, interest, price, languages, language_other, features,
      power_preference, subscription_impact, premium_price, purchase_for, concerns
    ) VALUES (
      ${id}, ${profile}, ${profileOther || null}, ${interest}, ${price}, ${JSON.stringify(languages)},
      ${languageOther || null}, ${JSON.stringify(features)}, ${powerPreference}, ${subscriptionImpact},
      ${premiumPrice}, ${purchaseFor}, ${JSON.stringify(concerns)}
    )`;
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("Arbots survey storage error", error);
    return NextResponse.json({ error: "We could not save your response right now. Please try again." }, { status: 500 });
  }
}
