"use client";

import { FormEvent, useMemo, useState } from "react";

const questions = {
  profile: ["School student", "University student", "Working professional", "Business owner", "Parent", "Other"],
  price: ["Below PKR 5,000", "PKR 5,000–7,499", "PKR 7,500–9,999", "PKR 10,000–14,999", "PKR 15,000–19,999", "PKR 20,000 or above", "I would not buy it"],
  languages: ["English", "Urdu", "Urdu-English mixed conversation", "Punjabi", "Pashto", "Other"],
  features: ["Voice-to-voice conversation", "“Hey Chotu” wake word", "Personal memory", "Reminders and alarms", "Animated face and expressions", "Customizable outer shells", "Study help", "Offline operation", "Local/private AI processing", "Phone application", "Head movement", "Smart-home control"],
  power: ["Plug-in only at a lower price", "Rechargeable battery at a higher price", "Both options should be available", "No preference"],
  subscription: ["Much more likely", "Slightly more likely", "No difference", "Not sure"],
  premium: ["Nothing", "Below PKR 250", "PKR 250–499", "PKR 500–999", "PKR 1,000 or above"],
  purchaseFor: ["Myself", "A student", "A child", "A parent or elderly relative", "A friend or partner", "As a gift", "I would not purchase it"],
  concerns: ["Price", "Privacy", "Voice-recognition accuracy", "Slow AI responses", "Needing a computer or phone nearby", "Battery life", "Internet dependency", "Audio quality", "Durability", "Product becoming boring after some time"],
};

type SurveyState = {
  profile: string; profileOther: string; interest: string; price: string;
  languages: string[]; languageOther: string; features: string[]; powerPreference: string;
  subscriptionImpact: string; premiumPrice: string; purchaseFor: string; concerns: string[];
};

const initialState: SurveyState = { profile: "", profileOther: "", interest: "", price: "", languages: [], languageOther: "", features: [], powerPreference: "", subscriptionImpact: "", premiumPrice: "", purchaseFor: "", concerns: [] };

function RadioGroup({ name, value, options, onChange }: { name: keyof SurveyState; value: string; options: string[]; onChange: (name: keyof SurveyState, value: string) => void }) {
  return <div className="arbots-options">{options.map(option => <label className={value === option ? "is-selected" : ""} key={option}><input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(name, option)} /><span>{option}</span></label>)}</div>;
}

function CheckboxGroup({ name, values, options, limit, onChange }: { name: "languages" | "features" | "concerns"; values: string[]; options: string[]; limit?: number; onChange: (name: "languages" | "features" | "concerns", value: string, checked: boolean, limit?: number) => void }) {
  return <div className="arbots-options is-checkbox">{options.map(option => { const selected = values.includes(option); const disabled = Boolean(limit && !selected && values.length >= limit); return <label className={selected ? "is-selected" : ""} data-disabled={disabled || undefined} key={option}><input type="checkbox" name={name} value={option} checked={selected} disabled={disabled} onChange={event => onChange(name, option, event.target.checked, limit)} /><span>{option}</span></label>; })}</div>;
}

export function ArbotsSurvey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const progress = useMemo(() => ((step + 1) / 3) * 100, [step]);

  const setOne = (name: keyof SurveyState, value: string) => setAnswers(current => ({ ...current, [name]: value }));
  const setMany = (name: "languages" | "features" | "concerns", value: string, checked: boolean, limit?: number) => setAnswers(current => {
    const next = checked ? [...current[name], value] : current[name].filter(item => item !== value);
    if (limit && next.length > limit) return current;
    return { ...current, [name]: next };
  });

  const validStep = () => {
    if (step === 0) return Boolean(answers.profile && answers.interest && answers.purchaseFor && (answers.profile !== "Other" || answers.profileOther.trim()));
    if (step === 1) return Boolean(answers.languages.length && answers.features.length && answers.features.length <= 3 && answers.powerPreference && (!answers.languages.includes("Other") || answers.languageOther.trim()));
    return Boolean(answers.price && answers.subscriptionImpact && answers.premiumPrice && answers.concerns.length);
  };

  const next = () => {
    if (!validStep()) { setMessage("Please answer each question on this step."); return; }
    setMessage(""); setStep(current => Math.min(2, current + 1));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validStep()) { setMessage("Please answer each question on this step."); return; }
    setStatus("sending"); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/arbots/survey", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...answers, website: form.get("website") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not save your response.");
      setStatus("success"); setMessage("Thank you. Your response is now part of the VBot research.");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "We could not save your response.");
    }
  }

  if (status === "success") return <div className="arbots-survey-card arbots-survey-success"><span>✓</span><p className="arbots-index">Response saved</p><h3>You helped shape VBot.</h3><p>{message}</p></div>;

  return (
    <form className="arbots-survey-card" onSubmit={submit}>
      <input className="arbots-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="arbots-survey-progress"><span>Step {step + 1} of 3</span><i><b style={{ width: `${progress}%` }} /></i></div>

      {step === 0 && <div className="arbots-survey-step">
        <fieldset><legend><small>01</small> Which option best describes you?</legend><RadioGroup name="profile" value={answers.profile} options={questions.profile} onChange={setOne} />{answers.profile === "Other" && <input className="arbots-other-input" value={answers.profileOther} onChange={event => setOne("profileOther", event.target.value)} placeholder="Please specify" aria-label="Other description" />}</fieldset>
        <fieldset><legend><small>02</small> How interested would you be in owning a small AI-powered personal companion?</legend><div className="arbots-scale" aria-label="Interest from 1 to 5">{[1,2,3,4,5].map(number => <label className={answers.interest === String(number) ? "is-selected" : ""} key={number}><input type="radio" name="interest" value={number} checked={answers.interest === String(number)} onChange={() => setOne("interest", String(number))} /><span>{number}</span></label>)}</div><div className="arbots-scale-labels"><span>Not interested</span><span>Very interested</span></div></fieldset>
        <fieldset><legend><small>03</small> Who would you most likely purchase it for?</legend><RadioGroup name="purchaseFor" value={answers.purchaseFor} options={questions.purchaseFor} onChange={setOne} /></fieldset>
      </div>}

      {step === 1 && <div className="arbots-survey-step">
        <fieldset><legend><small>04</small> Which language should the companion support?</legend><CheckboxGroup name="languages" values={answers.languages} options={questions.languages} onChange={setMany} />{answers.languages.includes("Other") && <input className="arbots-other-input" value={answers.languageOther} onChange={event => setOne("languageOther", event.target.value)} placeholder="Please specify" aria-label="Other language" />}</fieldset>
        <fieldset><legend><small>05</small> Which three features would be most important to you?</legend><p className="arbots-question-note">Choose up to three · {answers.features.length}/3 selected</p><CheckboxGroup name="features" values={answers.features} options={questions.features} limit={3} onChange={setMany} /></fieldset>
        <fieldset><legend><small>06</small> Would you prefer a cheaper plug-in version or a rechargeable version?</legend><RadioGroup name="powerPreference" value={answers.powerPreference} options={questions.power} onChange={setOne} /></fieldset>
      </div>}

      {step === 2 && <div className="arbots-survey-step">
        <fieldset><legend><small>07</small> What price would you consider reasonable for the basic version?</legend><RadioGroup name="price" value={answers.price} options={questions.price} onChange={setOne} /></fieldset>
        <fieldset><legend><small>08</small> Would having no compulsory monthly subscription make you more likely to purchase?</legend><RadioGroup name="subscriptionImpact" value={answers.subscriptionImpact} options={questions.subscription} onChange={setOne} /></fieldset>
        <fieldset><legend><small>09</small> How much would you pay monthly for optional premium AI features?</legend><RadioGroup name="premiumPrice" value={answers.premiumPrice} options={questions.premium} onChange={setOne} /></fieldset>
        <fieldset><legend><small>10</small> What would be your biggest concern about this product?</legend><CheckboxGroup name="concerns" values={answers.concerns} options={questions.concerns} onChange={setMany} /></fieldset>
      </div>}

      {message && <p className={status === "error" ? "arbots-form-message is-error" : "arbots-form-message"} role="alert">{message}</p>}
      <div className="arbots-survey-actions">
        {step > 0 && <button type="button" className="arbots-survey-back" onClick={() => { setMessage(""); setStep(current => current - 1); }}>Back</button>}
        {step < 2 ? <button type="button" className="arbots-survey-next" onClick={next}>Continue <span>→</span></button> : <button type="submit" className="arbots-survey-next" disabled={status === "sending"}>{status === "sending" ? "Saving…" : "Submit response"} <span>↗</span></button>}
      </div>
      <p className="arbots-privacy-note">Anonymous product research. We store only the answers above—no name, email, phone number, or advertising profile.</p>
    </form>
  );
}
