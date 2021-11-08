//log user out
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
    //if response okay, go home
    if (response.ok) {
      document.location.replace('/');
      //otherwise, alert error
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);