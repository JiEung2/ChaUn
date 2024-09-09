FROM eclipse-temurin:17-alpine
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar
COPY ${JAR_FILE} health_backend.jar
ENTRYPOINT ["java","-jar","/health_backend.jar"]