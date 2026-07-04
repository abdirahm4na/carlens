# API Design

## POST /scan

Uploads a vehicle image.

Returns:

- Vehicle identification
- Confidence score
- Specifications

---

## GET /scan/:id

Returns a previous scan.

---

## POST /chat

Sends a question to CarLens AI.

Returns:

- AI response

---

## GET /history

Returns all previous scans.

---

## POST /saved

Save a vehicle.

---

## DELETE /saved/:id

Remove a saved vehicle.
