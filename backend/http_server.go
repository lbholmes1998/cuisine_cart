package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	CONN_HOST      = "localhost"
	CONN_PORT      = "8080"
	ADMIN_USER     = "admin"
	ADMIN_PASSWORD = "admin"
)

func statusHandler(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "OK"}`))
}

// func BasicAuth(handler http.HandlerFunc, realm string) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		user, pass, ok := r.BasicAuth()
// 		if !ok || subtle.ConstantTimeCompare([]byte(user),
// 			[]byte(ADMIN_USER)) != 1 || subtle.ConstantTimeCompare([]byte(pass),
// 			[]byte(ADMIN_PASSWORD)) != 1 {
// 			w.Header().Set("WWW-Authenticate", `Basic realm="`+realm+`"`)
// 			w.WriteHeader(401)
// 			w.Write([]byte("Unauthorised Access To Application. \n"))
// 			return
// 		}
// 		handler(w, r)
// 	}
// }

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", statusHandler).Methods("GET")
	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, router)
	if err != nil {
		log.Fatal("Error starting HTTP server : ", err)
		return
	}
}
