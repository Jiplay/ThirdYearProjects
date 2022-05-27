# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

WORKDIR /src

ENV GO111MODULE=on

COPY go.mod ./
COPY go.sum ./
COPY serviceAccountKey.json ./
RUN go mod download

COPY *.go ./

RUN go build -o /main.go

EXPOSE 8080

CMD [ "./main" ]
