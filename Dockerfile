FROM node:24-alpine AS frontend-build

WORKDIR /frontend

COPY image-storage-frontend/package*.json ./
RUN npm ci

COPY image-storage-frontend/ ./
RUN npm run build

FROM eclipse-temurin:25-jdk AS backend-build

WORKDIR /backend

COPY image-storage-backend/.mvn/ .mvn/
COPY image-storage-backend/mvnw image-storage-backend/pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw -q -DskipTests dependency:go-offline

COPY image-storage-backend/src ./src
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=backend-build /backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
