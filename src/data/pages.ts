import { localized } from "./types";

// Marketing copy is demo content. The gym owner can revise wording here without changing page markup.
export const pageContent = {
  home: {
    status: "demo",
    metadata: {
      title: localized("Tiger Gym | Fitness Center in Salmiya, Kuwait"),
      description: localized("Tiger Gym is a focused strength and fitness center in Salmiya, Kuwait."),
    },
    hero: {
      index: localized("01 / Strength protocol"),
      titleLines: [localized("Built"), localized("For"), localized("Strength")],
      joinLabel: localized("Join Tiger Gym"),
      facilitiesLabel: localized("Explore facilities"),
      scrollLabel: localized("Scroll"),
    },
    intro: {
      number: localized("02"),
      eyebrow: localized("Tiger Gym"),
      title: localized("Purpose in every rep."),
      description: localized(
        "A strength and fitness center in Salmiya built around disciplined training and serious progress.",
      ),
      body: localized(
        "Strength training, free weights, cardio and functional training come together in one focused environment.",
      ),
      linkLabel: localized("Discover Tiger Gym"),
      ticker: localized("Strength · Discipline · Performance · Progress ·"),
    },
    location: {
      eyebrow: localized("Visit Tiger Gym"),
      titleLineOne: localized("Train in"),
      titleLineTwo: localized("Salmiya."),
      contactLabel: localized("Location & contact"),
      directionsLabel: localized("Get directions"),
    },
    loader: {
      progressLabel: localized("Preparing the floor"),
    },
  },
  about: {
    status: "demo",
    metadata: {
      title: localized("About Tiger Gym | Salmiya, Kuwait"),
      description: localized(
        "Learn about Tiger Gym's focused approach to strength, discipline and consistent training in Salmiya, Kuwait.",
      ),
    },
    hero: {
      index: localized("02 / About"),
      eyebrow: localized("Our approach"),
      title: localized("Built around the work."),
      description: localized(
        "Tiger Gym is a bodybuilding, strength and fitness center in Salmiya, Kuwait.",
      ),
      nextLabel: localized("Our philosophy"),
      nextHref: "#philosophy",
    },
    story: {
      title: localized("Strength is built through consistency."),
      paragraphs: [
        localized(
          "Tiger Gym brings strength training, free weights, cardio and functional training together in a focused environment for people who want purpose in every session.",
        ),
        localized(
          "The philosophy is direct: show up, train with intent and give progress time to compound. Every session is a clear commitment to the work in front of you.",
        ),
      ],
      linkLabel: localized("Explore the training areas"),
    },
    philosophy: {
      number: localized("02.1"),
      eyebrow: localized("Training philosophy"),
      title: localized("The standard stays high."),
      items: [
        { number: "01", title: localized("Strength"), text: localized("Build capability through focused, purposeful training.") },
        { number: "02", title: localized("Discipline"), text: localized("Make the work consistent, clear, and repeatable.") },
        { number: "03", title: localized("Progress"), text: localized("Move forward one deliberate session at a time.") },
      ],
    },
    cta: {
      eyebrow: localized("Your next step"),
      titleLineOne: localized("Bring intent."),
      titleLineTwo: localized("We’ll make room for the work."),
      label: localized("Ask about membership"),
    },
  },
  contact: {
    status: "demo",
    metadata: {
      title: localized("Contact Tiger Gym | Salmiya, Kuwait"),
      description: localized("Call, message, locate or visit Tiger Gym Fitness Center in Salmiya, Kuwait."),
    },
    hero: {
      index: localized("06 / Contact"),
      eyebrow: localized("Find Tiger Gym"),
      title: localized("Salmiya. Your next session."),
      description: localized("Call, message or use the verified map location to plan your visit."),
      nextLabel: localized("Location details"),
      nextHref: "#location",
    },
    location: {
      number: localized("06.1"),
      eyebrow: localized("Location"),
      title: localized("Get here. Get to work."),
    },
    formIntro: {
      eyebrow: localized("Contact form"),
      title: localized("Prepare a message."),
      description: localized(
        "This form validates your details and opens WhatsApp for you to review and send the message yourself.",
      ),
    },
  },
  footer: {
    status: "demo",
    taglineLineOne: localized("Built for strength."),
    taglineLineTwo: localized("Made for progress."),
    contactLabel: localized("Speak with the gym"),
  },
} as const;
