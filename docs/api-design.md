# HintFlow API Design

## Endpoint

POST /generate-hint

## Request

```json
{
  "problem": "...",
  "code": "...",
  "language": "cpp",
  "hintLevel": 1
}
```

## Response

```json
{
  "hint": "Think about storing previously seen values."
}
```