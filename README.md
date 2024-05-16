QLaMDA: txt2Que generation

![Screenshot 2024-03-24 at 12 25 21 AM](https://github.com/ArchishmanSengupta/QLaMDA/assets/71402528/9a6026ff-d1d0-4cea-8504-a20a7da02ad8)

Automated Question Generation (AQG) is essential in NLP, with applications in education, as- sessment, and conversational agents. qlamda presents a comprehensive approach to automated text summarization and question generation using NLP techniques. By leveraging the T5 transformer model, Sense2Vec, and Sentence Transformers, the system extracts key information and generates rel- evant questions. The integration of the MMR algorithm enhances keyword selection, while WordNet and Sense2Vec generate distractors, facilitating multiple-choice question creation. The results demon- strate the system’s ability to produce concise summaries and generate contextually relevant questions, showcasing its potential for educational and information retrieval applications.

## Methodology
The methodology encompasses several steps, in- cluding text summarization, keyword extraction, question generation, and distractor generation. Each step plays a crucial role in ensuring the ef- fectiveness of the AQG system.

### 1. Text Summarization
For text summarization, the T5 transformer model was utilized. T5, short for ”(Text-to-Text Transfer Transformer)” [1], is a versatile model that can per- form a wide range of NLP tasks by converting them into a text-to-text format. The model was pre- trained on a large corpus of text data and fine-tuned specifically for summarization tasks. The summa- rization process involves encoding the input text with a special prefix (”summarize: ”) to guide the model towards generating a summary. The model’s output is then post-processed to ensure proper sen- tence capitalization and formatting.

### 2. Keyword Extraction
Keyword extraction was enhanced using the Mul- tipartiteRank algorithm, which ranks keywords based on their relevance and importance within the text. Additionally, Sense2Vec was employed to un- derstand the semantic meaning of words, allowing for the identification of keywords that are semanti- cally similar to the original text. This step is vital for ensuring that the generated questions are con- textually relevant.

<div style="color:white">
[![\\ S(c_i) = (1 - \lambda) + \lambda \cdot \sum_{c_j \in \text{pred}(c_i)} \frac{w_{ij} \cdot S(c_j)}{\sum_{c_k \in \text{succ}(c_j)} w_{jk}}](https://latex.codecogs.com/svg.latex?%5C%5C%20S(c_i)%20%3D%20(1%20-%20%5Clambda)%20%2B%20%5Clambda%20%5Ccdot%20%5Csum_%7Bc_j%20%5Cin%20%5Ctext%7Bpred%7D(c_i)%7D%20%5Cfrac%7Bw_%7Bij%7D%20%5Ccdot%20S(c_j)%7D%7B%5Csum_%7Bc_k%20%5Cin%20%5Ctext%7Bsucc%7D(c_j)%7D%20w_%7Bjk%7D%7D)](#_)
</div>



### 3. Question Generation
Question generation was also performed using the T5 model, but with a different fine-tuning ap- proach. The model was trained on the SQuAD (Stanford Question Answering Dataset) [2] to understand the context-answer-question format. Given a context and an answer, the model generates a question that could lead to the provided answer within the given context. This process is crucial for creating educational materials and quizzes.

### 4. Distractor Generation
Distractors for multiple-choice questions were gen- erated using two approaches: WordNet and Sense2Vec. WordNet was used to find synonyms and related words that could serve as distrac- tors, while Sense2Vec was used to find semantically similar words. The Maximal Marginal Relevance (MMR) algorithm [3] was applied to select a di- verse set of distractors that are both relevant to the context and distinct from each other.
<img width="416" alt="Screenshot 2024-05-16 at 10 17 52 PM" src="https://github.com/ArchishmanSengupta/qlamda/assets/71402528/2a8edef6-4c31-4370-a39b-fd7cad08b1bd">
