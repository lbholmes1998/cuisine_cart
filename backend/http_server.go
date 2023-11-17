package main

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/go-resty/resty/v2"
	"github.com/gorilla/mux"
)

const (
	CONN_HOST      = "localhost"
	CONN_PORT      = "8080"
	ADMIN_USER     = "admin"
	ADMIN_PASSWORD = "admin"
)

const spoonacularBaseURL = "https://api.spoonacular.com/recipes"
const spoonacularRecipeURL = "https://api.spoonacular.com/recipes/complexSearch"
const apiKey = "822b0382280a46eab7b8e285da8cbfee"

func statusHandler(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "OK"}`))
}

func GetRecipes(w http.ResponseWriter, r *http.Request) {

	// ONLY CURRENTLY REQUESTS FOOD TYPE AND NUMBER OF RESULTS

	client := resty.New()

	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Parse spoonacular URL
	parsedURL, err := url.Parse(spoonacularRecipeURL)
	if err != nil {
		fmt.Println("Error parsing URL", err)
		return
	}

	// Store query params
	queryParams := make(map[string]string)

	// Existing query params
	currentQuery := r.URL.Query()

	// Iterate through params and add to map
	for k, v := range currentQuery {
		if len(v) > 0 {
			// Only add single val for each query param
			queryParams[k] = v[0]
		}
	}

	// Construct query string
	var newQueryElements []string // Pretty sure this means string array
	for k, v := range queryParams {
		newQueryElements = append(newQueryElements, fmt.Sprintf("%s=%s", k, v))
	}

	newQueryString := strings.Join(newQueryElements, "&")

	parsedURL.RawQuery = newQueryString

	resp, err := client.R().
		SetHeader("Accept", "application/json").
		SetHeader("x-api-key", apiKey).
		Get(parsedURL.String())

	// Send response to frontend
	w.Write(resp.Body())

	if err != nil {
		log.Fatal("Error sending request")
	}
}

func RecipeInfo(w http.ResponseWriter, r *http.Request) {
	client := resty.New()

	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Store query params
	queryParams := make(map[string]string)

	// Existing query params
	currentQuery := r.URL.Query()

	// fmt.Println(currentQuery)

	// Iterate through params and add to map
	for k, v := range currentQuery {
		if len(v) > 0 {
			// Only add single val for each query param
			queryParams[k] = v[0]
		}
	}

	// fmt.Println(queryParams)

	// Construct query string
	var newQueryElements []string // Pretty sure this means string array
	for k, v := range queryParams {
		newQueryElements = append(newQueryElements, fmt.Sprintf("%s=%s", k, v))
	}

	newQueryString := strings.Join(newQueryElements, "&")

	recipeId := newQueryString[3:]

	// Construct new request URL

	recipeInfoUrl := fmt.Sprintf("https://api.spoonacular.com/recipes/%s/information", recipeId)

	// Parse spoonacular URL
	parsedURL, err := url.Parse(recipeInfoUrl)
	if err != nil {
		fmt.Println("Error parsing URL", err)
		return
	}

	fmt.Println(parsedURL.String())

	// TODO - FIX GETTING RECIPE INFO

	resp, err := client.R().
		SetHeader("Accept", "application/json").
		SetHeader("x-api-key", apiKey).
		Get(parsedURL.String())

	// Send response to frontend
	fmt.Println(resp)    // This shows response
	w.Write(resp.Body()) // This does not - Look into it

	if err != nil {
		log.Fatal("Error sending request")
	}
}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/status", statusHandler).Methods("GET")
	// router.Path("/recipes/{queryPeramns}").HandlerFunc(GetRecipes)
	router.HandleFunc("/api/recipes", GetRecipes)
	router.HandleFunc("/api/recipes/info", RecipeInfo)

	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, router)
	if err != nil {
		log.Fatal("Error starting HTTP server : ", err)
		return
	}
}
