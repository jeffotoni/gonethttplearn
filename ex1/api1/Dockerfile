# syntax=docker/dockerfile:1

FROM golang:1.25.6-alpine AS builder

WORKDIR /src

RUN apk add --no-cache ca-certificates tzdata

COPY . .

# Exemplo padrão: APP_FILE=main.go
# Também pode usar outro arquivo: --build-arg APP_FILE=cmd/api/main.go
ARG APP_FILE=main.go

ENV CGO_ENABLED=0

RUN go build -trimpath -ldflags="-s -w" -o /out/server "./${APP_FILE}"

FROM alpine:3.20 AS runtime

RUN apk add --no-cache ca-certificates tzdata \
	&& cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
	&& echo "America/Sao_Paulo" > /etc/timezone

ENV TZ=America/Sao_Paulo

WORKDIR /app

COPY --from=builder /out/server /app/server

EXPOSE 8080

USER nobody:nobody

ENTRYPOINT ["/app/server"]
