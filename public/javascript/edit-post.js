// edit form handler
async function editFormHandler(event) {
    event.preventDefault();

    // find post id by stringify url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // get title and body from form
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-text"]').value;

    // update post using put
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          post_body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    // if success, redirect to dash
    if (response.ok) {
        document.location.replace('/dashboard');
        // if not, display error
        } else {
        alert(response.statusText);
        }

  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);