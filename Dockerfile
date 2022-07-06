FROM openjdk:11

ARG APP_DIR="opt/app"
ARG JAR_FILE=./vms-app/target/*.jar
ARG VERSIONS_DIR="opt/versions"

COPY $JAR_FILE $APP_DIR/app.jar
RUN mkdir -p $VERSIONS_DIR

WORKDIR $APP_DIR

ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8787", "-jar", "app.jar"]