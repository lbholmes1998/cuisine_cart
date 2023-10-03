package main

import (
	"crypto/subtle"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

const (
	CONN_HOST      = "localhost"
	CONN_PORT      = "8080"
	ADMIN_USER     = "admin"
	ADMIN_PASSWORD = "admin"
)

func welcomeMsg(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Server Working!")
}

func BasicAuth(handler http.HandlerFunc, realm string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, pass, ok := r.BasicAuth()
		if !ok || subtle.ConstantTimeCompare([]byte(user),
			[]byte(ADMIN_USER)) != 1 || subtle.ConstantTimeCompare([]byte(pass),
			[]byte(ADMIN_PASSWORD)) != 1 {
			w.Header().Set("WWW-Authenticate", `Basic realm="`+realm+`"`)
			w.WriteHeader(401)
			w.Write([]byte("Unauthorised Access To Application. \n"))
			return
		}
		handler(w, r)
	}
}

func main() {
	// Compress and Decompress responses for faster loading
	mux := http.NewServeMux()
	mux.HandleFunc("/", BasicAuth(welcomeMsg, "Please enter username and password"))
	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, handlers.CompressHandler(mux))
	if err != nil {
		log.Fatal("Error starting HTTP server : ", err)
		return
	}
}
