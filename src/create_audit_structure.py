from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load the CSV file into a DataFrame
df = pd.read_csv('../idrv7_questions.csv')

@app.route('/')
def index():
    stands = df['Stand'].dropna().unique()
    return render_template('index.html', stands=stands)

@app.route('/get_chapters/<stand>')
def get_chapters(stand):
    chapters = df[df['Stand'] == stand]['Chapitre'].dropna().unique()
    return jsonify(list(chapters))

@app.route('/get_subchapters/<chapter>')
def get_subchapters(chapter):
    subchapters = df[df['Chapitre'] == chapter]['Subchapitre'].dropna().unique()
    return jsonify(list(subchapters))

@app.route('/get_paragraphs/<subchapter>')
def get_paragraphs(subchapter):
    paragraphs = df[df['Subchapitre'] == subchapter]['Paragraphe'].dropna().unique()
    return jsonify(list(paragraphs))

@app.route('/get_questions/<paragraph>')
def get_questions(paragraph):
    questions = df[df['Paragraphe'] == paragraph]['Question'].dropna().unique()
    return jsonify(list(questions))

@app.route('/select', methods=['POST'])
def select():
    selected_option = request.form['option']
    stand = request.form.get('stand')
    chapters = request.form.getlist('chapters')
    subchapters = request.form.getlist('subchapters')
    paragraphs = request.form.getlist('paragraphs')
    questions = request.form.getlist('questions')

    # Process the selections and update the CSV or perform other actions
    selected_df = df
    if stand:
        selected_df = selected_df[selected_df['Stand'] == stand]
    if chapters:
        selected_df = selected_df[selected_df['Chapitre'].isin(chapters)]
    if subchapters:
        selected_df = selected_df[selected_df['Subchapitre'].isin(subchapters)]
    if paragraphs:
        selected_df = selected_df[selected_df['Paragraphe'].isin(paragraphs)]
    if questions:
        selected_df = selected_df[selected_df['Question'].isin(questions)]

    # Perform actions with the filtered DataFrame
    selected_df.to_csv('selected_audit_structure.csv', index=False)

    return 'Selections processed and saved.'

if __name__ == '__main__':
    app.run(debug=True)
