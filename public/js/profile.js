const newFormHandler = async (event) => {
  event.preventDefault();

  const headline = document.querySelector('#post-headline').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if (headline && body) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ headline, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delPostHandler = async (event) => {

  console.log(event.target.getAttribute('data-id'));

  if (event.target.hasAttribute('data-id')) {
    let id = event.target.getAttribute('data-id');

    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    console.log(response);

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

if (document.querySelector('.delete-post-btn')) {
  const allPostDeleteButtons = document.querySelectorAll('.delete-post-btn');
  allPostDeleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', delPostHandler)
  })
};