document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  if (username) {
    // Save the user in localStorage to simulate login
    localStorage.setItem('echoscope_user', username);
    window.location.href = '../index.html';
  }
});

// If already logged in
if (localStorage.getItem('echoscope_user')) {
  const homeContent = document.querySelector('.home-content');

  // Show profile picture
  const profileImg = document.createElement('img');
  profileImg.src = '../assets/profile-pic.png';
  profileImg.className = 'profile-pic';
  homeContent.insertBefore(profileImg, document.querySelector('h2'));

  document.querySelector('h2').textContent = `Hello again, ${localStorage.getItem('echoscope_user')}! 🌸`;
  document.querySelector('p.subtitle').textContent = "You are already logged in and your progress is saved.";
  document.getElementById('loginForm').style.display = 'none';

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'btn outline full-width';
  logoutBtn.textContent = 'Log Out';
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('echoscope_user');
    window.location.reload();
  });
  document.querySelector('.container').appendChild(logoutBtn);
}
