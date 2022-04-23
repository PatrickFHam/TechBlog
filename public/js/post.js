// Function to add a new Blog Post
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

// Function to delete a Blog post.
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Only adds the button event listener, if the button exists, rendered by Handlebars.
if (document.querySelector('.new-post-form')) {
  document.querySelector('.new-post-form'.addEventListener('submit', newFormHandler))
};
  
// Only adds the button event listener, if the button exists, rendered by Handlebars.
if (document.querySelector('.post-list')) {
  document.querySelector('.post-list').addEventListener('click', delButtonHandler);
};
