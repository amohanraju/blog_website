import React from 'react';

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <h3 className="text-white mr-20 mt-4 mb-4 text-xl font-bold">Author: {author.name}</h3>
    <div className="align-middle">
    <img
        alt={author.name}
        height="120px"
        width="120px"
        className="ml-60 align-middle rounded-full"
        src={author.photo.url}
      />
    </div>
    <p className="mt-4 text-white text-ls">{author.aboutMe}</p>
  </div>
);

export default Author;