package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Question struct {
	Question       string   `json:"question"`
	Answers        []string `json:"answers"`
	CorrectChoices []string `json:"correct_choices"`
}

func getQuestionsHandler(w http.ResponseWriter, r *http.Request) {
	questions := []Question{
		{
			Question: "What is the reason behind Tesla's decision to not accept payments in Bitcoin?",
			Answers: []string{
				"Environmental concerns",
				"Decreasing value of Bitcoin",
				"Lack of transaction efficiency",
				"Government regulations",
			},
			CorrectChoices: []string{"Environmental concerns"},
		},
		{
			Question: "Which cryptocurrency experienced a rally of about 20 percent after Elon Musk's tweet?",
			Answers: []string{
				"Litecoin",
				"Ethereum",
				"Dogecoin",
				"Bitcoin",
			},
			CorrectChoices: []string{"Dogecoin"},
		},
		{
			Question: "What does Elon Musk believe in but is concerned about its impact on fossil fuel use?",
			Answers: []string{
				"Bitcoin",
				"Dogecoin",
				"Crypto",
				"Tesla",
			},
			CorrectChoices: []string{"Crypto"},
		},
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

	// Run Ngrok to expose the server
	// Usage: ngrok http <port>
	// Example: ngrok http 8080
	log.Println("Use Ngrok to expose the server on the internet.")
	select {}
}
