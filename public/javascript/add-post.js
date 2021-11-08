//new post form handler
async function newFormHandler(event) {
    event.preventDefault();

    //get post data from from
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-body"]').value;

    //add post using POST method
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    //if response okay, return to dash
    if (response.ok) {
        document.location.replace('/dashboard');
        //otherwise, display alert
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);