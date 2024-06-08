from flask import Flask, render_template, request, jsonify, redirect, url_for
import pandas as pd
import os

app = Flask(__name__)

# Ensure 'static' directory exists
if not os.path.exists('static'):
    os.makedirs('static')

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
    option = int(request.form['option'])
    stand = request.form.get('stand')
    chapters = request.form.getlist('chapters')
    subchapters = request.form.getlist('subchapters')
    paragraphs = request.form.getlist('paragraphs')
    questions = request.form.getlist('questions')

    # Filter the DataFrame based on the user's selections
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

    # Save the selected data to a new CSV file
    audit_file = 'static/selected_audit_structure.csv'
    selected_df.to_csv(audit_file, index=False)

    return redirect(url_for('download', filename='selected_audit_structure.csv'))

@app.route('/download/<filename>')
def download(filename):
    return f"Audit generated successfully! Download it here: <a href='/static/{filename}'>{filename}</a>"

if __name__ == '__main__':
    app.run(debug=True)
