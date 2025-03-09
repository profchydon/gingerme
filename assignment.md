# 1. System Design Task

### System Architecture

![alt text](<architecture.jpg>)

### Entity Relation Diagram

![alt text](<erd.png>)

### Scaling Strategies

#### Horizontal Scaling
- Use Containerized microservices (Docker + Kubernetes) to enable product, order, checkout, and search services to independently scale (especially during high traffic periods).
- Enable auto-scaling on multi-region cloud infrastructure like AWS, GCP, or Azure that support scaling out during traffic surges.

#### Database Scaling Strategies
- **Read Replicas**: Distribute read-heavy workloads using PostgreSQL read replicas.
- **Database Sharding**: Improve performance by region sharding orders, users, and checkouts.
- **ElasticSearch for Search**: Achieve fast indexing and retrieval to ensure product search results return in less than 500 ms.
- **Redis Caching**: Cache data that has a high retrieval frequency such as user sessions and product details to minimize the number of database queries issued.

#### CDN (Content Delivery Network) for Faster Load Times
- Utilize Cloudflare, AWS CloudFront services for faster delivery and improved responsiveness by caching and serving static content such as images, CSS, and JS nearer to users.
- Accelerates rendering of pages worldwide while reducing server load.

### Security Considerations

#### DDoS Protection
- Set up Cloudflare WAF and AWS Shield to mitigate DDoS attacks.
- Use Rate Limiting & Bot Detection via API Gateway to prevent abuse.
- Enable Geo-blocking & IP Whitelisting for extra security.

#### API Security
- OAuth2 + JWT Authentication for more secure access
- Add Rate Limit as another security feature at the API Gateway to prevent abuse.
- Use Role-Based Access Control (RBAC) for authorization.

#### Data Encryption & Compliance
- Use Public key cryptography for the exchange of data.
- Use AES-256 Encryption for sensitive data (user details, payment info).
- Secure storage of payment details and tokenized transactions.

# 2. Leadership & Management Task

### Technical Memo: Monolithic vs. Microservices Architecture for the eCommerce Platform

**From:** Chidi Nkwocha  
**To:** Engineering Team  
**Date:** 7th March, 2025  
**Subject:** Architectural Decision – Monolith vs. Microservices

#### 1. Overview
Our team is considering whether to develop our eCommerce site as a monolith or with microservices. With a deadline of 3 months, we have to think about how quickly we can develop, how flexible it is to change in the future, and how easy it will be to maintain for the long run. This memo summarizes the pros and cons of both approaches, our final decision, and a strategy for how to migrate at a later time.

#### Criteria

| **Criteria**               | **Monolithic Architecture**                                                                 | **Microservices Architecture**                                                                 |
|-----------------------------|---------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Development Speed           | Faster initial development (single codebase, simpler setup).                                | Slower initial setup (requires distributed service design).                                     |
| Complexity                  | Easier to build, debug, and deploy.                                                        | Requires managing inter-service communication, API contracts.                                   |
| Scalability                 | Vertical scaling (increase server capacity).                                                | Horizontal scaling (scale services independently).                                              |
| Performance                 | Faster internal function calls.                                                            | Network latency due to inter-service communication.                                             |
| Deployments                 | Single deployment; a small change redeploys the entire app.                                 | Independent deployments allow faster iteration.                                                 |
| Reliability                 | Single point of failure; one bug can crash the whole app.                                  | Failure in one service does not affect others.                                                  |
| Tech Stack Flexibility      | Must use a unified tech stack.                                                             | Services can use different technologies suited to their function.                               |
| Data Consistency            | Easier to maintain strong consistency (single database).                                   | Requires distributed transactions and data synchronization.                                     |
| Team Collaboration          | Works well for small teams.                                                                | Scales well for larger teams (service ownership).                                               |

#### 3. Decision & Justification
**Recommended Approach:** Modular Monolith.  
Start with a modular monolith where code is organized into the decoupled modules like Product, Order, and Payment.

**Why Start with a Monolith?**
- **Deadline Constraints:** The 3-month timeline is too short for anything other than rapid development. Microservices would slow progress with the necessary infrastructure.
- **Streamlined Debugging & Deployment:** Avoids the complexity of distributed systems at the start.
- **Scalability Needs:** In the initial stages, traffic won’t need a microservice in place, and a reassessment post-launch can happen based on metrics (e.g. 10 times increase in traffic).
- **Cost of Delay:** A modular monolith makes it less painful to refactor in the future, making it less technically debt-ridden.

**When to Consider Migrating to Microservices?**  
Once we receive high traffic of above 100,000 daily users and need independent scalability, migrating services to microservices can be done incrementally.

#### 4. Migration Strategy (Monolith to Microservices)
To prepare for a future migration, we will:
- **Domain Driven Design (DDD):** Transform the monolith into multiple modules, like Order, User, Checkout, and Product.
- **Create an Internal API Layer:** Almost like microservices, modules will be separated to communicate via internal APIs.
- **Database De-coupling:** Begin to separate different domain schemas, like Order DB and User DB, to prepare for microservices.
- **Extraction by Steps:** De-migrate non-primary services first, like Search or Notifications, before de-migrating Order or Payment services.
- **Testing with Feature Flags:** Test the services in microservices architecture without migrating completely.

#### 5. Team Alignment & Communication
Ensure team alignment by applying these practices:
- **Tech Talks:** Present the trade-offs and the discussed strategy in a meeting.
- **Set Precise Service Boundaries:** Assign control to constituent modules as early as possible to help move to microservices.
- **Milestones:** Break the 3-month timeline into sprints with clear deliverables, like “Week 4: Core checkout flow” detail scoping.
- **Encourage Good Practices:** Foster modular and API-Centric philosophy early on.
- **System Refresh Assessment:** Post launch, analyze whether the system requires a migration to optimize performance.

#### 6. Conclusion
We will start with a modular monolith to meet our deadline while keeping microservices migration in mind. This approach balances speed, maintainability, and scalability without premature complexity.

**Best,**  
Chidi Nkwocha  
Engineering Lead

# 3. SQL Performance & Query Optimization

#### Efficiently fetch products with their categories, brands, and suppliers.

- **Query:**
```sql
SELECT p.id AS product_id, p.name AS product_name, c.name AS category, b.name AS brand,  
s.name AS supplier, p.price, p.stock
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id
JOIN suppliers s ON p.supplier_id = s.id;
```
- **Execution time:** 123ms

#### Get the top 10 most sold products.

- **Query:**
```sql
SELECT p.id AS product_id, p.name AS product_name, SUM(o.quantity) AS total_sold
FROM orders o
JOIN products p ON o.product_id = p.id
GROUP BY p.id, p.name ORDER BY total_sold DESC LIMIT 10;
```

#### Fetch the latest 100 orders

- **Query:**
```sql
SELECT o.id AS order_id, u.name AS user_name, p.name AS product_name, b.name AS brand,
c.name AS category, s.name AS supplier, o.quantity, o.total_price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id
JOIN suppliers s ON p.supplier_id = s.id LIMIT 100;
```

**Performance Optimization:**  
- Use LIMIT 100 to prevent full table scans.
- Optimize JOINs with Foreign Keys.


#### Database Structure Improvements
- Move orders into order_items for better structure.
- Store total_price in orders to avoid recalculations.
- orders (user_id, product_id, created_at)
- product_reviews (product_id, user_id)
- orders can be partitioned by year to improve performance.

#### Fetch Average Rating for Each Product

- **Query:**
```sql
SELECT  p.id AS product_id,  p.name AS product_name, ROUND(AVG(pr.rating), 2) AS avg_rating
FROM products p
LEFT JOIN product_reviews pr ON p.id = pr.product_id GROUP BY p.id, p.name;
```


# 6. Follow-Up Questions

#### Architectural changes to accommodate for 5x growth?
- **Database Sharding:** I will split the database by region 
- **Caching:** Implement caching for frequently accessed data

#### Database Optimization
In order to optimize a single MySQL/PostgreSQL instance, I would create indexes on frequently searched columns to improve lookup speeds, partition large tables such as orders by their associated date ranges in order to enhance performance, and use read replicas for bandwidth heavy workloads. In addition, product-related information, such as details, can be queried using query caches through Redis and database traffic can be alleviated. Efficient management of concurrent queries is possible through connection pooling, for example, PgBouncer for PostgreSQL.

#### Message Queues for Async Processing
For frequent updates and optimizations for orders and reviews, I will implement RabbitMQ or Kafka message queues for order asynchronous processing. When An order is being made, an order service places the order and saves it in the database while publishing ‘order placed’ as an event. This event is consumed by services responsible for updating inventory, sales analytics, and customer notifications, so they can be updated in real-time without API call blocking. A review submission will also trigger an event ‘review added’ which then will trigger rating calculations, cache updates, and seller alerts in as the event also activates asynchronously.


#### Rate Limiting
To minimize API fraudulent usage through multiple requesting patterns of product detail retrieval, I will engage the use of rate limits through NGINX, API Gateway (AWS/GCP), or node middleware for rate limitation in a Node.js application (express-rate-limit) configuration to track requests per user or IP address.ments a counter stored in Redis with an expiration time (e.g., 100 requests per minute per user). If the limit is exceeded, the API returns HTTP 429 (Too Many Requests).