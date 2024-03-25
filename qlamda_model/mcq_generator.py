# ********************************************************************
# *                 This code is contributed by authors:
# *
# *                          Archishman Sengupta
# *                          Sudipta Ghosh
# *                          Pritam Nag
# *                          Subhodeep Sarkar
# *                          Agniva Das
# ********************************************************************

import nltk
from nltk.corpus import wordnet as wn

# Download WordNet data
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

# Example usage for find_similar_word_context function
# find_similar_word_context('book')

def generate_distractors_from_wordnet(synset, word):
    """
    Generate distractor words based on the given word and its associated synset.

    Args:
        synset (nltk.corpus.reader.wordnet.Synset): The synset (set of synonyms) of the word.
        word (str): The original word.

    Returns:
        list: A list of distractor words.
    """
    # Convert the word to lowercase and store the original word
    word = word.lower()
    original_word = word

    # Replace spaces in the word with underscores
    word = "_".join(word.split())

    # Get the hypernyms (more general words)
    hypernyms = synset.hypernyms()

    # If no hypernyms found, return empty list
    if not hypernyms:
        return []

    # Generate distractors using list comprehension
    distractors = [hyponym.lemmas()[0].name().replace("_", " ").title()
                   for hypernym in hypernyms
                   for hyponym in hypernym.hyponyms()
                   if hyponym.lemmas()[0].name() != original_word]

    return list(set(distractors))  # Convert to set to remove duplicates and then back to list

# Example usage for generate_distractors_from_wordnet function
original_word = "cat"
synsets = wn.synsets(original_word, 'n')  # Get the synsets for the original word

for index, synset_to_use in enumerate(synsets):
    distractors_calculated = generate_distractors_from_wordnet(synset_to_use, original_word)  # Calculate distractors
    print(f"\nOriginal word {index + 1}:", original_word.capitalize())
    print("Distractors:", distractors_calculated)
    print("Number of Distractors:", len(distractors_calculated))
