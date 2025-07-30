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
            exchange.getResponse()
                    .getHeaders()
                    .add("X-Trace-Id", traceId);
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1; // execute early
    }
}




