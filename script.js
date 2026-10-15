// Signup form: mailto fallback while there is no backend.
// When a real form backend (Formspree/Tally) is set in the form's action, delete data-mailto and this handler steps aside.
document.getElementById('signup-form').addEventListener('submit', function (e) {
  var to = this.dataset.mailto;
  if (!to) return; // real action set: let the browser submit normally
  e.preventDefault();
  var ch = this.twitch_channel.value.trim(), em = this.email.value.trim();
  var body = 'Twitch channel: twitch.tv/' + ch + '\nEmail: ' + em + '\nI own this channel and opt in to PogCut clips.';
  location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('PogCut beta: ' + ch) + '&body=' + encodeURIComponent(body);
  document.getElementById('form-msg').textContent = 'Opening your email app. Hit send to join the waitlist.';
});
