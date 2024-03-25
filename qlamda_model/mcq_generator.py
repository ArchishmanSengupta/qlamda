import nltk, torch, nltk
from nltk.corpus import wordnet as wn
nltk.download('wordnet')

# Sentences with different meanings but same word "book"
firstSentence = "Archie would like to read a book on consumer psychology"
secondSentence = "Archie will book a candle light dinner on monday"

# Function to find similar sentences with difference word meanings
# Takes the original word
# A simple definition is a group of synonym are synsets.
# Prints the synsets definition, lemma, examples
def findSimilarWordContext(original_word):
  
  allSynsets = wn.synsets(original_word, 'n');

  for syns in allSynsets:
    print (syns, ":", syns.definition())
    print ('lemmatized :', syns.lemmas())
    print ('example :', syns.examples(),"\n")

findSimilarWordContext('book')