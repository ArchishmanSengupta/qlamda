package main

import (
	"log"
	"net/http"
)

type Question struct {
	Question             string   `json:"question"`
	Answers              []string `json:"answers"`
	CorrectAnswerIndices []int    `json:"correct_answer_indices"`
	CorrectAnswers       []string `json:"correct_answers"`
}

func getQuestionsHandler(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Respond to OPTIONS request
	if r.Method == "OPTIONS" {
		return
	}

	// Hardcoded JSON data
	jsonData := `
	[
    {
        "question": "Who was a poor farmer?",
        "answers": [
            "Rich",
            "Will",
            "Mike",
            "Greg",
            "Darren"
        ],
        "correct_answer_indices": [
            2
        ],
        "correct_answers": [
            "Mike"
        ]
    },
    {
        "question": "What did both mike and morris have?",
        "answers": [
            "Other families",
            "Caretakers",
            "Families",
            "Adult children",
            "Mothers"
        ],
        "correct_answer_indices": [
            2
        ],
        "correct_answers": [
            "Families"
        ]
    },
    {
        "question": "Who owned the largest jewelry shop in the village?",
        "answers": [
            "Brooks",
            "Morris",
            "Randle",
            "Jennings",
            "Greene"
        ],
        "correct_answer_indices": [
            1
        ],
        "correct_answers": [
            "Morris"
        ]
    },
    {
        "question": "Where was the largest jewelry shop located?",
        "answers": [
            "Stronghold",
            "Island",
            "Village",
            "Capital city",
            "Entire village"
        ],
        "correct_answer_indices": [
            2
        ],
        "correct_answers": [
            "Village"
        ]
    }
]
	`

	// Respond with the JSON data
	w.Header().Set("Content-Type", "application/json")
	_, err := w.Write([]byte(jsonData))
	if err != nil {
		http.Error(w, "Error writing response", http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/getQuestions", getQuestionsHandler)

	// Start the server
	go func() {
		log.Fatal(http.ListenAndServe(":8080", nil))
	}()

	log.Println("Server started on :8080")

	log.Println("Use Ngrok to expose the server on the internet.")
	select {}
}
