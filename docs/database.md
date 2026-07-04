# CarLens Database

## Overview

CarLens stores users, scans, AI responses, and saved vehicles.

---

# users

Stores registered users.

Fields

- id
- email
- name
- avatar_url
- created_at

---

# scans

Stores every vehicle scan.

Fields

- id
- user_id
- image_url
- make
- model
- trim
- year
- confidence
- created_at

---

# ai_conversations

Stores chat history.

Fields

- id
- scan_id
- role
- message
- created_at

---

# saved_cars

Stores bookmarked vehicles.

Fields

- id
- user_id
- scan_id
- notes
- created_at
