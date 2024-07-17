document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsList = document.getElementById('posts-list');
    const searchInput = document.getElementById('search');
    const errorMessage = document.getElementById('error-message');
  
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
  
    function renderPosts() {
      postsList.innerHTML = '';
      posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.classList.add('post-item');
        postItem.innerHTML = `
          <p>${post.content}</p>
          <p><strong>Author:</strong> ${post.author}</p>
          <p><strong>Date:</strong> ${post.date}</p>
          <p><strong>Tags:</strong> ${post.tags}</p>
          <button onclick="editPost(${index})">Edit</button>
          <button onclick="deletePost(${index})">Delete</button>
        `;
        postsList.appendChild(postItem);
      });
    }
  
    function savePosts() {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const content = document.getElementById('content').value;
      const author = document.getElementById('author').value;
      const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
      const date = new Date().toLocaleDateString();
  
      if (content === '' || author === '') {
        errorMessage.textContent = 'Content and Author fields cannot be empty.';
        return;
      }
  
      const newPost = { content, author, date, tags };
      posts.push(newPost);
      savePosts();
      renderPosts();
  
      postForm.reset();
      errorMessage.textContent = '';
    });
  
    window.editPost = function(index) {
      const post = posts[index];
      document.getElementById('content').value = post.content;
      document.getElementById('author').value = post.author;
      document.getElementById('tags').value = post.tags.join(', ');
  
      posts.splice(index, 1);
      savePosts();
      renderPosts();
    };
  
    window.deletePost = function(index) {
      posts.splice(index, 1);
      savePosts();
      renderPosts();
    };
  
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();
      const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(keyword) || post.tags.some(tag => tag.toLowerCase().includes(keyword)));
      postsList.innerHTML = '';
      filteredPosts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.classList.add('post-item');
        postItem.innerHTML = `
          <p>${post.content}</p>
          <p><strong>Author:</strong> ${post.author}</p>
          <p><strong>Date:</strong> ${post.date}</p>
          <p><strong>Tags:</strong> ${post.tags}</p>
          <button onclick="editPost(${index})">Edit</button>
          <button onclick="deletePost(${index})">Delete</button>
        `;
        postsList.appendChild(postItem);
      });
    });
  
    renderPosts();
  });
  