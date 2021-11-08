//comment form handler
async function commentFormHandler(event) {
    event.preventDefault();

    //get comment value from form
    const comment_body = document.querySelector('textarea[name="comment-body"]').value.trim();
    //get post id from URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    //if value present, post method to add comment
    if (comment_body) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_body
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //if response okay, reload page to display comment
        if (response.ok) {
            document.location.reload();
            //otherwise, display alert
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);