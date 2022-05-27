package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/smtp"
	"strconv"
	"strings"
	"time"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

type Area struct {
	Action   string `json:"action"`
	Services string `json:"service"`
	Reaction string `json:"reaction"`
}

type Services struct {
	Name     string     `json:"name"`
	Action   []Action   `json:"action"`
	Reaction []Reaction `json:"reaction"`
}

type Action struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Reaction struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type SMSRequestBody struct {
	From      string `json:"from"`
	Text      string `json:"text"`
	To        string `json:"to"`
	APIKey    string `json:"api_key"`
	APISecret string `json:"api_secret"`
}

var ctx = context.Background()
var conf = &firebase.Config{
	DatabaseURL: "https://testdb-1be08-default-rtdb.firebaseio.com/",
}
var opt = option.WithCredentialsFile("serviceAccountKey.json")
var app, _ = firebase.NewApp(ctx, conf, opt)
var client, _ = app.Database(ctx)

func register_user(c *gin.Context) {
	user := c.Request.URL.Query().Get("user")

	ref := client.NewRef(user)

	var stri string
	if err := ref.Get(ctx, &stri); err != nil {
		log.Fatalln("Error reading value:", err)
	}

	if stri == "" {
		erro := ref.Set(ctx, "")
		if erro != nil {
			log.Fatalln("unable to insert products:", erro)
			return
		}
	}
}

func profile_user(c *gin.Context) {
	user := c.Request.URL.Query().Get("user")

	ref := client.NewRef(user)
	var stri string
	if err := ref.Get(ctx, &stri); err != nil {
		log.Fatalln("Error reading value:", err)
	}
	c.JSON(200, gin.H{
		"user": stri,
	})
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func infos_json(c *gin.Context) {
	now := time.Now()
	actCurr := Action{Name: "currency / EUR", Description: "The action will be triggered when the currency provided > EUR"}
	actWeather := Action{Name: "openweathermap", Description: "The action will be triggered when temp in the city will be highter than the one you provided"}
	actLOL := Action{Name: "LeagueOfLegend_LP", Description: "The action will be triggered when the LP's account are higther than 50"}
	actWins := Action{Name: "LeagueOfLegend_Wins", Description: "The action will be triggered when the wins's account are higther than the one you provided"}
	actLosses := Action{Name: "LeagueOfLegend_Losses", Description: "The action will be triggered when the losses's account are higther than the one you provided"}
	actTier := Action{Name: "LeagueOfLegend_Tier", Description: "The action will be triggered when the tier's account is equal to the one you provided"}
	actRank := Action{Name: "LeagueOfLegend_Rank", Description: "The action will be triggered when the rank account is equal to the one you provided"}
	actHotStreak := Action{Name: "LeagueOfLegend_Hotstreak", Description: "The action will be triggered when the account will be on hotstreak"}
	actVeteran := Action{Name: "LeagueOfLegend_Veteran", Description: "The action will be triggered when the account will be a veteran"}
	actCovidhosp := Action{Name: "Covid hospitalization", Description: "The action will be triggered when the amount of hospitalization due to covid19 is lower than your input"}
	actCovidrea := Action{Name: "Covid reanimation", Description: "The action will be triggered when the amount of person in reanimation service due to covid19 is lower than your input"}
	actCovidirea := Action{Name: "Covid incident hospitalization", Description: "The action will be triggered when the amount of person in reanimation service due to covid19 of the day is lower than your input"}
	actCovidihosp := Action{Name: "Covid incident reanimation", Description: "The action will be triggered when the amount of hospitalization due to covid19 of the day is lower than your input"}

	actAQI := Action{Name: "Air Quality Information", Description: "The action will be triggered when the air quality of your location is lower than your input"}
	reaSmtp := Reaction{Name: "SMTP_mail", Description: "It sends a mail to the provided email"}
	reaNexmo := Reaction{Name: "Nexmo_SMS", Description: "It sends a SMS to the provided number"}
	reaOGCal := Reaction{Name: "Google_Calendar", Description: "It adds an event to your Google Calender once you've logged in"}

	currency := Services{Name: "exchangeratesapi", Action: []Action{actCurr}}
	aqiService := Services{Name: "air quality information", Action: []Action{actAQI}}
	coronavirusAPI := Services{Name: "Covid19", Action: []Action{actCovidhosp, actCovidihosp, actCovidrea, actCovidirea}}
	weather := Services{Name: "openweathermap", Action: []Action{actWeather}}
	lol := Services{Name: "LeagueOfLegend", Action: []Action{actLOL, actTier, actWins, actLosses, actRank, actHotStreak, actVeteran}}
	smtp := Services{Name: "SMTP mail", Reaction: []Reaction{reaSmtp}}
	nexmo := Services{Name: "Nexmo SMS", Reaction: []Reaction{reaNexmo}}
	OGCal := Services{Name: "Google Calendar", Reaction: []Reaction{reaOGCal}}

	services := []Services{currency, weather, lol, smtp, nexmo, coronavirusAPI, aqiService, OGCal}
	c.JSON(200, gin.H{
		"client": gin.H{
			"host": c.ClientIP(),
		},
		"server": gin.H{
			"current_time": now.Unix(),
			"services":     services,
		},
	})
}

func create_area(c *gin.Context) {
	action := c.Request.URL.Query().Get("action")   // currency / weather / LOL
	service := c.Request.URL.Query().Get("service") // EUR_USD / int / PlayerName
	data := c.Request.URL.Query().Get("data")       // email / +33.79..
	uid := c.Request.URL.Query().Get("user")

	ref := client.NewRef(uid)
	var stri string
	if err := ref.Get(ctx, &stri); err != nil {
		log.Fatalln("Error reading value:", err)
	}

	new_string := stri + ":" + action + "," + service + "," + data
	new_string = strings.ReplaceAll(new_string, "::", ":")

	if new_string[len(new_string)-1:] == ":" {
		new_string = new_string[:len(new_string)-1]
	}

	erro := ref.Set(ctx, stri+":"+action+","+service+","+data)
	if erro != nil {
		log.Fatalln("unable to insert area", erro)
		return
	}
}

func del_area(c *gin.Context) {
	action := c.Request.URL.Query().Get("action")
	data := c.Request.URL.Query().Get("data")
	service := c.Request.URL.Query().Get("service")
	uid := c.Request.URL.Query().Get("user")

	ref := client.NewRef(uid)
	var stri string
	if err := ref.Get(ctx, &stri); err != nil {
		log.Fatalln("Error reading value:", err)
	}

	temp := strings.Split(stri, ":")

	for i := 0; i < len(temp); i++ {
		parser := strings.Split(temp[i], ",")
		if parser[0] == action && parser[1] == service && parser[2] == data {
			temp[i] = ""
		}
	}
	final := temp[0]
	for i := 1; i < len(temp); i++ {
		final = final + ":" + temp[i]
	}
	res1 := strings.ReplaceAll(final, "::", ":")

	if res1[len(res1)-1:] == ":" {
		res1 = res1[:len(res1)-1]
	}

	erro := ref.Set(ctx, res1)
	if erro != nil {
		log.Fatalln("unable to insert products:", erro)
		return
	}
}

func trigger_rea_supp(data, databis int, reaction, msg string) string {
	if data > databis && strings.Index(reaction, "@") != -1 {
		fmt.Println("J'envoie un mail à ", reaction, "data : ", data, " :: ", databis)
		send_mail(reaction, msg)
	} else if data > databis && reaction == "calendar" {
		fmt.Println("event", reaction, "data : ", data, " :: ", databis)
		return "event"
	} else if data > databis {
		fmt.Println("J'envoie un sms à ", reaction, "data : ", data, " :: ", databis)
		send_sms(reaction, msg)
	}
	return ""
}

func trigger_rea_equal(data, databis, reaction, msg string) string {
	if data == databis && strings.Index(reaction, "@") != -1 {
		fmt.Println("J'envoie un mail à ", reaction, "data : ", data, " :: ", databis)
		send_mail(reaction, msg)
	} else if data == databis && reaction == "calendar" {
		fmt.Println("event", reaction, "data : ", data, " :: ", databis)
		return "event"
	} else if data == databis {
		fmt.Println("J'envoie un sms à ", reaction, "data : ", data, " :: ", databis)
		send_sms(reaction, msg)
	}
	return ""
}

func main() {
	r := gin.Default()
	r.Use(CORS())
	r.GET("/about.json", infos_json)
	r.GET("/profile", profile_user)

	r.POST("/newArea", create_area)
	r.POST("/delArea", del_area)
	r.POST("/update", send_rea)
	r.POST("/register", register_user)

	// r.POST("/sms", sms_handler)
	// r.POST("/mail", mail_handler)

	r.Run()
}

func send_rea(c *gin.Context) {
	uid := c.Request.URL.Query().Get("user")
	ref := client.NewRef(uid)
	var stri string
	if err := ref.Get(ctx, &stri); err != nil {
		log.Fatalln("Error reading value:", err)
	}
	temp := strings.Split(stri, ":")
	resp := ""
	for i := 0; i < len(temp); i++ {
		parser := strings.Split(temp[i], ",")
		if parser[0] == "currency" {
			resp = currency_handler(parser[1], parser[2])
		}
		if parser[0] == "weather" {
			resp = weather_handler(parser[1], parser[2])
		}
		if parser[0] == "LOL" {
			resp = lol_handler_lp(parser[1], parser[2])
		}
		if parser[0] == "LOL_tier" {
			resp = lol_handler_tier(parser[1], parser[2])
		}
		if parser[0] == "LOL_wins" {
			resp = lol_handler_victories(parser[1], parser[2])
		}
		if parser[0] == "LOL_losses" {
			resp = lol_handler_losses(parser[1], parser[2])
		}
		if parser[0] == "LOL_rank" {
			resp = lol_handler_rank(parser[1], parser[2])
		}
		if parser[0] == "LOL_hotstreak" {
			resp = lol_handler_hotstreak(parser[1], parser[2])
		}
		if parser[0] == "LOL_veteran" {
			resp = lol_handler_veteran(parser[1], parser[2])
		}
		if parser[0] == "COVIDFR" {
			resp = covidfr_hosp_handler(parser[1], parser[2])
		}
		if parser[0] == "COVIDFR_rea" {
			resp = covidfr_rea_handler(parser[1], parser[2])
		}
		if parser[0] == "COVIDFR_irea" {
			resp = covidfr_incidrea_handler(parser[1], parser[2])
		}
		if parser[0] == "COVIDFR_ihosp" {
			resp = covidfr_incidhosp_handler(parser[1], parser[2])
		}
		if parser[0] == "AQI" {
			resp = aqi_handler(parser[1], parser[2])
		}
	}
	c.JSON(200, gin.H{
		"event": resp,
	})
}

func aqi_handler(data, reaction string) string {
	infos := strings.Split(data, "_")
	msg := "aqi < your input"
	if len(infos) == 2 {
		url := "http://api.waqi.info/feed/" + infos[0] + "/?token=57373023fb033716a0b78844a8d13e4191758b03"
		method := "GET"

		client := &http.Client{}
		req, err := http.NewRequest(method, url, nil)

		if err != nil {
			fmt.Println(err)
			return ""
		}
		res, err := client.Do(req)
		if err != nil {
			fmt.Println(err)
			return ""
		}
		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			fmt.Println(err)
			return ""
		}

		final := strings.Split(string(body), "aqi")
		final = strings.Split(final[1], ",")
		conv_res, err := strconv.Atoi(infos[1])
		given_data, errr := strconv.Atoi(final[0][2:])
		if err != nil || errr != nil {
			panic(err)
		}

		fmt.Println(given_data, ":::", conv_res)
		return trigger_rea_supp(conv_res, given_data, reaction, msg)
	}
	return ""
}

func covid_query() string {
	url := "https://coronavirusapifr.herokuapp.com/data/live/france"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return ""
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return string(body)
}

func covidfr_hosp_handler(data, reaction string) string {
	conv_res := covid_parser("hosp")
	given_data, _ := strconv.Atoi(data)
	msg := "covid hospitalization < " + data
	return trigger_rea_supp(given_data, conv_res, reaction, msg)
}

func covidfr_incidhosp_handler(data, reaction string) string {
	conv_res := covid_parser("incid_hosp")
	given_data, _ := strconv.Atoi(data)
	msg := "covid incident hospitalization < " + data
	return trigger_rea_supp(given_data, conv_res, reaction, msg)
}

func covidfr_rea_handler(data, reaction string) string {
	conv_res := covid_parser("rea")
	given_data, _ := strconv.Atoi(data)
	msg := "covid reanimation < " + data
	return trigger_rea_supp(given_data, conv_res, reaction, msg)
}

func covid_parser(field string) int {
	final := covid_query()
	parsed := strings.Split(final, field)

	final = parsed[1][2:]
	parsed = strings.Split(final, ",")
	fmt.Println(parsed[0])
	conv_res, err := strconv.Atoi(parsed[0])

	if err != nil {
		panic(err)
	}
	return conv_res
}

func covidfr_incidrea_handler(data, reaction string) string {
	conv_res := covid_parser("incid_rea")
	given_data, _ := strconv.Atoi(data)
	msg := "covid incident reanimation < " + data
	return trigger_rea_supp(given_data, conv_res, reaction, msg)
}

func get_encrypted_id(name string) string {
	url := "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=RGAPI-e79882e0-70c0-4e25-b275-17bb4d10747d"
	method := "GET"
	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	id := strings.Split(string(body), ",")
	idfinal := strings.Split(id[0], ":")
	i := idfinal[1]

	return i[1 : len(i)-1]
}

func get_player_info(name string) string {
	enc_name := get_encrypted_id(name)
	url := "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + enc_name + "?api_key=RGAPI-e79882e0-70c0-4e25-b275-17bb4d10747d"
	method := "GET"
	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return ""
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return string(body)
}

func lol_handler_lp(name, reaction string) string {
	response := get_player_info(name)
	x := strings.Split(string(response), "leaguePoints")
	resp := x[1][0:4]
	conv_res, err := strconv.Atoi(resp[2:4])
	if err != nil {
		panic(err)
	}
	msg := name + " Leagues points > 50"
	return trigger_rea_supp(conv_res, 50, reaction, msg)
}

func lol_handler_victories(name, reaction string) string {
	data := strings.Split(name, "_")

	if len(data) == 2 {
		response := get_player_info(data[0])
		x := strings.Split(string(response), "wins")
		x = strings.Split(x[1], ",")
		resp := x[0][2:]

		conv_res, err := strconv.Atoi(resp)
		given_data, errr := strconv.Atoi(data[1])
		if err != nil || errr != nil {
			panic(err)
		}

		msg := "your account has more than " + data[1] + " victories"
		return trigger_rea_supp(conv_res, given_data, reaction, msg)
	}
	return ""
}

func lol_handler_losses(name, reaction string) string {
	data := strings.Split(name, "_")
	response := get_player_info(data[0])
	if len(data) == 2 {
		x := strings.Split(string(response), "losses")
		x = strings.Split(x[1], ",")
		resp := x[0][2:]

		conv_res, err := strconv.Atoi(resp)
		given_data, errr := strconv.Atoi(data[1])
		if err != nil || errr != nil {
			panic(err)
		}

		msg := "your account has more than " + data[1] + " losses"
		return trigger_rea_supp(conv_res, given_data, reaction, msg)
	}
	return ""
}

func lol_handler_tier(name, reaction string) string {
	data := strings.Split(name, "_")
	response := get_player_info(data[0])
	if len(data) == 2 {
		x := strings.Split(string(response), "tier")
		x = strings.Split(x[1], ",")
		resp := x[0]
		resp = resp[3:]
		resp = resp[:len(resp)-1]

		msg := data[0] + " has achieved tier " + data[1]
		return trigger_rea_equal(resp, data[1], reaction, msg)
	}
	return ""
}

func lol_handler_rank(name, reaction string) string {
	data := strings.Split(name, "_")
	response := get_player_info(data[0])
	if len(data) == 2 {
		x := strings.Split(string(response), "rank")
		x = strings.Split(x[1], ",")
		resp := x[0]
		resp = resp[3:]
		resp = resp[:len(resp)-1]

		msg := data[0] + " has achieved rank " + data[1]
		return trigger_rea_equal(resp, data[1], reaction, msg)
	}
	return ""
}

func lol_handler_hotstreak(name, reaction string) string {
	playerinfo := strings.Split(name, "_")
	response := get_player_info(playerinfo[0])

	x := strings.Split(string(response), "hotStreak")
	x = strings.Split(x[1], ",")
	resp := x[0]
	resp = resp[2:]
	resp = resp[:len(resp)-2]
	boool := ""
	if playerinfo[1] == "1" {
		boool = "true"
	} else {
		boool = "false"
	}

	msg := "hotstreak action"
	return trigger_rea_equal(resp, boool, reaction, msg)
}

func lol_handler_veteran(name, reaction string) string {
	playerinfo := strings.Split(name, "_")
	response := get_player_info(playerinfo[0])
	x := strings.Split(string(response), "veteran")
	x = strings.Split(x[1], ",")
	resp := x[0]
	resp = resp[2:]

	boool := ""
	if playerinfo[1] == "1" {
		boool = "true"
	} else {
		boool = "false"
	}

	msg := "veteran action"
	return trigger_rea_equal(resp, boool, reaction, msg)
}

func currency_handler(currency, reaction string) string {
	url := "http://api.exchangeratesapi.io/v1/latest?access_key=1cfd3f3d99936247f48d60d11445f0f7"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return ""
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	temps := strings.Split(string(body), currency)
	temps = strings.Split(temps[1], ",")
	resp, err := strconv.ParseFloat(temps[0][2:], 32)
	fmt.Println(resp, " :: ", 1.00)
	if resp > 1.00 && strings.Index(reaction, "@") != -1 {
		fmt.Println("J'envoie un mail à " + reaction)
		send_mail(reaction, currency+" > EUR ")
	} else if resp > 1.00 && reaction == "calendar" {
		return "event"
	} else if resp > 1.00 {
		fmt.Println("J'envoie un sms à " + reaction)
		send_sms(reaction, currency+" > EUR ")
	}
	return ""
}

func weather_handler(loc, reaction string) string {
	index := strings.Split(loc, "_")
	heat, err := strconv.Atoi(index[1])
	if err != nil {
		panic(err)
	}

	url := "http://api.openweathermap.org/data/2.5/weather?q=" + index[0] + "&APPID=ab22018089b37f82cc084867cd1a3743&units=metric"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return ""
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	var dat map[string]interface{}
	if err := json.Unmarshal(body, &dat); err != nil {
		panic(err)
	}
	i := strings.Split(string(body), "temp")
	y := strings.Split(i[1], ",")
	resp, err := strconv.ParseFloat(y[0][2:], 32)
	fmt.Println(resp, " :: ", float64(heat))
	if resp > float64(heat) && strings.Index(reaction, "@") != -1 {
		fmt.Println("J'envoie un mail à " + reaction)
		send_mail(reaction, index[0])
	} else if resp > float64(heat) && reaction == "calendar" {
		return "event"
	} else if float64(heat) > 1.00 {
		fmt.Println("J'envoie un sms à " + reaction)
		send_sms(reaction, index[0])
	}
	return ""
}

func send_mail(adresse, service string) {

	// Sender data.
	from := "my.area.2022@gmail.com"
	password := "plop987000"

	// Receiver email address.
	to := []string{
		adresse,
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Message.
	message := []byte("Hey seems like your action " + service + " happened")

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Email Sent Successfully!")
}

func send_sms(nb, service string) {
	body := SMSRequestBody{
		APIKey:    "94e7cfa1",
		APISecret: "ZriVCDKj0EFyTCqy",
		To:        nb,
		From:      "AREA",
		Text:      "Hello! seems like your action from " + service + " happened",
	}

	smsBody, err := json.Marshal(body)
	if err != nil {
		panic(err)
	}

	resp, err := http.Post("https://rest.nexmo.com/sms/json", "application/json", bytes.NewBuffer(smsBody))
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	fmt.Println(respBody)
}
