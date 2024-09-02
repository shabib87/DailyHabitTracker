# Database Relationships

This document outlines the relationships between the `User`, `Habit`, `Tracker`, and `Reminder` entities in the habit-tracking application.

## 1. User and Habit

- **Relationship**: **One-to-Many**
- **Explanation**: A single user can have multiple habits, but each habit is associated with only one user.
  
  - **User** entity has a one-to-many relationship with the **Habit** entity.
  - **Habit** entity has a many-to-one relationship with the **User** entity.

## 2. Habit and Tracker

- **Relationship**: **One-to-Many**
- **Explanation**: Each habit can have multiple trackers, where each tracker records an instance of the habit being tracked (e.g., daily, weekly).

  - **Habit** entity has a one-to-many relationship with the **Tracker** entity.
  - **Tracker** entity has a many-to-one relationship with the **Habit** entity.

## 3. Habit and Reminder

- **Relationship**: **One-to-Many**
- **Explanation**: A habit can have multiple reminders to notify the user to perform the habit at specific times.

  - **Habit** entity has a one-to-many relationship with the **Reminder** entity.
  - **Reminder** entity has a many-to-one relationship with the **Habit** entity.

## 4. User and Tracker

- **Relationship**: **Indirect Relationship Through Habit**
- **Explanation**: A **User** has multiple **Habits**, and each **Habit** has multiple **Trackers**. Thus, there is an indirect one-to-many relationship between **User** and **Tracker**.

## 5. User and Reminder

- **Relationship**: **Indirect Relationship Through Habit**
- **Explanation**: Similar to the **User-Tracker** relationship, a **User** has multiple **Habits**, each of which can have multiple **Reminders**. Thus, the relationship between **User** and **Reminder** is also indirectly one-to-many.

## Visualization of Relationships

Here is a simplified diagram of how these entities relate to each other:

```plaintext
┌───────────┐                 ┌────────────┐                 ┌────────────┐
│   User    │-1─────────────m>│   Habit    │-1────────────m->│   Tracker  │
└───────────┘                 └────────────┘                 └────────────┘
                                    │
                                    1                             
                                    │                             
                                    │
                                    m
                                    |                             
                                    v                             
                               ┌────────────┐              
                               │  Reminder  │               
                               └────────────┘               
```

**1 User can have many Habits**
**1 Habit can have many Trackers**
**1 Habit can have many Reminders**

### How to Use This Document

1. **Refer** to this document whenever you need a clear understanding of the entity relationships.
2. **Update** the document if there are changes in the schema design in the future.

This version provides a clearer view of the relationships between entities, including a text-based diagram to visualize these connections.
