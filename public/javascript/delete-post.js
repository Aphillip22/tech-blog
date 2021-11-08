//delete form handler
async function deleteFormHandler(event) {
    event.preventDefault();

    //get post id by URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    //confirm user would like to delete post
    if (confirm("Delete post?")) {
        const response = await fetch(`/api/posts/${id}`, {
            //use delete method
            method: "DELETE"
        });
        //if okay, redirect to dash
        if (response.ok) {
                document.location.replace('/dashboard/');
            //otherwise, alert of error
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);