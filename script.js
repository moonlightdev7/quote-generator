// === Quotes List ===
const quotes = [
    "You were made for more — keep going.",
    "Start small. Stay consistent. See magic.",
    "You can rise from anything. Trust Allah.",
    "Discipline is your love for your future self.",
    "You’re not lazy — you just need a reason worth the pain.",
    "Even the moon goes through phases. So will you.",
    "Feel the fear and do it anyway.",
    "Peace doesn’t mean quiet — it means grounded.",
    "Build in silence. Let your success echo.",
    "Allah is with the patient — so be one of them.",
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
    "Royalty does not need applause to know they are royalty.",
    "If you’re tired, rest. But don’t you dare quit.",
    "Get uncomfortable. That’s where the upgrade is.",
    "This pain will pass. The discipline it builds will not.",
    "Every day you procrastinate, someone else levels up.",
    "Rise. Even if it’s messy. Even if you’re scared. Rise anyway.",
    "You already know what to do. Now honor your future and do it."
  ];
  
  // === Element References ===
  const quoteText = document.getElementById('quote');
  const newQuoteBtn = document.getElementById('new-quote');
  const copyQuoteBtn = document.getElementById('copy-quote');
  const themeSelect = document.getElementById('theme');
  
  // === Random Quote Generator ===
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  newQuoteBtn.addEventListener('click', () => {
    quoteText.textContent = getRandomQuote();
  });
  
  // === Copy to Clipboard ===
  copyQuoteBtn.addEventListener('click', () => {
    const text = quoteText.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyQuoteBtn.textContent = "Copied!";
      setTimeout(() => {
        copyQuoteBtn.textContent = "Copy Quote";
      }, 2000);
    });
  });
  
  // === Theme Switching ===
  themeSelect.addEventListener('change', (e) => {
    const theme = e.target.value;
    document.body.className = theme; // Applies theme class to body
  });
  
  // === Default Theme on Load ===
  window.addEventListener('load', () => {
    document.body.className = 'moonlight'; // Default
  });
  const surpriseBtn = document.getElementById('surprise-theme');

// All theme names
const themes = [
  "moonlight",
  "dark",
  "soft",
  "black",
  "sunrise",
  "forest",
  "lavender",
  "neon",
  "sand",
  "cream"
];

// Surprise Me Button
surpriseBtn.addEventListener('click', () => {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  document.body.className = randomTheme;
  themeSelect.value = randomTheme;
});
const reminderCheckbox = document.getElementById('daily-reminder');

// Check localStorage on load
window.addEventListener('load', () => {
  const reminderEnabled = localStorage.getItem('dailyReminder') === 'true';
  reminderCheckbox.checked = reminderEnabled;

  if (reminderEnabled) {
    requestNotificationPermission();
    startDailyQuoteReminder();
  }
});

// Toggle reminder on change
reminderCheckbox.addEventListener('change', () => {
  const isEnabled = reminderCheckbox.checked;
  localStorage.setItem('dailyReminder', isEnabled);

  if (isEnabled) {
    requestNotificationPermission();
    startDailyQuoteReminder();
  }
});

// Ask for permission
function requestNotificationPermission() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

// Show a random quote notification
function showQuoteNotification() {
  if (Notification.permission === 'granted') {
    const quote = getRandomQuote();
    new Notification('Your Daily Motivation 💫', {
      body: quote,
      icon: 'https://cdn-icons-png.flaticon.com/512/3208/3208728.png'
    });
  }
}

// Schedule it to run every 24 hours (while tab is open)
function startDailyQuoteReminder() {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 7 && now.getMinutes() === 0) {
        showQuoteNotification();
    }
  }, 60000); // check every minute
}
