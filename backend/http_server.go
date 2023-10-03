package main

import (
	"crypto/subtle"
	"io"
	"log"
	"net"
	"net/http"
)

const (
	CONN_HOST      = "localhost"
	CONN_PORT      = "8080"
	CONN_TYPE      = "tcp"
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
	// mux := http.NewServeMux()
	// mux.HandleFunc("/", BasicAuth(welcomeMsg, "Please enter username and password"))
	listener, err := net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
	if err != nil {
		log.Fatal("Error starting TCP server : ", err)
	}
	defer listener.Close()
	log.Println("Listening on " + CONN_HOST + ":" + CONN_PORT)
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal("Error Accepting: ", err.Error())
		}
		log.Println(conn)
	}
}
