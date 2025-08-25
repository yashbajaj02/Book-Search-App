// Trigger search on button click or Enter key
document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchBooks();
  }
});

async function searchBooks() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a book name.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Searching books...</p>";

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();

    if (!data.items) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsDiv.innerHTML = "";

    data.items.forEach(item => {
      const book = item.volumeInfo;
      const title = book.title || "No Title";
      const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
      const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : "https://via.placeholder.com/150";
      const previewLink = book.previewLink || "#";
      const infoLink = book.infoLink || "#";

      const bookCard = `
        <div class="book-card">
          <img src="${thumbnail}" alt="${title}">
          <h3>${title}</h3>
          <p><strong>Author(s):</strong> ${authors}</p>
          <div class="book-buttons">
            <a href="${previewLink}" target="_blank" class="read-btn">Read More →</a>
            <a href="${infoLink}" target="_blank" class="buy-btn">Buy Now →</a>
          </div>
        </div>
      `;

      resultsDiv.innerHTML += bookCard;
    });
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
  }
}
