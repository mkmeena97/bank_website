# Distributed Tracing with Zipkin and Cartography in Microservices Architecture

In a microservices architecture, understanding the flow of requests across multiple services is essential for diagnosing issues and optimizing performance. Two popular tools that help address these challenges are **Zipkin** and **Cartography**.

---

## 🔍 What is Zipkin?

* **Zipkin** is a distributed tracing system that collects and visualizes timing data for requests as they move through a microservice landscape.

**Key features:**
- **Trace visualization:** Easily see how requests flow between services.
- **Latency tracking:** Identify bottlenecks and slow points in request chains.
- **Dependency graphs:** Understand service-to-service communication patterns.

---

## 🗺️ What is Cartography?

* **Cartography** (by Lyft) creates maps of your infrastructure by gathering data from multiple sources, helping you visualize service dependencies and relationships.

**Key features:**
- **Security graphing:** Map users, roles, and privileges to microservices.
- **Audit and compliance:** Spot missing links and orphaned resources.

> **Together:** *Zipkin* helps trace and troubleshoot requests, while *Cartography* clarifies how your infrastructure pieces fit together.


---

## ✅ 1. Dependencies (Spring Boot + Micrometer + Zipkin)

Add the following to your `pom.xml`:

```xml
<!-- Micrometer Tracing with Brave (for Zipkin) -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>

<dependency>
    <groupId>io.zipkin.reporter2</groupId>
    <artifactId>zipkin-reporter-brave</artifactId>
</dependency>
```

> Make sure `spring-boot-starter-actuator` is also present.

---

## 💡 2. application.yml Configuration

```yaml
spring:
  zipkin:
    base-url: http://localhost:9411
    enabled: true
management:
  tracing:
    enabled: true
    sampling:
      probability: 1.0 # 100% sampling (reduce in prod)
    propagation:
      type: b3          # Zipkin-compatible headers

```

---

## 📁 3. Global Filter to Add Trace ID in Gateway

Create this custom filter in your API Gateway (or any service):

```java
package com.example.gatewayserver.config;

import org.slf4j.MDC;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class TraceIdGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String traceId = MDC.get("traceId");
        if (traceId != null) {
            exchange.getResponse().getHeaders().add("X-Trace-Id", traceId);
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1; // high priority
    }
}
```

This adds a response header `X-Trace-Id` for debugging.

---

## 🚀 4. Docker Network (for communication between containers)

```bash
docker network create zipkin-net
```

---

## 📆 5. Start MySQL Container for Zipkin

```bash
docker run -d \
  --name zipkin-mysql \
  --network zipkin-net \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=zipkin \
  openzipkin/zipkin-mysql
```

Ignore `my_print_defaults` warning if it appears.

---

## 📃 6. Load Zipkin MySQL Schema

Download schema from:
[https://github.com/openzipkin/zipkin/blob/master/zipkin-storage/mysql-v1/src/main/resources/mysql.sql](https://github.com/openzipkin/zipkin/blob/master/zipkin-storage/mysql-v1/src/main/resources/mysql.sql)

Then:

```bash
docker cp zipkin-mysql-schema.sql zipkin-mysql:/schema.sql

docker exec -it zipkin-mysql sh -c "mysql -u root -proot zipkin < /schema.sql"
```

---

## 📁 7. Start Zipkin with MySQL Backend

```bash
docker run -d \
  --name zipkin \
  --network zipkin-net \
  -p 9411:9411 \
  -e STORAGE_TYPE=mysql \
  -e MYSQL_HOST=zipkin-mysql \
  -e MYSQL_TCP_PORT=3306 \
  -e MYSQL_DB=zipkin \
  -e MYSQL_USER=root \
  -e MYSQL_PASS=root \
  openzipkin/zipkin
```

> Access UI at: [http://localhost:9411](http://localhost:9411)

---

## 🚩 8. Test With Postman or Frontend

* Send requests via **Gateway** (not directly to services)
* Ensure services are up with tracing enabled
* Example: `GET http://localhost:8080/api/fetch`

---

## 📊 9. View Trace and Dependency Graph

* Go to: [http://localhost:9411](http://localhost:9411)
* Click **"Dependencies"** tab to see service call flow

You should see something like:

```
gatewayserver → accounts
```

---

## 📒 Summary

| Item          | Description                         |
| ------------- | ----------------------------------- |
| Tracing Lib   | Micrometer Tracing (with Brave)     |
| Reporter      | Zipkin Reporter Brave               |
| Backend       | MySQL (with schema loaded manually) |
| Visualization | Zipkin UI on port 9411              |
| Trace ID Prop | B3 headers                          |
| Extra Header  | X-Trace-Id (via custom filter)      |

---

## 🔗 References

* [Micrometer Tracing Docs](https://micrometer.io/docs/tracing)
* [Zipkin Docker Hub](https://hub.docker.com/r/openzipkin/zipkin)
* [Zipkin GitHub](https://github.com/openzipkin/zipkin)

---

✍️ Documented by: **Tez aka Mahendra**
🗓️ Date: July 30, 2025
