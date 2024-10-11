# 빌드 및 배포 가이드
## 사용된 프레임워크 및 버전 정보
### EC2 인스턴스에서 작동하는 서비스
1. Docker
    - v27.3.1
2. Docker Compose
    - v2.29.7

### Docker Container로 작동하는 서비스
1. [Caddy Docker Proxy](https://github.com/lucaslorentz/caddy-docker-proxy)
    - Nginx를 대체하여 작동하는 프록시 서버
    - Base Image: `lucaslorentz/caddy-docker-proxy:2.9.1-alpine`
2. MySQL
    - Base Image: `mysql:8.0`
3. MongoDB
    - Base Image: `mongodb/mongodb-community-server:7.0-ubuntu2204`
4. FastAPI
    - Base Image: `thenoface/s11p21c106_analysis:latest`
    - 이미지 빌드 시간을 줄이기 위해 `thenoface/s11p21c106_python39_base` 이미지를 기반으로 빌드됨
5. SpringBoot
    - Base Image: `thenoface/s11p21c106_analysis:latest`
6. Vite + React on Nginx
    - Base Image:
        - Build: `node:lts-alpine`
        - Deploy: `nginx:stable-alpine`

### 사용된 IDE
1. VSCode
2. Intellij IDEA Ultimate

## 빌드 환경변수
### SpringBoot (`project/back/health`)
- Google, Kakao OAuth 사용을 위해 토큰을 발급받아야 함
- S3 버킷 생성 필요
- `project/back/health/src/main/resources/application.properties`
    ```
    spring.application.name=health

    # DB
    ## MySQL
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.datasource.url=jdbc:mysql://mysql/health?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true
    spring.datasource.username=USERNAME
    spring.datasource.password=PASSWORD

    ## MongoDB
    spring.data.mongodb.host=mongodb
    spring.data.mongodb.port=27017
    spring.data.mongodb.authentication-database=admin
    spring.data.mongodb.database=Health
    spring.data.mongodb.username=USERNAME
    spring.data.mongodb.password=PASSWORD
    logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG

    # JPA
    spring.data.jpa.repositories.bootstrap-mode=deferred
    spring.jpa.show-sql=false
    spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
    spring.jpa.properties.hibernate.format_sql=true
    spring.jpa.properties.hibernate.hbm2ddl=update
    logging.level.org.hibernate.type.descriptor.sql=trace

    # OAuth
    oauth.google.client.id=
    oauth.google.client.secret=
    oauth.kakao.client.id=
    oauth.kakao.client.secret=

    # JWT
    spring.jwt.secret=

    # Domain
    domain.url=https://j11c106.p.ssafy.io

    # Swagger
    springdoc.swagger-ui.groups-order=DESC
    springdoc.swagger-ui.tags-sorter=alpha
    springdoc.swagger-ui.operations-sorter=method
    springdoc.swagger-ui.disable-swagger-default-url=true
    springdoc.swagger-ui.display-request-duration=true
    springdoc.swagger-ui.default-models-expand-depth=2
    springdoc.swagger-ui.default-model-expand-depth=2

    # API Docs
    springdoc.api-docs.path=/api-docs
    springdoc.show-actuator=true
    springdoc.default-consumes-media-type=application/json
    springdoc.default-produces-media-type=application/json
    springdoc.writer-with-default-pretty-printer=true
    springdoc.model-and-view-allowed=true
    springdoc.paths-to-match=/api/v1/**

    # Amazon Credantial
    spring.cloud.aws.credentials.access-key=
    spring.cloud.aws.credentials.secret-key=
    spring.cloud.aws.region.static=
    spring.cloud.aws.s3.region=
    spring.cloud.aws.s3.bucket=
    spring.servlet.multipart.max-file-size=50MB
    spring.servlet.multipart.max-request-size=50MB
    #logging.level.io.awspring.cloud=debug

    # FastAPI
    health.analysis.api.url=http://health_analysis:8000/api/v1

    # OpenAi
    openai.model=gpt-4o-mini
    openai.api.key=
    openai.api.url=https://api.openai.com/v1/chat/completions
    ```
- `project/back/health/src/main/resources/firebase-adminsdk.json`
  - Firebase Cloud Messaging 사용을 위한 인증키 정보
  - Firebase Console -> 프로젝트 -> 프로젝트 설정 -> 서비스 계정 -> Java Admin SDK 스니펫 생성

### Vite + React (`project/front/health`)
- 프로젝트 최상위 디렉토리에 `.env` 생성
- 필요한 변수명 작성
    ```
    # 현재 개발 모드
    VITE_APP_STATE=production

    # endpoint를 포함한 base url
    VITE_APP_BASE_URL=https://j11c106.p.ssafy.io/api/v1

    # endpoint를 제외한 base url
    VITE_APP_BASE_URL_NO_ENDPOINT=https://j11c106.p.ssafy.io
    ```

### FastAPI (`project/analysis/practice/dock`)
- 프로젝트 최상위 디렉토리에 `.env` 생성
    ```
    MONGO_USERNAME=MONGODB_USERNAME
    MONGO_PASSWORD=MONGODB_PASSWORD
    ```

## 서비스별 컨테이너 배포
- Caddy Docker Proxy 구현 특성 상 각 서비스별 리버스 프록시 정보는 `docker run` 에 `-l` 옵션으로 설정
    - `caddy=j11c106.p.ssafy.io` 구문을 서비스할 주소에 맞춰 수정
- 다음의 순서로 배포

### Infra Deploy
- 다음 명령어 사용: `docker compose -f Docker/docker-compose.yml up -d`
- 포함되어 실행되는 컨테이너
    - Caddy Proxy Server
    - Portainer Management Console
    - Jenkins

### Database Deploy
- 다음 명령어 사용: `docker compose -f Docker/database.yml up -d`
- 포함되어 실행되는 컨테이너
    - MySQL
    - MongoDB
- 다음 환경변수는 상황에 맞춰 직접 설정 필요
    - MongoDB
        ```
        MONGO_INITDB_ROOT_PASSWORD: 
        MONGO_INITDB_ROOT_USERNAME: 
        ```
    - MySQL
        ```
        MYSQL_PASSWORD: 
        MYSQL_ROOT_PASSWORD: 
        MYSQL_USER: 
        ```

### Backend Deploy
```
docker run --name health_backend \
    -d --net caddy --expose 8080 \
    -l caddy=j11c106.p.ssafy.io \
    -l caddy.0_handle=/api* \
    -l caddy.1_handle=/swagger-ui* \
    -l caddy.2_handle=/oauth2* \
    -l caddy.0_handle.reverse_proxy="{{upstreams 8080}}" \
    -l caddy.1_handle.reverse_proxy="{{upstreams 8080}}" \
    -l caddy.2_handle.reverse_proxy="{{upstreams 8080}}" \
    -v /etc/localtime:/etc/localtime:ro \
    --restart=unless-stopped \
thenoface/s11p21c106_backend:latest
```

### Frontend Deploy
```
docker run --name health_frontend \
    -d --net caddy --expose 80 \
    -l caddy=j11c106.p.ssafy.io \
    -l caddy.handle=/* \
    -l caddy.handle.reverse_proxy="{{upstreams 80}}" \
    -v /etc/localtime:/etc/localtime:ro \
    --restart=unless-stopped \
thenoface/s11p21c106_frontend:latest
```

### FastAPI Deploy
```
docker run --name health_analysis \
    -d --net caddy -e FASTAPI_PORT=8000 \
    -v /etc/localtime:/etc/localtime:ro \
    --restart=unless-stopped \
thenoface/s11p21c106_analysis:latest
```