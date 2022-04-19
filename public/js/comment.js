const newCommentHandler = async (event) => {
  event.preventDefault();

  
};

const delCommentHandler = async (event) => {
  
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);
