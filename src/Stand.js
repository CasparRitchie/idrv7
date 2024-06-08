import React from 'react';
import Chapter from './Chapter';

function Stand({ stand, index, updateStand, removeStand }) {
  const updateStandName = (e) => {
    updateStand(index, { ...stand, name: e.target.value });
  };

  const addChapter = () => {
    updateStand(index, {
      ...stand,
      chapters: [
        ...stand.chapters,
        { type: '', subchapters: [] }
      ]
    });
  };

  const updateChapter = (chapterIndex, chapter) => {
    const newChapters = stand.chapters.map((c, i) => (i === chapterIndex ? chapter : c));
    updateStand(index, { ...stand, chapters: newChapters });
  };

  const removeChapter = (chapterIndex) => {
    const newChapters = stand.chapters.filter((_, i) => i !== chapterIndex);
    updateStand(index, { ...stand, chapters: newChapters });
  };

  return (
    <div className="stand">
      <h3>Stand {index + 1}</h3>
      <input
        type="text"
        value={stand.name}
        onChange={updateStandName}
        placeholder="Stand Name"
      />
      <button onClick={addChapter}>Add Chapter</button>
      {stand.chapters.map((chapter, chapterIndex) => (
        <Chapter
          key={chapterIndex}
          chapter={chapter}
          standIndex={index}
          chapterIndex={chapterIndex}
          updateChapter={updateChapter}
          removeChapter={removeChapter}
        />
      ))}
      <button onClick={() => removeStand(index)}>Remove Stand</button>
    </div>
  );
}

export default Stand;
