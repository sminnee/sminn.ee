function toggle() {
  const el = document.getElementById("toggleable");
  if (el.classList.contains("expanded")) {
    el.classList.add("collapsed");
    el.classList.remove("expanded");
  } else {
    el.classList.remove("collapsed");
    el.classList.add("expanded");
  }
}

function trackEvent(name, data) {
  mixpanel.track(name, data);
}

function trackPost(slug, dateStr, onHomePage) {
  const date = dateStr && new Date(Date.parse(dateStr));
  trackEvent("View Post", { "Post Slug": slug, "Post Date": date, "On Homepage": !!onHomePage });
}

mixpanel.init("334826dd5389ef23de348b958fd56eef", { debug: true, track_pageview: true, persistence: "localStorage" });
