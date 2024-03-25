import nltk
from nltk.corpus import wordnet as wn

nltk.download('wordnet')

def find_similar_word_context(original_word):
    """
    Finds similar words in different contexts using WordNet.

    Args:
        original_word (str): The word to find similar contexts for.

    Prints:
        Definitions, lemmas, and examples of different synsets of the word.
    """
    all_synsets = wn.synsets(original_word, 'n')

    for syns in all_synsets:
        print(f"{syns}: {syns.definition()}")
        print(f'lemmatized: {syns.lemmas()}')
        print(f'example: {syns.examples()}\n')

# Example Sentences with different meanings but the same word "book"
first_sentence = "Archie would like to read a book on consumer psychology"
second_sentence = "Archie will book a candlelight dinner on Monday"

find_similar_word_context('book')
