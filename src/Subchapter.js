import React from 'react';

function Subchapter({ subchapter, standIndex, chapterIndex, subchapterIndex, updateSubchapter, removeSubchapter }) {
  const updateSubchapterType = (e) => {
    updateSubchapter(subchapterIndex, { ...subchapter, type: e.target.value });
  };

  const addQuestion = () => {
    updateSubchapter(subchapterIndex, {
      ...subchapter,
      questions: [
        ...subchapter.questions,
        ''
      ]
    });
  };

  const updateQuestion = (questionIndex, question) => {
    const newQuestions = subchapter.questions.map((q, i) => (i === questionIndex ? question : q));
    updateSubchapter(subchapterIndex, { ...subchapter, questions: newQuestions });
  };

  const removeQuestion = (questionIndex) => {
    const newQuestions = subchapter.questions.filter((_, i) => i !== questionIndex);
    updateSubchapter(subchapterIndex, { ...subchapter, questions: newQuestions });
  };

  return (
    <div className="subchapter">
      <h5>Subchapter {subchapterIndex + 1}</h5>
      <input
        type="text"
        value={subchapter.type}
        onChange={updateSubchapterType}
        placeholder="Subchapter Type"
      />
      <button onClick={addQuestion}>Add Question</button>
      {subchapter.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            value={question}
            onChange={(e) => updateQuestion(questionIndex, e.target.value)}
            placeholder="Question"
          />
          <button onClick={() => removeQuestion(questionIndex)}>Remove Question</button>
        </div>
      ))}
      <button onClick={() => removeSubchapter(subchapterIndex)}>Remove Subchapter</button>
    </div>
  );
}

export default Subchapter;
