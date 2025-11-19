 const apiUrl = 'http://localhost:5000/api/books';

    let editingBookId = null;

    const tbody = document.querySelector('#booksTable tbody');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const yearInput = document.getElementById('publishedYear');
    const addBtn = document.getElementById('addBtn');
    const updateBtn = document.getElementById('updateBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    async function fetchBooks() {
      try {
        const res = await fetch(apiUrl);
        const books = await res.json();
        tbody.innerHTML = '';
        books.forEach(book => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publishedYear}</td>
            <td class="actions" style="text-align:center;">
              <button class="btn btn-edit" onclick="startEdit('${book._id}', '${escapeHtml(book.title)}', '${escapeHtml(book.author)}', ${book.publishedYear})">Edit</button>
              <button class="btn btn-delete" onclick="deleteBook('${book._id}')">Delete</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      } catch (err) {
        alert('Error loading books');
        console.error(err);
      }
    }

    function escapeHtml(text) {
      return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    addBtn.addEventListener('click', async () => {
      const book = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        publishedYear: Number(yearInput.value),
      };
      if (!book.title || !book.author || !book.publishedYear) {
        alert('Please fill in all fields.');
        return;
      }
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });
        if (!res.ok) throw new Error('Failed to add book');
        clearForm();
        fetchBooks();
      } catch (err) {
        alert('Failed to add book');
        console.error(err);
      }
    });

    window.startEdit = (id, title, author, year) => {
      editingBookId = id;
      titleInput.value = title;
      authorInput.value = author;
      yearInput.value = year;
      addBtn.style.display = 'none';
      updateBtn.style.display = 'inline-block';
      cancelBtn.style.display = 'inline-block';
    };

    cancelBtn.addEventListener('click', () => {
      clearForm();
    });

    updateBtn.addEventListener('click', async () => {
      if (!editingBookId) return alert('No book to update');
      const book = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        publishedYear: Number(yearInput.value),
      };
      if (!book.title || !book.author || !book.publishedYear) {
        alert('Please fill in all fields.');
        return;
      }
      try {
        const res = await fetch(`${apiUrl}/${editingBookId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });
        if (!res.ok) throw new Error('Failed to update book');
        clearForm();
        fetchBooks();
      } catch (err) {
        alert('Failed to update book');
        console.error(err);
      }
    });

    window.deleteBook = async (id) => {
      if (!confirm('Are you sure you want to delete this book?')) return;
      try {
        const res = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete book');
        fetchBooks();
      } catch (err) {
        alert('Failed to delete book');
        console.error(err);
      }
    };

    function clearForm() {
      editingBookId = null;
      titleInput.value = '';
      authorInput.value = '';
      yearInput.value = '';
      addBtn.style.display = 'inline-block';
      updateBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
    }

    fetchBooks();