// Function to add a new Comment.
const newCommentHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-body').value.trim();
  let on_post_id = event.target.getAttribute('data-id');

  if (body && on_post_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ body, on_post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create post');
    }
  }
};

// Function to delete a specific comment.
const delCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Comment DELETED successfully!');
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

// Only adds the button event listener, if the button exists, rendered by Handlebars.
if (document.querySelector('.new-comment-form')) {
  document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
};

// Only adds the button event listener, if the button exists, rendered by Handlebars.
if (document.querySelector('.delete-btn')) {
  const allCommentDeleteButtons = document.querySelectorAll('.delete-btn');
  allCommentDeleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', delCommentHandler)
  })
};
