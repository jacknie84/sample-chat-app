dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
    implementation("org.hibernate.validator:hibernate-validator")
    implementation("io.r2dbc:r2dbc-h2")

    runtimeOnly("com.h2database:h2")
}
