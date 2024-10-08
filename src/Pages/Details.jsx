import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Details() {
  const {id} = useParams()
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios
    .get(`https://fn27.vimlc.uz/books/${id}`)
      .then(data => {
        setBook(data.data);
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <div className="flex">
        <img className="w-40 h-60 object-cover mr-4" src={book.thumbnailUrl} alt="kitob rasmi" />
        <div>
          <p><strong>id:</strong> {book.id}</p>
          <p><strong>Authors:</strong> {book.authors}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Pages:</strong> {book.pageCount}</p>
        </div>
      </div>
    </div>
  );
}
export default Details;


