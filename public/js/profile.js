// Function to add a new Post from the profile page.
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

// Function to delete a specific post from the profile page.
const delPostHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    let id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });


    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

// Event listener for the "create new post" button.
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

// Only adds the button event listener, if the button exists, rendered by Handlebars.
if (document.querySelector('.delete-post-btn')) {
  const allPostDeleteButtons = document.querySelectorAll('.delete-post-btn');
  allPostDeleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', delPostHandler)
  })
};