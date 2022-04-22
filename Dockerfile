FROM openjdk:11

ARG APP_DIR="opt/app"
ARG JAR_FILE=./vms-app/target/*.jar

COPY $JAR_FILE $APP_DIR/app.jar

WORKDIR $APP_DIR

ENTRYPOINT ["java", "-jar", "app.jar"]