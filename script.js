const questions = [
  { q: "ما هي عاصمة مصر؟", a: "القاهرة" },
  { q: "كم عدد أركان الإسلام؟", a: "خمسة" },
  { q: "ما اسم أطول نهر في العالم؟", a: "النيل" },
  { q: "من هو أول الخلفاء الراشدين؟", a: "أبو بكر الصديق" },
  { q: "كم عدد قارات العالم؟", a: "سبع" },
  { q: "ما هي السورة التي بدأت بـ طه؟", a: "سورة طه" },
  { q: "من هو الصحابي الذي لقب بالفاروق؟", a: "عمر بن الخطاب" },
  { q: "ما هي عاصمة فلسطين؟", a: "القدس" },
  { q: "ما هو العنصر الذي يرمز له بـ H2O؟", a: "الماء" },
  { q: "كم عدد أيام السنة؟", a: "٣٦٥ يوم" },
  { q: "من هو مخترع المصباح الكهربائي؟", a: "توماس إديسون" },
  { q: "ما هي أكبر دولة عربية؟", a: "الجزائر" },
  { q: "كم عدد أجزاء القرآن؟", a: "ثلاثون جزءاً" },
  { q: "ما هو الحيوان الذي يطلق عليه سفينة الصحراء؟", a: "الجمل" },
  { q: "من هو مكتشف أمريكا؟", a: "كريستوفر كولومبوس" },
  { q: "ما هو أسرع حيوان بري؟", a: "الفهد" },
  { q: "من أول من آمن بالرسول من الرجال؟", a: "أبو بكر الصديق" },
  { q: "ما هي وحدة قياس الطاقة؟", a: "الجول" },
  { q: "ما هو الكوكب الأحمر؟", a: "المريخ" },
  { q: "كم عدد الركعات في صلاة المغرب؟", a: "ثلاث ركعات" },
  { q: "من هو صاحب كتاب تفسير الأحلام؟", a: "ابن سيرين" },
  { q: "ما هي عاصمة السعودية؟", a: "الرياض" },
  { q: "من هو القائد في معركة بدر؟", a: "الرسول محمد ﷺ" },
  { q: "ما اسم الكتاب السماوي الذي أنزل على موسى؟", a: "التوراة" },
  { q: "ما هي الصلاة التي لا ركوع فيها؟", a: "صلاة الجنازة" },
  { q: "كم عدد أولاد النبي محمد؟", a: "سبعة" },
  { q: "من هو الصحابي الذي نام في فراش الرسول؟", a: "علي بن أبي طالب" },
  { q: "ما هو الحيوان الذي إذا قطعته نصفين لا يموت؟", a: "دودة الأرض" },
  { q: "ما هي أقصر سورة في القرآن؟", a: "الكوثر" },
  { q: "كم عدد أركان الإيمان؟", a: "ستة" },
  { q: "من هو آخر الخلفاء الراشدين؟", a: "علي بن أبي طالب" },
  { q: "ما هي أكبر قارة؟", a: "آسيا" },
  { q: "ما اسم أول معركة في الإسلام؟", a: "غزوة بدر" },
  { q: "من هو أول مؤذن في الإسلام؟", a: "بلال بن رباح" },
  { q: "ما هو العضو المسؤول عن ضخ الدم؟", a: "القلب" },
  { q: "ما هو صوت القطة؟", a: "مواء" },
  { q: "من هو مؤسس الدولة الأموية؟", a: "معاوية بن أبي سفيان" },
  { q: "ما اسم أول غزوة غزاها الرسول؟", a: "غزوة الأبواء" },
  { q: "ما هي عملة مصر؟", a: "الجنيه" },
  { q: "من هو الصحابي الملقب بسيف الله المسلول؟", a: "خالد بن الوليد" }
];

let selected = [], current = 0, timerInterval;
const totalTime = 60; // 60 ثانية

document.getElementById("startBtn").addEventListener("click", () => {
  selected = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  document.getElementById("startBtn").classList.add("hidden");
  startTimer();
  nextQuestion();
});

function startTimer() {
  let time = totalTime;
  const circle = document.getElementById("progress");
  const text = document.getElementById("time-text");

  timerInterval = setInterval(() => {
    time--;
    const offset = 314 - (314 * time) / totalTime;
    circle.style.strokeDashoffset = offset;
    text.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      document.getElementById("question-container").textContent = "";
      document.getElementById("game-over").classList.remove("hidden");
    }
  }, 1000);
}

function nextQuestion() {
  if (current >= selected.length) return;

  const question = selected[current].q;
  document.getElementById("question-text").textContent = question;

  const utter = new SpeechSynthesisUtterance(question);
  utter.lang = "ar-SA";
  utter.onend = () => {
    recordAnswer(() => {
      current++;
      nextQuestion();
    });
  };
  speechSynthesis.speak(utter);
}

function recordAnswer(callback) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks);
      const audio = document.getElementById("userAudio");
      audio.src = URL.createObjectURL(blob);
      audio.play();
      setTimeout(callback, 500);
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 3000);
  });
}