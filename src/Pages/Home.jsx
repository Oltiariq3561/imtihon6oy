import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState([]);
  const [minPages, setMinPages] = useState('');
  const [maxPages, setMaxPages] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://fn27.vimlc.uz/books')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  const filteredBooks = user.filter(book => {
    const minCondition = minPages ? book.pageCount >= minPages : true;
    const maxCondition = maxPages ? book.pageCount <= maxPages : true;
    const searchCondition = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return minCondition && maxCondition && searchCondition;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">BOOKS</h1>
      <div className="mb-4 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="border mr-96 border-gray-300 rounded-lg p-2 w-full max-w-xs" />
          <input type="number" value={minPages} onChange={(e) => setMinPages(e.target.value)} placeholder="Min pages..." className="border border-gray-300 rounded-lg p-2 w-full max-w-xs" />
          <input type="number" value={maxPages} onChange={(e) => setMaxPages(e.target.value)} placeholder="Max pages..." className="border border-gray-300 rounded-lg p-2 w-full max-w-xs" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((value, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer" onClick={() => handleBookClick(value.id)}>
            <div className="w-full h-40">
              <img className="w-full h-full object-fill" src={value.thumbnailUrl} alt="kitob rasmi" />
            </div>
            <div className="p-4">
              <p className="text-gray-500">ID: {value.id}</p>
              <p className="text-gray-700">Authors: {value.authors.join(', ')}</p>
              <p className="text-gray-500">{value.title}</p>
              <p className="text-gray-500">ISBN: {value.isbn}</p>
              <p className="text-gray-500">Pages: {value.pageCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
