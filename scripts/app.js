const quotes = [
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "You’re not behind. You’re in preparation.",
  "Some doors won’t open until you knock with consistency.",
  "If Allah woke you up today, He still has a plan for you.",
  "You were not created for comfort. You were created for greatness.",
  "Discipline is choosing who you want most over what you want now.",
  "You don’t need motivation. You need movement.",
  "The version of you you're becoming is watching what you do today.",
  "Stop waiting to feel ready. Start because you’re tired of waiting.",
  "Some battles are won in silence. Stay consistent. Stay low.",
  "Fear never leaves. You just learn to move while it’s screaming.",
  "Wake up like someone who knows time is a gift, not a guarantee.",
  "The only cure for doubt is effort in the right direction.",
  "What if your breakthrough is waiting on the other side of this task?",
  "You were built for this storm. You are the prayer you once whispered.",
  "The old you would be proud you made it this far.",
  "Sabr doesn’t mean sit. It means trust while striving.",
  "Stop asking ‘what if I fail’ — ask ‘what if I don’t try?’",
  "One small move today is a victory over yesterday’s weakness.",
  "Your success starts when your excuses end.",
  "You are not overwhelmed — you are undisciplined. Fix that.",
  "Be strong in private so you don’t fall in public.",
  "Today could be the day you build momentum — or lose it.",
  "Stop waiting for peace. Start moving like it’s already yours.",
  "A queen does not need applause to know she’s royalty.",
  "If you’re tired, rest. But don’t you dare quit.",
  "Get uncomfortable. That’s where the upgrade is.",
  "This pain will pass. The discipline it builds will not.",
  "Every day you procrastinate, someone else levels up.",
  "Rise. Even if it’s messy. Even if you’re scared. Rise anyway.",
  "You already know what to do. Now honor your future and do it.",
  "You were made for more — keep going.",
  "Start small. Stay consistent. See magic.",
  "You can rise from anything. Trust Allah.",
  "Discipline is your love for your future self.",
  "You’re not lazy — you just need a reason worth the pain.",
  "Even the moon goes through phases. So will you.",
  "Feel the fear and do it anyway.",
  "Peace doesn’t mean quiet — it means grounded.",
  "Build in silence. Let your success echo.",
  "Allah is with the patient — so be one of them."
];

const quoteEl = document.getElementById("quote");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = quotes[randomIndex];
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteEl.textContent).then(() => {
    alert("Quote copied!");
  });
});
