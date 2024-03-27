package main

import (
	"encoding/json"
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
	questions := []Question{
		{
			Question: "Why did Tesla announce that it will not accept payments in Bitcoin?",
			Answers: []string{
				"Environmental concerns",
				"Decreasing value of Bitcoin",
				"Rapid increase in Dogecoin popularity",
				"Lack of transaction efficiency",
			},
			CorrectAnswerIndices: []int{0},
			CorrectAnswers:       []string{"Environmental concerns"},
		},
		{
			Question: "What effect did Elon Musk's tweet about Dogecoin have on its value?",
			Answers: []string{
				"Decreased by 20 percent",
				"Remained stable",
				"Rallied by about 20 percent",
				"Increased by 10 percent",
			},
			CorrectAnswerIndices: []int{2},
			CorrectAnswers:       []string{"Rallied by about 20 percent"},
		},
		{
			Question: "Why did Musk state that Tesla was suspending vehicle purchases using Bitcoin?",
			Answers: []string{
				"Decrease in crypto popularity",
				"Lack of transaction efficiency",
				"Fears of Bitcoin becoming the world's future currency",
				"Concern about the use of fossil fuels for mining and transactions",
			},
			CorrectAnswerIndices: []int{3},
			CorrectAnswers:       []string{"Concern about the use of fossil fuels for mining and transactions"},
		},
	}

	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Respond to OPTIONS request
	if r.Method == "OPTIONS" {
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(questions)
}

func main() {
	http.HandleFunc("/questions", getQuestionsHandler)

	// Start the server
	go func() {
		log.Fatal(http.ListenAndServe(":8080", nil))
	}()

	log.Println("Server started on :8080")

	log.Println("Use Ngrok to expose the server on the internet.")
	select {}
}
