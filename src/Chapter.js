import React from 'react';
import Subchapter from './Subchapter';

function Chapter({ chapter, standIndex, chapterIndex, updateChapter, removeChapter }) {
  const updateChapterType = (e) => {
    updateChapter(chapterIndex, { ...chapter, type: e.target.value });
  };

  const addSubchapter = () => {
    updateChapter(chapterIndex, {
      ...chapter,
      subchapters: [
        ...chapter.subchapters,
        { type: '', questions: [] }
      ]
    });
  };

  const updateSubchapter = (subchapterIndex, subchapter) => {
    const newSubchapters = chapter.subchapters.map((sc, i) => (i === subchapterIndex ? subchapter : sc));
    updateChapter(chapterIndex, { ...chapter, subchapters: newSubchapters });
  };

  const removeSubchapter = (subchapterIndex) => {
    const newSubchapters = chapter.subchapters.filter((_, i) => i !== subchapterIndex);
    updateChapter(chapterIndex, { ...chapter, subchapters: newSubchapters });
  };

  return (
    <div className="chapter">
      <h4>Chapter {chapterIndex + 1}</h4>
      <input
        type="text"
        value={chapter.type}
        onChange={updateChapterType}
        placeholder="Chapter Type"
      />
      <button onClick={addSubchapter}>Add Subchapter</button>
      {chapter.subchapters.map((subchapter, subchapterIndex) => (
        <Subchapter
          key={subchapterIndex}
          subchapter={subchapter}
          standIndex={standIndex}
          chapterIndex={chapterIndex}
          subchapterIndex={subchapterIndex}
          updateSubchapter={updateSubchapter}
          removeSubchapter={removeSubchapter}
        />
      ))}
      <button onClick={() => removeChapter(chapterIndex)}>Remove Chapter</button>
    </div>
  );
}

export default Chapter;
