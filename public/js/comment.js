const newCommentHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-body').value.trim();
  let on_post_id = event.target.getAttribute('data-id');

  console.log(body);
  console.log(on_post_id);

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

if (document.querySelector('.new-comment-form')) {
  document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
};

if (document.querySelector('.delete-btn')) {
  const allCommentDeleteButtons = document.querySelectorAll('.delete-btn');
  allCommentDeleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', delCommentHandler)
  })
};
