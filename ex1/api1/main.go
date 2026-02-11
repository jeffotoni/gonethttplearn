package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

const maxBodyBytes = 1 << 20 // 1MB -> Operador Bit Shift (operador de deslocamento de bits)
// bit shift left) que significa -> "Desloque o número 1 para a esquerda 20 posições"
// Matematica por tras
// 1 << n  =  1 × 2^n  =  2^n
// Exemplos:
// 1 << 0  = 2^0  = 1
// 1 << 1  = 2^1  = 2
// 1 << 2  = 2^2  = 4
// 1 << 3  = 2^3  = 8
// 1 << 4  = 2^4  = 16
// 1 << 5  = 2^5  = 32
// 1 << 10 = 2^10 = 1024      (1 KB)
// 1 << 20 = 2^20 = 1048576   (1 MB)
// 1 << 30 = 2^30 = 1073741824 (1 GB)

func postUserWithDecoder(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		_, _ = w.Write([]byte(`{"error":"content_type_must_be_application_json"}`))
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)

	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		w.Header().Set("Content-Type", "application/json")
		var maxErr *http.MaxBytesError
		if errors.As(err, &maxErr) {
			w.WriteHeader(http.StatusRequestEntityTooLarge)
			_, _ = w.Write([]byte(`{"error":"body_too_large","max_bytes":1048576}`))
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":"invalid_json"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_, _ = w.Write([]byte(fmt.Sprintf(
		`{"message":"user created (decoder)","name":"%s","email":"%s"}`,
		in.Name, in.Email,
	)))
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(`{"name":"Jeff","email":"jeff@email.com"}`))
}

func putUserWithDecoder(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		_, _ = w.Write([]byte(`{"error":"content_type_must_be_application_json"}`))
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)

	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		w.Header().Set("Content-Type", "application/json")
		var maxErr *http.MaxBytesError
		if errors.As(err, &maxErr) {
			w.WriteHeader(http.StatusRequestEntityTooLarge)
			_, _ = w.Write([]byte(`{"error":"body_too_large","max_bytes":1048576}`))
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":"invalid_json"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(fmt.Sprintf(
		`{"message":"user updated (decoder)","name":"%s","email":"%s"}`,
		in.Name, in.Email,
	)))
}

func main() {
	fmt.Println("Server running...")
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/user", getUser)
	mux.HandleFunc("POST /api/v1/user", postUserWithDecoder)
	mux.HandleFunc("PUT /api/v1/user", putUserWithDecoder)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
