import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Comments = ({ pizzaId, comments, addComment }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      name,
      comment,
      rating,
      date: new Date().toISOString(),
    };

    addComment(pizzaId, newComment);
    setName('');
    setComment('');
    setRating(5);
    showToast('Comment added successfully!');
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">Customer Comments</h3>
      
      {comments.length === 0 ? (
        <p className="text-gray-500 italic mb-8">Be the first to leave a comment!</p>
      ) : (
        <div className="space-y-6 mb-8">
          {comments.map((item) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex mt-1 mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className="text-yellow-400">
                        {index < item.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{item.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded-lg">
        <h4 className="text-xl font-medium mb-4">Add a Comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className="text-2xl focus:outline-none"
                >
                  {index < rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 mb-2">Your Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;