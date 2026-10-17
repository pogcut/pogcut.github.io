// Signup form: posts to FormSubmit (free) via AJAX so visitors stay on the page.
// If the request fails, fall back to opening the visitor's email app (mailto).
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var f = this, msg = document.getElementById('form-msg'), btn = f.querySelector('button');
  if (f._honey && f._honey.value) return; // bot
  var ch = f.twitch_channel.value.trim(), em = f.email.value.trim();
  function mailto() {
    var body = 'Twitch channel: twitch.tv/' + ch + '\nEmail: ' + em + '\nI own this channel and opt in to PogCut clips.';
    location.href = 'mailto:' + f.dataset.mailto + '?subject=' + encodeURIComponent('PogCut beta: ' + ch) + '&body=' + encodeURIComponent(body);
    msg.textContent = 'Opening your email app. Hit send to join the waitlist.';
  }
  if (!f.dataset.ajax || !window.fetch) return mailto();
  btn.disabled = true; msg.textContent = 'Sending...';
  fetch(f.dataset.ajax, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ twitch_channel: 'twitch.tv/' + ch, email: em, consent: 'yes', _subject: 'PogCut beta: ' + ch, _template: 'table', _captcha: 'false' })
  }).then(function (r) { return r.json(); }).then(function (j) {
    if (String(j.success) === 'true') { f.reset(); msg.textContent = "You're on the list! We'll email you when your first clip pack is ready."; }
    else mailto();
  }).catch(mailto).finally(function () { btn.disabled = false; });
});
